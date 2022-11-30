import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GrowBank from "../pages/GrowBank";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/growbank",
    element: <GrowBank />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
