import { useEffect, useState } from 'react';
import {
    FaMapMarkerAlt,
    FaArrowRight,
    FaCalendarDay,
    FaCalendarPlus,
    FaHeartbeat
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FaHeartCircleExclamation } from "react-icons/fa6";
import { useCentreManager } from '../../Context/CentreManagerContext';
import { useAppointment } from '../../Context/AppointmentContext';


const ManagerDashboard = () => {

    const { fetchStats, stats } = useCentreManager();
    const { updateAppointemt } = useAppointment();
    useEffect(() => {
        const fetchData = async () => {
            await fetchStats();
        }
        fetchData();
    }, [fetchStats]);

    if (!stats) {
        return <div>charegement...</div>
    }


    const handleAppointemt = async (id, status) => {
        try {
      
            const data = {'status' : status }
            await updateAppointemt(id, data);
            await fetchStats();
        } catch (error) {
            toast.error(error);
        }
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-turquoise hover:border-wine">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-wine/10">
                            <FaHeartCircleExclamation className="text-xl text-wine" />
                        </div>
                        <button className="border-none cursor-pointer text-wine hover:text-burgundy">
                            <FaArrowRight />
                        </button>
                    </div>
                    <h3 className="text-lg font-semibold text-burgundy">Stocks critiques de groupe sanguin</h3>
                    <p className="mt-2 text-darkteal">A+</p>
                </div>

                <div className="bg-burgundy rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-teal hover:border-cream">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-cream/10">
                            <FaCalendarDay className="text-xl text-cream" />
                        </div>
                        <button className="border-none cursor-pointer text-cream">
                            <FaArrowRight />
                        </button>
                    </div>

                    <h3 className="text-lg font-semibold text-cream">Planifier un Événements</h3>
                    <p className="mt-2 text-cream text-opacity-70"> événements à venir</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-turquoise hover:border-wine">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-teal/10">
                            <FaMapMarkerAlt className="text-xl text-teal" />
                        </div>
                        <button className="border-none cursor-pointer text-teal">
                            <FaArrowRight />
                        </button>
                    </div>
                    <h3 className="text-lg font-semibold text-burgundy">Total des rendez-vous d'aujourd'huit</h3>
                    <p className="mt-2 text-darkteal">{stats.todayAppointments ? stats.todayAppointments.length : 0}</p>
                </div>

                <div className="bg-burgundy rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-teal hover:border-cream">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-cream/10">
                            <FaCalendarDay className="text-xl text-cream" />
                        </div>
                        <button className="border-none cursor-pointer text-cream">
                            <FaArrowRight />
                        </button>
                    </div>
                    <h3 className="text-lg font-semibold text-cream">Total des Événements à venir</h3>
                    <p className="mt-2 text-cream text-opacity-70"> {stats.upcomingEvents ? stats.upcomingEvents.length : 0} </p>
                </div>
            </div>

            <div className="p-6 pl-0 border-b border-gray-200 relative mt-8">
                <h3 className="text-xl font-semibold text-burgundy">Les événements d'aujourd'hui</h3>
            </div>
            <div className="max-h-160 overflow-auto bg-white shadow rounded-lg">

            <table className="w-full table-auto ">
  <thead className="bg-burgundy text-white">
    <tr>
      <th className="p-4 text-left">Donneur Name</th>
      <th className="p-4 text-left">Type de Don</th>
      <th className="p-4 text-left">Date</th>
      <th className="p-4 text-left">Heure</th>
      <th className="p-4 text-center w-[160px]" colSpan={2}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {stats.todayAppointments && stats.todayAppointments.map((appointment) => (
      <tr key={appointment.id} className="border-b hover:bg-gray-50">
        <td className="p-4">{appointment.donor.name}</td>
        <td className="p-4">{appointment.type_don}</td>
        <td className="p-4">{new Date(appointment.appointment_date).toISOString().slice(0, 10)}</td>
        <td className="p-4">{appointment.appointment_time}</td>

        {(() => {
          const [hours, minutes, seconds] = appointment.appointment_time.split(':').map(Number);
          const now = new Date();
          const appointmentTime = new Date(now);
          appointmentTime.setHours(hours, minutes, seconds, 0);
          const nowPlus20Min = new Date(now.getTime() + 20 * 60 * 1000); // 🔥 ici j'ai corrigé !

          return appointmentTime < nowPlus20Min ? (
            <>
              <td className='text-center'>
                <button
                  onClick={() => handleAppointemt( appointment.id , 'effectuée')}
                  className='text-green-600 bg-green-200 rounded-2xl px-2 py-1 cursor-pointer'>
                  Effectuée
                </button>
              </td>
              <td className='text-center'>
                <button
                  onClick={() => handleAppointemt( appointment.id , 'annulée')}
                  className='text-red-600 bg-red-200 rounded-2xl px-2 py-1 cursor-pointer'>
                  Annulée
                </button>
              </td>
            </>
          ) : (
            <>
              <td></td>
              <td className='text-center'>
                <button
                  onClick={() => handleAppointemt( appointment.id , 'annulée')}
                  className='text-red-600 bg-red-200 rounded-2xl px-2 py-1 cursor-pointer'>
                  Annulée
                </button>
              </td>
            </>
          );
        })()}
      </tr>
    ))}
  </tbody>
</table>

            </div>
        </>
    )
};

export default ManagerDashboard;