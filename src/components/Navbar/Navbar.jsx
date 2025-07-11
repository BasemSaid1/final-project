import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { UserLogin, setUserLogin } = useContext(userContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");

  function signup() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setUserLogin(null);
    navigate("/login");
    setMenuOpen(false);
  }

  return (
    <nav className="bg-[#0a95c0] fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link to="" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>

        <button
          className="lg:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {UserLogin && (
            <ul className="flex gap-4">
              <li>
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#b3e5fc] font-bold"
                      : "text-white hover:text-[#b3e5fc]"
                  }
                >
                  Home
                </NavLink>
              </li>
              {userRole && userId && (
                <li>
                  <NavLink
                    to={
                      userRole === "doctor"
                        ? `/doctorProfile/${userId}`
                        : `/patientProfile/${userId}`
                    }
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#b3e5fc] font-bold"
                        : "text-white hover:text-[#b3e5fc]"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="findDoctor"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#b3e5fc] font-bold"
                      : "text-white hover:text-[#b3e5fc]"
                  }
                >
                  Find a Doctor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#b3e5fc] font-bold"
                      : "text-white hover:text-[#b3e5fc]"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="flex gap-3">
            {UserLogin ? (
              <li>
                <span
                  onClick={signup}
                  className="cursor-pointer text-white hover:text-[#b3e5fc] flex items-center gap-1"
                >
                  Signout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#b3e5fc] font-bold"
                        : "text-white hover:text-[#b3e5fc]"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#b3e5fc] font-bold"
                        : "text-white hover:text-[#b3e5fc]"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a95c0] shadow-md p-4">
          <ul className="flex flex-col items-center gap-4">
            {UserLogin && (
              <>
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#b3e5fc] font-bold"
                        : "text-white hover:text-[#b3e5fc]"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                {userRole && userId && (
                  <li>
                    <NavLink
                      to={
                        userRole === "doctor"
                          ? `/doctorProfile/${userId}`
                          : `/patientProfile/${userId}`
                      }
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#b3e5fc] font-bold"
                          : "text-white hover:text-[#b3e5fc]"
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to="findDoctor"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#b3e5fc] font-bold"
                        : "text-white hover:text-[#b3e5fc]"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Find a Doctor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#b3e5fc] font-bold"
                        : "text-white hover:text-[#b3e5fc]"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact Us
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="mt-4 flex flex-col items-center gap-3">
            {UserLogin ? (
              <span
                onClick={() => {
                  signup();
                  setMenuOpen(false);
                }}
                className="cursor-pointer text-white hover:text-[#b3e5fc] flex items-center gap-1"
              >
                Signout
              </span>
            ) : (
              <>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#b3e5fc] font-bold"
                      : "text-white hover:text-[#b3e5fc]"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#b3e5fc] font-bold"
                      : "text-white hover:text-[#b3e5fc]"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
