import { useState } from 'react'
import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import { Header, Footer, ScrollToTop } from './components'

function App() {
  return (
    <div className='bg-black min-h-screen text-white relative'>
      <ScrollToTop />
      
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <div className='w-full h-20'></div>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
