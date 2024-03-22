import React, { useEffect } from "react";

import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthForm from "./AuthForm";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AuthForm />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
