import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CommitsPage = () => {
  const { id } = useParams();
  const repos = useSelector((state) => state.repos.repo?.repos || []);
  const user = useSelector((state) => state.user.user);
  const githubUsername = user?.githubUsername;

  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedRepo = repos.find((r) => String(r.id) === String(id));

  useEffect(() => {
    const fetchCommits = async () => {
      if (!githubUsername || !selectedRepo) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}/commits?per_page=15`
        );
        setCommits(res.data);
      } catch (err) {
        console.error("Error fetching commits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [githubUsername, selectedRepo]);

  if (!selectedRepo) {
    return (
      <div className="p-6 text-red-400">
        Repo not found.{" "}
        <Link to="/repo" className="underline">
          Go back
        </Link>
      </div>
    );
  }

  if (loading) {
    return <p className="p-6 text-green-400">Loading commits...</p>;
  }

  return (
    <div className="p-6 text-white min-h-screen">
      {/* Back Link */}
      <Link to={`/repo/${id}`} className="text-green-400 underline">
        ← Back to Repo
      </Link>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-400 mt-4">
        Commits for {selectedRepo.name}
      </h1>

      {/* Commits Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {commits.length > 0 ? (
          commits.map((commit) => (
            <div
              key={commit.sha}
              className="bg-[#111] p-5 rounded-xl border border-green-500/30 shadow-lg hover:shadow-green-400/30 transition"
            >
              {/* Commit Message */}
              <h2 className="text-lg font-semibold text-green-300 break-words">
                {commit.commit.message}
              </h2>

              {/* Author Info */}
              <div className="flex items-center mt-3">
                {commit.author && (
                  <img
                    src={commit.author.avatar_url}
                    alt="author avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <p className="text-sm text-gray-400">
                  By {commit.commit.author.name} (
                  {commit.author?.login || "unknown"}) on{" "}
                  {new Date(commit.commit.author.date).toLocaleString()}
                </p>
              </div>

              {/* Commit SHA */}
              <p className="text-xs text-gray-500 mt-2">
                SHA: {commit.sha.substring(0, 7)}...
              </p>

              {/* View Commit */}
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 underline mt-3 inline-block"
              >
                View Commit →
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No commits found.</p>
        )}
      </div>
    </div>
  );
};

export default CommitsPage;
