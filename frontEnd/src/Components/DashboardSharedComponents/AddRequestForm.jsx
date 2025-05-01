import { useEffect } from 'react';
import { useCenter } from '../../Context/CenterContext';
import { useRequest } from '../../Context/RequestContext';
import { useForm } from 'react-hook-form';

const AddRequestForm = ({ onCancel }) => {
  const { allCenters, getAllCentres } = useCenter();
  const { createRequest } = useRequest();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      blood_group: 'A+',
      urgency: 'Normal',
      component: 'Sang total',
      quantity: '1',
      centre_id: '',
      description: '',
    }
  });

  useEffect(() => {
    const fetchCenters = async () => {
      await getAllCentres();
    };
    fetchCenters();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createRequest(data);
      reset(); // reset the form after submit
      onCancel();
    } catch (error) {
      console.error("Error adding request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">Nouvelle demande de don</h3>
          <button
            onClick={onCancel}
            type="button"
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Groupe sanguin */}
            <div>
              <label className="block text-[#1A4B4C] font-medium mb-2">Groupe sanguin</label>
              <select
                {...register('blood_group', { required: true })}
                className="p-3 border border-gray-200 rounded-lg text-base w-full"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* Urgence */}
            <div>
              <label className="block text-[#1A4B4C] font-medium mb-2">Urgence</label>
              <select
                {...register('urgency', { required: true })}
                className="p-3 border border-gray-200 rounded-lg text-base w-full"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Composant */}
            <div>
              <label className="block text-[#1A4B4C] font-medium mb-2">Composant</label>
              <select
                {...register('component', { required: true })}
                className="p-3 border border-gray-200 rounded-lg text-base w-full"
              >
                <option value="Sang total">Sang total</option>
                <option value="Plaquettes">Plaquettes</option>
                <option value="Plasma">Plasma</option>
                <option value="Globules">Globules</option>
              </select>
            </div>

            {/* Quantité */}
            <div>
              <label className="block text-[#1A4B4C] font-medium mb-2">Quantité</label>
              <select
                {...register('quantity', { required: true })}
                className="p-3 border border-gray-200 rounded-lg text-base w-full"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Centre */}
          <div className="mb-4">
            <label className="block text-[#1A4B4C] font-medium mb-2">Centre</label>
            <select
              {...register('centre_id', { required: 'Vous devez choisir un centre pour continuer!' })}
              className="p-3 border border-gray-200 rounded-lg text-base w-full"
            >
              <option value="">Sélectionner un centre</option>
              {allCenters && allCenters.map(centre => (
                <option key={centre.id} value={centre.id}>{centre.name}</option>
              ))}
            </select>
            {errors.centre_id && (
              <p className="text-red-500 text-sm mt-1">{errors.centre_id.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-[#1A4B4C] font-medium mb-2">Description</label>
            <textarea
              {...register('description')}
              className="p-3 border border-gray-200 rounded-lg text-base w-full min-h-[100px]"
              placeholder="Description de la demande..."
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1A4B4C] text-white rounded-lg hover:bg-[#40898A] transition-colors"
            >
              Ajouter
            </button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default AddRequestForm;
