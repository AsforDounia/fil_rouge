import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';



export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [statistics , setStatistics ] = useState(null);
    const [users , setUsers ] = useState(null);

    const getStatistics = async () => {
        try {
            const response = await api.get('admin/dashboard');
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    }

    const getUsers = async () => {
        try {
            const response = await api.get('admin/users');
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    }

    const addUser = async (userData) => {
        try {
          await api.post('admin/addUser', userData);
          return { success: true };
        } catch (error) {
          return { success: false, message: error.response?.data?.message || 'Add failed' };
        }
      };

    const deleteUser = async (id) => {
        try {
          await api.post(`admin/deleteUser/${id}`);
          setUsers(prevUsers => prevUsers?.filter(user => user.id !== id));
        } catch (error) {
          return { success: false, message: error.response?.data?.message || 'Add failed' };
        }
    };

    return (
        <AdminContext.Provider value={{
            getStatistics,
            statistics,
            getUsers,
            users,
            addUser,
            deleteUser,
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext);