import React, { useEffect, useState } from "react";
import logoImg from "../assets/logo.png";
import { getUserData } from "/Utils.jsx";
import Button from "./Button.jsx";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Avtar from "./Avtar.jsx";

function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(getUserData());
  }, []);

  const logout = () => {
    localStorage.clear();
    toast.error("Logout Successfully.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="Tiny Tours"
            className="h-10 cursor-pointer hover:scale-105 transition"
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {userData.name ? (
            <>
              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6 text-slate-700 font-medium">
                <Link
                  to="/dashboard"
                  className="hover:text-indigo-600 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-indigo-600 transition"
                >
                  Profile
                </Link>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avtar name={userData.name} size="lg" />
                <h2 className="hidden md:block text-slate-800 font-semibold">
                  {`Hi, ${userData.name.split(" ")[0]}`}
                </h2>
                <Button
                  title="Logout"
                  size="md"
                  variant="danger"
                  onClick={logout}
                />
              </div>
            </>
          ) : (
            <Button
              title="Login"
              variant="primary"
              size="md"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
      <Toaster />
    </nav>
  );
}

export default Navbar;
