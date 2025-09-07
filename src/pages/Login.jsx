import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../store/userAction'
import "../index.css"
import { toast } from "react-toastify"

function Login() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { user, message, loading } = useSelector(state => state.user) // <-- use loading from redux
  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    await dispatch(loginUser(userData));
    if ( user) {
      toast.success(message);
      navigate('/journal');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Login Card */}
      <div className="relative group bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_20px_rgba(0,245,255,0.3)] 
        w-full max-w-md sm:max-w-lg md:w-[40vw] p-6 flex flex-col items-center justify-center overflow-hidden animate-fadeIn">
        
        {/* Animated gradient border overlay */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-75 animate-borderMove -z-10"></div>
        
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 z-10">Login to your account</h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-sm relative z-10">
          <div className="flex flex-col text-left">
            <label className="text-sm text-gray-300 mb-1">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="p-3 rounded-lg bg-black/60 text-white border border-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm text-gray-300 mb-1">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg bg-black/60 text-white border border-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:opacity-90 transition flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Sign up redirect */}
        <p className="text-gray-300 text-sm mt-6 z-10">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-cyan-400 hover:text-purple-400 underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
