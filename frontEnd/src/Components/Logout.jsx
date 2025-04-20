import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext';


function Logout() {

    const { logout } = useAuth();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout();
            }
            catch (error) {
                toast.error('Failed to logout');
            }
        }
        handleLogout();
    }, [])
}

export default Logout