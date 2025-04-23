import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {

  
    const [testimonials, setTestimonials] = useState([]);

    const getTestimonials = async (page = 1) => {
        try {
          const response = await api.get(`testimonials?page=${page}`);
          setTestimonials(response.data.temoignages);
        } catch (error) {
          toast.error("Erreur lors de la récupération des témoignages: " + error);
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