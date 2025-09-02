import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/userAction";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./stylePage.css"

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
    <div className="w-full max-w-6xl mx-auto text-white px-4 py-8">
      {/* Layout wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="col-span-1 bg-gray-900 rounded-2xl shadow-2xl p-8 border border-cyan-500/30 flex flex-col items-center"
        >
          <motion.img
            src={user.avatar || user.profileImage}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover mb-4"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #00ffff" }}
          />
          <h1 className="text-2xl font-bold text-cyan-400">
            {user.username || "Unnamed User"}
          </h1>
          <p className="text-sm text-gray-300">{user.email || "Email not provided"}</p>
          <p className="text-xs text-gray-400 mt-1">
            {user.isVerified ? "✅ Verified" : "❌ Not Verified"}
          </p>

           {/* Bio */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2 mt-10">💡 Bio</h2>
            <p className="text-gray-300 italic leading-relaxed">
              {user.bio || "No bio provided yet..."}
            </p>
          </section>

          {/* Buttons
          <div className="flex gap-3 mt-6">
            <Link
              to="/update-profile"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
            >
              Update
            </Link>
            <button
              onClick={logoutHandle}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
            >
              Logout
            </button>
          </div> */}
        </motion.div>

        {/* Right column - Info sections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="col-span-2 bg-gray-900 rounded-2xl shadow-2xl p-8 border border-cyan-500/30 flex flex-col gap-8"
        >
          {/* Bio
          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">💡 Bio</h2>
            <p className="text-gray-300 italic leading-relaxed">
              {user.bio || "No bio provided yet..."}
            </p>
          </section> */}

          {/* Stats */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">📊 Your Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-xl text-center">
                <p className="text-4xl font-extrabold text-cyan-300">
                  {user.projectCount ?? 0}
                </p>
                <p className="text-gray-400 text-sm">Projects</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-xl text-center">
                <p className="text-4xl font-extrabold text-cyan-300">
                  {user.journalCount ?? 0}
                </p>
                <p className="text-gray-400 text-sm">Journals</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-xl text-center">
                <p className="text-4xl font-extrabold text-cyan-300">
                  {user.repoCount ?? 0}
                </p>
                <p className="text-gray-400 text-sm">Repos</p>
              </motion.div>
            </div>
          </section>

          {/* Social Links */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-300 mb-3">🌐 Social Links</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(user.socialLinks || {}).map(([platform, link]) =>
                link ? (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-cyan-300 hover:text-cyan-100 transition"
                  >
                    {platform.toUpperCase()}
                  </a>
                ) : (
                  <span
                    key={platform}
                    className="text-gray-500 italic text-xs col-span-1"
                  >
                    {platform.toUpperCase()}: N/A
                  </span>
                )
              )}
            </div>
          </section>

          {/* Extra Info */}
          <section className="text-sm text-gray-400 space-y-2">
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
              🐙 GitHub:{" "}
              <span className="text-cyan-300 font-medium">
                {user.githubUsername || "Not Provided"}
              </span>
            </p>
          </section>
          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <Link
              to="/update-profile"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
            >
              Update
            </Link>
            <button
              onClick={logoutHandle}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
