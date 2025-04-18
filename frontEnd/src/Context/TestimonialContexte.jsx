import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';


export const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {
    const [testimonials, setTestimonials] = useState([]);

    // const getTestimonials = async () => {
    //     try {
    //         const response = await api.get('/testimonials');
    //         setTestimonials(response.data.temoignages.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const getTestimonials = async (page = 1) => {
        try {
          const response = await api.get(`testimonials?page=${page}`);
          setTestimonials(response.data.temoignages);
        } catch (error) {
          console.error('Error fetching testimonials:', error);
        }
      };
    return (
        <TestimonialContext.Provider value={{
            getTestimonials,
            testimonials
        }}>
            {children}
        </TestimonialContext.Provider>
    );
}

export const useTestimonial = () => useContext(TestimonialContext);