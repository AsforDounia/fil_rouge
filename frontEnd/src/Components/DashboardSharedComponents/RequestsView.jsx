import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaUser, FaTint, FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaChevronLeft, FaChevronRight, FaBell, FaSignOutAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useRequest } from '../../Context/RequestContext';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify'; // Added missing import for toast
import EditRequestForm from './EditRequestForm';

export default function RequestsView() {
  const [activeTab, setActiveTab] = useState('all');
  const { getRequests, requests , deleteRequest } = useRequest();
  const { user, getUser , hasRole } = useAuth();
  const [editingRequest , setEditingRequest] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isPatient, setIsPatient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    urgency: ''
  });
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    compatible: 0,
    urgent: 0,
    my: 0,
  });
  

  

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        await getRequests();
        await getUser();
        const pt = await hasRole(["patient"]);
        setIsPatient(pt);
      } catch (error) {
        toast.error("Error fetching requests :" + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);
  

  const calculateTabCounts = (data) => {
    if (!data) return;
    const counts = {
      all: data.length,
      compatible: data.filter(req => req.blood_group === user?.blood_type).length,
      urgent: data.filter(req => req.urgency === "Urgent").length,
      my: data.filter(req => req.patient_id === user.id).length,
    };
    
    setTabCounts(counts);
  };

  useEffect(() => {
    if (requests && user) {
      calculateTabCounts(requests);
    }
  }, [requests, user]);

  if (loading) {
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des demandes...</p>
      </div>
    </div>
    );
    
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const getVisibleRequests = () => {
    if (!requests) return [];
    
    return requests.filter(request => {

      if (activeTab === 'compatible' && request.blood_group !== user?.blood_type) {
        return false;
      }
      if (activeTab === 'urgent' && request.urgency !== "Urgent") {
        return false;
      }
      if (activeTab === 'my' && request.patient_id !== user.id) {
        return false;
      }

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

  const handeleDeleteRequest = async(id) => {
    try{
        await deleteRequest(id);
        setShowDeleteConfirm(false);
    }
    catch(error){
        toast.error(error);
        
    }
  }
  
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
        {editingRequest && (
        <EditRequestForm
          request={editingRequest}
          onCancel={() => setEditingRequest(null)}
        />
      )}

{showDeleteConfirm && selectedRequest && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
                          <h3 className="text-xl font-semibold text-[#4A1E1F]">Confirmer la suppression</h3>
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ✕
                          </button>
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
                        </div>
                        <div className="p-6">
                          <p className="mb-6 text-gray-700">
                            Êtes-vous sûr de vouloir supprimer cette demande de sang ?
                            Cette action est irréversible.
                          </p>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => handeleDeleteRequest(selectedRequest.id)}
                              className="px-4 py-2 bg-[#8B2326] text-white rounded-lg hover:bg-[#4A1E1F] transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
        {isPatient && (

        <div
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'my' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('my')}
        >
          Mes Demandes <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.my}</span>
        </div>
        )}
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
                {(request.patient_id === user.id && request.status === "en_attente") && (
                  <>

                <button
                  onClick={() => setEditingRequest(request)}
                  className="bg-transparent border-none cursor-pointer p-1 text-darkteal hover:text-[#40898A]"
                >
                  <FaEdit />
                </button>
                
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowDeleteConfirm(true);
                  }}
                  className="bg-transparent border-none cursor-pointer p-1 text-[#8B2326] hover:text-[#a42a2d]"
                >
                  <FaTrash />
                </button>

       
                </>

                )

                }

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