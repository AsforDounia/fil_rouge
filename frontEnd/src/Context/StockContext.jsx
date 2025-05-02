import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';
import { toast } from "react-toastify";


export const StockContext = createContext();

export const StockProvider = ({ children }) => {

    const [stocks, setStocks] = useState();
    
    const getStocks = async () => {
        try {
            const response = await api.get(`stocks`);
            setStocks(response.data.stocks);
        } catch (error) {
            toast.error("Error fetching Stocks :" + error);
        }
    };




    return (
        <StockContext.Provider value={{
            getStocks,
            stocks,

        }}>
            {children}
        </StockContext.Provider>
    );
}

export const useStock = () => useContext(StockContext);