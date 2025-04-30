import React, { useState, useEffect } from 'react';
import { useCenter } from '../../Context/CenterContext';
import { useEvent } from '../../Context/EventContext';

const AddEventModal = ({ isOpen, onClose }) => {
    const {allCenters , getAllCentres} = useCenter();
    const [errors, setErrors] = useState({});

    const {createEvent} = useEvent();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
        centre_id: '',
    });

    useEffect(() => {
        getAllCentres();
    }, []);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newErrors = {};
    
        if (!formData.title.trim()) {
            newErrors.title = "Le titre est obligatoire.";
        }
    
        if (!formData.centre_id) {
            newErrors.centre_id = "Veuillez sélectionner un centre.";
        }
    
        if (!formData.date) {
            newErrors.date = "La date est obligatoire.";
        } else {
            const today = new Date();
            const selectedDate = new Date(formData.date);
    
            today.setHours(0, 0, 0, 0);
    
            if (selectedDate < today) {
                newErrors.date = "La date doit être aujourd'hui ou une date future.";
            }
        }
    

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        console.log(formData);
        await createEvent(formData);
        onClose();
        setFormData({ title: '', date: '', description: '', centre_id: '' });
        setErrors({}); 
    };
    

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
                    <h3 className="text-xl font-semibold text-[#4A1E1F]">Ajouter un événement</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
                </div>
                <div className="p-6">
                    {/* Form */}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Titre"
                            className="border rounded p-2"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        <select
                            name="centre_id"
                            value={formData.centre_id}
                            onChange={handleChange}
                            className="border rounded p-2"
                        >
                            <option value="">Sélectionnez un centre</option>
                            {allCenters && allCenters.map((centre) => (
                                <option key={centre.id} value={centre.id}>
                                    {centre.name}
                                </option>
                            ))}
                        </select>
                        {errors.centre_id && <p className="text-red-500 text-sm mt-1">{errors.centre_id}</p>}
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border rounded p-2"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#40898A] text-white rounded-lg hover:bg-[#306e6e] transition-colors"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;
