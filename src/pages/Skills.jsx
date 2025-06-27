import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components'
import { 
  JavaColored,
  HTMLColored,
  PythonColored,
  TailwindColored,
  ReactColored,
  javascriptcolored,
  mongodb,
  DockerImage,
  GitImage
} from '../assets/icons/index'
import { Code, Database, Cloud, Palette, Wrench, BookOpen } from 'lucide-react'

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const skillCategories = [
    {
      title: "Web Development",
      icon: <Code className="text-white" size={24} />,
      skills: [
        { name: "React", icon: ReactColored, level: "Advanced" },
        { name: "JavaScript", icon: javascriptcolored, level: "Advanced" },
        { name: "HTML/CSS", icon: HTMLColored, level: "Advanced" },
        { name: "Tailwind CSS", icon: TailwindColored, level: "Advanced" }
      ]
    },
    {
      title: "Backend & Databases",
      icon: <Database className="text-white" size={24} />,
      skills: [
        { name: "MongoDB", icon: mongodb, level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "MySQL", level: "Intermediate" }
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code className="text-white" size={24} />,
      skills: [
        { name: "Python", icon: PythonColored, level: "Advanced" },
        { name: "Java", icon: JavaColored, level: "Advanced" },
        { name: "JavaScript", icon: javascriptcolored, level: "Advanced" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="text-white" size={24} />,
      skills: [
        { name: "Google Cloud Platform", level: "Intermediate" },
        { name: "Docker", icon: DockerImage, level: "Intermediate" },
        { name: "Git & GitHub", icon: GitImage, level: "Advanced" },
        { name: "Railway", level: "Intermediate" }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Wrench className="text-white" size={24} />,
      skills: [
        { name: "RAG Pipeline", level: "Intermediate" },
        { name: "Gemini AI", level: "Intermediate" },
        { name: "Machine Learning", level: "Beginner" },
        { name: "FastAPI", level: "Intermediate" }
      ]
    },
    {
      title: "Design & Tools",
      icon: <Palette className="text-white" size={24} />,
      skills: [
        { name: "Adobe Premiere Pro", level: "Intermediate" },
        { name: "Canva", level: "Advanced" },
        { name: "Figma", level: "Intermediate" },
        { name: "UI/UX Design", level: "Intermediate" }
      ]
    }
  ]

  const coursework = [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Computer Networks",
    "AI and Machine Learning",
    "Cryptography and Network Security",
    "Big Data",
    "Cloud Computing"
  ]

  const softSkills = [
    "Communication",
    "Team Collaboration", 
    "Problem Solving",
    "Adaptability",
    "Critical Thinking",
    "Leadership",
    "Creativity"
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white relative">
              <span className="inline-block animate-glitch">TECHNICAL</span>
              <span className="inline-block ml-4 animate-glitch-delay">SKILLS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-mono">
              &gt; A comprehensive overview of my technical expertise, spanning full-stack development, 
              AI/ML, cloud platforms, and modern design tools.
            </p>
          </motion.div>

          {/* Skills Categories */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: categoryIndex * 0.1,
                  ease: "easeOut" 
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-4 sm:p-6 lg:p-8 hover:border-white/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                  <div className="p-2 sm:p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                    {category.icon}
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold break-words">&gt; {category.title.toUpperCase().replace(/\s+/g, '_')}</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05
                      }}
                      className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 hover:border-white/40 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        {skill.icon && (
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 filter brightness-0 invert flex-shrink-0"
                          />
                        )}
                        <h3 className="font-mono font-medium text-white text-sm sm:text-base break-words">{skill.name}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-400 font-mono">{skill.level}</span>
                        <div className="flex gap-1">
                          {[...Array(skill.level === 'Advanced' ? 3 : skill.level === 'Intermediate' ? 2 : 1)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                          ))}
                          {[...Array(3 - (skill.level === 'Advanced' ? 3 : skill.level === 'Intermediate' ? 2 : 1))].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600 rounded-full" />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Coursework */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-mono font-bold">&gt; RELEVANT_COURSEWORK</h2>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coursework.map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-mono text-white">{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 rounded-lg">
                <Palette className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-mono font-bold">&gt; SOFT_SKILLS</h2>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
              <div className="flex flex-wrap gap-4">
                {softSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-mono text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills