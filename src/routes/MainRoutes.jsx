import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Signup from "../pages/Signup";
import ProjectPage from "../pages/ProjectPage";
import Dashboard from "../pages/Dashboard";
import Resume from "../pages/Resume";
import Repo from "../pages/Repos";
import Journal from "../pages/Journal";
import UpdateUser from "../pages/UpdateUser";
import RepoComponent from "../components/RepoComponent";
import CommitsPage from "../components/CommitsPage";

function MainRoutes() {
  const user = useSelector((state) => state.user.user);

  // ✅ Wrapper for private routes
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  // ✅ Wrapper for login/signup routes (redirect if already logged in)
  const AuthRoute = ({ children }) => {
    return user ? <Navigate to="/dashboard" replace /> : children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

      {/* Protected Routes */}
      <Route path="/project" element={<PrivateRoute><ProjectPage /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/resume" element={<PrivateRoute><Resume /></PrivateRoute>} />
      <Route path="/repo" element={<PrivateRoute><Repo /></PrivateRoute>} />
      <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
      <Route path="/update-profile" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
      <Route path="/repo/:id" element={<PrivateRoute><RepoComponent /></PrivateRoute>} />
      <Route path="/commit/:id" element={<PrivateRoute><CommitsPage /></PrivateRoute>} />


      {/* Catch all → redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default MainRoutes;
