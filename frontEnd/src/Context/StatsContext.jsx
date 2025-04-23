import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
    const [stats , setStats] = useState();

    const getStats = async () => {
        try {
            const response = await api.get('stats');
            setStats(response.data.stats);
        }
        catch (error) {
            toast.error("Error fetching stats: " + error);
        }
    }

    return (
        <StatsContext.Provider value={{
            getStats,
            stats,
        }}>
            {children}
        </StatsContext.Provider>
    );
}

export const useStats = () => useContext(StatsContext);