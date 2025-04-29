import React, { createContext, useContext, useState } from 'react'
import api from '../api/axios';


// export const CenterContext = createContext();

// export const CenterProvider = ({ children }) => {

//     const [centers , setCenters] = useState();

//     const getCenters = async (page = 1) => {
//         try {
//           const response = await api.get(`centers?page=${page}`);
//           setCenters(response.data.centers);
//         } catch (error) {
//           console.error('Error fetching Centers:', error);
//         }
//     };

//     return (
//         <CenterContext.Provider value={{
//             getCenters,
//             centers,
//         }}>
//             {children}
//         </CenterContext.Provider>
//     );
// }

// export const useCenter = () => useContext(CenterContext);




const CenterContext = createContext();

export const CenterProvider = ({ children }) => {
  const [centers, setCenters] = useState(null);
  const [allCenters, setAllCenters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get all centers with pagination
  const getCenters = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`centers?page=${page}`);
      setCenters(response.data.centers);
      setError(null);
      return response.data.centers;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      console.error('Error fetching centers:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllCentres = async() => {
    try {
      const response = await api.get('allCenters');
      setAllCenters(response.data.centers);
      setError(null);
      return response.data.centers;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
      console.error('Error fetching centers:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }
  // New function to search centers for autocomplete suggestions
  const searchCenters = async (query) => {
    if (!query || query.length < 1) return [];
    
    try {
      const response = await api.get(`centers/search?q=${encodeURIComponent(query)}`);
      return response.data.data || [];
    } catch (err) {
      console.error('Error searching centers:', err);
      return [];
    }
  };

  return (
    <CenterContext.Provider
      value={{
        centers,
        loading,
        error,
        getCenters,
        searchCenters,
        getAllCentres,
        allCenters
      }}
    >
      {children}
    </CenterContext.Provider>
  );
};

export const useCenter = () => useContext(CenterContext);