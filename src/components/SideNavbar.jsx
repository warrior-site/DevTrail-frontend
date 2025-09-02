import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogIn, UserPlus, LayoutDashboard, FileText, Book, Github, Menu, Folder, Kanban } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./style.css"

const links = [
  { to: "/", label: "Home", icon: <Home size={20} /> },
  { to: "/login", label: "Login", icon: <LogIn size={20} /> },
  { to: "/signup", label: "Signup", icon: <UserPlus size={20} /> },
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { to: "/resume", label: "Resume", icon: <FileText size={20} /> },
  { to: "/repo", label: "Repo", icon: <Github size={20} /> },
  { to: "/journal", label: "Journal", icon: <Book size={20} /> },
  { to: "/project", label: "Project", icon: <Kanban size={20} /> },
];

export default function SideNavbar() {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`sidenav-button1
    fixed z-30 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700
    transition-all duration-200
    top-4 left-4 p-2
    md:top-2 md:left-2 md:p-1 sm:top-2 sm:left-2 sm:p-1
  `}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar (always mounted, just animates) */}
      <motion.aside
        animate={{ width: isOpen ? 240 : 45 }} // 👈 animate width
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed left-0 top-0 h-screen z-20 
                   bg-gradient-to-b from-gray-900 via-gray-800 to-black
                   text-gray-200 shadow-xl flex flex-col py-6 overflow-hidden"
      >
        <motion.div
          className="text-2xl font-bold mt-8 mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent px-4"
          animate={{ opacity: isOpen ? 1 : 0 }}
        >
          MyApp
        </motion.div>

        <nav className="flex flex-col gap-4 w-full">
          {links.map((link, i) =>
            !(user && (link.to === "/login" || link.to === "/signup")) && (
              <NavLink
                key={i}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition 
                  ${isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "hover:bg-gray-800"}`
                }
              >
                {link.icon}
                {isOpen && <span>{link.label}</span>}
              </NavLink>
            )
          )}
        </nav>
      </motion.aside>
    </>
  );
}
