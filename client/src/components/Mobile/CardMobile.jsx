import React from 'react';

import './CardSlider.css'

const ProjectCard = ({ classGiven, image, message, title, extras, btn1Content, btn2Content, btn1Link, btn2Link }) => {
    // image = image.replace("./src/","/src/")
    console.log(image)
    return (
      <div className={`${classGiven} transition-all duration-1000 bg-[#111111] inline-block my-5 min-h-[16rem] max-h-content pb-4 w-[15rem] mx-10 border-[0.1px] border-[#272727] rounded-md`}>
      <img className='w-full h-[45%] transition-all duration-1000 rounded-t-md' src={image} alt="" />
      <div className='text-[75%] mt-2 transition-all duration-1000 font-bold font-inter ml-2'>
        {title}
      </div>
      <div className='text-[60%] transition-all duration-1000 mt-2 font-bold font-inter ml-2 mr-1'>
        {message}
      </div>
      <div className='text-[60%] transition-all duration-1000 flex mt-2 items-center font-bold font-inter ml-2'>
        <div className='w-[5px] transition-all duration-1000 h-[5px] rounded-[100%] bg-slate-500' />
        <div className='ml-2 transition-all duration-1000 text-gray-400 mr-1'>
        {extras}
        </div>
      </div>
      <div className='w-full flex transition-all duration-1000 justify-around mt-2 font-semibold font-inter text-xs  items-center'>
        <a href={btn1Link} target='_blank' className='flex justify-center border-[1px] transition-all duration-1000 border-slate-700 w-[40%] px-3 py-1 bg-green-400 rounded-md'>
          {btn1Content}
        </a>
        <a href={btn2Link} target='_blank' className='flex justify-center border-[1px] transition-all duration-1000 border-slate-700 px-3 w-[40%] py-1 bg-red-400 rounded-md'>
          {btn2Content}
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
