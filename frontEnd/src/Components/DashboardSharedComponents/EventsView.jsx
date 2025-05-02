import React, { useEffect, useState } from 'react';
import { FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from "react-toastify";

import { useAuth } from '../../Context/AuthContext';
import { useEvent } from '../../Context/EventContext';
import AddEventModal from './AddEventModal';
import EditEventModal from '../../pages/Centre/EditEventModal';

const EventsView = () => {
  const { hasRole, user, getUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCenter, setIsCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { events, getAllEvent, deleteEvent } = useEvent();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [tabCounts, setTabCounts] = useState({ all: 0, my: 0 });

  const uniqueLocations = events ? [...new Set(events.map(event => event.centre ? event.centre.name : "Inconnu"))] : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getAllEvent();
        await getUser();
        const admin = await hasRole(["admin"]);
        const centre = await hasRole(["centre_manager"]);
        setIsAdmin(admin);
        setIsCenter(centre);
      } catch (error) {
        console.error("Erreur de récupération des événements:", error);
        toast.error("Erreur : " + (error.message || "Erreur inconnue"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!events) return;

    let result = [...events];
    const myEvents = result.filter(event => event.centre_id === user.id);

    setTabCounts({
      all: result.length,
      my: myEvents.length,
    });

    if (searchTerm) {
      result = result.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.centre?.address && event.centre.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.centre?.name && event.centre.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (locationFilter) {
      result = result.filter(event => event.centre?.name === locationFilter);
    }

    if (activeTab === "my") {
      result = result.filter(event => event.centre_id === user.id);
    }

    setFilteredEvents(result);
  }, [events, searchTerm, locationFilter, activeTab, user.id]);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setShowDeleteConfirm(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Erreur suppression événement:", error);
      toast.error("Erreur suppression: " + (error.message || "Erreur inconnue"));
    }
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setShowDeleteConfirm(true);
  };
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setActiveTab('all');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  const displayEvents = filteredEvents.length > 0 || searchTerm || locationFilter || activeTab !== 'all' ? filteredEvents : events;

  return (
    <section className="py-16 px-4">

      {showAddModal && <AddEventModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />}
    
    {showEditModal && <EditEventModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} eventToEdit = {selectedEvent}/>}

      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-[#40898A] text-white rounded-lg hover:bg-[#306e6e] transition-colors"
        >
          Ajouter Événement
        </button>
      </div>

      {isCenter && (
        <div className="flex border-b border-gray-200 mb-6">
          {["all", "my"].map(tab => (
            <div
              key={tab}
              className={`px-6 py-4 cursor-pointer text-[#1A4B4C] border-b-2 ${activeTab === tab ? 'border-[#8B2326] text-[#4A1E1F] font-medium' : 'border-transparent'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all" ? "Tous" : "Mes Événements"}
              <span className="bg-gray-200 text-[#1A4B4C] text-xs py-0.5 px-1.5 rounded-full ml-2">{tabCounts[tab]}</span>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md w-2/3">
            <input
              type="text"
              placeholder="Rechercher des événements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40898A]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="w-1/3">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40898A]"
            >
              <option value="">Toutes les localisations</option>
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg transition-colors cursor-pointer hover:bg-gray-200"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          {displayEvents?.length} événement{displayEvents?.length !== 1 ? 's' : ''} trouvé{displayEvents?.length !== 1 ? 's' : ''}
        </div>

        <div className={`grid grid-cols-1 gap-8 ${displayEvents.length === 2 ? 'md:grid-cols-2' : displayEvents.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-1'}`}>
          {displayEvents && displayEvents.length > 0 ? (
            displayEvents.map((event, index) => (
              <div key={index} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1">
                {(isAdmin || (isCenter && event.centre_id === user.id)) && (
                  <div className="flex justify-end space-x-2 p-4">
                    <button onClick={() => openDeleteModal(event)} className="hover:text-red-600">
                      <FaTrash />
                    </button>
                    <button onClick={() => openEditModal(event)} className="hover:text-green-600">
                      <FaEdit />
                    </button>
                  </div>
                )}
                <img
                  src={event.localisation?.user?.profile_image ? `http://127.0.0.1:8000/storage/${event.localisation.user.profile_image}` : '/images/event.png'}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 py-0">
                  <span className="inline-block px-3 py-1 bg-cream text-burgundy rounded text-sm mb-4">
                    {event.date || "Pas de date"}
                  </span>
                  <div className="mb-2 text-teal font-medium">
                    <span className="text-burgundy">Centre :</span> {event.centre?.name || "Inconnu"}
                  </div>
                  <div className="mb-2 text-teal font-medium">
                    <span className="text-burgundy">Adresse :</span> {event.centre?.address || "Inconnue"}
                  </div>
                  <h3 className="text-xl text-burgundy mb-4">{event.title || "Événement sans titre"}</h3>
                </div>
                <div className="flex-1 p-6 pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description ? `${event.description.substring(0, 120)}${event.description.length > 120 ? '...' : ''}` : "Pas de description disponible"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">Aucun événement trouvé</p>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && selectedEvent && (
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]" />
            </div>
            <div className="p-6">
              <p className="mb-6 text-gray-700">
                Êtes-vous sûr de vouloir supprimer l'événement "{selectedEvent.title}" ? Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(selectedEvent.id)}
                  className="px-4 py-2 bg-[#8B2326] text-white rounded-lg hover:bg-[#4A1E1F] transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsView;
