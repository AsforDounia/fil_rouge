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


    const getAllEvent  = async () => {
        try {
            const response = await api.get(`admin/events`);
            setEvents(response.data.events);
        } catch (error) {
            toast.error("Error fetching events :" + error);
        }
    };

    const deleteEvent  = async (id) => {
        try {
            const response = await api.delete(`events/${id}`);
            if(response.data.success){
                toast.success(response.data.message);
                setEvents(prevEvents => prevEvents?.filter(event => event.id !== id));
            }
        } catch (error) {
            toast.error("Error fetching events :" + error);
        }
    };


    const createEvent = async (formData) => {
        try {
            const response = await api.post(`events`,formData);
            if(response.data.success){
                toast.success(response.data.message);
                setEvents(prevEvents => [response.data.event, ...prevEvents]);
            }
        } catch (error) {
            toast.error("Error fetching events :" + error);
        } 
    };
    
    
    const updateEvent = async (formData) => {
        try {
            const response = await api.put(`events`,formData);
            if(response.data.success){
                toast.success(response.data.message);
                setEvents((prevEvents) => 
                    prevEvents.map((event) => 
                        event.id === formData.id ? { ...event, ...formData } : event
                    )
                );
            }
        } catch (error) {
            toast.error("Error updating events :" + error);
        } 
    };

    return (
        <EventContext.Provider value={{
            getEvents,
            events,
            nbComingEvents,
            comingNb,
            userParticiper,
            userEvents,
            participer,
            annulerParticipation ,
            getAllEvent,
            deleteEvent,
            createEvent,
            updateEvent
        }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEvent = () => useContext(EventContext);