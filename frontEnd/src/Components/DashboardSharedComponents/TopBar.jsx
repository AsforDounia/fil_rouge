import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const TopBar = () => {
    const { user, getUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [localUserData, setLocalUserData] = useState(null);

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

    const getPageInfo = () => {
        const path = location.pathname;
        
        if (path === '/appointments') {
            return {
                title: "Mes Rendez-vous",
                subtitle: "Gérez vos rendez-vous de don",
            };
        } else if (path === '/new-appointment') {
            return {
                title: "Nouveau Rendez-vous",
                subtitle: "Planifier votre prochain don de sang",
            };
        } else {
            return {
                title: "Mon Espace Donneur",
                subtitle: `Bienvenue, ${localUserData?.name}`,
            };
        }
    };
    const pageInfo = getPageInfo();
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
                <div className="flex items-center gap-2 bg-wine py-2 px-4 rounded-lg">
                    <span className="text-cream">{localUserData?.blood_type}</span>
                    <img src={localUserData?.profile_image} alt="Donor" className="w-10 h-10 rounded-full border-2 border-cream" />
                </div>
            </div>
</div>
);
};

export default TopBar;