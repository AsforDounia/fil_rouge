import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';



export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState(null);
    const [nbRstUrgC, setNbRstUrgC] = useState(null);

    const getnbRstUrgC = async () => {
        try {
            const response = await api.get('requests/match/count');
            setNbRstUrgC(response.data.countUrgC);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <RequestContext.Provider value={{
            getnbRstUrgC,
            nbRstUrgC

        }}>
            {children}
        </RequestContext.Provider>
    );
}

export const useRequest = () => useContext(RequestContext);