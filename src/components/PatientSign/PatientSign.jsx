// import React from "react";
// import patientImg from "../../assets/patient.png";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function PatientSign() {
//   let navigate = useNavigate();

//   const handleRegister = (values, { setSubmitting }) => {
//     axios
//       .post("https://myclinicproj.runasp.net/api/Patient", {
//         firstName: values.firstName,
//         lastName: values.lastName,
//         email: values.email,
//         phoneNumber: values.phoneNumber,
//         city: values.city,
//       })
//       .then((res) => {
//         console.log("Patient registered successfully:", res.data);
//         setSubmitting(false);
//         toast.success("Patient registered successfully");
//         navigate(`/patientProfile/${res.data.id}`);
//       })
//       .catch((err) => {
//         console.error("Error registering patient:", err);
//         setSubmitting(false);
//         toast.error(
//           "Failed to register patient: " +
//             (err.response?.data?.message || "Please try again")
//         );
//       });
//   };

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     phoneNumber: Yup.string()
//       .matches(/^01[0125][0-9]{8}$/, "Phone number must be 11 digits")
//       .required("Phone Number is required"),
//     city: Yup.string().required("City is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       city: "",
//     },
//     validationSchema,
//     onSubmit: handleRegister,
//   });

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-end"
//       style={{ backgroundImage: `url(${patientImg})` }}
//     >
//       <div className="bg-white bg-opacity-90 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg m-4">
//         <h2 className="font-bold text-2xl text-center mb-6">
//           Join <span className="text-blue-500">CLINIK</span> as a Patient
//         </h2>
//         <form className="space-y-4" onSubmit={formik.handleSubmit}>
//           {[
//             { name: "firstName", label: "First Name", type: "text" },
//             { name: "lastName", label: "Last Name", type: "text" },
//             { name: "email", label: "Email", type: "email" },
//             { name: "phoneNumber", label: "Phone Number", type: "text" },
//             { name: "city", label: "City", type: "text" },
//           ].map((field) => (
//             <div key={field.name}>
//               <label htmlFor={field.name} className="block text-gray-700">
//                 {field.label}
//               </label>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 id={field.name}
//                 value={formik.values[field.name]}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none ${
//                   formik.touched[field.name] && formik.errors[field.name]
//                     ? "border-red-500"
//                     : ""
//                 }`}
//               />
//               {formik.touched[field.name] && formik.errors[field.name] ? (
//                 <div className="text-red-500 text-sm mt-1">
//                   {formik.errors[field.name]}
//                 </div>
//               ) : null}
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={formik.isSubmitting}
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
//             focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center hover:scale-105 transform transition duration-300 disabled:opacity-50"
//           >
//             {formik.isSubmitting ? "Registering..." : "Create Account"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import patientImg from "../../assets/patient.png";

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId || userId !== id) {
      toast.error("Unauthorized access");
      navigate("/login");
      return;
    }

    axios
      .get(`https://myclinicproj.runasp.net/api/Patient/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        setPatient(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patient data:", err);
        toast.error("Failed to fetch patient data. Please try again.");
        setIsLoading(false);
      });
  }, [id, navigate]);

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
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: patient?.firstName || "",
      lastName: patient?.lastName || "",
      email: patient?.email || "",
      phoneNumber: patient?.phoneNumber || "",
      city: patient?.city || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setIsLoading(true);
      axios
        .put(`https://myclinicproj.runasp.net/api/Patient/${id}`, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          setPatient(res.data);
          toast.success("Profile updated successfully");
          setSubmitting(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error updating patient data:", err);
          toast.error(
            "Failed to update profile: " +
              (err.response?.data?.message || "Please try again")
          );
          setSubmitting(false);
          setIsLoading(false);
        });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-[#0a95c0] text-xl font-semibold animate-pulse">
          Loading patient profile...
        </p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-xl font-semibold">
          No patient data found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: `url(${patientImg})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md w-full md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg m-4">
        <h2 className="font-bold text-2xl text-center mb-6 text-[#0a95c0]">
          Patient Profile
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
                className={`w-full p-2 border-2 rounded focus:ring-2 focus:ring-[#0a95c0] focus:border-[#0a95c0] focus:outline-none ${
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

          <button
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            className="text-white bg-[#0a95c0] hover:bg-[#087f9e] focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center hover:scale-105 transform transition duration-300 disabled:opacity-50"
          >
            {formik.isSubmitting || isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
