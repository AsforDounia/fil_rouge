import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {

    const [donations, setDonations] = useState();

    const getDonations = async (page = 1) => {
        try {
            const response = await api.get(`donations?page=${page}`);
            setDonations(response.data.donations);
        } catch (error) {
            toast.error("Error fetching Donations :" + error);
        }
    };

    const getAllDonations = async (page = 1) => {
        try {
            const response = await api.get(`donations?page=${page}`);
            setDonations(response.data.donations);
        } catch (error) {
            toast.error("Error fetching Donations :" + error);
        }
    };
    
    return (
        <DonationContext.Provider value={{
            getDonations,
            donations,
            getAllDonations
       
        }}>
            {children}
        </DonationContext.Provider>
    );
}

export const useDonation = () => useContext(DonationContext);