import React, { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaTint, 
  FaHospital, 
  FaCalendarAlt, 
  FaBell, 
  FaUserShield, 
  FaChartBar, 
  FaSearch, 
  FaClipboardCheck, 
  FaExclamationTriangle,
  FaCalendarPlus,
  FaMapMarkerAlt,
  FaUserPlus,
  FaListAlt,
  FaProcedures
} from "react-icons/fa";
import { useAdmin } from "../../Context/AdminContext";

export default function AdminDashboard() {
  const {statistics , getStatistics} = useAdmin();
  useEffect(()=>{
    const fetchStats = async() => {
      try{
        await getStatistics();
      }
      catch(error){
        console.error(error);
      }
    }
    fetchStats();
  },[]);

  if(!statistics){
    return <div>loading...</div>
  }
  return (
      <div className="">


          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-wine">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Donneurs</p>
                  <h3 className="text-3xl font-bold text-burgundy mt-2">{statistics.donorsCount}</h3>
                </div>
                <div className="bg-wine/10 p-3 rounded-full">
                  <FaUsers className="text-wine text-xl" />
                </div>
              </div>

            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-darkteal">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <h3 className="text-3xl font-bold text-burgundy mt-2">{statistics.patientsCount}</h3>
                </div>
                <div className="bg-teal/30 p-3 rounded-full">
                  <FaProcedures className="text-teal text-xl" />
                </div>
              </div>
     
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-wine">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Centers</p>
                  <h3 className="text-3xl font-bold text-burgundy mt-2">{statistics.centresCount}</h3>
                </div>
                <div className="bg-wine/10 p-3 rounded-full">
                  <FaCalendarAlt className="text-wine text-xl" />
                </div>
              </div>
   
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-darkteal">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Rendez-vous Aujourd'hui</p>
                  <h3 className="text-3xl font-bold text-burgundy mt-2">{statistics.appointmentsToday}</h3>
                </div>
                <div className="bg-teal/30 p-3 rounded-full">
                  <FaExclamationTriangle className="text-teal text-xl" />
                </div>
              </div>
   
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-darkteal rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="bg-teal/30 p-3 rounded-full">
                  <FaUserPlus className="text-teal text-xl" />
                </div>
                <button className="text-teal hover:text-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg font-semibold text-burgundy">Ajouter User</h3>
              <p className="text-teal text-sm mt-1">Enregistrer un nouveau user</p>
            </div>
            
            <div className="bg-burgundy border border-teal rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="bg-cream/40 p-3 rounded-full">
                  <FaTint className="text-cream text-xl" />
                </div>
                <button className="text-cream hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg font-semibold text-cream">Ajouter Stock</h3>
              <p className="text-cream/70 text-sm mt-1">Enregistrer du nouveau sang</p>
            </div>
            
            <div className="bg-white border border-darkteal rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="bg-teal/30 p-3 rounded-full">
                  <FaCalendarPlus className="text-wine text-xl" />
                </div>
                <button className="text-teal hover:text-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg font-semibold text-burgundy">Programmer Collecte</h3>
              <p className="text-teal text-sm mt-1">Planifier un événement</p>
            </div>
            
            <div className="bg-burgundy border border-teal rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="bg-cream/40 p-3 rounded-full">
                  <FaListAlt className="text-cream text-xl" />
                </div>
                <button className="text-cream hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg font-semibold text-cream">Génerer Rapport</h3>
              <p className="text-white/70 text-sm mt-1">Créer un rapport détaillé</p>
            </div>
          </div>


      </div>
  );
}
