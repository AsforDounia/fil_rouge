import React, { useEffect, useState } from 'react';
import { FaBell, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
    const { user, getUser , hasRole } = useAuth();
    const [loading, setLoading] = useState(true);
    const [localUserData, setLocalUserData] = useState(null);
        const [userRole, setUserRole] = useState("user");
        const location = useLocation();
        const [pageInfo, setPageInfo] = useState({ title: '', subtitle: '' });
      
        useEffect(() => {
          const path = location.pathname;
      
          if (path === '/donneur/appointments') {
            setPageInfo({
              title: "Mes Rendez-vous",
              subtitle: "Gérez vos rendez-vous de don",
            });
          } else if (path === '/donneur/new-appointment') {
            setPageInfo({
              title: "Nouveau Rendez-vous",
              subtitle: "Planifier votre prochain don de sang",
            });
          } 
          else if (path === '/donneur/donation-history') {
            setPageInfo({
              title: "Historique des Dons",
              subtitle: "Suivi de vos contributions",
            });
          } 
          else if (path === '/donneur/centers') {
            setPageInfo({
              title: "Centres de Don",
              subtitle: "Trouvez les centres près de chez vous",
            });
          } 
          else if (path === '/donneur/events') {
            setPageInfo({
              title: "Événements de Don",
              subtitle: "Découvrez les prochaines collectes et opportunités de don",
            });
          } 
          else if (path === '/donneur/blood-requests') {
            setPageInfo({
              title: "Demandes de sang",
              subtitle: "Trouvez des opportunités de don de sang près de chez vous",
            });
          } else if (path === '/donneur/dashboard') {
            setPageInfo({
              title: "Mon Espace Donneur",
              subtitle: `Bienvenue, ${localUserData?.name}`,
            });
          } else if (path === '/admin/dashboard') {
            setPageInfo({
              title: "Espace Admin",
              subtitle: `Bienvenue, ${localUserData?.name}`,
            });
          } 
           else if (path === '/admin/users') {
            setPageInfo({
              title: "Gérer les Utilisateurs",
              subtitle: "",
            });
          } 
          else {
            setPageInfo({
              title: "Paramètres",
              subtitle: "Gérez vos informations personnelles",
            });
          }
        }, [location.pathname, localUserData?.name]);
    useEffect(() => {
        if (user) {
            setLocalUserData(user);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUser();
                const isAdmin = await hasRole(["admin"]);
                if (isAdmin) {
                    setUserRole("admin");
                }
            } catch (error) {
                toast.error("Error get user: " + error.message);
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

    // const getPageInfo = () => {
    //     const path = location.pathname;
        
    //     if (path === '/donneur/appointments') {
    //         return {
    //             title: "Mes Rendez-vous",
    //             subtitle: "Gérez vos rendez-vous de don",
    //         };
    //     } else if (path === '/donneur/new-appointment') {
    //         return {
    //             title: "Nouveau Rendez-vous",
    //             subtitle: "Planifier votre prochain don de sang",
    //         };
    //     } else if (path === '/donneur/blood-requests') {
    //         return {
    //             title: "Demandes de sang",
    //             subtitle: "Trouvez des opportunités de don de sang près de chez vous",
    //         };
    //     } else if(path === '/donneur/dashboard'){
    //         return {
    //             title: "Mon Espace Donneur",
    //             subtitle: `Bienvenue, ${localUserData?.name}`,
    //         };
    //     }
    //      else if(path === '/admin/dashboard'){
    //         return {
    //             title: "Espace Admin",
    //             subtitle: `Bienvenue, ${localUserData?.name}`,
    //         };
    //     }
    //      else if(path === '/admin/donneurs'){
    //         return {
    //             title: "Gestion des Donneurs",
    //             subtitle: `Gérer les donneurs`,
    //         };
    //     }
    //     else{
    //         return {
    //             title: "hello",
    //             subtitle: `hello`,
    //         };
    //     }

    // };
    // const pageInfo = getPageInfo();
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-3xl font-bold text-burgundy ">{pageInfo.title}</h2>
                <p className="text-darkteal ">{pageInfo.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-teal/10 p-2 rounded-lg border-none cursor-pointer text-teal">
                    <FaBell size={20} />
                </button>
                {userRole && userRole == "admin" ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center text-white">
                            <FaUserShield />
                        </div>
                        <div className="hidden md:block">
                            <div className="text-sm font-medium">Admin</div>
                            <div className="text-xs text-gray-500">Administrateur</div>
                        </div>
                    </div>
                ):(
                    <div className="flex items-center gap-2 bg-wine py-2 px-4 rounded-lg">
                        <span className="text-cream">{localUserData?.blood_type}</span>
                        <img src={`http://127.0.0.1:8000/storage/${localUserData?.profile_image}`} alt="User" className="w-10 h-10 rounded-full border-2 border-cream" />
                    </div>
                )}
            </div>
</div>
);
};

export default TopBar;