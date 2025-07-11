import React, { useContext } from "react";
import img from "../../assets/bgRole.png";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";

export default function ChooseRole() {
  const { setUserRole } = useContext(userContext);

  const chooseDoctor = () => {
    localStorage.setItem("userRole", "doctor");
    setUserRole("doctor");
  };

  const choosePatient = () => {
    localStorage.setItem("userRole", "patient");
    setUserRole("patient");
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="flex flex-col space-y-4">
        <Link
          to="/DoctorSign"
          onClick={chooseDoctor}
          className="px-6 py-3 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-300 hover:text-blue-700 hover:scale-105 transition duration-300 transform"
        >
          Create Account as a Doctor
        </Link>

        <Link
          to="/PatientSign"
          onClick={choosePatient}
          className="px-6 py-3 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-300 hover:text-blue-700 hover:scale-105 transition duration-300 transform"
        >
          Create Account as a Patient
        </Link>
      </div>
    </div>
  );
}
