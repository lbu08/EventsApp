import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { AddEventForm } from "./components/AddEventForm";
import { EventsPage, loader as EventsPageLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: EventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        //loader: EventsPageLoader,
        // action: addComment,
      },
      {
        path: "/event/:new",
        element: <AddEventForm />,
        //loader: EventsPageLoader,
        // action: addNewEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
