import React, { useEffect, useState } from 'react';
import { FaUser, FaTint, FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaThumbsUp, FaThumbsDown, FaFilter } from 'react-icons/fa';
import { useRequest } from '../../Context/RequestContext';
import { BiDonateHeart } from "react-icons/bi";
import { toast } from 'react-toastify';
import { FaHeartCircleXmark } from 'react-icons/fa6';

export default function CentreRequests() {
  const [activeTab, setActiveTab] = useState('all');
  const { getCentreRequests, centreRequests, updateRequestStatus } = useRequest();

  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    urgency: ''
  });
  const [tabCounts, setTabCounts] = useState({
    all :0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await getCentreRequests();
      } catch (error) {
        toast.error("Erreur lors du chargement des demandes: " + error.message);
      } 
    };
    
    fetchRequests();
  }, [getCentreRequests]);
  
  const calculateTabCounts = (data) => {
    if (!data) return;
    
    const counts = {
    
     all : data.length,
      pending: data.filter(req => req.status === "en_attente").length,
      accepted: data.filter(req => req.status === "acceptée").length,
      rejected: data.filter(req => req.status === "rejetée").length,
      completed: data.filter(req => req.status === "complétée").length,
      annulle: data.filter(req => req.status === "annulée").length,
    };
    
    setTabCounts(counts);
  };
  
  useEffect(() => {
    if (centreRequests) {
      calculateTabCounts(centreRequests);
    }
  }, [centreRequests]);
  
  if (!centreRequests) {
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des Demandes...</p>
      </div>
    </div>
    )
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestAction = async (requestId, action) => {

      await updateRequestStatus(requestId, action);
      setConfirmAction(null);
      setSelectedRequest(null);

  };

  const getVisibleRequests = () => {
    if (!centreRequests) return [];

    let filteredRequests = centreRequests;
    if (activeTab === 'all') {
        filteredRequests = filteredRequests;
      }
    else if (activeTab === 'pending') {
      filteredRequests = filteredRequests.filter(request => request.status === "en_attente");
    } else if (activeTab === 'accepted') {
      filteredRequests = filteredRequests.filter(request => request.status === "acceptée");
    } else if (activeTab === 'annulle') {
      filteredRequests = filteredRequests.filter(request => request.status === "annulée");
    } else if (activeTab === 'rejected') {
      filteredRequests = filteredRequests.filter(request => request.status === "rejetée");
    } else if (activeTab === 'completed') {
      filteredRequests = filteredRequests.filter(request => request.status === "complétée");
    }

    // Appliquer les filtres supplémentaires (groupe sanguin et urgence)
    if (filters.bloodGroup) {
      filteredRequests = filteredRequests.filter(request => 
        request.blood_group === filters.bloodGroup
      );
    }
    
    if (filters.urgency) {
      filteredRequests = filteredRequests.filter(request => 
        request.urgency === filters.urgency
      );
    }
    
    return filteredRequests;
  };

  const visibleRequests = getVisibleRequests();

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

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'en_attente':
        return {
          text: 'En attente',
          bgClass: 'bg-yellow-100 text-yellow-800'
        };
      case 'acceptée':
        return {
          text: 'Acceptée',
          bgClass: 'bg-green-100 text-green-800'
        };
      case 'rejetée':
        return {
          text: 'Rejetée',
          bgClass: 'bg-red-100 text-red-800'
        };
      default:
        return {
          text: status,
          bgClass: 'bg-gray-100 text-gray-800'
        };
    }
  };

  return (
    <div className="p-8 w-full">
      {/* Confirmation Modal */}
      {confirmAction && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
              <h3 className="text-xl font-semibold text-[#4A1E1F]">
                Confirmer l'action
              </h3>
              <button
                onClick={() => setConfirmAction(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-700">
                {confirmAction &&
                   `Êtes-vous sûr de vouloir ${confirmAction} cette demande de sang ?`
                }
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleRequestAction(selectedRequest.id, confirmAction)}
                  className={`px-4 py-2 text-white rounded-lg transition-colors cursor-pointer ${
                    (confirmAction === 'acceptée' || confirmAction === 'complétée')
                      ? 'bg-[#40898A] hover:bg-[#1A4B4C]'
                      : 'bg-[#8B2326] hover:bg-[#4A1E1F]'
                  }`}
                >
                  {confirmAction && (
                    <span className='capitalize'>{confirmAction}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-[#4A1E1F] mb-6">Gestion des demandes de sang</h2>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'all' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('all')}
        >
          Tous <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.all}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'pending' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('pending')}
        >
          En attente <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.pending}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'accepted' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('accepted')}
        >
          Acceptées <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.accepted}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'rejected' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejetées <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.rejected}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'completed' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('completed')}
        >
          Complétées <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.completed}</span>
        </div>
        <div 
          className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'annulle' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
          onClick={() => setActiveTab('annulle')}
        >
          Annullées <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.annulle}</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">
            <FaFilter className="inline-block mr-2" /> Filtrer les demandes
          </h3>
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
        {visibleRequests.length > 0 ? (
          visibleRequests.map(request => {
            const urgencyDisplay = getUrgencyDisplay(request.urgency);
            const statusDisplay = getStatusDisplay(request.status);
            const isUrgent = request.urgency === "Urgent";
            
            return (
              <div
                key={request.id}
                className={`flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all hover:translate-y-[-5px] hover:shadow-lg
                  ${isUrgent ? 'border-t-4 border-t-[#FF9800]' : 'border-t-4 border-t-[#8B2326]'}`}
              >
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm py-1 px-2 rounded-full font-medium ${urgencyDisplay.bgClass}`}>
                      {urgencyDisplay.icon}
                      {request.urgency}
                    </span>
                    <span className={`text-sm py-1 px-2 rounded-full font-medium ${statusDisplay.bgClass}`}>
                      {statusDisplay.text}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#8B2326] bg-[#8B2326]/10 p-2 rounded-lg min-w-[3rem] text-center">
                    {request.blood_group}
                  </div>
                </div>
                
                <div className="p-4 flex-1"> 
                  <h3 className="text-lg font-medium text-[#4A1E1F] mb-2">
                    Demande #{request.id}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-[#1A4B4C]">
                      <FaUser className="w-4 h-4 text-[#40898A]" />
                      <span>Patient #{request.patient_id}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-[#1A4B4C]">
                      <FaTint className="w-4 h-4 text-[#40898A]" />
                      <span>Besoin de {request.component}</span>
                    </div>
                    <div className="text-[#1A4B4C]">
                      <p className="font-medium mb-1">Description:</p>
                      <p className="pl-2 border-l-2 border-[#40898A]/30">
                        {request.description || "Aucune description fournie."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-3">
                    Demande créée le: {new Date(request.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  {request.status === "en_attente" && (
                    <div className="flex justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setConfirmAction('acceptée');
                        }}
                        className="flex-1 bg-[#40898A] text-white py-2 px-4 rounded-lg hover:bg-[#1A4B4C] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaThumbsUp /> Accepter
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setConfirmAction('rejetée');
                        }}
                        className="flex-1 bg-[#8B2326] text-white py-2 px-4 rounded-lg hover:bg-[#4A1E1F] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaThumbsDown /> Rejeter
                      </button>
                    </div>
                  )}
                  
                  {request.status === "acceptée" && (


<div className="flex justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setConfirmAction('annulée');
                        }}
                        className="flex-1 bg-red-50 py-2 px-4 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaHeartCircleXmark /> Annulée
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setConfirmAction('complétée');
                        }}
                        className="flex-1 bg-green-50 py-2 px-4 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <BiDonateHeart /> Completéé
                      </button>
                    </div>
                  )}
                  
                  {request.status === "rejetée" && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-red-700 flex items-center gap-2">
                      <FaThumbsDown />
                      <span>Cette demande a été rejetée</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-lg text-gray-600">
              {activeTab === 'pending' ? 
                "Aucune demande en attente pour votre centre." : 
                activeTab === 'accepted' ? 
                  "Aucune demande acceptée pour votre centre." : 
                  "Aucune demande rejetée pour votre centre."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}