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

import { DonorProvider } from "../Context/DonorContext";
import Appointment from "../pages/Donor/Appointment";
import CreateAppointment from "../pages/Donor/CreateAppointment";
import { AppointmentProvider } from "../Context/AppointmentContext";
import DonnationsHistory from "../pages/Donor/DonnationsHistory";
import { DonationProvider } from "../Context/DonationContext";
import Centers from "../pages/Donor/Centers";
import { CenterProvider } from "../Context/CenterContext";
import Requests from "../pages/Donor/Requests";

import EventsSection from "../Components/HomeComponents/EventsSection";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import { AdminProvider } from "../Context/AdminContext";
import ManageUsers from "../pages/Admin/ManageUsers";
import AddUser from "../pages/Admin/AddUser";
import AdminRequests from "../pages/Admin/AdminRequests";
import Profile from "../Components/DashboardSharedComponents/UserProfile";

import AdminEvents from "../pages/Admin/AdminEvents";
import CentreDashboard from "../pages/Centre/CentreDashboard";
import PatientDashboard from "../pages/Patient/PatientDashboard";
import CentresView from "../Components/DashboardSharedComponents/CentresView";
import EventsView from "../Components/DashboardSharedComponents/EventsView";
import RequestsView from "../Components/DashboardSharedComponents/RequestsView";
import { CentreManagerProvider } from "../Context/CentreManagerContext";
import CentreAppointments from "../pages/Centre/CentreAppointements";
import CentreRequests from "../pages/Centre/CentreRequests";
import CentreDonations from "../pages/Centre/CentreDonations";


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
            <AuthProvider>
              <EventProvider>
                <Home />
              </EventProvider>
              </AuthProvider>
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
  // {
  //   path: "/donneur",
  //   element: (
  //     <AuthProvider>
  //       <ProtectedRoute roles={["donor"]}>
  //         <DashboardLayout />
  //       </ProtectedRoute>
  //     </AuthProvider>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: (
  //         <DonorProvider>
  //           <DonorDashboard />
  //         </DonorProvider>
  //       ),
  //     },
  //   ],
  // },


  {
    path : 'admin',
    element: (
      <AuthProvider>
        <ProtectedRoute roles={["admin"]}>
          <AdminProvider>
          <DashboardLayout />
          </AdminProvider>
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "addUser",
        element: <AddUser />,
      },
      {
        path: "requests",
        element:
        <CenterProvider>
          <RequestProvider>
            <AdminRequests />
          </RequestProvider>
        </CenterProvider>
        ,
      },
      
      {
        path: "events",
        element:
        <CenterProvider>
          <EventProvider>
            <EventsView />
          </EventProvider>
        </CenterProvider>
        ,
      },
      {
        path: "profile",
        element:
          <Profile />
        ,
      },
      

    ],
  },
  {
    path : 'centre',
    element: (
      <AuthProvider>
        <ProtectedRoute roles={["centre_manager"]}>
        <CentreManagerProvider>
          <DashboardLayout />
          </CentreManagerProvider>

        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "dashboard",
        element:
        <RequestProvider>
            <AppointmentProvider>
            <CentreDashboard />
            </AppointmentProvider>
        </RequestProvider>
        ,
      },
      {
        path: "appointments",
        element:
        <AppointmentProvider>
          <CentreAppointments />
        </AppointmentProvider>,
      },
      {
        path: "events",
        element:
        <EventProvider>
        <EventsView /></EventProvider>
        ,
      },
      {
        path: "requests",
        element : (
            <RequestProvider>
              <CentreRequests />
            </RequestProvider>
        )
      },
      {
        path: "donations",
        element : (
            <DonationProvider>
              <CentreDonations />
            </DonationProvider>
        )
      },

      {
        path: "events",
        element:
          <EventProvider>
            <CenterProvider>
            <EventsView />
          </CenterProvider>
          </EventProvider>
        ,
      },
      
      {
        path: "profile",
        element:
          <Profile />
        ,
      },
      

    ],
  },
  {
    path : 'patient',
    element: (
      <AuthProvider>
        <ProtectedRoute roles={["patient"]}>
        <CenterProvider>
          <DashboardLayout />
          </CenterProvider>
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "dashboard",
        element:
        <RequestProvider>
          <PatientDashboard />
        </RequestProvider>
        ,
      },
      {
        path: "centers",
        element: <CentresView />,
      },
      {
        path: "events",
        element:
        <EventProvider>
        <EventsView /></EventProvider>
        ,
      },
      {
        path: "requests",
        element : (
            <RequestProvider>
              <RequestsView />
            </RequestProvider>
        )
      },
      
      {
        path: "profile",
        element:
          <Profile />
        ,
      },
      

    ],
  },
  {

    element: (
          <AuthProvider>
        <ProtectedRoute roles={["donor"]}>
          <DonorProvider>
          <DashboardLayout />
          </DonorProvider>
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "/donneur/dashboard",
        element: <DonorDashboard />,
      },
      {
        path: "/donneur/appointments",
        element:
        <AppointmentProvider>
        <Appointment />
        </AppointmentProvider>
      },
      {
        path : "donneur/new-appointment",
        element : (
          <AppointmentProvider>
          <CreateAppointment />
          </AppointmentProvider>
        )
      },
      {
        path : "donneur/donation-history",
        element : (
          <DonationProvider>
          <DonnationsHistory /></DonationProvider>
        )
      },
      {
        path : "donneur/centers",
        element : (
          <CenterProvider>
            <CentresView />
          </CenterProvider>
        )
      },
      {
        path : "donneur/blood-requests",
        element : (
            <RequestProvider>
              <Requests />
            </RequestProvider>
        )
      },
      {
        path : "donneur/events",
        element : (
            <EventProvider>
              <EventsView />
            </EventProvider>
        )
      },
      {
        path : "donneur/profile",
        element : (
          <AuthProvider>
            <Profile />
          </AuthProvider>
            
        )
      },
      
      // {
      //   path : "/messages",
      //   element : (
      //     <ConversationProvider>
      //         <Conversation />
      //     </ConversationProvider>
      //   )
      // }
    ],
  },
 
  {
    path: "/test",
    element: (
      <AuthProvider>
        <ProtectedRoute roles={["donor"]}>
          <div>This is a test page for donors only</div>
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/unauthorized",
    element: <div>unauthorized</div>,
  },
]);