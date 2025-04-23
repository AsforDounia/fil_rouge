import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const EventContext = createContext();

export const EventProvider = ({ children }) => {

    const [events, setEvents] = useState();
    const [comingNb , setComingNb] = useState();

    const getEvents = async (page = 1) => {
        try {
            const response = await api.get(`events?page=${page}`);
            setEvents(response.data.events);
        } catch (error) {
            toast.error("Error fetching events :" + error);
        }
    };

    const nbComingEvents = async () => {
        try {
            const response = await api.get('events/coming/count');
            setComingNb(response.data.count);
        } catch (error) {
            toast.error("Error fetching upcoming events :" + error);
        }
    }
    return (
        <EventContext.Provider value={{
            getEvents,
            events,
            nbComingEvents,
            comingNb
        }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEvent = () => useContext(EventContext);