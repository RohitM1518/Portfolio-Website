import React from 'react'

const Icon = ({ src, title }) => {
  return (
    <div className="group">
      <img 
        className='w-6 h-6 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300' 
        src={src} 
        alt={title || "Social Icon"} 
        title={title}
      /> 
    </div>
  )
}

export default Icon