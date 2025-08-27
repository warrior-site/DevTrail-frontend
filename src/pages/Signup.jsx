import React from 'react'
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../store/userAction'

function Signup() {

    const {register,reset,handleSubmit} = useForm()
  const dispatch = useDispatch()
  const data = useSelector(state =>state.user)
  const message = useSelector(state => state.user.message)
  const navigate = useNavigate();



 const onSubmit = async (userData) => {
    await dispatch(signupUser(userData));
    if (data.user) {
      const message = useSelector(state => state.user.message)
      if(message == "User created successfully") navigate('/update-profile')
      navigate('/dashboard');
    }
   };

  return (
    <div className="flex items-center justify-center min-h-screen">
  {/* Signup Card */}
  <div className="relative group bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)] h-[70vh] w-[40vw] p-8 flex flex-col items-center justify-center overflow-hidden animate-fadeIn">
    
    {/* Animated gradient border */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-75 animate-borderMove -z-10"></div>
    
    {/* Heading */}
    <h2 className="text-2xl font-bold text-white mb-6 z-10">Create an account</h2>
    
    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-sm relative z-10">
      <div className="flex flex-col text-left">
        <label className="text-sm text-gray-300 mb-1">Name</label>
        <input
          {...register("username")}
          placeholder="Enter your name"
          className="p-3 rounded-lg bg-black/60 text-white border border-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
        />
      </div>

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
        className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
      >
        Signup
      </button>
    </form>

    {/* Login redirect */}
    <p className="text-gray-300 text-sm mt-6 z-10">
      Already have an account?{" "}
      <button
        onClick={() => navigate("/login")}
        className="text-purple-400 hover:text-cyan-400 underline font-medium"
      >
        Login
      </button>
    </p>
  </div>
</div>

  )
}

export default Signup