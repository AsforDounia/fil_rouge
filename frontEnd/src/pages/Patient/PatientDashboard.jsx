import { useEffect, useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaFileAlt
} from 'react-icons/fa';
import { useRequest } from '../../Context/RequestContext';
import { toast } from 'react-toastify';
import EditRequestForm from '../../Components/DashboardSharedComponents/EditRequestForm';
import AddRequestForm from '../../Components/DashboardSharedComponents/AddRequestForm';

const PatientDashboard = () => {

  const { patientRequest, requests , deleteRequest , addRequest } = useRequest();
  const [activeRequests, setActiveRequests] = useState(null);
  const [histoRequests, setHistoRequests] = useState(null);

  const [editingRequest, setEditingRequest] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await patientRequest();
      } catch (error) {
        toast.error(error);
      }
    }
    fetchRequests();
  }, []);
  useEffect(() => {
    if (Array.isArray(requests)) {
      const active = requests.filter(request => request.status === 'en_attente');
      const histo = requests.filter(request =>
        ['complétée', 'annuler', 'rejetée'].includes(request.status)
      );

      setActiveRequests(active);
      setHistoRequests(histo)
    } else {
      setActiveRequests([]);
    }
  }, [requests]);



  const handeleDeleteRequest = async(id) => {
    try{
        await deleteRequest(id);
        setShowDeleteConfirm(false);
    }
    catch(error){
        toast.error(error);
        
    }
};

  return (

    <div >
      {editingRequest && (
        <EditRequestForm
          request={editingRequest}
          onCancel={() => setEditingRequest(null)}
        />
      )}
      {showAddForm && (
        <AddRequestForm
          request={editingRequest}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#4A1E1F]">Besoin Urgent?</h3>
            <p className="text-darkteal mt-2">Créez une demande urgente pour trouver rapidement des donneurs compatibles</p>
          </div>
          <button
            onClick={()=>setShowAddForm(true)}
          className="bg-[#8B2326] text-white py-3 px-6 rounded-lg border-none cursor-pointer flex items-center gap-2 transition-all hover:bg-[#a42a2d]">
            <FaPlus />
            Nouvelle Demande
          </button>
        </div>
      </div>

      {/* Active Requests & Compatible Donors Grid */}
      <div className="mb-6">
        {/* Active Requests */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 relative">
            <h3 className="text-xl font-semibold text-[#4A1E1F]">Demandes Actives</h3>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
          </div>
          {requests && activeRequests && (
            <div className="p-6 max-h-98 overflow-auto">
              {activeRequests.map((request) => (
                <div className="border border-gray-200 rounded-lg p-4 mb-4" key={request.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Demande {request.urgency}</h4>
                      <p className="text-gray-500 text-sm">Créée le: {request.created_at ? request.created_at.slice(0, 10) : 'Date inconnue'}</p>
                      <p className="text-gray-500 text-sm">Component: {request.component}</p>

                      <div>
                        <span className="inline-block bg-dartext-darkteal bg-opacity-10 text-darkteal py-1 px-2 rounded-full text-xs mr-2 mt-2">{request.blood_group}</span>
                        <span className="text-sm text-darkteal">{request.quantity} unités</span>
                      </div>
                      <p className="text-gray-500 text-sm">{request?.description}</p>
                    </div>
                    <span className="inline-block bg-blue-200 bg-opacity-10 text-blue-600 py-1 px-2 rounded-full text-xs">En Attente</span>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    {/* <button className="bg-transparent border-none cursor-pointer p-1 text-darkteal hover:text-[#40898A]">
                      <FaEdit />
                    </button> */}
                    <button
                      onClick={() => setEditingRequest(request)}
                      className="bg-transparent border-none cursor-pointer p-1 text-darkteal hover:text-[#40898A]"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowDeleteConfirm(true);
                      }}
                      className="bg-transparent border-none cursor-pointer p-1 text-[#8B2326] hover:text-[#a42a2d]"
                    >
                      <FaTrash />
                    </button>
                  </div>


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
                            Êtes-vous sûr de vouloir supprimer cette demande de sang ?
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
                </div>
              ))}
            </div>
          )

          }
        </div>

      </div>

      {/* Request History */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">Historique des Demandes</h3>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-xs uppercase text-gray-500 bg-gray-50">ID</th>
                <th className="py-3 px-6 text-left text-xs uppercase text-gray-500 bg-gray-50">Date</th>
                <th className="py-3 px-6 text-left text-xs uppercase text-gray-500 bg-gray-50">Type</th>
                <th className="py-3 px-6 text-left text-xs uppercase text-gray-500 bg-gray-50">Quantité</th>
                <th className="py-3 px-6 text-left text-xs uppercase text-gray-500 bg-gray-50">Statut</th>
              </tr>
            </thead>
            <tbody>
              {requests && histoRequests &&
                histoRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="py-3 px-6 text-sm border-b border-gray-200">{request.id}</td>
                    <td className="py-3 px-6 text-sm border-b border-gray-200">{request.created_at ? request.created_at.slice(0, 10) : 'Date inconnue'}</td>
                    <td className="py-3 px-6 text-sm border-b border-gray-200">{request.blood_group}</td>
                    <td className="py-3 px-6 text-sm border-b border-gray-200">{request.quantity} unités</td>
                    <td className="py-3 px-6 text-sm border-b border-gray-200">
                      <span className="inline-block bg-green-200 bg-opacity-10 text-green-600 py-1 px-2 rounded-full text-xs">
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      </div>



    </div>


  );
};

export default PatientDashboard;