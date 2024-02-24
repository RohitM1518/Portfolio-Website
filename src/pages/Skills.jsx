import React from 'react'
import { Card } from '../components'
import { HTML } from '../assets/icons/index'
import {
  JavaColored,
  HTMLColored,
  PythonColored,
  TailwindColored,
  ReactColored,
  javascriptcolored,
  mongodb
} from '../assets/icons/index'

const Skills = () => {
  return (
    <div>
      <div className='flex flex-row gap-10 max-sm:flex-col max-sm:grid-cols-2 max-lg:grid max-lg:grid-cols-3 justify-around'>
        <Card skill='HTML' skillimg={HTMLColored} />
        <Card skill='Java' skillimg={JavaColored} />
        <Card skill='Python' skillimg={PythonColored} />
      </div>
      <div className='flex flex-row gap-10 max-sm:flex-col max-sm:grid-cols-2 max-lg:grid max-lg:grid-cols-3  justify-around'>
        <Card skill='Tailwind CSS' skillimg={TailwindColored} />
        <Card skill='React' skillimg={ReactColored} />
        <Card skill='JavaScript' skillimg={javascriptcolored} />
      </div>
      <div className='flex flex-row gap-10 max-sm:flex-col max-sm:grid-cols-2 max-lg:grid max-lg:grid-cols-3 justify-around'>
      <Card skill='MongoDB' skillimg={mongodb} />
      </div>
      <div className='flex justify-center mt-8 border shadow-lg p-4'>
        <div>
        <div>
        <h1 className=' text-center text-3xl font-semibold'>Course Work</h1>
        </div>
        <ul className='flex flex-col gap-3 mt-3 list-disc'>
          <li>Data Structures and Algorithm</li>
          <li>Operating System</li>
          <li>Data Communication and Computer Networks</li>
          <li>AI and ML</li>
          <li>Cryptography and Network Security</li>
          <li>Mobile Application Development</li>
          
        </ul>
        </div>
      </div>
      <div className='mt-5 mb-5 flex justify-center text-sm md:text-md opacity-70 tracking-widest'>
        <p>Lot More to Come...</p>
      </div>
    </div>
  )
}

export default Skills