import React from 'react'

const Icon = ({src,title}) => {
  return (
    <div>
        <img className='hover:cursor-pointer' src={src} alt="" width={30} height={30} title={title}/> 
    </div>
  )
}

export default Icon