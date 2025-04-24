import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaHistory, FaHandHoldingMedical, FaCalendarPlus } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { FaHospital } from "react-icons/fa6";
import { IoMdMail, IoMdSettings } from "react-icons/io";
import { MdFestival } from "react-icons/md";


const Sidebar = () => {

    const menuItems = [
        { icon: <FaHome />, text: 'Tableau de bord', href: '/donneur', badge: null },
        { icon: <FaCalendarAlt />, text: 'Mes Rendez-vous', href: '/appointments', badge: null },
        { icon: <FaCalendarPlus />, text: 'Nouveau Rendez-vous', href: '/new-appointment', badge: null },
        { icon: <FaHistory />, text: 'Historique des Dons', href: '/donation-history', active: false, badge: null },
        { icon: <FaHospital />, text: 'Centres de Don', href: '/centers', active: false, badge: null },
        { icon: <FaHandHoldingMedical />, text: 'Demandes de Sang', href: '/blood-requests', active: false, badge: null },
        { icon: <IoMdMail />, text: 'Messages', href: '/messages', active: false, badge: null },
        { icon: <MdFestival />, text: 'Evenements', href: '/events', active: false, badge: null },
        { icon: <IoMdSettings />, text: 'Paramètres', href: '/profile', badge: null },
        { icon: <TbLogout2 />, text: 'Déconnexion', href: '/logout', badge: null },
    ];

    return (
        <div className="fixed top-0 left-0 bottom-0 w-64 bg-burgundy text-white flex flex-col">
            {/* Logo Header */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-cream">
                            Blood<span className="text-white">Link</span>
                        </h1>
                        <p className="text-sm text-teal">Espace Donneur</p>
                    </div>
                </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 flex flex-col">
                {/* Top menu items */}
                <div className="flex-1 space-y-1.5">
                    {menuItems.slice(0, menuItems.length - 2).map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.href}
                            className={({ isActive }) => `
                                flex items-center py-3 px-4 rounded-lg transition-all duration-300
                                ${isActive ? 'bg-darkteal text-white' : 'text-cream hover:bg-darkteal/20 hover:text-white'}
                            `}
                        >
                            <span className="w-5 h-5 mr-3">{item.icon}</span>
                            <span>{item.text}</span>
                            {item.badge && (
                                <span className="ml-auto bg-teal text-white text-xs px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>
                
                {/* Bottom menu items */}
                <div className="mt-auto mb-6">
                    <div className="border-t border-gray-700 pt-4 mt-4">
                        {menuItems.slice(menuItems.length - 2).map((item, index) => (
                            <NavLink
                                key={menuItems.length - 2 + index}
                                to={item.href}
                                className={({ isActive }) => `
                                    flex items-center py-3 px-4 rounded-lg transition-all duration-300
                                    ${isActive ? 'bg-darkteal text-white' : 'text-cream hover:bg-darkteal/20 hover:text-white'}
                                `}
                            >
                                <span className="w-5 h-5 mr-3">{item.icon}</span>
                                <span>{item.text}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-teal text-white text-xs px-2 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;