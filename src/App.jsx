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
import Profile from "./components/Profile/Profile";
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
import UserContextProvider from "./Context/userContext";

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "findDoctor", element: <FindDoctor /> },
      { path: "contact", element: <Contact /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "chooseRole", element: <ChooseRole /> },
      { path: "doctorSign", element: <DoctorSign /> },
      { path: "patientSign", element: <PatientSign /> },
      { path: "forgetpass", element: <ForgetPass /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "doctorProfile/:id", element: <DoctorProfile /> },
      { path: "patientProfile/:id", element: <PatientProfile /> },
      { path: "bookAppointment/:id", element: <BookAppointment /> },
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
      </UserContextProvider>{" "}
    </>
  );
}

export default App;
