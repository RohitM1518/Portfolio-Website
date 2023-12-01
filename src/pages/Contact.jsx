import React from 'react'
import {ContactForm} from '../components/index'

const Contact = () => {
  return (
    <div className='flex flex-col items-center'>
    
    <h1 className=' text-xl leading-tight md:text-[3rem] font-roboto -tracking-tight font-semibold'>How about teaming up for a shared project?</h1>
    <h1 className=' text-lg mt-6 mb-3'>A simple email is all it takes to connect with me.</h1>
   
    <div>
      <ContactForm />
    </div>
    </div>
  )
}

export default Contact