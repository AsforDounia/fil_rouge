import { useEffect, useState } from 'react';
import { FaCalendarDay, FaArrowRight, FaUserClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCentreManager } from '../../Context/CentreManagerContext';
import { useAppointment } from '../../Context/AppointmentContext';

const CentreAppointments = () => {

  const { updateAppointemt , getCentreAppointements , centreAppointments } = useAppointment();
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'upcoming', 'past'
  
  useEffect(() => {
    const fetchData = async () => {
      await getCentreAppointements();
    };
    fetchData();
  }, []);

  console.log(centreAppointments);
  if (!centreAppointments) {
    return <div>Chargement...</div>;
  }

  const handleAppointment = async (id, status) => {
    try {
      const data = { 'status': status };
      await updateAppointemt(id, data);
      await getCentreAppointements();
      toast.success(`Rendez-vous ${status} avec succès`);
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    }
  };

  // Get today's date for filtering
  const today = new Date().toISOString().slice(0, 10);

  // Filter appointments based on selected filter
  const getFilteredAppointments = () => {
    if (!centreAppointments || !centreAppointments.todayAppointments) return [];
    
    switch (filter) {
      case 'today':
        return centreAppointments.todayAppointments;
      case 'upcoming':
        // This would need to be expanded with actual upcoming appointments data
        return centreAppointments.upcomingAppointments || [];
      case 'past':
        // This would need to be expanded with actual past appointments data
        return centreAppointments.pastAppointments || [];
      default:
        return centreAppointments.todayAppointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-turquoise hover:border-wine">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-teal/10">
              <FaCalendarDay className="text-xl text-teal" />
            </div>
            <button className="border-none cursor-pointer text-teal">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-burgundy">Rendez-vous d'aujourd'hui</h3>
          <p className="mt-2 text-darkteal">{centreAppointments.todayAppointments ? centreAppointments.todayAppointments.length : 0}</p>
        </div>

        <div className="bg-burgundy rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-teal hover:border-cream">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-cream/10">
              <FaUserClock className="text-xl text-cream" />
            </div>
            <button className="border-none cursor-pointer text-cream">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-cream">Rendez-vous à venir</h3>
          <p className="mt-2 text-cream text-opacity-70">{centreAppointments.upcomingAppointments ? centreAppointments.upcomingAppointments.length : 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-turquoise hover:border-wine">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-wine/10">
              <FaCalendarDay className="text-xl text-wine" />
            </div>
            <button className="border-none cursor-pointer text-wine hover:text-burgundy">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-burgundy">Rendez-vous passés</h3>
          <p className="mt-2 text-darkteal">{centreAppointments.pastAppointments ? centreAppointments.pastAppointments.length : 0}</p>
        </div>
      </div>

      <div className="flex justify-between items-center p-6 pl-0 border-b border-gray-200 relative mt-8">
        <h3 className="text-xl font-semibold text-burgundy">Gestion des rendez-vous</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Tous
          </button>
          <button 
            onClick={() => setFilter('today')}
            className={`px-4 py-2 rounded-lg ${filter === 'today' ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Aujourd'hui
          </button>
          <button 
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg ${filter === 'upcoming' ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            À venir
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg ${filter === 'past' ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Passés
          </button>
        </div>
      </div>

      <div className="max-h-160 overflow-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-burgundy text-white">
            <tr>
              <th className="p-4 text-left">Donneur</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Heure</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Statut</th>
              <th className="p-4 text-center w-[160px]" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments && filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{appointment.donor.name}</td>
                <td className="p-4">{new Date(appointment.appointment_date).toISOString().slice(0, 10)}</td>
                <td className="p-4">{appointment.appointment_time}</td>
                <td className="p-4">{appointment.appointment_type || "Don de sang"}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-lg text-sm ${
                    appointment.status === 'effectuée' ? 'bg-green-200 text-green-800' :
                    appointment.status === 'annulée' ? 'bg-red-200 text-red-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {appointment.status || "En attente"}
                  </span>
                </td>
                {(() => {
                  const [hours, minutes, seconds] = appointment.appointment_time.split(':').map(Number);
                  const now = new Date();
                  const appointmentTime = new Date(now);
                  appointmentTime.setHours(hours, minutes, seconds, 0);
                  const nowPlus20Min = new Date(now.getTime() + 20 * 60 * 1000);

                  // Only show action buttons for upcoming or today's appointments that haven't been marked as completed or cancelled
                  if (appointment.status !== 'effectuée' && appointment.status !== 'annulée') {
                    return appointmentTime < nowPlus20Min ? (
                      <>
                        <td className='text-center'>
                          <button
                            onClick={() => handleAppointment(appointment.id, 'effectuée')}
                            className='text-green-600 bg-green-200 rounded-2xl px-2 py-1 cursor-pointer hover:bg-green-300'>
                            Effectuée
                          </button>
                        </td>
                        <td className='text-center'>
                          <button
                            onClick={() => handleAppointment(appointment.id, 'annulée')}
                            className='text-red-600 bg-red-200 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-300'>
                            Annulée
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                        <td className='text-center'>
                          <button
                            onClick={() => handleAppointment(appointment.id, 'annulée')}
                            className='text-red-600 bg-red-200 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-300'>
                            Annulée
                          </button>
                        </td>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <td colSpan={2} className="text-center text-gray-500">
                          {appointment.status === 'effectuée' ? 'Rendez-vous effectué' : 'Rendez-vous annulé'}
                        </td>
                      </>
                    );
                  }
                })()}
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Aucun rendez-vous trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CentreAppointments;