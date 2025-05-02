import React, { useEffect, useState } from 'react';
import { FaUser, FaTint, FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaFilter, FaCalendarAlt, FaClock, FaEllipsisV, FaVial } from 'react-icons/fa';
import { FaHeartCircleCheck, FaHeartCircleXmark } from 'react-icons/fa6';
import { useDonation } from '../../Context/DonationContext';

export default function CentreDonationsTable() {
  const [activeTab, setActiveTab] = useState('all');
  const { donations, getCentreDonations, updateDonationStatus: updateDonationStatusInContext } = useDonation();
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    status: '',
    date: ''
  });
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    scheduled: 0,
    completed: 0,
    canceled: 0,
    noshow: 0
  });

  useEffect(() => {
    const fetchDonations = async() => {
      setLoading(true);
      try {
        await getCentreDonations();
      } catch (error) {
        console.error("Erreur lors du chargement des dons:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [getCentreDonations]);

  const updateDonationStatus = async (donationId, newStatus) => {
    try {
      setLoading(true);
      await updateDonationStatusInContext(donationId, newStatus);
      console.log(`Le statut du don a été mis à jour avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const calculateTabCounts = (data) => {
    if (!data || !Array.isArray(data)) return;
    
    const counts = {
      all: data.length,
      scheduled: data.filter(don => don.status === "programmée").length,
      completed: data.filter(don => don.status === "complétée").length,
      canceled: data.filter(don => don.status === "annulée").length,
      noshow: data.filter(don => don.status === "non_présenté").length,
    };
    
    setTabCounts(counts);
  };
  
  useEffect(() => {
    if (donations && Array.isArray(donations)) {
      calculateTabCounts(donations);
    }
  }, [donations]);
  
  if (loading && !donations) {
    return <div className="p-8 w-full flex justify-center items-center">Chargement...</div>;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const getVisibleDonations = () => {
    if (!donations || !Array.isArray(donations)) return [];

    let filteredDonations = [...donations];

    if (filters.bloodGroup) {
      filteredDonations = filteredDonations.filter(donation =>
        donation.blood_group === filters.bloodGroup
      );
    }
    
    return filteredDonations;
  };

  const visibleDonations = getVisibleDonations();



  return (
    <div className="p-8 w-full ">

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
          <h3 className="text-xl font-semibold text-burgundy">
            <FaFilter className="inline-block mr-2" /> Filtrer les dons
          </h3>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal to-[#8B2326]"></div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <select 
              name="bloodGroup"
              value={filters.bloodGroup}
              onChange={handleFilterChange}
              className="p-3 border border-gray-200 rounded-lg text-base w-64"
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
          </div>
        </div>
      </div>

      {/* Table of Donations */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donneur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Groupe Sanguin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de Don
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantitie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visibleDonations && visibleDonations.length > 0 ? (
                visibleDonations.map((donation) => {
                  
                  return (
                    <tr key={donation.id} className={`hover:bg-gray-50`}>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <FaUser className="h-4 w-4 text-teal" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{donation.donor.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-bold text-[#8B2326] bg-[#8B2326]/10 p-2 rounded-lg text-center w-12">
                          {donation.blood_group}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaTint className="h-4 w-4 text-teal mr-2" />
                          <span className="text-sm text-gray-900">{donation.type_don}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaVial className="h-4 w-4 text-wine mr-2" />
                          <span className="text-sm text-gray-900">{donation.quantity}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCalendarAlt className="h-4 w-4 text-teal mr-2" />
                          <span className="text-sm text-gray-900">
                            {donation.donation_date}
                          </span>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center">
                    <p className="text-lg text-gray-600">
                      {activeTab === 'scheduled' ? 
                        "Aucun don programmé pour votre centre." : 
                        activeTab === 'completed' ? 
                          "Aucun don complété pour votre centre." : 
                          activeTab === 'canceled' ?
                            "Aucun don annulé pour votre centre." :
                            activeTab === 'noshow' ?
                              "Aucun donneur non présenté pour votre centre." :
                              "Aucun don trouvé avec les filtres sélectionnés."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}