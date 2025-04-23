import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { Router } from './Routes/Router.jsx'
import 'leaflet/dist/leaflet.css';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={Router} />
  </StrictMode>,
)
