import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col h-[90%] mx-4">
        {/* <div className="flex flex-[1]">
          <div className="after:content-['OVERVIEW'] after:absolute after:text-9xl after:opacity-5 after:font-black after:-translate-x-[17rem] after:-translate-y-[4rem] before:content-['OVERVIEWS'] before:absolute before:self-end before:translate-y-[2rem] before:translate-x-[18rem] before:opacity-5 before:font-black before:text-9xl overflow-hidden cardbg  justify-center m-1 rounded-lg items-center flex flex-[1]">
            OVERVIEW
          </div>
          <div className="after:content-['PROFILE'] after:absolute after:text-9xl after:opacity-5 after:font-black after:-translate-x-[12rem] after:translate-y-[4rem] before:content-['PROFILE'] before:absolute before:self-start before:translate-x-[13rem] before:-translate-y-[2rem] before:opacity-5 before:font-black before:text-9xl flex cardbg  justify-center m-1 rounded-lg items-center flex-[1] overflow-hidden">
            PROFILE
          </div>
        </div> */}
        <div className="flex flex-[1]">
            <Link to={'/mobile/project'} className="cursor-pointer hover:before:translate-x-11 before:transition-all before:duration-700 hover:after:-translate-x-2 after:transition-all after:duration-700 after:content-['PROJECTS'] after:absolute after:text-9xl after:opacity-5 after:font-black after:translate-x-[17rem] after:translate-y-[7rem] before:content-['PROJECTS'] overflow-hidden before:absolute before:self-end before:-translate-y-[13rem] before:-translate-x-[20rem] before:opacity-5 before:font-black before:text-9xl flex flex-[1] m-1 rounded-lg cardbg justify-center items-center">
                PROJECTS
            </Link>
          <Link to={'/mobile/skill'} className="cursor-pointer hover:before:translate-x-11 before:transition-all before:duration-700 hover:after:-translate-x-2 after:transition-all after:duration-700 after:content-['SSKILLS'] after:absolute after:text-9xl after:opacity-5 overflow-hidden after:font-black after:-translate-x-[12rem] after:translate-y-[7rem] before:content-['SKILLSS'] before:absolute before:self-start before:translate-x-[13rem] before:-translate-y-[2rem] before:opacity-5 before:font-black before:text-9xl  flex flex-[1] m-1 rounded-lg cardbg   justify-center items-center">
            SKILLS
          </Link>
        </div>
        <div className="flex flex-[1]">
          <Link to={'/mobile/academics'} className="cursor-pointer hover:before:translate-x-11 before:transition-all before:duration-700 hover:after:-translate-x-2 after:transition-all after:duration-700 after:content-['ACADEMICS'] after:absolute after:text-9xl after:opacity-5 after:font-black after:translate-x-[17rem] after:translate-y-[8rem] before:content-['ACADEMICS'] overflow-hidden before:absolute before:self-end before:-translate-y-[12rem] before:-translate-x-[20rem] before:opacity-5 before:font-black before:text-9xl flex flex-[1]  m-1 rounded-lg cardbg  justify-center items-center">
            ACADEMICS
          </Link>
          <Link to={'/mobile/achieve'} className="cursor-pointer hover:before:translate-x-11 before:transition-all before:duration-700 hover:after:-translate-x-2 after:transition-all after:duration-700 after:content-['VEMENT'] after:absolute after:text-9xl after:opacity-5 after:font-black after:-translate-x-[12rem] after:translate-y-[8rem] before:content-['ACHIEVE'] before:absolute overflow-hidden before:self-start before:translate-x-[13rem] before:-translate-y-[2rem] before:opacity-5 before:font-black before:text-9xl flex flex-[1] cardbg  m-1 rounded-lg justify-center items-center">
            ACHIEVEMENTS
          </Link>
        </div>
      </div>
  )
}

export default Home