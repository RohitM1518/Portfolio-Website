import React from 'react'
import { Button, Section, Hero, Icon } from '../components'
import { CSS, Reactico, HTML, Java, Javascript, NodeJS } from '../assets/icons/index'


const Home = () => {
  return (
    <div className='m-5 '>
      <div className='flex flex-col gap-52 w-full rounded-md'>
        <div>
          <Hero smalltext="👋 I'M" head="Rohit" smallestext='I am ambitious to explore a variety of opportunities beyond full-stack development, so I am flexible and open-minded.🚀🌐'/>
        </div>
        <div className='grid grid-cols-2'>
          <div>
            <Section shortText='MY' Head='Tech Stack' content='My primary focus on Javascript, MongoDB, Express and React ecosystem.' />
          </div>
          <div className='flex flex-col gap-5 items-center justify-center'>
            <div className='flex gap-10'>
              <Icon src={CSS} title='CSS'/>
              <Icon src={Reactico} title='React' />
              <Icon src={HTML} title='HTML'/>
            </div>
            <div className='flex gap-10'>
              <Icon src={Java} title='Java' />
              <Icon src={Javascript} title='JavaScript' />
              <Icon src={NodeJS} title='NodeJS'/>
            </div>
          </div>
        </div>
        <div>
          <Section shortText='MY' Head='Projects' content='Here are some of my projects.' />
          <Button url='/projects'>View my all Projects</Button>
        </div>
      </div>
    </div>
  )
}

export default Home