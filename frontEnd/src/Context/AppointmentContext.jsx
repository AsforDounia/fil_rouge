import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [appointmentFileds , setAppointmentFileds] = useState(null);
    const [unavailbleDates , setUnavailbleDates] = useState(null);

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

    return (
        <AppointmentContext.Provider value={{
            getAppointmentFileds,
            appointmentFileds,
            getUnavailbleDates,
            unavailbleDates
        }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export const useAppointment = () => useContext(AppointmentContext);