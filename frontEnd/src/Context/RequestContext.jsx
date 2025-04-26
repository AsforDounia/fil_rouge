import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';



export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
    const [requests, setRequests] = useState(null);
    const [nbRstUrgC, setNbRstUrgC] = useState(null);

    const getnbRstUrgC = async () => {
        try {
            const response = await api.get('requests/match/count');
            setNbRstUrgC(response.data.countUrgC);
        } catch (error) {
            console.error(error);
        }
    }

    const getRequests = async (page = 1)=>{
        try {
            const response = await api.get(`requests?page=${page}`);
            setRequests(response.data.don_requests);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <RequestContext.Provider value={{
            getnbRstUrgC,
            nbRstUrgC,
            getRequests,
            requests

        }}>
            {children}
        </RequestContext.Provider>
    );
}

export const useRequest = () => useContext(RequestContext);