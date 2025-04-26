import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaUser, FaTint, FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaChevronLeft, FaChevronRight, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useRequest } from '../../Context/RequestContext';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify'; // Added missing import for toast

export default function Requests() {
  const [activeTab, setActiveTab] = useState('all');
  const { getRequests, requests } = useRequest();
  const { user, getUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    urgency: ''
  });
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    compatible: 0,
    urgent: 0,
  });
  
  // Function to calculate tab counts based on actual data
  const calculateTabCounts = (data) => {
    if (!data) return;
    const counts = {
      all: data.length,
      compatible: data.filter(req => req.blood_group === user?.blood_type).length,
      urgent: data.filter(req => req.urgency === "Urgent").length,
    };
    
    setTabCounts(counts);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        await getRequests(currentPage);
        await getUser();
      } catch (error) {
        toast.error("Error fetching events :" + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, [currentPage]);
  
  useEffect(() => {
    if (requests && user) {
      calculateTabCounts(requests);
    }
  }, [requests, user]);

  if (loading) {
    return <div className="p-8 w-full flex justify-center items-center">Chargement...</div>;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // You could potentially fetch filtered data from the API here
    // For now, we're just filtering client-side
    console.log('Applied filters:', filters);
  };
  
  const getVisibleRequests = () => {
    if (!requests) return [];
    
    return requests.filter(request => {
      // First apply tab filters
      if (activeTab === 'compatible' && request.blood_group !== user?.blood_type) {
        return false;
      }
      if (activeTab === 'urgent' && request.urgency !== "Urgent") {
        return false;
      }
      
      // Then apply dropdown filters
      if (filters.bloodGroup && request.blood_group !== filters.bloodGroup) {
        return false;
      }
      if (filters.urgency && request.urgency !== filters.urgency) {
        return false;
      }
      
      return true;
    });
  };

  const visibleRequests = getVisibleRequests();
  
  // Helper function to get urgency icon and color
  const getUrgencyDisplay = (urgency) => {
    if (urgency === 'Urgent') {
      return {
        icon: <FaExclamationCircle className="inline-block w-4 h-4 mr-1" />,
        bgClass: 'bg-[#FF9800]/10 text-[#FF9800]'
      };
    } else {
      return {
        icon: <FaInfoCircle className="inline-block w-4 h-4 mr-1" />,
        bgClass: 'bg-[#1A4B4C]/10 text-[#1A4B4C]'
      };
    }
  };

  return (
    <div className="p-8 w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'all' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('all')}
        >
          Toutes les demandes <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{requests.length}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'compatible' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('compatible')}
        >
          Compatible avec mon groupe <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.compatible}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'urgent' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('urgent')}
        >
          Urgentes <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.urgent}</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">Filtrer les demandes</h3>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <select 
              name="bloodGroup"
              value={filters.bloodGroup}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-lg text-base min-w-3/7"
            >
              <option value="">Tous les groupes sanguins</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <select 
              name="urgency"
              value={filters.urgency}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-lg text-base min-w-3/7"
            >
              <option value="">Toutes les urgences</option>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
            </select>
            <button 
              onClick={applyFilters}
              className="px-6 py-3 bg-[#1A4B4C] text-white border-none rounded-lg text-base cursor-pointer hover:bg-[#40898A] transition-colors"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>

      {/* Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visibleRequests.map(request => {
          const urgencyDisplay = getUrgencyDisplay(request.urgency);
          const isCompatible = request.blood_group === user?.blood_type;
          const isUrgent = request.urgency === "Urgent";
          
          return (
            <div
              key={request.id}
              className={`flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all hover:translate-y-[-5px] hover:shadow-lg
                ${isUrgent ? 'border-t-4 border-t-[#FF9800]' : 'border-t-4 border-t-[#8B2326]'}
                ${isCompatible ? 'border-l-4 border-l-[#22c55e]' : ''}`}
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className={`text-sm py-1 px-2 rounded-full font-medium ${urgencyDisplay.bgClass}`}>
                    {urgencyDisplay.icon}
                    {request.urgency}
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#8B2326] bg-[#8B2326]/10 p-2 rounded-lg min-w-[3rem] text-center">
                  {request.blood_group}
                </div>
              </div>
              <div className="p-4 flex-1"> 
                <h3 className="text-lg font-medium text-[#4A1E1F] mb-2">{request.centre.name}</h3>
                
                {isCompatible && (
                  <div className="bg-[#f0fdf4] text-[#22c55e] text-sm py-1 px-2 rounded-full inline-flex items-center gap-1 mb-4">
                    <FaCheckCircle className="w-4 h-4" /> Compatible avec votre groupe
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2 text-[#1A4B4C]">
                    <FaMapMarkerAlt className="w-4 h-4 text-[#40898A]" />
                    <span>{request.centre.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-[#1A4B4C]">
                    <FaUser className="w-4 h-4 text-[#40898A]" />
                    {request.description ? (
                      <span>{request.description}</span>
                    ) : 
                      <span>Aucune description</span>
                    }
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-[#1A4B4C]">
                    <FaTint className="w-4 h-4 text-[#40898A]" />
                    <span>Besoin de {request.component}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {new Date(request.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <button className="bg-[#8B2326] text-white border-none px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors hover:bg-[#4A1E1F]">
                  Répondre
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message when no results */}
      {visibleRequests.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-600">Aucune demande ne correspond à vos critères.</p>
        </div>
      )}
    </div>
  );
}