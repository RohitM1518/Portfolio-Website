import React from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon'
import {
  Discord,
  Github,
  LinkedIn,
  X
} from '../assets/icons/index'

const Footer = () => {
  const socialLinks = [
    { icon: Discord, url: "#", name: "Discord" },
    { icon: Github, url: "https://github.com/RohitM1518", name: "GitHub" },
    { icon: LinkedIn, url: "https://www.linkedin.com/in/rohit-mugalkhod-192466220/", name: "LinkedIn" },
    { icon: X, url: "https://twitter.com/RohitSM5?t=ZpKijzrs2q9ycqdMCjiQcQ&s=08", name: "Twitter" }
  ]

  return (
    <footer className="bg-black border-t border-white/20 mt-20 relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
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
            <h3 className="text-2xl font-mono font-bold text-white mb-2 tracking-wider">
              &gt; ROHIT_MUGALKHOD
            </h3>
            <p className="text-gray-400 font-mono text-sm">Full-Stack_Developer && AI_Enthusiast</p>
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
                className="p-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 group"
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
            <p className="text-gray-400 text-sm font-mono">
              © {new Date().getFullYear()} ROHIT_MUGALKHOD
            </p>
            <p className="text-gray-500 text-xs font-mono mt-1">
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
          className="mt-8 pt-8 border-t border-white/20"
        >
          <div className="text-center">
            <p className="text-gray-400 text-sm font-mono">
              &gt; DESIGNED_AND_DEVELOPED_WITH &lt;3 IN BANGALORE
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer