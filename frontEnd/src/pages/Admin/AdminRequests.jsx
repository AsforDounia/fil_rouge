import React, { useEffect, useState } from 'react';
import {
    FaMapMarkerAlt, FaUser, FaTint, FaCheckCircle,
    FaInfoCircle, FaExclamationCircle, FaTrashAlt,
    FaPlus, FaFilter, FaChevronDown, FaHospital
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRequest } from '../../Context/RequestContext';
import { useCenter } from '../../Context/CenterContext';
import AddRequestForm from '../../Components/DashboardSharedComponents/AddRequestForm';

export default function AdminRequests() {

    const { requests, getAllRequest , deleteRequest , createRequest } = useRequest();
    const {allCenters , getAllCentres} = useCenter();
    const [activeTab, setActiveTab] = useState('all');
    const [allrequests, setAllRequests] = useState([]);
    const [loading, setLoading] = useState(true);





    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({
        bloodGroup: '',
        urgency: '',
        centre: '',
        component: '',
        status:''
    });



    const [tabCounts, setTabCounts] = useState({
        all: 0,
        urgent: 0,
        normal: 0,
    });

    useEffect(() => {

        const fetchRequest = async()=>{
            await getAllRequest();
            await getAllCentres();
        }
        fetchRequest();

        setLoading(false);
        
    }, []);

    useEffect(() => {
        if(requests){
            setAllRequests(requests);
            setTabCounts({
                all: requests.length,
                urgent: requests.filter(req => req.urgency === 'Urgent').length,
                normal: requests.filter(req => req.urgency === 'Normal').length,

            });
        }
    },[requests]);




    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handeleDeleteRequest = async(id) => {
        try{
            await deleteRequest(id);
            setShowDeleteConfirm(false);
        }
        catch(error){
            console.error(error);
            
        }
    };


    const getVisibleRequests = () => {
        if (!allrequests) return [];

        return allrequests.filter(request => {

            if (activeTab === 'urgent' && request.urgency !== "Urgent") {
                return false;
            }
            if (activeTab === 'normal' && request.urgency !== "Normal") {
                return false;
            }


            if (filters.bloodGroup && request.blood_group !== filters.bloodGroup) {
                return false;
            }
            if (filters.urgency && request.urgency !== filters.urgency) {
                return false;
            }
            if (filters.centre && request.centre.id !== parseInt(filters.centre)) {
                return false;
            }
            if (filters.component && request.component !== filters.component) {
                return false;
            }
            if (filters.status && request.status !== filters.status) {
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

    if (loading || !allCenters) {
        return (
            <div className="p-8 w-full flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
              <p className="text-lg">Chargement des demandes...</p>
            </div>
          </div>
        );
    }

    return (
        <div className="p-8 w-full">
            <div className="flex border-b border-gray-200 mb-6">
                <div
                    className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'all' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
                    onClick={() => setActiveTab('all')}
                >
                    Toutes les demandes <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.all}</span>
                </div>
                <div
                    className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'urgent' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
                    onClick={() => setActiveTab('urgent')}
                >
                    Urgentes <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.urgent}</span>
                </div>
                <div
                    className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === 'normal' ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
                    onClick={() => setActiveTab('normal')}
                >
                    Normales <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts.normal}</span>
                </div>
               
            </div>

            {/* Filter Controls */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
                    <h3 className="text-xl font-semibold text-[#4A1E1F]">Filtrer les demandes</h3>
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center gap-1 text-[#1A4B4C]"
                    >
                        <FaFilter /> Filtres <FaChevronDown className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
                </div>
                {filtersOpen && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <select
                                name="bloodGroup"
                                value={filters.bloodGroup}
                                onChange={handleFilterChange}
                                className="p-3 border border-gray-200 rounded-lg text-base"
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
                                className="p-3 border border-gray-200 rounded-lg text-base"
                            >
                                <option value="">Toutes les urgences</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Normal">Normal</option>
                            </select>
                            <select
                                name="centre"
                                value={filters.centre}
                                onChange={handleFilterChange}
                                className="p-3 border border-gray-200 rounded-lg text-base"
                            >
                                <option value="">Tous les centers</option>
                                {allCenters.map(centre => (
                                    <option key={centre.id} value={centre.id}>{centre.name}</option>
                                ))}
                            </select>
                            <select
                                name="component"
                                value={filters.component}
                                onChange={handleFilterChange}
                                className="p-3 border border-gray-200 rounded-lg text-base"
                            >
                                <option value="">Tous les composants</option>
                                <option value="Sang total">Sang total</option>
                                <option value="Plaquettes">Plaquettes</option>
                                <option value="Plasma">Plasma</option>
                                <option value="Globules">Globules</option>
                            </select>
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="p-3 border border-gray-200 rounded-lg text-base"
                            >
                                <option value="">Tous les status</option>
                                <option value="en_attente">En Attente</option>
                                <option value="complétée">Complétée</option>
                                <option value="rejetée">Rejetée</option>
                            </select>
                        </div>
   
                    </div>
                )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visibleRequests.map(request => {
                    const urgencyDisplay = getUrgencyDisplay(request.urgency);
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
                                    <span className={`text-sm py-1 px-2 rounded-full font-medium ${request.status == "en_attente" ? (
                                        "bg-blue-200"):(request.status == "rejetée")?("bg-red-200"):("bg-green-200")
                                    }`}>
                                        {request.status}
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-[#8B2326] bg-[#8B2326]/10 p-2 rounded-lg min-w-[3rem] text-center">
                                    {request.blood_group}
                                </div>
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="text-lg font-medium text-[#4A1E1F] mb-2">{request.centre.name}</h3>

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
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedRequest(request);
                                            setShowDeleteConfirm(true);
                                        }}
                                        className="bg-[#8B2326] text-white border-none px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors hover:bg-[#4A1E1F]"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
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


            {/* Delete Confirmation Modal */}
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
                                Êtes-vous sûr de vouloir supprimer cette demande de don de sang {selectedRequest.blood_group} ?
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

            {/* Empty State */}
            {allrequests.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <FaHospital className="w-16 h-16 text-[#1A4B4C] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#4A1E1F] mb-2">Aucune demande de don</h3>
                    <p className="text-gray-600 mb-4">
                        Il n'y a actuellement aucune demande de don de sang. Créez une nouvelle demande pour commencer.
                    </p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-3 bg-[#1A4B4C] text-white rounded-lg hover:bg-[#40898A] transition-colors inline-flex items-center gap-2"
                    >
                        <FaPlus /> Nouvelle demande
                    </button>
                </div>
            )}
        </div>
    );
}