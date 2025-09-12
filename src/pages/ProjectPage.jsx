import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../store/projectAction";
import ProjectCreate from "../components/ProjectCreate";
import "./stylePage.css"
import { toast } from "react-toastify";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);

  const { project: projects, loading, error } = useSelector((state) => state.project);

  const [isCreateForm, setIsCreateForm] = useState(false);

useEffect(() => {
  const fetch = async () => {
    if (userId) {
      if (projects && projects.length > 0) {
        return; // ✅ Already have projects, skip fetching
      }

      console.log("Fetching projects for user:", userId);
      const response = await dispatch(fetchProjects(userId));

      if (response?.data?.message) {
        toast.success(response.data.message);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    }
  };

  fetch();
}, [dispatch, userId, projects]);


  return (
    <div className="w-full min-h-screen text-white flex flex-col items-center py-10 px-4">
      <div className="project-butoon-row flex justify-between items-center w-full max-w-6xl mb-8">
        <h1 className="text-3xl font-bold text-green-400">Projects</h1>
        <button
          onClick={() => setIsCreateForm((prev) => !prev)}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold transition"
        >
          {isCreateForm ? "← Back" : "+ Create Project"}
        </button>
      </div>

      {/* Conditional rendering */}
      {isCreateForm ? (
        <ProjectCreate onClose={() => setIsCreateForm(false)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Loader */}
          {loading && (
            <p className="text-center text-gray-400 col-span-2">Loading projects...</p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-400 col-span-2">⚠ {error}</p>
          )}

          {/* No projects */}
          {!loading && !error && projects.length === 0 && (
            <p className="text-center text-gray-400 col-span-2">
              No projects yet. Create your first one 🚀
            </p>
          )}

          {/* Projects */}
          {!loading &&
            !error &&
            projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px #00ff99" }}
                className="border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900  shadow-fuchsia-500/5 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
              >
                {/* Title */}
                <h2 className="text-xl font-semibold text-green-400 mb-3">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-gray-300 mb-4">{project.description}</p>

                {/* Significance */}
                <p className="text-sm italic text-green-300 mb-4">
                  {project.significance}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.techStack || []).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-green-400/10 border border-green-400/30 rounded-full text-green-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex justify-between items-center mt-auto">
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    Repo →
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    Live →
                  </a>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
