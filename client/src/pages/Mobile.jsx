import React from "react";
import Experience from "../components/Mobile/Experience";
import RandomText from "../components/Animations/RandomText";
import bgImage from "../assets/Mobile/bg.png";
import "./Mobile.css";
import Home from "./Mobile/Home";
import { Link } from "react-router-dom";

const Mobile = () => {
  return (
    <div className="h-screen flex flex-col bg-black relative text-white font-inter font-semibold">
      <img src={bgImage} className="absolute  h-screen" alt="" />

      <div className="absolute w-[150px] z-40 h-[550px] self-center ">
        <Experience />
      </div>
      <div className="z-10 flex items-center  justify-between py-[1%] mx-[3%]">
        <span className="text-xl">
          <RandomText inMobile={true} />
        </span>
        <div className="flex whitespace-nowrap flex-col">
          <span>Mradul | KronikalKodar</span>
          <Link to={'/email'} className="justify-center flex items-center text-xs border-[1.6px] border-white px-3 rounded-lg">
            Hire Me
          </Link>
        </div>
      </div>
      <Home/>
      
    </div>
  );
};

export default Mobile;
