import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";
import { Navigate } from 'react-router-dom';


export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [appointmentFileds , setAppointmentFileds] = useState(null);
    const [unavailbleDates , setUnavailbleDates] = useState(null);
    const [unavailbleTimes , setUnavailbleTimes] = useState(null);
    const [centreAppointments , setCentreAppointments] = useState(null);

    const getAppointmentFileds = async () => {
        try {
            const response = await api.get('appointment/filds');
            setAppointmentFileds(response.data);
            console.log(response.data);
        }
        catch (error) {
            toast.error("Error fetching upcoming appointmentFileds :" + error);
        }
    }

    const getUnavailbleDates  = async (centre_id) => {
        try {
            const response = await api.get(`appointment/unavailableDates/${centre_id}`);
            setUnavailbleDates(response.data);

        }
        catch (error) {
            toast.error("Error fetching upcoming unavailbleDates :" + error);
        }
        
    }
    const getUnavailableTimes  = async (dataTime) => {
        try {
            const response = await api.post(`appointment/unavailableTimes`,dataTime);
            setUnavailbleTimes(response.data.unavailable_times);
        }
        catch (error) {
            toast.error("Error fetching upcoming unavailbleDates :" + error);
        }
        
    }
    const createAppointment  = async (formData) => {
        try {
            await api.post(`appointments`,formData);
        }
        catch (error) {
            toast.error("Error fetching upcoming unavailbleDates :" + error);
        }
        
    }

    const deleteAppointment = async (id) => {
        try {
            const response = await api.post(`donor/annuler/appointment/${id}`);
            toast.success('Rendez-vous annulé avec succès');
        } catch (error) {
            console.error('Erreur lors de l’annulation du rendez-vous:', error);
        }
    };
    const updateAppointemt = async (id , status) => {
        try {
            const response = await api.put(`centreManager/appointments/${id}`, status);
            if(response.data.success){
                toast.success(response.data.message);
            };
        } catch (error) {
            console.error('Erreur lors de l’annulation du rendez-vous:', error);
        }
    };

    const getCentreAppointements = async () => {
        try {
            const response = await api.get(`centreManager/appointments`);
            setCentreAppointments(response.data.appointments)
            // console.log(response.data.appointments)
        } catch (error) {
            console.error('Erreur lors de l’annulation du rendez-vous:', error);
        }
    };

    return (
        <AppointmentContext.Provider value={{
            getAppointmentFileds,
            appointmentFileds,
            getUnavailbleDates,
            unavailbleDates,
            createAppointment,
            getUnavailableTimes,
            unavailbleTimes,
            deleteAppointment,
            updateAppointemt,
            getCentreAppointements
        }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export const useAppointment = () => useContext(AppointmentContext);