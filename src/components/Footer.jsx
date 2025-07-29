import React from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'
import {
  Discord,
  Github,
  LinkedIn,
  X
} from '../assets/icons/index'

const Footer = () => {
  const { currentTheme } = useTheme()
  const socialLinks = [
    { icon: Discord, url: "#", name: "Discord" },
    { icon: Github, url: "https://github.com/RohitM1518", name: "GitHub" },
    { icon: LinkedIn, url: "https://www.linkedin.com/in/rohit-mugalkhod-192466220/", name: "LinkedIn" },
    { icon: X, url: "https://twitter.com/RohitSM5?t=ZpKijzrs2q9ycqdMCjiQcQ&s=08", name: "Twitter" }
  ]

  return (
    <footer className="mt-20 relative" style={{ 
      background: 'var(--color-backgroundGradient)', 
      borderTop: `1px solid var(--color-primary)` 
    }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: currentTheme.primary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-mono font-bold mb-2 tracking-wider" style={{ color: 'var(--color-text)' }}>
              &gt; ROHIT_MUGALKHOD
            </h3>
            <p className="font-mono text-sm" style={{ color: 'var(--color-textSecondary)' }}>Full-Stack_Developer && AI_Enthusiast</p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.3 + index * 0.1 
                }}
                viewport={{ once: true }}
                className="p-3 backdrop-blur-sm rounded-lg transition-all duration-300 group"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid var(--color-primary)`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'var(--color-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'var(--color-primary)';
                }}
                title={social.name}
              >
                <Icon src={social.icon} className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* Right - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-sm font-mono" style={{ color: 'var(--color-textSecondary)' }}>
              © {new Date().getFullYear()} ROHIT_MUGALKHOD
            </p>
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-textSecondary)' }}>
              ALL_RIGHTS_RESERVED
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8"
          style={{ borderTop: `1px solid var(--color-primary)` }}
        >
          <div className="text-center">
            <p className="text-sm font-mono" style={{ color: 'var(--color-textSecondary)' }}>
              &gt; DESIGNED_AND_DEVELOPED_WITH &lt;3 IN BANGALORE
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer