// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function ResetPassword() {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const resetPassword = () => {
//     if (!email || !resetCode || !newPassword) {
//       alert("Please enter both email and new password.");
//       return;
//     }

//     setLoading(true);
//     axios
//       .post(`https://myclinicproj.runasp.net/resetPassword`, {
//         email: email,
//         resetCode: resetCode,
//         newPassword: newPassword,
//       })
//       .then((res) => {
//         setLoading(false);
//         toast.success("Password reset successfully!");
//         navigate("/login");
//       })
//       .catch((error) => {
//         setLoading(false);
//         if (error.res) {
//           toast.error("Error resetting password: " + error.res.data.message);
//         } else {
//           toast.error("Error resetting password. Please try again.");
//         }
//       });
//   };

//   return (
//     <>
//       <h1 className="mt-6 text-2xl font-bold capitalize">
//         Enter your new password
//       </h1>

//       <div>
//         <input
//           type="email"
//           className="w-[80%] p-2 border my-3 focus:border-blue-500 focus:outline-none"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div>
//         <input
//           type="password"
//           className="w-[80%] p-2 border my-3 focus:border-blue-500 focus:outline-none"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={resetPassword}
//         className="py-2 px-3 rounded-lg border border-blue-600 text-blue-500 mt-4 hover:text-white hover:bg-blue-600"
//       >
//         {loading ? (
//           <i className="fas fa-spinner fa-spin"></i>
//         ) : (
//           "Reset Password"
//         )}
//       </button>
//     </>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState(""); // أضفت resetCode
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = () => {
    if (!email || !resetCode || !newPassword) {
      toast.error(
        "Please enter all fields: email, reset code, and new password."
      );
      return;
    }

    setLoading(true);
    axios
      .post(`https://myclinicproj.runasp.net/resetPassword`, {
        email,
        resetCode,
        newPassword,
      })
      .then((res) => {
        toast.success("Password reset successfully!");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            "Error resetting password: " + error.response.data.message
          );
        } else {
          toast.error("Error resetting password. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Reset Your Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border-2 rounded mb-3 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Reset Code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="w-full p-2 border-2 rounded mb-3 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border-2 rounded mb-3 focus:border-blue-500 focus:outline-none"
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Reset Password"
          )}
        </button>
      </div>
    </div>
  );
}
