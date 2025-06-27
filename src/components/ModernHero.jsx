import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import Button from './Button'

const ModernHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
            <span className="animate-pulse">👋</span>
            Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
        >
          Rohit Mugalkhod
        </motion.h1>

        {/* Role */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-4">
            Full-Stack Developer & AI Enthusiast
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate computer science engineering student with expertise in full-stack web development, 
            AI/ML, and cloud platforms. Building innovative solutions that bridge creativity and functionality.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 mb-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">9.53</div>
            <div className="text-sm text-gray-400">CGPA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">5+</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">3</div>
            <div className="text-sm text-gray-400">Internships</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-white/20 rounded-full font-medium text-white hover:bg-white/10 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Download size={16} />
              Download Resume
            </span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-6">
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            href="https://github.com/RohitM1518"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <Github size={20} className="text-white" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            href="https://linkedin.com/in/rohit-mugalkhod"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <Linkedin size={20} className="text-white" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.1, y: -2 }}
            href="mailto:rmugalkhod.cse@gmail.com"
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <Mail size={20} className="text-white" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ModernHero 