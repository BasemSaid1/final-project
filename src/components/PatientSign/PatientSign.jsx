import React from "react";
import patientImg from "../../assets/patient.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PatientSign() {
  let navigate = useNavigate();

  const handleRegister = (values, { setSubmitting }) => {
    axios
      .post("https://myclinicproj.runasp.net/api/Patient", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        city: values.city,
      })
      .then((res) => {
        console.log("Patient registered successfully:", res.data);
        setSubmitting(false);
        toast.success("Patient registered successfully");
        navigate(`/patientProfile/${res.data.id}`);
      })
      .catch((err) => {
        console.error("Error registering patient:", err);
        setSubmitting(false);
        toast.error(
          "Failed to register patient: " +
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
      .matches(/^01[0125][0-9]{8}$/, "Phone number must be 11 digits")
      .required("Phone Number is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${patientImg})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg m-4">
        <h2 className="font-bold text-2xl text-center mb-6">
          Join <span className="text-blue-500">CLINIK</span> as a Patient
        </h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {[
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phoneNumber", label: "Phone Number", type: "text" },
            { name: "city", label: "City", type: "text" },
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
              {formik.touched[field.name] && formik.errors[field.name] ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors[field.name]}
                </div>
              ) : null}
            </div>
          ))}

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
