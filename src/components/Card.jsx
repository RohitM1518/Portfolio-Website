import React from 'react'
import { Github, GithubLogo, WebsiteLogo } from '../assets/icons'
import { Link } from 'react-router-dom'

const Card = ({ skill, skillimg, imgWidth = 200, imgHeight = 200, isGithub = false, githubURL = "",isWebsite=false,websiteURL="" }) => {
  return (
    <div className='flex p-2 min-h-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 '>
      <div className='shadow-lg rounded-xl hover:shadow-2xl hover:shadow-slate-500 shadow-slate-500 p-2 flex flex-col justify-between'>
        <img src={skillimg} alt="" width={imgWidth} height={imgHeight} />
        <div className='flex justify-center align-bottom'>
            <p className='text-center mt-2 mb-2 font-semibold flex gap-2'>
          <a href={githubURL} target='_blank' className=' flex gap-2'>
              {isGithub && <img src={GithubLogo} alt="" width={20} height={5} className=' hover:cursor-pointer' />
              }              
          </a>
          {skill} 
          <a href={websiteURL} target='_blank' className='flex gap-2'>
              {isWebsite && <img src={WebsiteLogo} alt="" width={20} height={5} className='hover:cursor-pointer' />
              }         
          </a>
              </p>
        </div>
      </div>
    </div>
  )
}

export default Card