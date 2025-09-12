import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRepos } from "../store/repoAction";
import { syncRepos } from "../store/repoAction"; // 👈 import sync action
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Repos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { _id: userId, githubUsername } = user || {};
  let repos = useSelector((state) => state.repos.repo);
  const loading = useSelector((state) => state.repos.loading);
  const [error, seterror] = useState();

  if (repos) {
    repos = repos.repos;
  }

  useEffect(() => {
  const fetchData = async () => {
    if (userId && githubUsername) {
      try {
        if (repos && repos.length > 0) {
          return; // Already have repos in Redux, skip fetching
        }

        const response = await dispatch(fetchRepos({ userId, githubUsername }));
        console.log(response);

        if (response?.data?.message) {
          toast.success(response.data.message);
        } else {
          toast.error(response?.data?.message || "Something went wrong");
          seterror(response?.data?.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch repos");
      }
    }
  };

  fetchData();
}, [dispatch, userId, githubUsername, repos]); 


  // 🔄 Handle sync again
  const handleSync = async () => {
    try {
      const response = await dispatch(syncRepos({ userId, githubUsername }));
      if (response?.data?.message) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to sync repos");
    }
  };

  if (loading) return <p className="text-green-400">⏳ Loading repositories...</p>;

  if (error)
    return (
      <div className="text-center space-y-4">
        <p className="text-red-400">⚠️ Error: {error}</p>
        <button
          onClick={handleSync}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          🔄 Sync Again
        </button>
      </div>
    );

  if (!repos || repos.length === 0)
    return (
      <div className="text-center space-y-4">
        <p className="text-green-400">📭 No repositories found</p>
        <button
          onClick={handleSync}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          🔄 Sync Again
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-400">GitHub Repositories</h2>
        <button
          onClick={handleSync}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          🔄 Sync Again
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <div
              key={repo.id}
              className="border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-5 shadow-fuchsia-500/5 rounded-xl shadow-md hover:shadow-green-400/40 transition duration-300"
            >
              <h3 className="text-lg font-semibold text-green-300">{repo.name}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {repo.description || "No description available"}
              </p>
              <div className="flex justify-between items-center text-gray-500 text-sm mt-3">
                <span>⭐ {repo.stars}</span>
                <span>🍴 {repo.forks}</span>
                <span>{repo.language}</span>
              </div>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-400 mt-3 text-sm hover:underline"
              >
                View Repo →
              </a>
              <Link
                to={`/repo/${repo.id}`}
                className="block text-green-400 mt-3 text-sm hover:underline"
              >
                Analyse Repo →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No repositories found.</p>
        )}
      </div>
    </div>
  );
};

export default Repos;
