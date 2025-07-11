import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import patientImg from "../../assets/Mask Group (2).png";
export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("جاري جلب بيانات المريض بالـ ID:", id);
    axios
      .get(`https://myclinicproj.runasp.net/api/Patient/${id}`)
      .then((res) => {
        console.log("بيانات المريض:", res.data);
        setPatient(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات المريض:", err);
        console.error("تفاصيل الخطأ:", err.response?.data || err.message);
        setError("فشل تحميل بيانات المريض. حاول تاني.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-emerald-700 text-2xl font-bold animate-pulse">
          جاري تحميل بيانات المريض...
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
          try again
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition transform hover:scale-105"
        >
          return
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
              src={patientImg}
              alt="patient"
              className="w-full max-w-[200px] rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="md:w-2/3 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-emerald-700">
              {patient.firstName} {patient.lastName}
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">Email:</span>
                <span className="text-gray-600">{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">Phone:</span>
                <span className="text-gray-600">{patient.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 w-28">City:</span>
                <span className="text-gray-600">{patient.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
