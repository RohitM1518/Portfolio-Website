import React from 'react'
import {Button} from '../components/index'
const About = () => {
  return (
    <div className=' max-lg:m-4'>
      <div className='flex justify-center bg-fuchsia-100 p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 '>
      <h1 className='text-2xl md:text-md mt-4 opacity-70 tracking-widest max-w-sm text-center '>Hey there! I'm <span className=' opacity-100 font-bold'> Rohit Mugalkhod </span>, and my journey into computer science began not with coding but with a background in biology. Currently pursuing my B.Tech in Computer Science Engineering at <i className=' font-semibold'>Presidency University</i> in Bangalore, I discovered a passion for this field despite having no prior experience. Motivated by this newfound interest, I took the leap, diving headfirst into the world of technology. </h1>
      </div>
      <div className='mt-20 shadow-lg py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-green-100 p-2'>
        <h1 className=' text-5xl font-mono font-light opacity-90 text-center'>Background & Journey</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>Coming from a biology background in high school, I initially felt like a fish out of water in the vast sea of computer science. However, my curiosity drove me to dive headfirst into the challenges. The initial struggles with Java programming soon transformed into a passion, culminating in my emergence as the top student in Data Structures and Algorithms.</h1>
      </div>
      <div className=' mt-20 shadow-lg py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-stone-200 p-2'>
        <h1 className=' text-5xl font-mono font-light opacity-90 text-center'>Passions & Interests</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>Beyond the lines of code, I'm deeply passionate about full-stack web development. The intersection of creativity and functionality in building user-friendly applications is what keeps me hooked. I'm also intrigued by the world of finance and business, with a keen eye on the stock market.</h1>
      </div>


      <div className='mt-20 shadow-lg py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-indigo-100 p-2'>
        <h1 className=' text-5xl font-mono font-light opacity-90 text-center'>Projects & Initiatives</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'><i className=' font-semibold'>Home Automation using Arduino and various Sensors (1st Year):</i> This project, developed with C programming, introduced me to various sensors like temperature, light, and motion sensors, and their versatile applications in automating home environments. It showcased the potential of merging hardware and software for seamless smart solutions. 
<br />
<br />
<i className=' font-semibold'>Cloud Storage using Raspberry Pi (2nd Year):</i> I built a remote-accessible storage system using Raspberry Pi. This project provided valuable insights into server operations, leveraging Raspberry Pi's capabilities, and employing SSH for secure communication. 
<br />
<br />
Currently, I'm diligently working on a <i className=' font-semibold'>backend project</i>, delving deeper into the intricacies of server-side development. This project, combined with my independent exploration of React, Tailwind CSS, Express.js, and MongoDB, fuels my passion for technology. The ability to create solutions from scratch, encompassing both front-end and back-end aspects, empowers me to tackle challenges independently and holistically. 
<br />
<br />
I have also worked on a <i className=' font-semibold'>Blog project</i> using React, Appwrite, and Tailwind. This experience enriched my skills in API requests, database queries, and the overall development process. </h1>
      </div>

      <div className='mt-20 shadow-lg py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-pink-100 p-2'>
        <h1 className=' text-5xl font-mono font-light opacity-90 text-center'>Vision & Future Plans </h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>Looking towards the future, I envision myself as a professional adaptable to various roles in the tech industry. I am flexible and ready to explore diverse opportunities, beyond full-stack development. </h1>
      </div>
      <div className='mt-20 shadow-lg py-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 bg-rose-100 p-2'>
        <h1 className=' text-5xl font-mono font-light opacity-90 text-center'>Let's Connect!</h1>
        <h1 className='text-md md:text-md opacity-70 tracking-widest mt-2'>I'm always open to collaboration, learning, and sharing experiences. Whether you're a fellow developer, potential collaborator, or just someone passionate about tech, feel free to reach out. Let's connect and explore the exciting possibilities in the world of technology together!</h1>
        <div className='flex justify-around'>
        <Button url='/contact'>Connect</Button>
        </div>
      </div>
    </div>
  )
}

export default About