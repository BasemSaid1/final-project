import React, { useEffect, useState } from "react";
import doctorImg from "../../assets/doctor.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DoctorSign() {
  let navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    axios
      .get(`https://myclinicproj.runasp.net/api/Specialty`)
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((err) => {
        console.error("Error fetching specialties:", err);
      });
  }, []);

  const handleRegister = (values, { setSubmitting }) => {
    axios
      .post("https://myclinicproj.runasp.net/api/Doctor", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        specialtyId: parseInt(values.specialtyId),
        licenseNumber: values.licenseNumber,
        yearsOfExperience: parseInt(values.yearsOfExperience),
        consultationFees: parseFloat(values.consultationFees),
        description: values.description,
      })
      .then((res) => {
        setSubmitting(false);
        toast.success("Doctor registered successfully");
        navigate(`/doctorProfile/${res.data.id}`);
      })
      .catch((err) => {
        console.error("Error registering doctor:", err);
        setSubmitting(false);
        toast.error(
          "Failed to register doctor: " +
            (err.response?.data?.message || "Please try again")
        );
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required("Phone Number is required"),
    specialtyId: Yup.string().required("Specialty is required"),
    licenseNumber: Yup.string().required("License Number is required"),
    yearsOfExperience: Yup.number()
      .min(0, "Years of experience cannot be negative")
      .required("Years of Experience is required"),
    consultationFees: Yup.number()
      .min(0, "Consultation fees cannot be negative")
      .required("Consultation Fees is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      specialtyId: "",
      licenseNumber: "",
      yearsOfExperience: "",
      consultationFees: "",
      description: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${doctorImg})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg m-4">
        <h2 className="font-bold text-2xl text-center mb-6">
          Join <span className="text-blue-500">CLINIK</span> as a Doctor
        </h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {[
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phoneNumber", label: "Phone Number", type: "text" },
            { name: "licenseNumber", label: "License Number", type: "text" },
            {
              name: "yearsOfExperience",
              label: "Years of Experience",
              type: "number",
            },
            {
              name: "consultationFees",
              label: "Consultation Fees",
              type: "number",
            },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors[field.name]}
                </div>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="specialtyId" className="block text-gray-700">
              Specialty
            </label>
            <select
              name="specialtyId"
              id="specialtyId"
              value={formik.values.specialtyId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none ${
                formik.touched.specialtyId && formik.errors.specialtyId
                  ? "border-red-500"
                  : ""
              }`}
            >
              <option value="">Select a specialty</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.specialtyName}
                </option>
              ))}
            </select>
            {formik.touched.specialtyId && formik.errors.specialtyId && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.specialtyId}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center hover:scale-105 transform transition duration-300 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
