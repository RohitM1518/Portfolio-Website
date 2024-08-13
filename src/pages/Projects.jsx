import React from 'react'
import { Card } from '../components'
import BlogImg from "../assets/icons/blog.png"
import YoutubeImg from "../assets/icons/youtube.png"
import PortfolioImg from "../assets/icons/portfolio.jpg"
import { Link } from 'react-router-dom'
import ChatImg from '../assets/icons/chatImage.jpg'
import { Feedback, SocialMedia } from '../assets/icons'


const Projects = () => {
  return (
    <div className='grid grid-cols-4 max-lg:grid-cols-3 justify-center max-sm:grid-cols-1 text-sm gap-10'>
      <Card skill="FomoFeed" skillimg={SocialMedia} isGithub={true} githubURL='https://github.com/RohitM1518/Social-Media-Application.git' isWebsite={true} websiteURL='https://fomofeed.netlify.app/'/>
      <Card skill="ChatWave" skillimg={ChatImg} isGithub={true} githubURL='https://github.com/RohitM1518/Chat-Application.git' isWebsite={true} websiteURL='https://rohitchatapp1518.netlify.app/'/>
      <Card skill="EchoCollect" skillimg={Feedback} isGithub={true} githubURL='https://github.com/RohitM1518/Feedback-Project.git' isWebsite={true} websiteURL='https://echocollect.netlify.app/'/>
      <Card skill="Backend For Youtube Clone" skillimg={YoutubeImg} isGithub={true} githubURL='https://github.com/RohitM1518/Youtube-Clone-Backend-Project.git'/>
      <Card skill="Portfolio Website" skillimg={PortfolioImg} isGithub={true} githubURL='https://github.com/RohitM1518/Portfolio-Website.git' isWebsite={true} websiteURL='https://rohit-m.netlify.app/'/>
      <Card skill="Blog Project" skillimg={BlogImg} isGithub={true} githubURL='https://github.com/RohitM1518/Blog-Project.git' isWebsite={true} websiteURL='https://blog-news-15.netlify.app/'/>
    </div>
  )
}

export default Projects