import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';



export const DonContext = createContext();

export const DonProvider = ({ children }) => {

    const [donationsCountUser , setDonationsCountUser] =useState();

    const getCountUserDonations = async () => {
        try{
            const response = await api.get('donations/user/count');
            setDonationsCountUser(response.data.count);
            
        }
        catch(error){
            console.error(error);
        }

    }

    return (
        <DonContext.Provider value={{

            getCountUserDonations,
            donationsCountUser
        }}>
            {children}
        </DonContext.Provider>
    );
}

export const useDon = () => useContext(DonContext);