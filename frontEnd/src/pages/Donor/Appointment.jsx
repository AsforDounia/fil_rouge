import React from "react";


const Appointment = () => {
  return (
    <div className="main-content">
      {/* Top Bar */}
      <div className="top-bar flex justify-between items-center mb-8">
        <div>
          <h2 className="page-title text-xl font-bold text-[#8B2326]">Mes Rendez-vous</h2>
          <p className="page-subtitle text-[#1A4B4C] opacity-90">Gérez vos rendez-vous de don</p>
        </div>
        <button className="btn-primary bg-[#8B2326] text-white py-2 px-4 rounded-md border border-[#4A1E1F1A] hover:opacity-90">
          <i className="fas fa-plus mr-2"></i> Nouveau Rendez-vous
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1 */}
        <div className="action-card p-6 rounded-md shadow-md border border-[#4A1E1F1A]">
          <div className="card-header flex justify-between items-start">
            <div className="icon-container p-3 rounded-full bg-[#1A4B4C33]">
              <i className="fas fa-calendar icon-teal text-[#40898A] text-xl"></i>
            </div>
            <button className="arrow-right text-[#40898A] hover:text-[#4A1E1F]">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <h3 className="card-title mt-4 font-semibold text-lg text-[#4A1E1F]">Prochain RDV</h3>
          <p className="card-subtitle text-[#4A1E1FB3]">20 Mars 2024</p>
        </div>

        {/* Card 2 */}
        <div className="action-card action-card-dark p-6 rounded-md shadow-md bg-[#4A1E1F] border border-[#D6C3A81A]">
          <div className="card-header flex justify-between items-start">
            <div className="icon-container p-3 rounded-full bg-[#D6C3A833]">
              <i className="fas fa-history icon-beige text-[#D6C3A8] text-xl"></i>
            </div>
            <button className="arrow-right arrow-right-light text-[#D6C3A8] hover:text-[#40898A]">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <h3 className="card-title mt-4 font-semibold text-lg text-[#D6C3A8]">Dernier Don</h3>
          <p className="card-subtitle subtitle-light text-[#D6C3A8B3]">15 Février 2024</p>
        </div>

        {/* Repeat other two cards similarly... */}
      </div>

      {/* Upcoming Appointments */}
      <div className="upcoming-appointments grid grid-cols-1 gap-6 mb-6">
        <div className="card card-burgundy bg-[#4A1E1F] border border-[#D6C3A81A] rounded-md shadow-md">
          <div className="card-header-section p-6 border-b border-[#D6C3A81A]">
            <h3 className="card-title-header text-lg font-semibold text-[#D6C3A8]">Prochains Rendez-vous</h3>
          </div>
          <div className="card-body p-6">
            <div className="appointment-card bg-[#4A1E1F80] border border-[#D6C3A81A] p-4 rounded-md mb-4">
              <div className="appointment-content flex items-start gap-4">
                <div className="icon-container p-3 rounded-full bg-[#D6C3A833]">
                  <i className="fas fa-calendar text-[#D6C3A8] text-xl"></i>
                </div>
                <div className="appointment-details flex-1">
                  <div className="appointment-header flex justify-between items-center">
                    <span className="appointment-date font-medium text-[#D6C3A8]">20/03/2024</span>
                    <span className="appointment-status bg-[#40898A33] text-[#40898A] text-xs rounded-full px-2 py-1">Confirmé</span>
                  </div>
                  <p className="appointment-time mt-1 text-[#D6C3A8B3]">14:30</p>
                  <p className="appointment-center text-[#D6C3A8B3]">Centre de Don Central</p>
                  <div className="appointment-actions flex justify-end gap-2 mt-2">
                    <button className="btn-icon btn-edit text-[#40898A] hover:text-[#D6C3A8]">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-icon btn-delete text-[#8B2326] hover:text-[#D6C3A8]">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Appointments */}
      <div className="card card-light border border-[#4A1E1F1A] rounded-md shadow-md">
        <div className="card-header-section card-header-light p-6 border-b border-[#4A1E1F1A]">
          <h3 className="card-title-header text-lg font-semibold text-[#4A1E1F]">Historique des Rendez-vous</h3>
        </div>
        <div className="table-container overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1A4B4C1A] text-left text-[#4A1E1F] text-xs uppercase font-medium">
              <tr>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Centre</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#1A4B4C0D] border-b border-[#4A1E1F1A]">
                <td className="py-4 px-6 text-[#4A1E1FB3]">15/02/2024</td>
                <td className="py-4 px-6 text-[#4A1E1FB3]">Centre de Don Mobile</td>
                <td className="py-4 px-6 text-[#4A1E1FB3]">Don de sang total</td>
                <td className="py-4 px-6">
                  <span className="status-completed bg-[#40898A33] text-[#40898A] text-xs rounded-full px-2 py-1">Complété</span>
                </td>
              </tr>
              <tr className="hover:bg-[#1A4B4C0D] border-b border-[#4A1E1F1A]">
                <td className="py-4 px-6 text-[#4A1E1FB3]">10/01/2024</td>
                <td className="py-4 px-6 text-[#4A1E1FB3]">Hôpital Régional</td>
                <td className="py-4 px-6 text-[#4A1E1FB3]">Don de plasma</td>
                <td className="py-4 px-6">
                  <span className="status-cancelled bg-[#8B232633] text-[#8B2326] text-xs rounded-full px-2 py-1">Annulé</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
