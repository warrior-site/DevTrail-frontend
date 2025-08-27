import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {motion} from "framer-motion"

const RepoComponent = () => {
  const { id } = useParams();
  const repos = useSelector((state) => state.repos.repo?.repos || []);
  const user = useSelector((state) => state.user.user);
  const githubUsername = user?.githubUsername;

  const [repoDetails, setRepoDetails] = useState(null);
  const [languages, setLanguages] = useState({});
  const [commits, setCommits] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedRepo = repos.find((r) => String(r.id) === String(id));

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!githubUsername || !selectedRepo) return;
      try {
        setLoading(true);

        // 📦 Repo details
        const repoRes = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}`
        );

        // 🛠 Languages
        const langRes = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}/languages`
        );

        // ⏳ Latest 5 commits
        const commitRes = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}/commits?per_page=5`
        );

        // 🏷 Releases
        const releaseRes = await axios.get(
          `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}/releases`
        );

        setRepoDetails(repoRes.data);
        setLanguages(langRes.data);
        setCommits(commitRes.data);
        setReleases(releaseRes.data);
      } catch (err) {
        console.error("Error fetching repo details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [githubUsername, selectedRepo]);

  if (!selectedRepo) {
    return (
      <div className="p-6 text-red-400">
        Repo not found. <Link to="/repo" className="underline">Go back</Link>
      </div>
    );
  }

  if (loading) {
    return <p className="p-6 text-green-400">Loading repo analysis...</p>;
  }

  return (
    <div className="p-6 text-white min-h-screen">
      <Link to="/repo" className="text-green-400 underline">← Back to Repos</Link>

      {/* Repo Title */}
      <h1 className="text-3xl font-bold text-green-400 mt-4">{repoDetails?.name}</h1>
      <p className="text-gray-400 mt-2">{repoDetails?.description || "No description available"}</p>

      {/* Stats + Languages */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-[#111] p-5 rounded-xl border border-green-500/30 shadow-lg">
          <h2 className="text-xl font-semibold text-green-300 mb-3">📊 Stats</h2>
          <p>⭐ Stars: {repoDetails?.stargazers_count}</p>
          <p>🍴 Forks: {repoDetails?.forks_count}</p>
          <p>👀 Watchers: {repoDetails?.watchers_count}</p>
          <p>🐛 Open Issues: {repoDetails?.open_issues_count}</p>
          <p>📅 Updated: {new Date(repoDetails?.updated_at).toLocaleDateString()}</p>
        </div>

        <div className="bg-[#111] p-5 rounded-xl border border-green-500/30 shadow-lg">
          <h2 className="text-xl font-semibold text-green-300 mb-3">🛠 Languages</h2>
          {Object.keys(languages).length > 0 ? (
            <ul>
              {Object.entries(languages).map(([lang, bytes]) => (
                <li key={lang}>
                  {lang}: {bytes} bytes
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No languages data available</p>
          )}
          
        </div>
        <motion.div 
        whileHover={{ scale: 1.05 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5 }}
        className="bg-[#111] p-3 rounded-xl border border-green-500/30 shadow-lg flex items-center justify-center  ">
            <Link to={`/commit/${selectedRepo.id}`}>
            View All Commits
          </Link>
        </motion.div>
        
      </div>

      {/* Commits Timeline
      <div className="mt-10 bg-[#111] p-5 rounded-xl border border-green-500/30 shadow-lg">
        <h2 className="text-xl font-semibold text-green-300 mb-4">📜 Latest Commits</h2>
        {commits.length > 0 ? (
          <ul className="space-y-3">
            {commits.map((commit) => (
              <li key={commit.sha} className="border-b border-white/10 pb-2">
                <p className="text-green-400">{commit.commit.message}</p>
                <p className="text-xs text-gray-400">
                  By {commit.commit.author.name} on{" "}
                  {new Date(commit.commit.author.date).toLocaleDateString()}
                </p>
                <a
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 underline"
                >
                  View Commit →
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No commits found.</p>
        )}
      </div>

      {/* Releases 
      <div className="mt-10 bg-[#111] p-5 rounded-xl border border-green-500/30 shadow-lg">
        <h2 className="text-xl font-semibold text-green-300 mb-4">🏷 Releases</h2>
        {releases.length > 0 ? (
          <ul className="space-y-3">
            {releases.map((release) => (
              <li key={release.id} className="border-b border-white/10 pb-2">
                <p className="text-green-400">{release.name || release.tag_name}</p>
                <p className="text-xs text-gray-400">
                  Published on {new Date(release.published_at).toLocaleDateString()}
                </p>
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 underline"
                >
                  View Release →
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No releases available.</p>
        )}
      </div> */}
    </div>
  );
};

export default RepoComponent;
