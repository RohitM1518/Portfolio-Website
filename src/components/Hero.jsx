import React from 'react'
import { Button } from './index'

const Hero = ({smalltext,head,smallestext}) => {
    return (
        <div>
            <p className='font-semibold text-xl uppercase mx-5 md:-mb-2'>{smalltext}  </p>
            <h1 className='text-7xl md:text-[8rem] font-roboto tracking-tight font-semibold'>{head}</h1>
            <p className='text-sm md:text-md mt-4 ml-2 opacity-70 tracking-widest'>{smallestext}</p>
            <Button url='/about'>Know More about Me</Button>
        </div>
    )
}

export default Hero