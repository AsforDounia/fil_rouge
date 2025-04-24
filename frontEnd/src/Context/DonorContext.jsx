import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';



export const DonorContext = createContext();

export const DonorProvider = ({ children }) => {

    const [statistics , setStatistics ] = useState(null);
    const [appointmentsStats , setAppointmentsStats] = useState(null);

    const getStatistics = async () => {
        try {
            const response = await api.get('statistics');
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    }

    const getAppointmentsStats = async () => {
        try {
            const response = await api.get('appointments/statistics');
            setAppointmentsStats(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    }

    

    return (
        <DonorContext.Provider value={{

            getStatistics,
            statistics,
            getAppointmentsStats,
            appointmentsStats
        }}>
            {children}
        </DonorContext.Provider>
    );
}

export const useDonor = () => useContext(DonorContext);