import React from 'react';
import { Link } from 'react-router-dom';
import {
    HomeIcon,
    CalendarDays,
    HistoryIcon,
    HospitalIcon,
    // HandHoldingMedicalIcon,
    MessageSquareIcon,
    SettingsIcon,
    LogOutIcon
} from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 bottom-0 w-64 bg-burgundy text-white overflow-y-auto">
            {/* Logo Header */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-cream">Blood<span className="text-white">Link</span></h1>
                        <p className="text-sm text-teal">Espace Donneur</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-4">
                <div className="space-y-1.5">
                    {[
                        { icon: HomeIcon, text: 'Tableau de bord', href: '/dashboard', active: true, badge: null },
                        { icon: CalendarDays, text: 'Mes Rendez-vous', href: '/appointments', active: false, badge: null },
                        { icon: HistoryIcon, text: 'Historique des Dons', href: '/donation-history', active: false, badge: null },
                        { icon: HospitalIcon, text: 'Centres de Don', href: '/centers', active: false, badge: null },
                        // { icon: HandHoldingMedicalIcon, text: 'Demandes de Sang', href: '/blood-requests', active: false, badge: 5 },
                        { icon: MessageSquareIcon, text: 'Messages', href: '/messages', active: false, badge: 2 }
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            className={`
                                flex items-center py-3 px-4 rounded-lg transition-all duration-300
                                ${item.active ? 'bg-darkTeal text-white' : 'text-cream hover:bg-darkTeal/20 hover:text-white'}
                            `}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.text}</span>
                            {item.badge && (
                                <span className="ml-auto bg-teal text-white text-xs px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Footer Section */}
            <div className="absolute bottom-0 w-full p-4">
                <div className="border-t border-cream/10 pt-4">
                    {[
                        { icon: SettingsIcon, text: 'Paramètres', href: '/settings' },
                        { icon: LogOutIcon, text: 'Déconnexion', href: '/logout' }
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            className="flex items-center py-2 text-cream hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.text}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
