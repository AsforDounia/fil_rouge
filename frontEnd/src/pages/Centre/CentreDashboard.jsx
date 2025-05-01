import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaChartLine, FaClipboardList, FaCog, FaBell } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';

const CentreDashboard = () => {
    const { user } = useAuth();
    
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEvents: 0,
        upcomingEvents: 0,
        totalUsers: 0,
        totalLocations: 0,
        recentActivities: []
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                setStats({
                    totalEvents: 12,
                    upcomingEvents: 5,
                    totalUsers: 84,
                    totalLocations: 7,
                    recentActivities: [
                        { id: 1, type: 'event', action: 'created', title: 'Festival de Vin', user: 'Marie Dupont', time: '2 hours ago' },
                        { id: 2, type: 'user', action: 'registered', title: 'Jean Martin', user: 'System', time: '5 hours ago' },
                        { id: 3, type: 'event', action: 'updated', title: 'Dégustation de Fromage', user: 'Admin', time: '1 day ago' },
                        { id: 4, type: 'location', action: 'added', title: 'Château Margaux', user: 'Pierre Blanc', time: '2 days ago' }
                    ]
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Cards data for quick access modules
    const dashboardCards = [
        {
            title: 'Gestion des Événements',
            description: 'Créer, modifier et supprimer des événements',
            icon: <FaCalendarAlt className="text-4xl text-[#40898A]" />,
            link: '/admin/events',
            color: 'bg-gradient-to-br from-teal-50 to-cyan-50',
            border: 'border-l-4 border-[#40898A]'
        },
        {
            title: 'Gestion des Utilisateurs',
            description: 'Administrer les comptes utilisateurs',
            icon: <FaUsers className="text-4xl text-[#8B2326]" />,
            link: '/admin/users',
            color: 'bg-gradient-to-br from-red-50 to-rose-50',
            border: 'border-l-4 border-[#8B2326]'
        },
        {
            title: 'Gestion des Localisations',
            description: 'Gérer les lieux et adresses',
            icon: <FaMapMarkerAlt className="text-4xl text-orange-500" />,
            link: '/admin/locations',
            color: 'bg-gradient-to-br from-orange-50 to-amber-50',
            border: 'border-l-4 border-orange-500'
        },
        {
            title: 'Rapports & Statistiques',
            description: 'Analyser les données et tendances',
            icon: <FaChartLine className="text-4xl text-purple-600" />,
            link: '/admin/reports',
            color: 'bg-gradient-to-br from-purple-50 to-violet-50',
            border: 'border-l-4 border-purple-600'
        },
        {
            title: 'Paramètres du Site',
            description: 'Configurer les options du site',
            icon: <FaCog className="text-4xl text-gray-600" />,
            link: '/admin/settings',
            color: 'bg-gradient-to-br from-gray-50 to-slate-50',
            border: 'border-l-4 border-gray-600'
        },
        {
            title: 'Notifications',
            description: 'Gérer les alertes et messages',
            icon: <FaBell className="text-4xl text-yellow-500" />,
            link: '/admin/notifications',
            color: 'bg-gradient-to-br from-yellow-50 to-amber-50',
            border: 'border-l-4 border-yellow-500'
        }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">

                
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#40898A]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-gray-500 font-medium">Total Événements</h3>
                            <FaCalendarAlt className="text-[#40898A]" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{stats.totalEvents}</p>
                        <p className="text-sm text-gray-500 mt-2">Dont {stats.upcomingEvents} à venir</p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default CentreDashboard;