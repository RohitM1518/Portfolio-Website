import React from 'react'

const Icon = ({src,title}) => {
  return (
    <div>
        <img className='hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ' src={src} alt="" width={30} height={30} title={title}/> 
    </div>
  )
}

export default Icon