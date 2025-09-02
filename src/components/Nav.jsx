import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

export default function Nav({ isAuthenticated, onLogout }) {
  const [open, setOpen] = useState(false);
  const { loading, user } = useSelector((state) => state.user);
  if (user) {
    isAuthenticated = true
  } else {
    isAuthenticated = false
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gray-900 w-[100%] text-green-300 px-6 py-4 flex justify-between items-center shadow-lg"
    >
      {/* Glow Laser Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-green-500"
        animate={{
          boxShadow: [
            "0px 0px 10px rgba(34,197,94,0.6)",
            "0px 0px 20px rgba(34,197,94,0.9)",
            "0px 0px 10px rgba(34,197,94,0.6)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Brand Name */}
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl font-bold text-green-400 relative z-10">
          Managify
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-6 relative z-10">
        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 "
          >
            Navigate <ChevronDown size={16} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-green-500 rounded-md shadow-lg">
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-green-600 hover:text-white"
              >
                Home Page
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-green-600 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/project"
                className="block px-4 py-2 hover:bg-green-600 hover:text-white"
              >
                Projects
              </Link>
              <Link
                to="/repo"
                className="block px-4 py-2 hover:bg-green-600 hover:text-white"
              >
                Repository
              </Link>
              <Link
                to="/journal"
                className="block px-4 py-2 hover:bg-green-600 hover:text-white"
              >
                Journal
              </Link>
              <Link
                to="/resume"
                className="block px-4 py-2 hover:bg-green-600 hover:text-white"
              >
                Resume Builder
              </Link>
            </div>
          )}
        </div>

        {/* Conditional Login/Logout */}
        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
