import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Notfound from "./components/Notfound/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FindDoctor from "./components/FindDoctor/FindDoctor";
import Contact from "./components/Contact/Contact";
import ChooseRole from "./components/ChooseRole/ChooseRole";
import PatientSign from "./components/PatientSign/PatientSign";
import DoctorSign from "./components/DoctorSign/DoctorSign";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import DoctorProfile from "./components/DoctorProfile/DoctorProfile";
import PatientProfile from "./components/PatientProfile/PatientProfile";
import BookAppointment from "./components/BookAppointment/BookAppointment";
import UserContextProvider from "./context/userContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "findDoctor",
        element: (
          <ProtectedRoute>
            <FindDoctor />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "chooseRole",
        element: (
          <ProtectedRoute>
            <ChooseRole />
          </ProtectedRoute>
        ),
      },
      {
        path: "doctorSign",
        element: (
          <ProtectedRoute>
            <DoctorSign />
          </ProtectedRoute>
        ),
      },
      {
        path: "patientSign",
        element: (
          <ProtectedRoute>
            <PatientSign />
          </ProtectedRoute>
        ),
      },
      { path: "forgetpass", element: <ForgetPass /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        path: "doctorProfile/:id",
        element: (
          <ProtectedRoute>
            <DoctorProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "patientProfile/:id",
        element: (
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookAppointment/:id",
        element: (
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster />
      </UserContextProvider>
    </>
  );
}

export default App;
