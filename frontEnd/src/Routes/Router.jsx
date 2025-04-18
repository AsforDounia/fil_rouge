import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { StatsProvider } from "../Context/StatsContext";
import { TestimonialProvider } from "../Context/TestimonialContexte";
import { EventProvider } from "../Context/EventContext";
import HomeLayout from "../Components/Layouts/HomeLayout";
import About from "../pages/About";



export const Router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <StatsProvider>
  //       <TestimonialProvider>
  //         <EventProvider>

  //         <Home />
  //         </EventProvider>
  //       </TestimonialProvider>
  //     </StatsProvider>
  //   ),
  // },
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
      // other child routes can go here
    ],
  },
  // {
  //   path: "/event",
  //   element: <Event />
  // },

]);
