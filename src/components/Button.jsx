import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Button = ({ children, url, className = '', variant = 'primary', size = 'md' }) => {
    const navigate = useNavigate();
    
    const clickHandle = () => {
        navigate(url);
    }

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'theme-bg-primary hover:bg-opacity-90 text-white';
            case 'secondary':
                return 'theme-bg-secondary hover:bg-opacity-90 text-white';
            case 'accent':
                return 'theme-bg-accent hover:bg-opacity-90 text-white';
            case 'outline':
                return 'bg-transparent theme-border-primary border-2 theme-primary hover:theme-bg-primary hover:text-white';
            case 'ghost':
                return 'bg-transparent theme-primary hover:theme-bg-primary hover:bg-opacity-10';
            default:
                return 'theme-bg-primary hover:bg-opacity-90 text-white';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'px-3 py-1.5 text-sm';
            case 'md':
                return 'px-4 py-2 text-base';
            case 'lg':
                return 'px-6 py-3 text-lg';
            default:
                return 'px-4 py-2 text-base';
        }
    };

    return (
        <div className='m-2 mt-5'>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${getVariantClasses()} ${getSizeClasses()} rounded-lg font-medium transition-all duration-300 ${className}`}
                onClick={clickHandle}
            >
                {children}
            </motion.button>
        </div>
    )
}

export default Button
