import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DonorDashboard from "../pages/Donor/DonorDashboard";
import Logout from "../Components/Logout";

import HomeLayout from "../Components/Layouts/HomeLayout";
import DashboardLayout from "../Components/Layouts/DashboardLayout";

import ProtectedRoute from "../Components/ProtectedRoute";
import AuthRoute from "../Components/AuthRoute";

import { AuthProvider } from "../Context/AuthContext";
import { StatsProvider } from "../Context/StatsContext";
import { TestimonialProvider } from "../Context/TestimonialContexte";
import { EventProvider } from "../Context/EventContext";
import { RequestProvider } from "../Context/RequestContext";
import { DonProvider } from "../Context/DonContext";
import { DonorProvider } from "../Context/DonorContext";
import Appointment from "../pages/Donor/Appointment";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: 
    <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <StatsProvider>
            <TestimonialProvider>
              <EventProvider>
                <Home />
              </EventProvider>
            </TestimonialProvider>
          </StatsProvider>
        ),
      },
    ],
  },
  {
    path: "/about",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <TestimonialProvider>
            <About />
          </TestimonialProvider>
        ),
      },
    ],
  },
  {
    element: (
      <AuthProvider>
        <AuthRoute />
      </AuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/logout",
    element: (
      <AuthProvider>
        <Logout />
      </AuthProvider>
    ),
  },
  {
    path: "/donor",
    element: 
    <AuthProvider>
      <ProtectedRoute roles={["donor"]}>
        <DashboardLayout />
      </ProtectedRoute>
    </AuthProvider>,
    children: [
      {
        index: true,
        element: (
          // <AuthProvider>
            <DonorProvider>
                <DonorDashboard />
              </DonorProvider>
          // </AuthProvider>
        ),
      },
    ],
  },
  {
    path: "/rdv",
    element: 
    <AuthProvider>
        <DashboardLayout />
    </AuthProvider>,
    children: [
      {
        index: true,
        element: (
        
                <Appointment />
      
        ),
      },
    ],
  },


  
  {
    path: "/unauthorized",
    element: <div>unauthorized</div>,
  },
]);