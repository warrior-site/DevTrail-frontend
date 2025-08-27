import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRepos } from "../store/repoAction";
import { Link } from "react-router-dom";

const Repos = () => {
  const dispatch = useDispatch();
  const user= useSelector((state) => state.user.user);
  const{ _id: userId, githubUsername } = user || {};
  let repos = useSelector((state) => state.repos.repo);
const loading = useSelector((state) => state.repos.loading);
// const repos = repo.repos
if(repos){
  repos=repos.repos
}
  

  useEffect(() => {
  if (userId && githubUsername) {
    dispatch(fetchRepos({ userId, githubUsername }));
  }
}, [dispatch, userId, githubUsername]);

  if (!repos) return <p className="text-green-400">Loading repos...</p>;
  // if (error) return <p className="text-red-400">Error: {error}</p>;
//   const repos = [
//   {
//     id: 1,
//     name: "managify-core",
//     description: "Core backend service",
//     url: "https://github.com/example/managify-core",
//     stars: 45,
//     forks: 12,
//     language: "JavaScript",
//     updatedAt: "2025-08-01T10:00:00Z",
//   },
//   {
//     id: 2,
//     name: "managify-ui",
//     description: "Frontend with Tailwind + React",
//     url: "https://github.com/example/managify-ui",
//     stars: 30,
//     forks: 5,
//     language: "TypeScript",
//     updatedAt: "2025-08-20T10:00:00Z",
//   },
// ];



  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-400 mb-4">GitHub Repositories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <div
              key={repo.id}
              className="border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-5  shadow-fuchsia-500/5 rounded-xl  shadow-md hover:shadow-green-400/40 transition duration-300"
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
              <Link to={`/repo/${repo.id}`} className="block text-green-400 mt-3 text-sm hover:underline">
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
