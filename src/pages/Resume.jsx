import React from 'react'
import RohitImg from '../assets/RohitImg.jpeg'
import ResumePath from '../assets/Resume/RohitM.pdf';

const Resume = () => {
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = ResumePath;
    downloadLink.download = 'RohitM(Resume).pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className='flex gap-3 w-auto max-lg:grid max-lg:grid-rows-1 max-lg:ml-4 max-lg:mr-4 max-lg:max-w-full overflow-hidden'>
      <div className='flex border flex-col w-1/3 max-lg:w-auto max-lg:items-center'>
        <div className='flex flex-col max-lg:items-center'>
          <img src={RohitImg} alt="" className='flex rounded-full w-52 border border-black max-lg:w-72' />
          <h1 className='text-3xl font-roboto tracking-tight font-semibold mt-3 max-lg:text-5xl'>Rohit Mugalkhod</h1>
          <p className='text-sm md:text-md mt-1 opacity-70 tracking-widest max-lg:text-xl max-lg:text-center'>Computer Science Engineer</p>
        </div>
        <div className=' xl:hidden h-[3px] max-w-full mt-3 bg-black'></div>
        <div className='max-lg:flex max-lg:flex-col max-lg:gap-5 w-full max-lg:ml-10 max-lg:max-w-full'>
          <div className='mt-5 xl:ml-2 '>
            <h1 className='text-2xl font-serif tracking-tight font-semibold mt-3 max-lg:text-3xl'>Education</h1>
            <p className=' text-lg mt-2'>Btech in Computer Science</p>
            <p className='text-sm mt-2'>Presidency University, Bangalore</p>
            <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>2021-2025</p>
          </div>
          <div className='mt-5 xl:ml-2 flex flex-col gap-4'>
            <h1 className='text-2xl font-serif tracking-tight font-semibold mt-3 max-lg:text-3xl'>Skills</h1>
            <div>
              <p className=' font-semibold text-lg mt-2'>Programming Languages</p>
              <ul>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Java</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Python</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>C++</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>C</li>
              </ul>
            </div>
            <div>
              <p className=' font-semibold text-lg mt-2'>Web Development</p>
              <ul>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>HTML</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>CSS (Tailwind)</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Express</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>MongoDB</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Javascript(React)</li>        </ul>
            </div>
            <div>
              <p className=' font-semibold text-lg mt-2'>Tools</p>
              <ul>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Git</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Figma</li>
              </ul>
            </div>
          </div>
          {/* TODO: change font type */}
        </div>
      </div>
      <div className=' xl:hidden h-[3px] max-w-full mt-3 bg-black'></div>

      <div className='border max-w-full lg:w-full'>
        <div>
          <p className='tracking-widest text-justify'>I'm Rohit Mugalkhod, a passionate and results-driven computer science student based in Bangalore. My journey in technology began with an insatiable curiosity for problem-solving, leading me to explore the realms of full-stack web development, algorithm design, and innovative project initiatives. Proficient in HTML, CSS, JavaScript, React, and more, I bring a unique blend of technical acumen and creative thinking to every challenge. My commitment to excellence is reflected in a stellar CGPA of 9.4 and a series of successful projects, from home automation using Arduino to crafting cloud storage solutions. Join me on this exciting journey where technology meets innovation!</p>
          <div className='mt-16 ml-2'>
            <h1 className='text-2xl font-serif tracking-tight font-semibold mt-3'>Projects</h1>
            <ul className=' list-disc ml-2'>
              <li className='mt-10'>
                <p className=' font-semibold text-lg mt-2'>Home Automation using Aurdino</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>This project, developed with C programming, introduced me
                  to various sensors and their versatile applications, showcasing
                  the potential of merging hardware and software for seamless
                  smart solutions</p>
              </li>
              <li className='mt-5'>
                <p className='font-semibold text-lg mt-2'>Cloud Storage using Rasberry Pie</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>I gained valuable insights into building remote-accessible
                  storage systems, understanding server operations, leveraging
                  Raspberry Pi, and employing SSH for secure communication</p>
              </li>
              <li className='mt-5'>
                <p className='font-semibold text-lg mt-2'>Backend Project</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Developed a robust video management system using Node.js and
                  MongoDB. Implemented features for video upload, user
                  authentication, and integrated third-party services for cloud
                  storage. Learned to optimize database queries for improved
                  performance.</p>
              </li>
              <li className='mt-5'>
                <p className='font-semibold text-lg mt-2'>Blog Website</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>I developed a blog website using React, Tailwind CSS, and AppWrite.
                  The website showcases articles, provides an intuitive user interface,
                  and leverages the power of AppWrite for backend functionality.</p>
              </li>
            </ul>
          </div>
          <div className='mt-16'>
            <h1 className='text-2xl font-serif tracking-tight font-semibold mt-3'>Languages</h1>
            <div className='flex ml-5 gap-40 mt-5 max-lg:flex-col max-lg:gap-5'>
              <div>
                <p>Kannada
                  <br />
                  <button className='bg-black w-16 rounded-full h-2'></button>
                </p>
              </div>
              <div>
                <p>English
                  <br />
                  <button className='bg-black w-12 rounded-full h-2'></button>
                </p>
              </div>
              <div>
                <p>Hindi
                  <br />
                  <button className='bg-black w-10 rounded-full h-2'></button>
                </p>
              </div>
            </div>
            <div className='flex mt-16 max-lg:justify-center'>
              <button className=' w-60  bg-black text-white h-16 rounded-lg' onClick={handleDownload}>Download Resume</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume