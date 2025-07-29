import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ModernHero, Section, Icon, Button } from '../components'
import { useTheme } from '../context/ThemeContext'
import { CSS, Reactico, HTML, Java, Javascript, NodeJS } from '../assets/icons/index'

const Home = () => {
  const navigate = useNavigate()
  const { currentTheme } = useTheme()


  const techStack = [
    'React', 'JavaScript', 'Node.js', 'MongoDB', 'Express.js', 'Python', 'Java', 'Docker', 
    'Git', 'AWS', 'TypeScript', 'Next.js', 'Redux', 'TailwindCSS', 'PostgreSQL', 'GraphQL'
  ]

  const skills = [
    'Full-Stack Development', 'AI/ML Integration', 'Cloud Architecture', 'Database Design',
    'API Development', 'DevOps', 'Mobile Development', 'UI/UX Design', 'System Design'
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--color-backgroundGradient)', color: 'var(--color-text)' }}>


      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {'ROHIT   M'.split('').map((letter, index) => (
                <span 
                  key={index}
                  className={`inline-block ${letter === ' ' ? 'w-4' : 'hover:glitch-hover cursor-default'}`}
                  data-text={letter}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {letter}
                </span>
              ))}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-mono typewriter text-center px-4" style={{ color: 'var(--color-textSecondary)' }}>
                Full-Stack Developer & AI Enthusiast
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 font-mono font-medium transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                style={{ 
                  borderColor: 'var(--color-primary)', 
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                VIEW PROJECTS
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="px-6 sm:px-8 py-3 sm:py-4 font-mono font-medium transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-text)'
                }}
              >
                GET IN TOUCH
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: currentTheme.primary }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100, null],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Infinite Scroll Tech Stack */}
      <section className="py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-center mb-12 font-mono"
        >
          TECH STACK
        </motion.h2>
        
        {/* First Row - Left to Right */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 w-16 sm:w-24 lg:w-32 h-full z-10" style={{ background: 'linear-gradient(to right, var(--color-backgroundGradient), transparent)' }}></div>
          <div className="absolute right-0 top-0 w-16 sm:w-24 lg:w-32 h-full z-10" style={{ background: 'linear-gradient(to left, var(--color-backgroundGradient), transparent)' }}></div>
          
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 glass-card glass-card-hover"
              >
                <span className="text-sm sm:text-base lg:text-lg font-mono transition-colors" style={{ color: 'var(--color-textSecondary)' }}>
                  {tech}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 w-16 sm:w-24 lg:w-32 h-full z-10" style={{ background: 'linear-gradient(to right, var(--color-backgroundGradient), transparent)' }}></div>
          <div className="absolute right-0 top-0 w-16 sm:w-24 lg:w-32 h-full z-10" style={{ background: 'linear-gradient(to left, var(--color-backgroundGradient), transparent)' }}></div>
          
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8 whitespace-nowrap"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 glass-card glass-card-hover"
              >
                <span className="text-sm sm:text-base lg:text-lg font-mono transition-colors" style={{ color: 'var(--color-textSecondary)' }}>
                  {skill}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-mono">
              ABOUT ME
            </h2>
            <p className="text-xl leading-relaxed mb-8 font-mono" style={{ color: 'var(--color-textSecondary)' }}>
              I'm a passionate full-stack developer with expertise in modern web technologies 
              and AI integration. I love creating innovative solutions that push the boundaries 
              of what's possible on the web.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
              className="px-8 py-4 border font-mono transition-all duration-300"
              style={{ 
                borderColor: 'var(--color-primary)', 
                color: 'var(--color-primary)',
                backgroundColor: 'transparent'
              }}
            >
              LEARN MORE
            </motion.button>
          </div>
          
          <div className="relative">
            <motion.div
              className="w-full h-96 glass-card relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-mono mb-4">{'</>'}</div>
                  <div className="text-2xl font-mono" style={{ color: 'var(--color-textSecondary)' }}>Code is Poetry</div>
            </div>
            </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 font-mono">
            LET'S BUILD SOMETHING AMAZING
          </h2>
          <p className="text-xl mb-12 font-mono" style={{ color: 'var(--color-textSecondary)' }}>
            Ready to bring your ideas to life? Let's collaborate and create something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 font-mono font-medium transition-all duration-300 text-sm sm:text-base"
              style={{ 
                borderColor: 'var(--color-primary)', 
                color: 'var(--color-primary)',
                backgroundColor: 'transparent'
              }}
            >
              START A PROJECT
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/resume')}
              className="px-8 py-4 font-mono font-medium transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--color-primary)', 
                color: 'var(--color-text)'
              }}
            >
              VIEW RESUME
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home