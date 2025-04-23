import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';


const TopBar = () => {

    const { user , getUser } = useAuth();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUser();
            } catch (error) {
                toast.error("Error get user :" + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[]);


    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          </div>
        );
      }


    return (
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-burgundy ">Mon Espace Donneur</h2>
                                <p className="text-darkteal ">Bienvenue, {user.name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="bg-teal/10 p-2 rounded-lg border-none cursor-pointer text-teal">
                                    <FaBell size={20} />
                                </button>
                                <div className="flex items-center gap-2 bg-wine py-2 px-4 rounded-lg">
                                    <span className="text-cream">{user.blood_type}</span>
                                    <img src={user.profile_image} alt="Donor" className="w-10 h-10 rounded-full border-2 border-cream" />
                                </div>
                            </div>
        </div>
    );
};

export default TopBar;