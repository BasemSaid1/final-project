import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import doctorImg from "../../assets/2.png";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://myclinicproj.runasp.net/api/Doctor/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load doctor data. Try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-emerald-700 text-2xl font-bold animate-pulse">
          Loading Dr. data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition transform hover:scale-105"
        >
          Try again
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition transform hover:scale-105"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex justify-center">
            <img
              src={doctorImg}
              alt="doctor"
              className="w-full max-w-[200px] rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="md:w-2/3 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-emerald-700">
              Dr. {doctor.firstName} {doctor.lastName}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">Email:</span>
                <span className="text-gray-600">{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">Phone:</span>
                <span className="text-gray-600">{doctor.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">
                  SpecialtyName:
                </span>
                <span className="text-gray-600">
                  {doctor.specialtyName || "unavailable"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">
                  Licensing:
                </span>
                <span className="text-gray-600">{doctor.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">
                  Experience:
                </span>
                <span className="text-gray-600">
                  {doctor.yearsOfExperience} year
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">Cost:</span>
                <span className="text-gray-600">
                  {doctor.consultationFees} EGP
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-gray-700 w-28">
                  Description:
                </span>
                <span className="text-gray-600">{doctor.description}</span>
              </div>
              <button
                onClick={() => navigate(`/bookAppointment/${doctor.id}`)}
                className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
              >
                Book an appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
