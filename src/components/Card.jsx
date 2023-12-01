import React from 'react'

const Card = ({skill, skillimg}) => {
  return (
    <div className='flex p-2 '>
        <div className='shadow-lg rounded-xl hover:shadow-2xl hover:shadow-slate-500 shadow-slate-500'>
            <img src={skillimg} alt="" width={200} height={200}/>
            <p className='text-center mt-2 mb-2 font-semibold'>{skill}</p>
        </div>
    </div>
  )
}

export default Card