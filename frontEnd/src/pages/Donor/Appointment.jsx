import {
  FaPlus,
  FaCalendar,
  FaHistory,
  FaClock,
  FaTrophy,
  FaArrowRight,
  FaEdit,
  FaTimes,
  FaTrash
  
} from 'react-icons/fa';
import { useDonor } from '../../Context/DonorContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAppointment } from '../../Context/AppointmentContext';


export default function Appointment() {

  const {getAppointmentsStats , appointmentsStats} = useDonor();
  const [loading , setLoading] = useState(true);

  const {deleteAppointment} = useAppointment();

  useEffect(()=>{
    const fetchStats = async () => {
      try{
        await getAppointmentsStats();
      }
      catch (error) {
        toast.error('Error fetching appointment stats:', error);
      }finally{
        setLoading(false);
      }
    }
    fetchStats();
  },[])


  const handeleDelete = async (id) => {
    try{
      await deleteAppointment(id);
      await getAppointmentsStats();
    }catch(error){
      console.error(error);
    }
  }
  if(loading){
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des rendez-vous...</p>
      </div>
    </div>
    )

}


  return (
    <>
      {/* Header */}
      <div className="flex justify-end mb-8">
        <Link to="/donneur/new-appointment" className="flex items-center gap-1 bg-wine text-white py-2 px-4 rounded-lg border hover:opacity-90 cursor-pointer">
          <FaPlus /> <span> Nouveau Rendez-vous</span>
        </Link>
      </div>

      {/* Cartes de résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border p-6 rounded-lg shadow">
          <div className="flex justify-between">
            <div className="p-3 rounded-full bg-[rgba(26,75,76,0.2)] text-teal">
              <FaCalendar />
            </div>
            <button className="text-teal hover:text-burgundy ">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="font-semibold text-lg mt-4 text-burgundy ">Prochain RDV</h3>
          <p className="mt-1 text-[rgba(74,30,31,0.7)]">{appointmentsStats.next_appointment_date ? appointmentsStats.next_appointment_date.slice(0, 10) : 'Aucun rendez-vous trouvé'}</p>
          <p className="mt-1 text-[rgba(74,30,31,0.7)]">{appointmentsStats.next_appointment_time ? appointmentsStats.next_appointment_time.slice(0, 5) : ''}</p>
         
        </div>
        <div className="bg-burgundy  border p-6 rounded-lg shadow">
          <div className="flex justify-between">
            <div className="p-3 rounded-full bg-[rgba(214,195,168,0.2)] text-cream">
              <FaHistory />
            </div>
            <button className="text-cream hover:text-teal">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="font-semibold text-lg mt-4 text-cream">Dernier Don</h3>
          <p className="mt-1 text-[rgba(214,195,168,0.7)]">{appointmentsStats.last_donation_date ? (appointmentsStats.last_donation_date): "aucune don trouve"}</p>
        </div>
        <div className="bg-white border p-6 rounded-lg shadow">
          <div className="flex justify-between">
            <div className="p-3 rounded-full bg-[rgba(26,75,76,0.2)] text-teal">
              <FaClock />
            </div>
            <button className="text-teal hover:text-burgundy ">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="font-semibold text-lg mt-4 text-burgundy ">Temps Restant</h3>
          <p className="mt-1 text-[rgba(74,30,31,0.7)]">{appointmentsStats.time_remaining} jours</p>
        </div>
        <div className="bg-burgundy  border p-6 rounded-lg shadow">
          <div className="flex justify-between">
            <div className="p-3 rounded-full bg-[rgba(214,195,168,0.2)] text-cream">
              <FaTrophy />
            </div>
            <button className="text-cream hover:text-teal">
              <FaArrowRight />
            </button>
          </div>
          <h3 className="font-semibold text-lg mt-4 text-cream">Total Dons</h3>
          <p className="mt-1 text-[rgba(214,195,168,0.7)]">{appointmentsStats.total_donations} dons</p>
        </div>
      </div>

      {/* Prochains rendez-vous */}
      <div className='rounded-lg shadow-lg overflow-hidden mb-8'>
      <div className="h-1 mb-6 bg-gradient-to-r from-teal to-wine "></div>
      
      {/* Upcoming Appointments Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-burgundy px-4">Prochains Rendez-vous</h2>
        <div className="space-y-4">
        <div className="space-y-4 max-h-80 overflow-auto">
        {appointmentsStats.upcoming_appointments && appointmentsStats.upcoming_appointments.length > 0 ? (
  appointmentsStats.upcoming_appointments.map((appointment) => {
    let statusColor = "";
    let statusText = "";

    switch (appointment.status) {
      case "confirmée":
        statusColor = "bg-[#40898A33] text-teal";
        statusText = "Confirmée";
        break;
      case "annulée":
        statusColor = "bg-gray-200 text-gray-600";
        statusText = appointment.status;
        break;
      default:
        statusColor = "bg-gray-200 text-gray-600";
        statusText = appointment.status;
    }

    return (
      <div
        key={appointment.id}
        className="flex items-center justify-between p-4 border border-[#d6c3a85c] mx-4 rounded-lg"
      >
        <div className="flex items-center">
          <div className="rounded-full p-2 mr-4 bg-burgundy">
            <FaCalendar size={18} className="text-cream" />
          </div>
          <div>
            <p className="text-gray-600">{appointment.date}</p>
            <p className="text-sm text-gray-500">{appointment.appointment_time}</p>
            <p className="text-sm text-gray-600">{appointment.centre.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-6">
          <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
            {statusText}
          </span>
          {appointment.status !== 'annulée' && (
            <div className="flex space-x-1">
              {/* <button className="text-teal">
                <FaEdit size={16} />
              </button> */}
              <button onClick={ () => handeleDelete(appointment.id)} className="text-wine cursor-pointer ">
                <FaTrash size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  })
) : (
  <p className="mt-1 px-8 text-[rgba(74,30,31,0.7)]">Aucun rendez-vous trouvé</p>
)}
</div>

          

        </div>
      </div>
      
      </div>

    

      {/* Historique */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-[rgba(74,30,31,0.1)]">
          <h3 className="text-lg font-semibold text-burgundy ">Historique des Rendez-vous</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[rgba(26,75,76,0.1)]">
              <tr>
                <th className="px-6 py-3 text-left uppercase text-burgundy ">Date</th>
                <th className="px-6 py-3 text-left uppercase text-burgundy ">Centre</th>
                <th className="px-6 py-3 text-left uppercase text-burgundy ">Type</th>
                <th className="px-6 py-3 text-left uppercase text-burgundy ">Statut</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsStats.appHistory && appointmentsStats.appHistory.map((appointment) => { let statusColor = "";
                  let statusText = "";

                  switch (appointment.status) {
                    case "en_attente":
                      statusColor = "bg-blue-200 text-blue-800";
                      statusText = "En attente";
                      break;
                    case "confirmée":
                      statusColor = "bg-[#40898A33] text-teal";
                      statusText = "Confirmée";
                      break;
                    case "annulée":
                      statusColor = "bg-gray-200 text-gray-600";
                      statusText = appointment.status;
                  }

                return(
              <tr className="border-b">
                <td className="px-6 py-4">{appointment.date}</td>
                <td className="px-6 py-4">{appointment.centre.name}</td>
                <td className="px-6 py-4">Don de {appointment.type_don}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
                    {statusText}
                  </span>
              
                </td>
              </tr>

              );
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
