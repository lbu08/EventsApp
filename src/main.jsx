import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage, loader as EventsPageLoader } from "./pages/EventsPage";
//import {  SearchEvent,  loader as SearchEventLoader,} from "../src/components/SearchEvent";
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
        //loader: EventPageLoader,
        // action: addComment,
      },
      {
        path: "/event/:eventId",
        //element: <SearchEvent />,
        //loader: SearchEventLoader,
        // action: addComment,
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
