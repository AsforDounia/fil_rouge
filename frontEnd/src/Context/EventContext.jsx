import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const EventContext = createContext();

export const EventProvider = ({ children }) => {

    const [events, setEvents] = useState();
    const [comingNb , setComingNb] = useState();
    const [userEvents , setUserEvents] = useState();

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

    const userParticiper = async () => {
        try {
            const response = await api.get('events/user/participer');
            setUserEvents(response.data.userEvents);
        } catch (error) {
            toast.error("Error fetching upcoming events :" + error);
        }
    }


    const participer = async (eventId) => {
        try {
            const response = await api.get(`events/participer/${eventId}`);
        } catch (error) {
            toast.error("Error fetching upcoming events :" + error);
        }
    }
    const annulerParticipation = async (eventId) => {
        try {
            const response = await api.get(`events/annuler/participer/${eventId}`);
        } catch (error) {
            toast.error("Error fetching upcoming events :" + error);
        }
    }



    return (
        <EventContext.Provider value={{
            getEvents,
            events,
            nbComingEvents,
            comingNb,
            userParticiper,
            userEvents,
            participer,
            annulerParticipation 
        }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEvent = () => useContext(EventContext);