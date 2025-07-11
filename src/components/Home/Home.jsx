import React from "react";
import homeImg from "../../assets/home.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen p-8">
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to <span className="text-blue-500">CLINIC!</span> <br /> Your
          health journey made <br />
          <span className="text-blue-500"> simple</span>.
        </h1>
        <p className="text-gray-600 text-lg">
          We're here to link you directly to improved health outcomes, <br />
          effortlessly connecting you with the care you need.
        </p>
        <div className="text-center mt-10 ">
          <Link to="/findDoctor">
            <button className="bg-blue-500 w-50 cursor-pointer text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition">
              Find a Doctor
            </button>
          </Link>
        </div>
      </div>

      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={homeImg}
          alt="homeImg"
          className="rounded-lg shadow-md h-120"
        />
      </div>
    </div>
  );
}
