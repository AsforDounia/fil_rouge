import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from 'react-toastify';



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

    const getRequests = async ()=>{
        try {
            const response = await api.get(`requests`);
            setRequests(response.data.don_requests);

        } catch (error) {
            console.error(error);
        }
    }
    const getAllRequest = async ()=>{
        try {
            const response = await api.get(`admin/requests`);
            setRequests(response.data.allRequest);

        } catch (error) {
            console.error(error);
        }
    }



    const deleteRequest = async(id) => {
        try {
            const response = await api.delete(`requests/${id}`);
            toast.success(response.data.message);
            setRequests(prevRequests => prevRequests?.filter(request => request.id !== id));

        } catch (error) {
            console.error(error);
        }
    }
    const createRequest = async(newRequest) => {
        try {
            const response = await api.post(`requests`,newRequest);
            if(response.data.success){
                toast.success(response.data.message);
                setRequests(prevRequests => [response.data.request, ...prevRequests]);
            }
        } catch (error) {
            console.error(error);
        }
    }


    const patientRequest = async() => {
        try {
            const response = await api.get(`patientRequest`);
            if(response.data.success){
                setRequests(response.data.requests);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const editRequest = async(formData , request) => {
        try {
            const response = await api.put(`requests`,formData , request);
            if(response.data.success){
                toast.success(response.data.message)
                setRequests((prevRequests) =>
                    prevRequests.map((req) =>
                        req.id === request.id ? { ...req, ...formData } : req
                ));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <RequestContext.Provider value={{
            getnbRstUrgC,
            nbRstUrgC,
            getRequests,
            requests,
            deleteRequest,
            getAllRequest,
            createRequest,
            patientRequest,
            editRequest

        }}>
            {children}
        </RequestContext.Provider>
    );
}

export const useRequest = () => useContext(RequestContext);