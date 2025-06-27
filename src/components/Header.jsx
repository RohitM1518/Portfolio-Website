import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
    const linkItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Skills', link: '/skills' },
        { name: 'Projects', link: '/projects' },
        { name: 'Resume', link: '/resume' },
        { name: 'Contact', link: '/contact' }
    ]

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const toggleMobileMenu = (e) => {
        e.stopPropagation()
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    const mobileMenuRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                mobileMenuRef.current && 
                !mobileMenuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setMobileMenuOpen(false)
            }
        }

        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            setScrolled(isScrolled)
        }

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleOutsideClick)
        }
        
        window.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isMobileMenuOpen])

    return (
        <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
                    : 'bg-transparent'
            }`}
        >
            <div className='max-w-7xl mx-auto flex justify-between items-center p-4 px-6'>
                {/* Enhanced Logo */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className='flex items-center'
                >
                    <NavLink to="/" className="flex items-center gap-3 group">
                        {/* Modern Logo Design */}
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
                            
                            {/* Main logo container */}
                            <div className="relative w-12 h-12 rounded-full bg-white p-0.5 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                    {/* Logo content */}
                                    <span className="text-xl font-bold text-white font-mono glitch" data-text="R">
                                        R
                                    </span>
                                </div>
                            </div>
                            
                            {/* Animated dots around logo */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-30"
                            >
                                <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2" />
                                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2" />
                                <div className="absolute left-0 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2" />
                                <div className="absolute right-0 top-1/2 w-1 h-1 bg-white rounded-full transform -translate-y-1/2" />
                            </motion.div>
                        </div>
                        
                        {/* Brand Text */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300 font-mono">
                                ROHIT
                            </span>
                            <span className="text-xs text-gray-400 font-medium tracking-wider font-mono">
                                DEVELOPER
                            </span>
                        </div>
                    </NavLink>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex">
                    <ul className="flex space-x-8">
                        {linkItems.map((item, index) => (
                            <motion.li 
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) => 
                                        `relative text-gray-300 hover:text-white transition-colors duration-300 font-medium font-mono ${
                                            isActive ? 'text-white' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {item.name}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </motion.li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <div className='lg:hidden'>
                    <motion.button 
                        ref={buttonRef}
                        whileTap={{ scale: 0.95 }}
                        className='text-white p-3 rounded-lg hover:bg-white/10 transition-colors relative z-10'
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <motion.div
                            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className='lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 overflow-hidden'
                    >
                        <div className="max-w-7xl mx-auto px-6 py-6">
                            <ul className='flex flex-col space-y-2'>
                                {linkItems.map((item, index) => (
                                    <motion.li 
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <NavLink
                                            to={item.link}
                                            className={({ isActive }) => 
                                                `block text-gray-300 hover:text-white transition-colors duration-300 font-medium py-3 px-4 rounded-lg hover:bg-white/10 font-mono ${
                                                    isActive ? 'text-white bg-white/10' : ''
                                                }`
                                            }
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Header
