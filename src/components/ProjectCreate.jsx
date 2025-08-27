import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../store/projectAction";

function ProjectCreate({ onClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);

  const [formData, setFormData] = useState({
    title: "",
    repoLink: "",
    liveLink: "",
    description: "",
    significance: "",
    techStack: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return console.error("User not found!");

    const payload = {
      ...formData,
      userId,
      techStack: formData.techStack.split(",").map((t) => t.trim())
    };

    dispatch(createProjectAction(payload));
    onClose && onClose(); // close form after submit
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-gradient-to-br from-zinc-900 via-black to-zinc-900  shadow-fuchsia-500/5 border-green-500/40 shadow-2xl rounded-2xl p-6 text-white"
    >
      <h2 className="text-2xl font-bold text-green-400 mb-6">🚀 Create Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="url"
          name="repoLink"
          placeholder="Repository Link"
          value={formData.repoLink}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="url"
          name="liveLink"
          placeholder="Live Link"
          value={formData.liveLink}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <textarea
          name="significance"
          placeholder="Why is this project significant?"
          value={formData.significance}
          onChange={handleChange}
          required
          rows="2"
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition"
          >
            Create
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default ProjectCreate;
