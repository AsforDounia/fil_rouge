import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { StatsProvider } from "../Context/StatsContext";
import { TestimonialProvider } from "../Context/TestimonialContexte";
import { EventProvider } from "../Context/EventContext";
import HomeLayout from "../Components/Layouts/HomeLayout";
import About from "../pages/About";
import { AuthProvider } from "../Context/AuthContext";
import Login from "../pages/Login";
import ProtectedRoute from "../Components/ProtectedRoute";

import AuthRoute from "../Components/AuthRoute";
import DonorDashboard from "../pages/Donor/DonorDashboard";




export const Router = createBrowserRouter([

  {
    path: "/",
    element: (
          <HomeLayout />
    ),
    children: [
      {
        index: true,
        element:(
          <StatsProvider>
            <TestimonialProvider>
              <EventProvider>
                <Home />
              </EventProvider>
            </TestimonialProvider>
          </StatsProvider>
        ),
         
      },
      // other child routes can go here
    ],
  },

  {
    path: "/about",
    element: (
          <HomeLayout />
    ),
    children: [
      {
        index: true,
        element:(
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
        element: <Login />
      }
    ]
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
      <Login />
      </AuthProvider>
    )
  },
  {
    path: "/donneur",
    element: (
      <AuthProvider>
        <ProtectedRoute roles={["centre_manager"]}>
            <div>hello</div>
            <DonorDashboard />
        </ProtectedRoute>
      </AuthProvider>
    )
  },
  {
    path: "/unauthorized",
    element: (
      <div>unauthorized</div>
      )

  }


]);
