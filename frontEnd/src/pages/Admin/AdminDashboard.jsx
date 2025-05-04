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
import ManageUsers from "./ManageUsers";

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
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des statistiques...</p>
      </div>
    </div>
    )
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

          <ManageUsers />


      </div>
  );
}
