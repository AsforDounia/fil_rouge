import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';



const CentreManagerContext = createContext();

export const CentreManagerProvider = ({ children }) => {

    const [stats, setStats] = useState(null);


    const fetchStats = async () => {
        
        try {
          const response = await api.get('centreManager/stats');
          setStats(response.data);
          return response.data;
        } catch (error) {
          toast.error("Erreur lors du chargement des statistiques");
          console.error(error);
        }
    };
    


    

    return (
        <CentreManagerContext.Provider value={{

            fetchStats,
            stats,
     
        }}>
            {children}
        </CentreManagerContext.Provider>
    );
}

export const useCentreManager = () => useContext(CentreManagerContext);