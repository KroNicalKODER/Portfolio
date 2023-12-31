import React from 'react'
import {motion} from 'framer-motion'
import WrapperMobile from '../../components/Mobile/WrapperMobile'
import { Link } from 'react-router-dom'

const Project = () => {
  return (
    <div className='h-screen bg-black text-white font-inter'>
        <div className="flex font-semibold py-2 justify-center">
          <span>Mradul | KronikalKodar</span>
          <Link to={'/'} className="flex items-center text-xs ml-6 border-[1.6px] border-white px-3 rounded-lg">
            Back
          </Link>
        </div>
        <div className='flex justify-center mt-7 px-2 items-center'>
            
            <motion.div 

            className="div">
                <WrapperMobile />
            </motion.div>
            
        </div>
        <div className="flex font-semibold py-2 justify-center">
          <span>Click to Send an E-mail</span>
          <Link to={'/email'} className="flex items-center text-xs ml-6 border-[1.6px] border-white px-3 rounded-lg">
            Let's Talk
          </Link>
        </div>
        <div className='flex flex-col'>
          <div>
            
          </div>
        </div>
    </div>
  )
}

export default Project