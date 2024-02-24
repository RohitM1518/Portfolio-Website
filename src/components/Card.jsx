import React from 'react'

const Card = ({skill, skillimg,imgWidth=200, imgHeight=200}) => {
  return (
    <div className='flex p-2 min-h-full '>
        <div className='shadow-lg rounded-xl hover:shadow-2xl hover:shadow-slate-500 shadow-slate-500 p-2'>
            <img src={skillimg} alt="" width={imgWidth} height={imgHeight}/>
            <div className='flex justify-center align-bottom'>
            <p className='text-center mt-2 mb-2 font-semibold'>{skill}</p>
            </div>
        </div>
    </div>
  )
}

export default Card