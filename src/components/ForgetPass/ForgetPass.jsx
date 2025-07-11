import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function forgetpass() {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    axios
      .post(`https://myclinicproj.runasp.net/forgotPassword`, {
        email: email,
      })
      .then((res) => {
        setLoading(false);
        toast.success("A verification code has been sent to your email!");
        navigate("/resetPassword");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("There was an error. Please try again.");
      });
  }

  return (
    <>
      <section className="w-[80%] mx-auto mt-20">
        <h1 className="mt-6 text-2xl font-bold capitalize text-center">
          Please enter your email to receive a verification code
        </h1>
        <div className="text-center">
          <input
            type="email"
            className="w-[80%]  p-2 border my-3 focus:border-blue-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => forgetpass()}
            className="py-2  px-3 rounded-lg border border-blue-600 text-blue-500 mt-4 hover:text-white hover:bg-blue-600"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </section>
    </>
  );
}
