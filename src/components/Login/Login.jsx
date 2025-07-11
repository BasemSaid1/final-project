import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import toast from "react-hot-toast";

export default function Login() {
  const { setUserLogin, setUserRole } = useContext(userContext);
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post(`https://myclinicproj.runasp.net/login`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          localStorage.setItem("userToken", res.data.accessToken);
          setUserLogin(res.data.accessToken);

          const role = localStorage.getItem("userRole");
          setUserRole(role);

          if (role === "doctor") {
            if (res.data.id) {
              localStorage.setItem("userId", res.data.id);
              toast.success("Logged in successfully");
              navigate(`/doctorProfile/${res.data.id}`);
            } else {
              axios
                .get(
                  `https://myclinicproj.runasp.net/api/Doctor/email/${values.email}`,
                  {
                    headers: {
                      Authorization: `Bearer ${res.data.accessToken}`,
                    },
                  }
                )
                .then((doctorRes) => {
                  localStorage.setItem("userId", doctorRes.data.id);
                  toast.success("Logged in successfully");
                  navigate(`/doctorProfile/${doctorRes.data.id}`);
                })
                .catch((err) => {
                  console.error("Error fetching doctor ID:", err);
                  toast.error(
                    "Failed to fetch doctor profile. Please try again."
                  );
                });
            }
          } else if (role === "patient") {
            if (res.data.id) {
              localStorage.setItem("userId", res.data.id);
              setUserId(res.data.id);
              toast.success("Logged in successfully");
              navigate(`/patientProfile/${res.data.id}`);
            } else {
              axios
                .get(
                  `https://myclinicproj.runasp.net/api/Patient/email/${values.email}`,
                  {
                    headers: {
                      Authorization: `Bearer ${res.data.accessToken}`,
                    },
                  }
                )
                .then((patientRes) => {
                  localStorage.setItem("userId", patientRes.data.id);
                  toast.success("Logged in successfully");
                  navigate(`/patientProfile/${patientRes.data.id}`);
                })
                .catch((err) => {
                  console.error("Error fetching patient ID:", err);
                  toast.error(
                    "Failed to fetch patient profile. Please try again."
                  );
                });
            }
          } else {
            toast.success("Logged in successfully");
            navigate("/chooseRole");
          }
        } else {
          toast.error("Unexpected response from server");
          setApiError("Unexpected response from server");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response?.data?.errors) {
          const firstKey = Object.keys(err.response.data.errors)[0];
          const firstMsg = err.response.data.errors[firstKey][0];
          setApiError(firstMsg);
          toast.error(firstMsg);
        } else if (err.response?.data?.title) {
          setApiError(err.response.data.title);
          toast.error(err.response.data.title);
        } else {
          setApiError("An unexpected error occurred");
          toast.error("An unexpected error occurred");
        }
      });
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError && (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-2 mt-7">
          {ApiError}
        </div>
      )}
      <h2 className="font-bold text-2xl text-center my-4 text-[#0a95c0] mt-20">
        Login Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="w-[80%] mx-auto">
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_email" className="block text-gray-700">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            id="floating_email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-[#0a95c0] focus:border-[#0a95c0]"
            required
          />
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_password" className="block text-gray-700">
            Enter Your Password
          </label>
          <input
            type="password"
            name="password"
            id="floating_password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-[#0a95c0] focus:border-[#0a95c0]"
            required
          />
          {formik.errors.password && formik.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="text-left">
          <Link to="/forgetpass">
            <p className="my-3 text-center text-[#0a95c0] font-bold">
              Forgot Password?
            </p>
          </Link>
          <button
            type="submit"
            className="text-white bg-[#0a95c0] hover:bg-[#087f9e] font-medium rounded-lg text-sm w-full px-5 py-2.5"
            disabled={isLoading}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <div className="pt-3">
            <span>
              Don't have an account?
              <Link className="text-[#0a95c0] ps-1" to="/register">
                Register
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
