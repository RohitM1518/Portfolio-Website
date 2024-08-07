import React from 'react'
import RohitImg from '../assets/RohitImg.jpeg'
import RohitMImg from '../assets/RohitMImg.jpg'
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
        <div className='flex flex-col max-lg:items-center items-center'>
          <img src={RohitMImg} alt="" className='flex w-52 border border-black max-lg:w-72 rounded-full h-52 object-cover max-lg:h-72' />
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
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>JavaScript</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Java</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Python</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>C++</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>C</li>
              </ul>
            </div>
            <div>
              <p className=' font-semibold text-lg mt-2'>Web Development</p>
              <ul>
                
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>React</li>      
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Express</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>MongoDB</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>CSS (TailwindCSS)</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Javascript(Node.js)</li>      
                  </ul>
            </div>
            <div>
              <p className=' font-semibold text-lg mt-2'>Tools</p>
              <ul>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Git</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Docker</li>
                <li className='text-sm md:text-md mt-2 opacity-70 tracking-widest'>Figma</li>
              </ul>
            </div>
          </div>
          {/* TODO: change font type */}
        </div>
      </div>
      <div className=' xl:hidden h-[3px] max-w-full mt-3 bg-black'></div>

      <div className='border max-w-full lg:w-full p-4'>
        <div>
          <p className='tracking-widest text-justify'>I'm Rohit Mugalkhod, a passionate and results-driven computer science student based in Bangalore. My journey in technology began with an insatiable curiosity for problem-solving, leading me to explore the realms of full-stack web development, algorithm design, and innovative project initiatives. Proficient in HTML, CSS, JavaScript, React, and more, I bring a unique blend of technical acumen and creative thinking to every challenge. My commitment to excellence is reflected in a stellar <span className=' font-semibold'>CGPA of 9.55 </span>and a series of successful projects, from home automation using Arduino to crafting cloud storage solutions. Join me on this exciting journey where technology meets innovation!</p>
          <div className='mt-16 ml-2'>
            <h1 className='text-2xl font-serif tracking-tight font-semibold mt-3'>Projects</h1>
            <ul className=' list-disc ml-2'>
              <li className='mt-10'>
                <p className=' font-semibold text-lg mt-2'> Social Media Application</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'><span className=' font-semibold'>Technologies Used:</span> React, Redux, Mongoose, Express.js, JWT (jsonwebtoken),  bcrypt, MongoDB, Docker.</p>
              </li>
              <li className='mt-5'>
                <p className=' font-semibold text-lg mt-2'> Chat Application</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'><span className=' font-semibold'>Technologies Used:</span>  React, Material UI, TailwindCSS, Express.js, MongoDB, Mongoose, Socket.IO, JWT, bcrypt. </p>
              </li>
              <li className='mt-5'>
                <p className='font-semibold text-lg mt-2'>Feedback Collection Application</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'><span className=' font-semibold'>Technologies Used:</span> React, Material UI, Express.js, MongoDB, TailwindCSS, Mongoose, JWT, bcrypt.</p>
              </li>
              <li className='mt-5'>
                <p className='font-semibold text-lg mt-2'>Backend Application</p>
                <p className='text-sm md:text-md mt-2 opacity-70 tracking-widest'><span className=' font-semibold'>Technologies Used:</span> Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken.</p>
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
              <button className=' w-60  bg-black text-white h-16 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ' onClick={handleDownload}>Download Resume</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume