import React from 'react'
import { motion } from 'framer-motion'
import { ModernCard } from '../components'
import BlogImg from "../assets/icons/blog.png"
import YoutubeImg from "../assets/icons/youtube.png"
import PortfolioImg from "../assets/icons/portfolio.jpg"
import ChatImg from '../assets/icons/chatImage.jpg'
import { Feedback, SocialMedia } from '../assets/icons'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const projects = [
    {
      title: "FomoFeed",
      description: "A comprehensive social media application with user authentication, post management, and interactive features like likes and comments. Built with modern web technologies for optimal performance.",
      image: SocialMedia,
      githubUrl: "https://github.com/RohitM1518/Social-Media-Application.git",
      liveUrl: "https://fomofeed.netlify.app/",
      technologies: ["React", "Redux", "Mongoose", "Express.js", "JWT", "bcrypt", "MongoDB", "Docker", "Railway"]
    },
    {
      title: "Intellia",
      description: "An AI-powered chatbot with integrated knowledge base and source-referencing capabilities via RAG pipeline. Features full-stack development with authentication and cloud deployment.",
      image: ChatImg,
      githubUrl: "https://github.com/RohitM1518/Chat-Application.git",
      liveUrl: "https://rohitchatapp1518.netlify.app/",
      technologies: ["React", "Express.js", "GCP", "RAG Pipeline", "Authentication", "Cloud Deployment"]
    },
    {
      title: "Website Revamp",
      description: "Complete website transformation from WordPress/PHP to modern stack, enhancing UI/UX with responsive design and admin functionality for content management.",
      image: PortfolioImg,
      githubUrl: "https://github.com/RohitM1518/Portfolio-Website.git",
      liveUrl: "https://rohit-m.netlify.app/",
      technologies: ["React", "PostgreSQL", "Tailwind CSS", "Express.js", "Responsive Design", "Admin Panel"]
    },
    {
      title: "Nebula AI",
      description: "Advanced AI chatbot with integrated knowledge base featuring source-referencing capabilities through RAG pipeline. Deployed on GCP for scalability and reliability.",
      image: ChatImg,
      technologies: ["React", "Express.js", "GCP", "RAG Pipeline", "AI/ML", "Cloud Deployment"]
    },
    {
      title: "NOVO Mix",
      description: "Marketing analytics tool with advanced insights generation. Integrated frontend with backend services using FastAPI, featuring Gemini for analytics with Celery and Redis for background processing.",
      image: BlogImg,
      technologies: ["React", "Python", "FastAPI", "Gemini", "Celery", "Redis", "Analytics"]
    },
    {
      title: "EchoCollect",
      description: "A comprehensive feedback collection application designed to gather and analyze user feedback efficiently. Features modern UI and robust backend architecture.",
      image: Feedback,
      githubUrl: "https://github.com/RohitM1518/Feedback-Project.git",
      liveUrl: "https://echocollect.netlify.app/",
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white relative">
              <span className="inline-block animate-glitch">MY</span>
              <span className="inline-block ml-4 animate-glitch-delay">PROJECTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-mono">
              &gt; A showcase of my recent work spanning full-stack development, AI/ML applications, 
              and modern web technologies. Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-mono font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-white/10 border border-white/20 text-white rounded text-xs font-mono hover:bg-white/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-mono text-sm text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-mono text-sm hover:bg-gray-200 transition-all duration-300"
                      >
                        <ExternalLink size={16} />
                        Live
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-8 hover:border-white/40 transition-all duration-300">
              <h2 className="text-3xl font-mono font-bold mb-4">&gt; INTERESTED_IN_COLLABORATION?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-mono">
                I'm always excited to work on new projects and collaborate with fellow developers. 
                Let's build something amazing together!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black rounded-lg font-mono font-medium hover:bg-gray-200 transition-all duration-300"
              >
                GET_IN_TOUCH()
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects