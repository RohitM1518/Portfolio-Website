import React from 'react'
import { Icon } from './index'
import {
  Discord,
  Github,
  LinkedIn,
  X
} from '../assets/icons/index'
const Footer = () => {
  return (
    <div className='w-full mt-5 mb-16'>
      <div className='w-full h-[1px] opacity-60 bg-black mb-4'></div>
      <div className='flex opacity-50 gap-10 items-center justify-center mt-9'>
        <a href="">
          <Icon src={Discord} />
        </a>
        <a href="https://github.com/RohitM1518">
          <Icon src={Github} />
        </a>
        <a href="https://www.linkedin.com/in/rohit-mugalkhod-192466220/">
          <Icon src={LinkedIn} />
        </a>
        <a href="https://twitter.com/RohitSM5?t=ZpKijzrs2q9ycqdMCjiQcQ&s=08">
          <Icon src={X} />
        </a>
      </div>
      <div className='flex mt-8 items-center justify-center'>
        <p className='text-sm md:text-md ml-2 opacity-70 tracking-widest'>@2023 built by Rohit
        </p>
      </div>
    </div>
  )
}

export default Footer