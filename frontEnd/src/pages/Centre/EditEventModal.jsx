import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useEvent } from '../../Context/EventContext';

const EditEventModal = ({ isOpen, onClose, eventToEdit }) => {
    const {updateEvent} = useEvent();
    const [formData, setFormData] = useState({
        id :'',
        title: '',
        description: '',
        date: '',
    });

    useEffect(() => {
        if (eventToEdit) {
            const eventDate = new Date(eventToEdit.date);
            const formattedDate = eventDate.toISOString().split('T')[0];
            setFormData({
                id : eventToEdit.id,
                title: eventToEdit.title || '',
                description: eventToEdit.description || '',
                date: formattedDate || '',

            });
        }
    }, [eventToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async() => {
        onClose();

        try{
            await updateEvent(formData);
            onClose();

        }catch(error){
            console.error(error);
        }

    };



    return (
        <div
            className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 ${isOpen ? '' : 'hidden'}`}
        >
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center relative">
                    <h3 className="text-xl font-semibold text-[#4A1E1F]">Modifier l'événement</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Titre</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Titre de l'événement"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Description de l'événement"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>



                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[#8B2326] text-white rounded-lg hover:bg-[#4A1E1F] transition-colors"
                        >
                            Enregistrer
                        </button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default EditEventModal;
