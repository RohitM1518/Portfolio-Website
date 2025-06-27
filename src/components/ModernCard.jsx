import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Calendar, MapPin, Briefcase } from 'lucide-react'
import { cn } from '../lib/utils'

const ModernCard = ({ 
  title, 
  description, 
  image, 
  githubUrl, 
  liveUrl, 
  technologies = [], 
  type = 'project',
  company,
  period,
  location,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <div className="flex gap-2">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github size={16} className="text-white" />
              </a>
            )}
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={16} className="text-white" />
              </a>
            )}
          </div>
        </div>
        
        {/* Experience details */}
        {type === 'experience' && (
          <div className="flex flex-col gap-2 mb-3 text-sm text-gray-300">
            {company && (
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>{company}</span>
              </div>
            )}
            {period && (
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{period}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ModernCard 