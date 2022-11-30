import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GrowBank from "../pages/GrowBank";

const router = createBrowserRouter([
  {
    path: "/growbank",
    element: <GrowBank />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
