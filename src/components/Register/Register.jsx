import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";

export default function Register() {
  let { UserLogin, setUserLogin } = useContext(userContext);
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleRegister(values) {
    setIsLoading(true);
    axios
      .post(`https://myclinicproj.runasp.net/register`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          navigate("/login");
        } else {
          setApiError("Unexpected response from server");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        if (res.response?.data?.errors) {
          const firstErrorKey = Object.keys(res.response.data.errors)[0];
          const firstErrorMsg = res.response.data.errors[firstErrorKey][0];
          setApiError(firstErrorMsg);
        } else if (res.response?.data?.title) {
          setApiError(res.response.data.title);
        } else {
          setApiError("An unexpected error occurred");
        }
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password min length is 6")
      .matches(
        /[^a-zA-Z0-9]/,
        "password must contain at least one special character"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      {ApiError ? (
        <div className="w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-2 mt-7">
          {ApiError}
        </div>
      ) : null}
      <h2 className="font-bold text-2xl text-center my-4 text-blue-700 mt-20">
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="w-[80%] mx-auto">
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_email" className="block text-gray-700">
            Enter Your Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_email"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full my-3 group">
          <label htmlFor="floating_password" className="block text-gray-700">
            Enter Your Password
          </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="floating_password"
            className="w-full p-2 border-2 rounded focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none"
            placeholder=""
            required
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="p-4 mb-4 text-sm text-red-800 " role="alert">
              <span className="font-medium ">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>

        <div className="text-left ">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 foucs:ring-4 focus:outline-none 
          foucs:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <div className="pt-3">
            <span>
              Have an account?
              <Link className="text-blue-500 ps-1" to="/login">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
