import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Skills from './pages/Skills.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminSettings from './pages/AdminSettings.jsx'
import DocumentManager from './pages/DocumentManager.jsx'
import { ProtectedRoute } from './components'
import { AuthProvider } from './context/AuthContext'

const router=createBrowserRouter([
  {
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
      {
        path: '/admin/login',
        element: <Login />,
      },
      {
        path: '/admin/dashboard',
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
      },
      {
        path: '/admin/settings',
        element: <ProtectedRoute><AdminSettings /></ProtectedRoute>,
      },
      {
        path: '/admin/documents',
        element: <ProtectedRoute><DocumentManager /></ProtectedRoute>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
