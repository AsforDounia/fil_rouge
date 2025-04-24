import React, { useEffect, useState } from 'react';

import {
    FaCalendarPlus, FaHeartbeat, FaMapMarkerAlt, FaCalendarDay,
    FaCheck, FaCalendarCheck, FaBell, FaArrowRight
} from 'react-icons/fa';
import Sidebar from '../../Components/DashboardSharedComponents/Sidebar';
import { useAuth } from '../../Context/AuthContext';

import { useDonor } from '../../Context/DonorContext';
import TopBar from '../../Components/DashboardSharedComponents/TopBar';
import { toast } from 'react-toastify';

const DonorDashboard = () => {

    const [loading, setLoading] = useState(true);



    const { getStatistics, statistics } = useDonor();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getStatistics();
            } catch (error) {
                toast.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
            </div>
        );
    }

    console.log(statistics);


    const livesImpacted = statistics.countImpactedLives;
    const compatibleRequests = statistics.countUrgC;
    const upcomingEvents = statistics.upcomingEvents;
    const totalDonations = statistics.totalDonations;
    const daysUntilNextDonation = statistics.daysUntilNextDonation;


    const donationLocation = statistics.recentActivities.lastDonationDetails.lastDonationLocation;
    const donationDate = statistics.recentActivities.lastDonationDetails.lastDonationDate;


    const blood_group = statistics.recentActivities.urgentRequestDetails.blood_group;
    const urgRqstDate = statistics.recentActivities.urgentRequestDetails.createdAt;

    const appointmentDate = statistics.recentActivities.appointmentDetails.appointmentDate;
    const appointmentLocation = statistics.recentActivities.appointmentDetails.appointmentLocation;






    return (
        <>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-turquoise hover:border-wine">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-wine/10">
                            <FaCalendarPlus className="text-xl text-wine" />
                        </div>
                        <button className="border-none cursor-pointer text-wine hover:text-burgundy">
                            <FaArrowRight />
                        </button>
                    </div>
                    <h3 className="text-lg font-semibold text-burgundy">Planifier un Don</h3>
                    <p className="mt-2 text-darkteal">Prenez rendez-vous dans un centre proche</p>
                </div>

                <div className="bg-burgundy rounded-lg shadow-lg p-6 transform scale-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-teal hover:border-cream">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-cream/40">
                            <FaHeartbeat className="text-xl text-wine" />
                        </div>
                        <button className="border-none cursor-pointer text-teal">
                            <FaArrowRight />
                        </button>
                    </div>
                    <h3 className="text-lg font-semibold text-cream">Demandes Urgentes</h3>
                    <p className="mt-2 text-cream text-opacity-70">{compatibleRequests} demandes correspondent à votre groupe</p>
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
                    <h3 className="text-lg font-semibold text-burgundy">Centres de Don</h3>
                    <p className="mt-2 text-darkteal">Trouvez les centres près de chez vous</p>
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
                    <h3 className="text-lg font-semibold text-cream">Événements</h3>
                    <p className="mt-2 text-cream text-opacity-70">{upcomingEvents} événements à venir</p>
                </div>
            </div>

            {/* Status and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Status Card - 2/3 width */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-darkteal to-wine"></div>
                        <h3 className="text-xl font-semibold text-burgundy">Statut de Don</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-green-50">
                                <FaCheck className="text-xl text-green-500" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-burgundy">Éligible au Don</h4>
                                <p className="text-teal">Vous pouvez donner votre sang</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-burgundy">Temps jusqu'au prochain don</span>
                                <span className="text-teal font-medium">{daysUntilNextDonation} jours</span>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                {/* Ligne colorée qui change en fonction des jours restants */}
                                <div
                                    className={`absolute h-full rounded-full transition-all duration-300 bg-darkteal `}
                                    style={{
                                        width: daysUntilNextDonation === 0 ? '100%' : `${Math.max(1, 100 - (daysUntilNextDonation / 56 * 100))}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Card - 1/3 width */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wine to-darkteal"></div>
                        <h3 className="text-xl font-semibold text-burgundy">Mes Statistiques</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-darkteal">Total des dons</span>
                            <span className="text-xl font-bold text-burgundy">{totalDonations}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-darkteal">Vies impactées</span>
                            <span className="text-xl font-bold text-burgundy">{livesImpacted}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-darkteal to-wine"></div>
                    <h3 className="text-xl font-semibold text-burgundy">Activité Récente</h3>
                </div>
                <div className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-teal/10">
                                <FaCalendarCheck className="text-darkteal" />
                            </div>
                            <div>
                                <p className="text-burgundy font-medium">Don effectué</p>
                                <p className="text-darkteal">{donationLocation}</p>
                                <p className="text-sm text-gray-500 mt-1">{donationDate}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-cream bg-opacity-40">
                                <FaHeartbeat className="text-wine" />
                            </div>
                            <div>
                                <p className="text-burgundy font-medium">Demande de sang urgente</p>
                                {blood_group ? (
                                    <>
                                        <p className="text-darkteal">Groupe sanguin {blood_group} recherché</p>
                                        <p className="text-sm text-gray-500 mt-1">{urgRqstDate}</p>
                                    </>
                                ) :
                                    <p>aucune demande urgente matching with you</p>
                                }

                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-teal/10">
                                <FaCalendarPlus className="text-darkteal" />
                            </div>
                            <div>
                                <p className="text-burgundy font-medium">Rendez-vous planifié</p>
                                <p className="text-darkteal">{appointmentLocation}</p>
                                <p className="text-sm text-gray-500 mt-1">{appointmentDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DonorDashboard;
