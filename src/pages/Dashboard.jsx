import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/userAction";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Dashboard() {
  const { loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading user...
      </div>
    );
  }

  return (
    <div className="w-[80%] text-white flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full bg-gray-900 rounded-2xl shadow-2xl p-10 border border-cyan-500/40 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-8 mb-10">
          <motion.img
            src={user.avatar || user.profileImage}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #00ffff" }}
          />
          <div>
            <h1 className="text-4xl font-bold text-cyan-400">
              {user.username || "Unnamed User"}
            </h1>
            <p className="text-lg text-gray-300">
              {user.email || "Email not provided"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {user.isVerified ? "✅ Verified" : "❌ Not Verified"}
            </p>
          </div>
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-cyan-300">💡 Bio</h2>
          <p className="text-gray-300 mt-2 italic leading-relaxed">
            {user.bio || "No bio provided yet..."}
          </p>
        </motion.div>

        {/* Social Links */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-cyan-300 mb-3">
            🌐 Social Links
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(user.socialLinks || {}).map(([platform, link]) =>
              link ? (
                <a
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-cyan-300 hover:text-cyan-100 transition"
                >
                  {platform.toUpperCase()}
                </a>
              ) : (
                <span
                  key={platform}
                  className="text-gray-500 italic text-sm col-span-1"
                >
                  {platform.toUpperCase()}: Not Provided
                </span>
              )
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 text-center mb-10">
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-gray-800 rounded-xl">
            <p className="text-4xl font-extrabold text-cyan-300 drop-shadow-lg">
              {user.projectCount ?? 0}
            </p>
            <p className="text-gray-400 text-sm">Projects</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-gray-800 rounded-xl">
            <p className="text-4xl font-extrabold text-cyan-300 drop-shadow-lg">
              {user.journalCount ?? 0}
            </p>
            <p className="text-gray-400 text-sm">Journals</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-gray-800 rounded-xl">
            <p className="text-4xl font-extrabold text-cyan-300 drop-shadow-lg">
              {user.repoCount ?? 0}
            </p>
            <p className="text-gray-400 text-sm">Repos</p>
          </motion.div>
        </div>

        {/* Extra Info */}
        <div className="text-sm text-gray-400 space-y-2 mb-10">
          <p>
            🗓 Joined:{" "}
            <span className="text-cyan-300 font-medium">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </p>
          <p>
            ⏳ Last Login:{" "}
            <span className="text-cyan-300 font-medium">
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Not Recorded"}
            </span>
          </p>
          <p>
            🐙 GitHub Username:{" "}
            <span className="text-cyan-300 font-medium">
              {user.githubUsername || "Not Provided"}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Link
            to="/update-profile"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition"
          >
            Update Profile
          </Link>
          <button
            onClick={logoutHandle}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
