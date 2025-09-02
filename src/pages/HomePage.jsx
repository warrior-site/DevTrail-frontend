import React from "react";
import { motion } from "framer-motion";
import "./stylePage.css"

function HomePage() {
  return (
    <div className="min-h-screen w-full  text-white flex flex-col">
      {/* bg-gradient-to-br from-black via-gray-900 to-gray-800 */}
      {/* Hero Section */}
      <header className="header-home flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="header-h1 text-5xl md:text-6xl  font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          DevTrail – Developer Management Hub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          Tired of managing projects, repos, resumes, and notes separately?  
          <span className="text-green-400 font-semibold"> DevTrail </span> brings them all into one glowing, powerful dashboard.
        </motion.p>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          ✨ Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              title: "📂 Projects",
              desc: "Manage and showcase your development projects in one place.",
              color: "from-green-400 to-teal-500",
            },
            {
              title: "🔗 GitHub Repos",
              desc: "Sync your GitHub repositories and track contributions easily.",
              color: "from-blue-400 to-indigo-500",
            },
            {
              title: "📄 AI Resume Builder",
              desc: "Generate professional resumes powered by AI instantly.",
              color: "from-purple-400 to-pink-500",
            },
            {
              title: "📓 Journals",
              desc: "Keep a daily developer journal to track your progress & ideas.",
              color: "from-orange-400 to-red-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${feature.color} text-black font-semibold hover:scale-105 hover:shadow-2xl transition-transform`}
            >
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-900">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="section-h3 text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text"
        >
          Ready to supercharge your developer journey?
        </motion.h3>
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #00ffcc" }}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold shadow-lg"
        >
          🚀 Get Started
        </motion.a>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center ">
        {/* border-t border-gray-700 bg-gradient-to-r from-gray-900 via-black to-gray-900 */}
        <p className="text-gray-400 text-sm">
          Made with 💻 by <span className="text-green-400 font-semibold">DevTrail</span>  
          | © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
