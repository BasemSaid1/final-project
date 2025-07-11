import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { UserLogin, setUserLogin } = useContext(userContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function signup() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("login");
  }

  return (
    <nav className="bg-[#0a95c0] fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link to="" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-15" />
        </Link>

        <button
          className="lg:hidden text-slate-700 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {UserLogin && (
            <ul className="flex gap-4">
              <li>
                <Link className="text-white" to="">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-white" to="profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="text-white" to="findDoctor">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link className="text-white" to="contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          )}

          <ul className="flex gap-3">
            {UserLogin ? (
              <li>
                <span
                  onClick={signup}
                  className="cursor-pointer text-white  flex items-center gap-1"
                >
                  Signout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link className="text-white" to="login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg--[#0a95c0] shadow-md p-4">
          <ul className="flex flex-col items-center gap-4">
            {UserLogin && (
              <>
                <li>
                  <Link className="text-white" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="findDoctor">
                    Find a Doctor
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="contact">
                    Contact Us
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-4 flex flex-col items-center gap-3">
            {UserLogin ? (
              <span
                onClick={signup}
                className="cursor-pointer text-white flex items-center gap-1"
              >
                Signout
              </span>
            ) : (
              <>
                <Link className="text-white" to="login">
                  Login
                </Link>
                <Link className="text-white" to="register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
