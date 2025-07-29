import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Download, Mail, Phone, MapPin, Calendar, Award, Code, Briefcase, GraduationCap, ExternalLink } from 'lucide-react'
import RohitMImg from '../assets/RohitMImg.jpg'
import ResumePath from '../assets/Resume/RohitM.pdf'

const Resume = () => {
  const { currentTheme } = useTheme()
  const handleDownload = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = ResumePath
    downloadLink.download = 'RohitM(Resume).pdf'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const skills = {
    "Programming Languages": ["JavaScript", "Java", "Python", "C++", "C"],
    "Web Development": ["React", "Redux", "Express.js", "MongoDB", "Node.js", "TailwindCSS"],
    "Tools & Technologies": ["Git", "Docker", "Figma", "GCP", "Railway", "JWT", "bcrypt"],
    "AI & Cloud": ["RAG Pipeline", "Gemini AI", "FastAPI", "PostgreSQL", "MySQL"]
  }

  const projects = [
    {
      title: "FomoFeed - Social Media Application",
      technologies: "React, Redux, Mongoose, Express.js, JWT, bcrypt, MongoDB, Docker, Railway"
    },
    {
      title: "Intellia - AI Chatbot with RAG",
      technologies: "React, Express.js, GCP, RAG Pipeline, Authentication, Cloud Deployment"
    },
    {
      title: "Website Revamp Project",
      technologies: "React, PostgreSQL, Tailwind CSS, Express.js, Responsive Design"
    },
    {
      title: "NOVO Mix - Analytics Tool",
      technologies: "React, Python, FastAPI, Gemini, Celery, Redis, Analytics"
    },
    {
      title: "EchoCollect - Feedback Application",
      technologies: "React, Material UI, Express.js, MongoDB, TailwindCSS, JWT, bcrypt"
    }
  ]

  const languages = [
    { name: "Kannada", level: 100, description: "Native" },
    { name: "English", level: 90, description: "Professional" },
    { name: "Hindi", level: 40, description: "Basic" }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--color-backgroundGradient)', color: 'var(--color-text)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 relative" style={{ color: 'var(--color-text)' }}>
              <span className="inline-block animate-glitch">RESUME</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto font-mono" style={{ color: 'var(--color-textSecondary)' }}>
              &gt; A comprehensive overview of my professional journey, skills, and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Enhanced Profile Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="glass-card overflow-hidden lg:sticky lg:top-8 group">
                {/* Profile Header with Image */}
                <div className="relative">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />
                  
                  {/* Profile Image - Optimized for portrait */}
                  <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                    <motion.img 
                      src={RohitMImg} 
                      alt="Rohit Mugalkhod" 
                      className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Profile Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                    <motion.h2 
                      className="text-lg sm:text-xl lg:text-2xl font-mono font-bold text-white mb-1 tracking-wider break-words"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      ROHIT_MUGALKHOD
                    </motion.h2>
                    <motion.p 
                      className="text-gray-300 font-mono text-xs sm:text-sm mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Computer_Science_Engineer
                    </motion.p>
                    <motion.div 
                      className="flex items-center gap-2 text-gray-400 font-mono text-xs"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <MapPin size={12} />
                      <span>Bangalore, Karnataka</span>
                    </motion.div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
        </div>

                {/* Profile Details */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Contact Info */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-mono font-semibold text-white flex items-center gap-2">
                      <Phone size={16} />
                      &gt; CONTACT
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <motion.a
                        href="mailto:rmugalkhod.cse@gmail.com"
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                          <Mail size={12} sm:size={14} className="text-white" />
          </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-mono text-xs sm:text-sm">EMAIL</p>
                          <p className="text-gray-400 font-mono text-xs truncate">rmugalkhod.cse@gmail.com</p>
            </div>
                        <ExternalLink size={10} className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                      </motion.a>
                      
                      <motion.a
                        href="tel:+918073971460"
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                          <Phone size={12} className="text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-mono text-xs sm:text-sm">PHONE</p>
                          <p className="text-gray-400 font-mono text-xs">+91 8073971460</p>
                        </div>
                        <ExternalLink size={10} className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                      </motion.a>
                    </div>
            </div>

                  {/* Education */}
            <div>
                    <h3 className="text-base sm:text-lg font-mono font-semibold text-white flex items-center gap-2 mb-3 sm:mb-4">
                      <GraduationCap size={16} />
                      &gt; EDUCATION
                    </h3>
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-mono font-semibold text-white text-xs sm:text-sm break-words">B.Tech Computer Science</h4>
                          <p className="text-gray-300 font-mono text-xs">Presidency University</p>
                        </div>
                        <div className="sm:text-right flex-shrink-0">
                          <div className="px-2 py-1 bg-white/20 rounded text-xs font-mono text-white">
                            9.53/10
                          </div>
            </div>
          </div>
                      <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
                        <Calendar size={10} />
                        <span>2021 - 2025</span>
                      </div>
        </div>
      </div>

                  {/* Languages with Progress */}
        <div>
                    <h3 className="text-lg font-mono font-semibold text-white flex items-center gap-2 mb-4">
                      <Award size={16} />
                      &gt; LANGUAGES
                    </h3>
                    <div className="space-y-3">
                      {languages.map((lang, index) => (
                        <motion.div 
                          key={lang.name} 
                          className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-white/30 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono font-medium text-white text-sm">{lang.name}</span>
                            <span className="text-xs text-gray-400 font-mono">{lang.description}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.level}%` }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                              className="bg-white h-1.5 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white text-black rounded-lg font-mono font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Download size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">DOWNLOAD_RESUME()</span>
                    <span className="sm:hidden">DOWNLOAD</span>
                  </motion.button>
          </div>
              </div>
            </motion.div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-6 flex items-center gap-3">
                  <Code className="text-white" size={24} />
                  &gt; CAREER_OBJECTIVE
                </h3>
                <p className="text-gray-300 leading-relaxed font-mono">
                  A passionate computer science engineering student with expertise in full-stack web development, 
                  and a strong interest and foundational experience in AI and machine learning, including RAG and cloud platforms like GCP. 
                  I am flexible and ready to explore diverse opportunities in the tech industry, adapting to various roles beyond full-stack development.
                </p>
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-6 flex items-center gap-3">
                  <Briefcase className="text-white" size={24} />
                  &gt; PROFESSIONAL_EXPERIENCE
                </h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-white/20 pl-6">
                    <h4 className="text-lg font-mono font-semibold text-white">Software Development Intern</h4>
                    <p className="text-gray-300 font-mono text-sm">DataZymes, India | Jan 2025 - Present</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">
                      Successfully delivered key projects including website revamp, AI-powered chatbot with RAG capabilities, 
                      and marketing analytics tool. Focused on modernizing company infrastructure.
                </p>
              </div>
                  <div className="border-l-2 border-white/20 pl-6">
                    <h4 className="text-lg font-mono font-semibold text-white">Web Development Intern</h4>
                    <p className="text-gray-300 font-mono text-sm">Plentra Technologies, India | Oct 2024 - Nov 2024</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">
                      Led MERN stack project migrating data from MongoDB to Firestore, highlighting full-stack and database skills.
                </p>
              </div>
                  <div className="border-l-2 border-white/20 pl-6">
                    <h4 className="text-lg font-mono font-semibold text-white">Web Development Intern</h4>
                    <p className="text-gray-300 font-mono text-sm">Zidio Development, India | Apr 2024 - Jun 2024</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">
                      Developed and maintained full-stack applications, including Feedback Collection and Chat Applications.
                </p>
              </div>
            </div>
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-6 flex items-center gap-3">
                  <Code className="text-white" size={24} />
                  &gt; TECHNICAL_SKILLS
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category} className="bg-white/5 rounded-lg p-4 border border-white/20 hover:border-white/40 transition-all duration-300">
                      <h4 className="font-mono font-semibold text-white mb-3">{category.toUpperCase().replace(/\s+/g, '_')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-white/10 text-white rounded text-xs font-mono">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-6 flex items-center gap-3">
                  <Award className="text-white" size={24} />
                  &gt; KEY_PROJECTS
                </h3>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/20 hover:border-white/40 transition-all duration-300">
                      <h4 className="font-mono font-semibold text-white mb-2">{project.title}</h4>
                      <p className="text-gray-400 font-mono text-sm">{project.technologies}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold mb-6 flex items-center gap-3">
                  <Award className="text-white" size={24} />
                  &gt; ACHIEVEMENTS
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-mono text-white">Second Prize - Book Review Competition (2023)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-mono text-white">Microsoft Learn Student Ambassador</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Resume