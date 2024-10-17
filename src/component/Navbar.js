import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./form/Authprovider";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    if (isLoggedIn) {
      logout();
      toast.success("Successfully logged out!");
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-black flex items-center">
            Habit Tracker Application
          </Link>
          <div>
            <Link
              to="/habitTrackerForm"
              className="ml-4 px-4 py-2 text-sm font-medium text-black rounded-md hover:bg-black hover:bg-opacity-10"
            >
              Habit Tracker Form
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-black rounded-md hover:bg-black hover:bg-opacity-10"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 text-sm font-medium text-black rounded-md hover:bg-black hover:bg-opacity-10"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
