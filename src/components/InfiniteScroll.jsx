import React from 'react'
import { motion } from 'framer-motion'

const InfiniteScroll = ({ items, direction = 'left', speed = 30 }) => {
  const duplicatedItems = [...items, ...items] // Duplicate for seamless loop

  return (
    <div className="relative overflow-hidden py-8">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-6 py-4 glass-card glass-card-hover"
          >
            <span className="text-lg font-mono text-white/80 hover:text-white transition-colors">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteScroll 