import React, { useEffect,useState } from 'react'
import MainRoutes from './routes/MainRoutes'
import { checkAuthStatus } from './store/userAction'
import { useDispatch } from "react-redux"
import './index.css'
import Nav from './components/Nav'
import SideNavbar from './components/SideNavbar'

function App() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div className=" main-main relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/2 w-[500px] h-[500px] bg-gray-800/40 rounded-full blur-3xl"></div>
      </div>

      {/* Multiple Laser lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="laser-line"></div>
        <div className="laser-line delay-1000"></div>
        <div className="laser-line delay-2000"></div>
      </div>

      {/* Floating glowing text/particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="glow-text left-[20%] top-[15%]">●</span>
        <span className="glow-text left-[60%] top-[40%]">✦</span>
        <span className="glow-text left-[75%] top-[70%]">✺</span>
        <span className="glow-text left-[35%] top-[80%]">●</span>
        <span className="glow-text left-[10%] top-[50%]">✦</span>
      </div>

      {/* App content */}
     <main className="main-app relative z-10 min-h-screen flex">
      {/* Sidebar */}
      <SideNavbar  />
       {/* isOpen={isOpen} setIsOpen={setIsOpen} */}
      {/* Content area */}
      <div className="flex-1 flex flex-col "> 
        {/* 👆 pl-60 instead of ml-60 */}
        {/* <span className={`${isOpen ? "pl-60" : "pl-[10vw]"} `}></span> */}
        <div className="flex-1 flex items-center justify-center p-6 pl-[10vw]">
          <MainRoutes />
        </div>
      </div>
    </main>

    </div>
  )
}

export default App
