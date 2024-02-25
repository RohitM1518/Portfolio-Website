import React from 'react'
import { Card } from '../components'
import BlogImg from "../assets/icons/blog.png"
import YoutubeImg from "../assets/icons/youtube.png"
import PortfolioImg from "../assets/icons/portfolio.jpg"
import { Link } from 'react-router-dom'


const Projects = () => {
  return (
    <div className='flex justify-center max-sm:items-center text-xs gap-10 max-sm:flex-col'>
      <Link  to="https://github.com/RohitM1518/16MegaBlog">
      <Card skill="Blog Project" skillimg={BlogImg}/>
      </Link>
      <Link  to="https://github.com/RohitM1518/Youtube-Clone">
      <Card skill="Backend For Youtube Clone" skillimg={YoutubeImg}/>
      </Link>
      <Link  to="https://github.com/RohitM1518/Portfolio-Website">
      <Card skill="Portfolio Website" skillimg={PortfolioImg}/>
      </Link>
    </div>
  )
}

export default Projects