import React from 'react'

const Section = ({shortText, Head, content}) => {
  return (
    <div>
        <p className='font-semibold text-xl uppercase pl-2'>{shortText} </p>
          <h1 className='text-7xl md:text-[7rem] font-roboto tracking-tight'>{Head}</h1>
          <p className='text-sm md:text-md mt-5 ml-2 opacity-70 tracking-widest'>{content}</p>
    </div>
  )
}

export default Section