import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaHistory, FaHandHoldingMedical, FaCalendarPlus, FaProcedures, FaUser } from "react-icons/fa";
import { RiFileChartLine, RiUserLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { FaHospital, FaUsersGear } from "react-icons/fa6";
import { IoMdMail, IoMdSettings } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { MdFestival } from "react-icons/md";
import { useAuth } from '../../Context/AuthContext';

const Sidebar = () => {
    const { user, getUser, loading, hasRole } = useAuth();
    const [userRole, setUserRole] = useState("user");
    const [menuItems, setMenuItems] = useState([]);
   
    // Fetch user role
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const isDonor = await hasRole(["donor"]);
                const isAdmin = await hasRole(["admin"]);
                const isPatient = await hasRole(["patient"]);
                const isCentreManager = await hasRole(["centre_manager"]);
                
                if (isAdmin) {
                    setUserRole("admin");
                } else if (isCentreManager) {
                    setUserRole("centre_manager");
                } else if (isDonor) {
                    setUserRole("donor");
                } else if (isPatient) {
                    setUserRole("patient");
                } else {
                    setUserRole("user");
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setUserRole("user");
            }
        };
        
        fetchRole();
    }, [hasRole]);

    // useEffect(() => {
    //     const baseUrls = {
    //         donor: '/donneur',
    //         admin: '/admin',
    //         centre_manager: '/centre-manager',
    //         user: '/user'
    //     };
        
    //     const baseUrl = baseUrls[userRole] || '/user';

    //     const items = [
    //         { icon: <FaHome />, text: 'Tableau de bord', href: `${baseUrl}/dashboard`, badge: null },
    //         { icon: <FaCalendarAlt />, text: 'Mes Rendez-vous', href: `${baseUrl}/appointments`, badge: null },
    //         { icon: <FaCalendarPlus />, text: 'Nouveau Rendez-vous', href: `${baseUrl}/new-appointment`, badge: null },
    //         { icon: <FaHistory />, text: 'Historique des Dons', href: `${baseUrl}/donation-history`, active: false, badge: null },
    //         { icon: <FaHospital />, text: 'Centres de Don', href: `${baseUrl}/centers`, active: false, badge: null },
    //         { icon: <FaHandHoldingMedical />, text: 'Demandes de Sang', href: `${baseUrl}/blood-requests`, active: false, badge: null },
    //         // { icon: <IoMdMail />, text: 'Messages', href: `${baseUrl}/messages`, active: false, badge: null },
    //         { icon: <MdFestival />, text: 'Evenements', href: `${baseUrl}/events`, active: false, badge: null },
    //         { icon: <IoMdSettings />, text: 'Paramètres', href: `${baseUrl}/profile`, badge: null },
    //         { icon: <TbLogout2 />, text: 'Déconnexion', href: 'logout', badge: null },
    //     ];
        
    //     setMenuItems(items);
    // }, [userRole]);


        useEffect(() => {
            const baseUrls = {
                donor: '/donneur',
                admin: '/admin',
                patient : '/patient',
                centre_manager: '/centre',
                user: '/user'
            };
            
            const baseUrl = baseUrls[userRole] || '/user';
    
            // Common items for all roles
            const commonItems = [
                { icon: <FaHome />, text: 'Tableau de bord', href: `${baseUrl}/dashboard`, badge: null },
                { icon: <IoMdSettings />, text: 'Paramètres', href: `${baseUrl}/profile`, badge: null },
                { icon: <TbLogout2 />, text: 'Déconnexion', href: '/logout', badge: null },
            ];
    
            
            const donorItmes = [
                { icon: <FaCalendarAlt />, text: 'Mes Rendez-vous', href: `${baseUrl}/appointments`, badge: null },
                { icon: <FaCalendarPlus />, text: 'Nouveau Rendez-vous', href: `${baseUrl}/new-appointment`, badge: null },
                { icon: <FaHistory />, text: 'Historique des Dons', href: `${baseUrl}/donation-history`, badge: null },
                { icon: <FaHospital />, text: 'Centres de Don', href: `${baseUrl}/centers`, badge: null },
                { icon: <MdFestival />, text: 'Evenements', href: `${baseUrl}/events`, badge: null },
            ];
    
            const adminItmes = [
                { icon: <FaUsersGear />, text: 'Gestion d\'Utilisateurs ', href: `${baseUrl}/users`, badge: null },
                { icon: <HiUserAdd />, text: 'Ajouter new Utilisateur', href: `${baseUrl}/addUser`, badge: null },
                // { icon: <FaProcedures />, text: 'Gestion des Patients', href: `${baseUrl}/patients`, badge: null },
                // { icon: <FaHospital />, text: 'Gestion des Centres', href: `${baseUrl}/centers`, badge: null },
                { icon: <FaHandHoldingMedical />, text: 'Demandes de Sang', href: `${baseUrl}/requests`, badge: null },
                // { icon: <RiFileChartLine />, text: 'Rapports', href: `${baseUrl}/reports`, badge: null },
                { icon: <MdFestival />, text: 'Gestion Evenements', href: `${baseUrl}/events`, badge: null },
            ];
    
            const centreManagerItmes = [
                { icon: <FaCalendarAlt />, text: 'Rendez-vous', href: `${baseUrl}/appointments`, badge: null },
                { icon: <FaHospital />, text: 'Mon Centre', href: `${baseUrl}/mycenter`, badge: null },
                { icon: <FaHandHoldingMedical />, text: 'Demandes de Sang', href: `${baseUrl}/blood-requests`, badge: null },
                { icon: <FaHistory />, text: 'Historique des Dons', href: `${baseUrl}/donation-records`, badge: null },
                { icon: <MdFestival />, text: 'Evenements Centre', href: `${baseUrl}/center-events`, badge: null },
            ];
    
            const userItmes = [
                { icon: <FaHospital />, text: 'Centres de Don', href: `${baseUrl}/centers`, badge: null },
                { icon: <MdFestival />, text: 'Evenements', href: `${baseUrl}/events`, badge: null },
            ];
            const patientItmes = [
                { icon: <FaHandHoldingMedical />, text: 'Demandes de Sang', href: `${baseUrl}/requests`, badge: null },
                { icon: <FaHospital />, text: 'Centres de Don', href: `${baseUrl}/centers`, badge: null },
                { icon: <MdFestival />, text: 'Evenements', href: `${baseUrl}/events`, badge: null },
            ];
            
            // Combine common items with role-specific items
            let items = [];
            
            // Always put dashboard as the first item
            items.push(commonItems[0]);
            
            // Add role-specific items
            switch (userRole) {
                case 'donor':
                    items = [...items, ...donorItmes];
                    break;
                case 'admin':
                    items = [...items, ...adminItmes];
                    break;
                case 'centre_manager':
                    items = [...items, ...centreManagerItmes];
                    break;
                case 'patient':
                    items = [...items, ...patientItmes];
                    break;
                default:
                    items = [...items, ...userItmes];
                    break;
            }
            
            // Add settings and logout at the end
            items.push(commonItems[1], commonItems[2]);
            
            setMenuItems(items);
        }, [userRole]);
    if (loading) {
        return <div>Chargement...</div>;
    }

    // Render nothing if menuItems is still empty
    if (!menuItems || menuItems.length === 0) {
        return <div>Chargement du menu...</div>;
    }

    return (
        <div className="fixed top-0 left-0 bottom-0 w-64 bg-burgundy text-white flex flex-col">
            {/* Logo Header */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-xl font-bold text-cream">
                            Blood<span className="text-white">Link</span>
                        </h1>
                        <p className="text-sm text-teal">Espace {userRole === "donor" ? "Donneur" : userRole === "admin" ? "Admin" : "Gestionnaire"}</p>
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