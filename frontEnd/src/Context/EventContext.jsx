import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';


export const EventContext = createContext();

export const EventProvider = ({ children }) => {

    const [events , setEvents] = useState();

    const getEvents = async (page = 1) => {
        try {
          const response = await api.get(`events?page=${page}`);
          setEvents(response.data.events);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
    };

    return (
        <EventContext.Provider value={{
            getEvents,
            events,
        }}>
            {children}
        </EventContext.Provider>
    );
}

export const useEvent = () => useContext(EventContext);