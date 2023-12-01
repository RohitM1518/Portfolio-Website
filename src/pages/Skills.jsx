import React from 'react'
import { Card } from '../components'
import {HTML} from '../assets/icons/index'
import {JavaColored,
  HTMLColored,
  PythonColored,
  TailwindColored,
  ReactColored} from'../assets/icons/index'

const Skills = () => {
  return (
    <div>
    <div className='flex flex-row gap-10 max-sm:flex-col max-sm:grid-cols-2 max-lg:grid max-lg:grid-cols-3'>
      <Card skill='HTML' skillimg={HTMLColored}/>
      <Card skill='Java' skillimg={JavaColored}/>
      <Card skill='Python' skillimg={PythonColored}/>
      <Card skill='Tailwind CSS' skillimg={TailwindColored}/>
      <Card skill='React' skillimg={ReactColored}/>
    </div>
    <div  className='mt-5 mb-5 flex justify-center text-sm md:text-md opacity-70 tracking-widest'>
      <p>Lot More to Come...</p>
    </div>
    </div>
  )
}

export default Skills