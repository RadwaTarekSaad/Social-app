import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Layout from "./Components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Components/Context/AuthContext";
import ProtectedRout from "./Components/ProtectedRoute/ProtectedRout";
import Profile from "./Components/Profile/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./Components/PostDetails/PostDetails";
import { ToastContainer } from "react-toastify";
import { Offline } from "react-detect-offline";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        { index: true, element:<ProtectedRout><Home/></ProtectedRout>  },
           {path:"profile", element:<ProtectedRout><Profile/></ProtectedRout>  },
            {path:"postDetails/:id", element:<ProtectedRout><PostDetails/></ProtectedRout>  },
        { path: "login", element: <Login/> },
        { path: "register", element: <Register/> },
        { path: "*", element: <NotFound/> },
      ],
    },
  ]);


  const client=new QueryClient()
  return (
    <>
    <AuthContextProvider>
      <QueryClientProvider client={client}>
      <Toaster/>
     
      <RouterProvider router={router} />
      <ToastContainer/>
      </QueryClientProvider>

    </AuthContextProvider>
    <Offline>
      <div className="bg-black text-white fixed bottom-10 left-10">
        <p>you are currently offline</p>
      </div>
      
    </Offline>
   
    
    </>
  );
};

export default App;
