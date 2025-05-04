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

    const updateStock = async (stockId , formData) => {
        try {
            const response = await api.put(`stocks/${stockId}` , formData);
            if (response.data.success) {
                setStocks(currentStocks =>
                  currentStocks.map(stock =>
                    stock.id === stockId ? { ...stock, ...formData, updated_at: new Date().toISOString() } : stock
                  )
                );
                toast.success(response.data.message);
            }
 
        } catch (error) {
            toast.error("Error fetching Stocks :" + error);
        }
    };

    const addStock = async (formData) => {
        try {
            const response = await api.post(`stocks/` , formData);
            if (response.data.success) {
                setStocks(currentStocks => [...currentStocks, response.data.stock]);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching Stocks :" + error);
        }
    };

    const deleteStock = async (stockId) => {
        try {
            const response = await api.delete(`stocks/${stockId}`);
            if (response.data.success) {
                setStocks(currentStocks => currentStocks.filter(stock => stock.id !== stockId));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error fetching Stocks :" + error);
        }
    };




    return (
        <StockContext.Provider value={{
            getStocks,
            stocks,
            updateStock,
            addStock,
            deleteStock

        }}>
            {children}
        </StockContext.Provider>
    );
}

export const useStock = () => useContext(StockContext);