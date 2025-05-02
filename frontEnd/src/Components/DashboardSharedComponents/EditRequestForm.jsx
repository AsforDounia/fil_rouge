import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRequest } from '../../Context/RequestContext';

const EditRequestForm = ({ request, onCancel }) => {

    const {editRequest} = useRequest();
    const [formData, setFormData] = useState({
        urgency : request.urgency,
        blood_group: request.blood_group,
        quantity: request.quantity,
        component: request.component,
        description: request.description || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await editRequest(formData , request);
            onCancel();
        } catch (error) {
            console.error('Erreur lors de la modification', error);
            toast.error('Erreur lors de la modification.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
                    <h3 className="text-xl font-semibold text-[#4A1E1F] mb-4">Modifier la Demande</h3>

                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Groupe Sanguin</label>
                            <select
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">-- Sélectionner --</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Normal">Normal</option>
                                
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Groupe Sanguin</label>
                            <select
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">-- Sélectionner --</option>
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

                        {/* Composant */}
                        <div>
                        <label className="block text-[#1A4B4C] font-medium mb-2">Composant</label>
                        <select
                            name = 'component'
                            value={formData.component}
                            onChange={handleChange}
                            className="p-3 border border-gray-200 rounded-lg text-base w-full"
                        >
                            <option value="Sang total">Sang total</option>
                            <option value="Plaquettes">Plaquettes</option>
                            <option value="Plasma">Plasma</option>
                            <option value="Globules">Globules</option>
                        </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Quantité</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        <div className="flex gap-4 justify-end">

                            <button
                                type="button"
                                onClick={onCancel}
                                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="bg-[#8B2326] text-white py-2 px-4 rounded-lg hover:bg-[#a42a2d]"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditRequestForm;
