import React from 'react'
import { motion } from 'framer-motion'
import { ModernCard } from '../components/index'
import { GraduationCap, Briefcase, Award, Code, Heart } from 'lucide-react'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const experiences = [
    {
      title: "Software Development Intern",
      company: "DataZymes, India",
      period: "Jan 2025 - Present",
      location: "On-site",
      description: "Successfully delivered key projects including a complete website revamp, an AI-powered chatbot with RAG capabilities, and a marketing analytics tool. Focused on modernizing company infrastructure and building data insight tools.",
      technologies: ["React", "PostgreSQL", "Tailwind CSS", "Express.js", "GCP", "RAG Pipeline", "Python", "FastAPI", "Gemini"]
    },
    {
      title: "Web Development Intern",
      company: "Plentra Technologies, India",
      period: "Oct 2024 - Nov 2024",
      location: "Remote",
      description: "Led MERN stack project migrating data from MongoDB to Firestore, highlighting full-stack and database skills. Contributed to full-stack web development projects.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Firestore", "Full-Stack Development"]
    },
    {
      title: "Web Development Intern",
      company: "Zidio Development, India",
      period: "Apr 2024 - Jun 2024",
      location: "Remote",
      description: "Developed and maintained full-stack applications, including a Feedback Collection Application and a Chat Application. Gained experience in modern web development practices.",
      technologies: ["React", "Redux", "MongoDB", "Express.js", "JWT", "bcrypt", "Docker", "Railway"]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white relative">
              <span className="inline-block animate-glitch">ABOUT</span>
              <span className="inline-block ml-4 animate-glitch-delay">ME</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-mono">
              &gt; A passionate computer science engineering student with expertise in full-stack web development, 
              and a strong interest and foundational experience in AI and machine learning, including RAG and cloud platforms like GCP.
            </p>
          </motion.div>

          {/* Career Objective */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                  <Code className="text-white" size={24} />
                </div>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold break-words">&gt; CAREER_OBJECTIVE</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed font-mono">
                A passionate computer science engineering student with expertise in full-stack web development, 
                and a strong interest and foundational experience in AI and machine learning, including RAG and cloud platforms like GCP. 
                I am flexible and ready to explore diverse opportunities in the tech industry, adapting to various roles beyond full-stack development.
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold break-words">&gt; EDUCATION</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-mono font-semibold text-white mb-2">B.Tech Computer Science Engineering</h3>
                <p className="text-gray-300 mb-2 font-mono">Presidency University, Bangalore</p>
                <p className="text-sm text-gray-400 mb-3 font-mono">Dec 2021 - Jul 2025</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/20 text-white rounded font-mono text-sm font-medium">
                    CGPA: 9.53/10
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-mono font-semibold text-white mb-2">Higher Education (12th Grade)</h3>
                <p className="text-gray-300 mb-2 font-mono">SRA PU College, Banahatti</p>
                <p className="text-sm text-gray-400 mb-3 font-mono">Jun 2019 - Jul 2021</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/20 text-white rounded font-mono text-sm font-medium">
                    Percentage: 94.5%
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Professional Experience */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold break-words">&gt; PROFESSIONAL_EXPERIENCE</h2>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-mono font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-lg text-gray-300 font-mono">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 font-mono">{exp.period}</p>
                      <p className="text-sm text-gray-400 font-mono">{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 font-mono leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 bg-white/10 text-white rounded text-sm font-mono hover:bg-white/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Overview */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-lg">
                <Code className="text-white" size={24} />
      </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold break-words">&gt; TECHNICAL_SKILLS</h2>
      </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-mono font-semibold text-white mb-4">WEB_DEVELOPMENT</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Redux", "TailwindCSS", "Express.js", "Spring Boot"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-white/10 text-white rounded text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-mono font-semibold text-white mb-4">DATABASES</h3>
                <div className="flex flex-wrap gap-2">
                  {["MySQL", "MongoDB", "PostgreSQL"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-white/10 text-white rounded text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-mono font-semibold text-white mb-4">LANGUAGES</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "JavaScript"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-white/10 text-white rounded text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-mono font-semibold text-white mb-4">CLOUD_&_OTHERS</h3>
                <div className="flex flex-wrap gap-2">
                  {["GCP", "Docker", "Git", "AI/ML"].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-white/10 text-white rounded text-sm font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-lg">
                <Award className="text-white" size={24} />
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-mono font-bold break-words">&gt; ACHIEVEMENTS</h2>
      </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Award className="text-white" size={20} />
                  <h3 className="text-lg font-mono font-semibold text-white">Book Review Competition</h3>
                </div>
                <p className="text-gray-300 font-mono text-sm">Second Prize - 2023</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Award className="text-white" size={20} />
                  <h3 className="text-lg font-mono font-semibold text-white">Microsoft Learn Student Ambassador</h3>
      </div>
                <p className="text-gray-300 font-mono text-sm">Community Leadership</p>
              </motion.div>
        </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About