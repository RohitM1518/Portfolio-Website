import React from 'react'
import {Button} from '../components/index'
const About = () => {
  return (
    <div className=' max-lg:m-4'>
      <h1 className='text-2xl md:text-md mt-4 opacity-70 tracking-widest'>Hey there! I'm <span className=' opacity-100 font-bold'> Rohit Mugalkhod </span>, a budding computer science enthusiast based in Bangalore. My journey into the world of technology started with a fascination for problem-solving and a knack for turning ideas into reality.</h1>
      <div className='mt-20'>
        <h1 className=' text-5xl font-serif font-light opacity-90'>Background & Journey</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>Coming from a biology background in high school, I initially felt like a fish out of water in the vast sea of computer science. However, my curiosity drove me to dive headfirst into the challenges. The initial struggles with Java programming soon transformed into a passion, culminating in my emergence as the top student in Data Structures and Algorithms.</h1>
      </div>
      <div className=' mt-20'>
        <h1 className=' text-5xl font-serif font-light opacity-90'>Passions & Interests</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>Beyond the lines of code, I'm deeply passionate about full-stack web development. The intersection of creativity and functionality in building user-friendly applications is what keeps me hooked. I'm also intrigued by the world of finance and business, with a keen eye on the stock market.</h1>
      </div>
      <div className='mt-20'>
        <h1 className=' text-5xl font-serif font-light opacity-90'>Projects & Initiatives</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>My hands-on experiences include projects like home automation using Arduino and crafting cloud storage solutions. As the Class Representative, I initiated a project to create a collaborative hub for classmates, reflecting my commitment to improving the academic experience.</h1>
      </div>
      <div className='mt-20'>
        <h1 className=' text-5xl font-serif font-light opacity-90'>Vision & Future Plans </h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>Looking ahead, my vision is to become a seasoned professional in full-stack web development. I'm constantly exploring new technologies and methodologies to stay at the forefront of this dynamic field. In the next decade, I see myself contributing to innovative solutions that make a real impact.</h1>
      </div>
      <div className='mt-20'>
        <h1 className=' text-5xl font-serif font-light opacity-90'>Let's Connect!</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>I'm always open to collaboration, learning, and sharing experiences. Whether you're a fellow developer, potential collaborator, or just someone passionate about tech, feel free to reach out. Let's connect and explore the exciting possibilities in the world of technology together!</h1>
        <Button url='/contact'>Connect</Button>
      </div>
    </div>
  )
}

export default About