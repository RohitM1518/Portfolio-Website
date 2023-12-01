import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Header,Footer } from './components'

function App() {

  return (
    <div className=' mr-32 ml-32 max-lg:mr-0 max-lg:ml-0'>
    
    <Header />
    
    <div className='w-full h-36'>
    </div>
  
    <Outlet />
    
    <Footer />
    </div>
  )
}

export default App
