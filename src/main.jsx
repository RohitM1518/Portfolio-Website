import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'

const router=createBrowserRouter([{
  path: '/',
  element:<App />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/skills',
      element: <Skills />,
    },
    {
      path: '/projects',
      element: <Projects />,
    },
    {
      path: '/resume',
      element: <Resume />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
  ],

}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
