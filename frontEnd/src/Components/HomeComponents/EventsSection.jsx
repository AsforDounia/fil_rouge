import React, { useEffect, useState } from 'react';

import { useEvent } from '../../Context/EventContext';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../../Context/AuthContext';


const EventsSection = () => {
    const [loading, setLoading] = useState(true);
    const { events, getEvents, participer, annulerParticipation, userParticiper, userEvents } = useEvent();
    const [currentPage, setCurrentPage] = useState(1);
    const { user, getUser } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        try {
            await getEvents(currentPage);
            await getUser();
            await userParticiper();
        } catch (error) {
            toast.error("Error fetching events: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const participerEvent = async (eventId) => {
        try {
            await participer(eventId);
            toast.success("Vous participez maintenant à cet événement.");
            await userParticiper();
        } catch (error) {
            toast.error("Erreur lors de la participation: " + error.message);
        }
    };

    const annuler = async (eventId) => {
        try {
            await annulerParticipation(eventId);
            toast.success("Votre participation a été annulée.");
            await userParticiper();
        } catch (error) {
            toast.error("Erreur lors de l'annulation: " + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
            </div>
        );
    }

    const lastPage = events.last_page || 1;
    const currentPageFromData = events.current_page || 1;

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    };

    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-burgundy mb-12 relative">
                    Actualités et Événements
                    <span className="absolute top-6 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-teal to-wine mt-8"></span>
                </h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {events.data.map((event, index) => (
                        <div key={index} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <img src={event.localisation.user.profile_image || '../../../public/images/event.png'} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-6 py-0">
                                <span className="inline-block px-3 py-1 bg-cream text-burgundy rounded text-sm mb-4">
                                    {event.date}
                                </span>
                                <span className="min-h-20 max-h-20 block items-center gap-2 text-teal font-medium transition-all duration-300 hover:text-darkTeal">
                                    <span className='text-burgundy mb-4 '>Adresse : </span>{event.localisation.address}
                                </span>
                                <h3 className="text-xl text-burgundy mb-4 leading-snug">
                                    {event.title}
                                </h3>
                            </div>
                            <div className="flex-1 p-6 py-0 text-gray-500 ">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {event.description?.slice(0, 120)}...
                                </p>
                            </div>
                            <div className="p-6 pt-0 text-gray-500">
                                {user ? (
                                    userEvents.length > 0 && userEvents.some(participation =>
                                        participation.user_id === user.id && participation.event_id === event.id
                                    ) ? (
                                        <button
                                            onClick={() => annuler(event.id)}
                                            className="cursor-pointer inline-flex items-center gap-2 text-teal font-medium transition-all duration-300 hover:text-darkTeal"
                                        >
                                            Annuler Participation <FaArrowRight />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => participerEvent(event.id)}
                                            className="cursor-pointer inline-flex items-center gap-2 text-teal font-medium transition-all duration-300 hover:text-darkTeal"
                                        >
                                            Participer <FaArrowRight />
                                        </button>
                                    )
                                ) : (
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center gap-2 text-teal font-medium transition-all duration-300 hover:text-darkTeal"
                                    >
                                        Participer <FaArrowRight />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <nav className="flex items-center">
                        <button
                            onClick={() => handlePageChange(currentPageFromData - 1)}
                            disabled={currentPageFromData <= 1}
                            className={`px-4 py-2 mx-1 rounded-md ${
                                currentPageFromData <= 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-burgundy text-white hover:bg-wine cursor-pointer '
                            }`}
                        >
                            <FaArrowCircleLeft />
                        </button>

                        <div className="flex mx-2">
                            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 mx-1 rounded-full flex items-center justify-center cursor-pointer ${
                                        page === currentPageFromData
                                            ? 'bg-burgundy text-white '
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPageFromData + 1)}
                            disabled={currentPageFromData >= lastPage}
                            className={`px-4 py-2 mx-1 rounded-md ${
                                currentPageFromData >= lastPage
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-burgundy text-white hover:bg-wine cursor-pointer'
                            }`}
                        >
                            <FaArrowCircleRight />
                        </button>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;