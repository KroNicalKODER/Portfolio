import React, { useState, useEffect } from "react";
import cardsData from "../../Data/card.json";
import Card from "./CardMobile";
import {motion} from 'framer-motion'

import './CardSlider.css'
const Wrapper = () => {
  const [timesClicked, setTimesClicked] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleBackward = () => {
    if (selectedIndex === 0) {
      console.log("Cannot perform this operation");
      return;
    }

    setTimesClicked((prevTimesClicked) => prevTimesClicked + 1);
    setSelectedIndex((prevIndex) => prevIndex - 1);
  };

  const handleForward = () => {
    if (selectedIndex === 5) {
      console.log("Cannot perform this operation");
      return;
    }

    setTimesClicked((prevTimesClicked) => prevTimesClicked - 1);
    setSelectedIndex((prevIndex) => prevIndex + 1);
  };

  const handleKeyDown = (e) => {
    switch (e.key.toLowerCase()) {
      case "a":
      case "arrowleft":
        handleBackward();
        break;
      case "d":
      case "arrowright":
        handleForward();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const translateXValue = timesClicked * 63; // Adjust the multiplier as needed

  return (
    <div className="flex flex-col z-10 items-center">
      <motion.div 
      initial={{y:150}}
      animate={{y:0, transition:{ duration:0.7, type:'spring'}}}
      className="relative flex cursor-pointer w-full justify-center" onClick={handleBackward}>
        <button className="blur-sm w-[100%] px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 text-xl text-red-500 z-10">
          Scroll UP
        </button>
        <button className="absolute w-[100%] px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 font-bold font-mono text-lg z-20">
          Scroll UP
        </button>
      </motion.div>
      <div
        className="h-[25rem] w-[22rem] overflow-scroll scrollbar-hide scroll-smooth overflow-x-hidden"
      >
        <motion.div 
        initial={{opacity: 0}}  
        animate={{opacity:1,transition:{delay:0.8, duration:0.8}}}
            className="flex flex-col w-full items-center transition-all duration-1000" id="wrappper"
            style={{ transform: `translateY(${translateXValue}vw)` }}    
        >
          {cardsData.data.map((data, index) => (
            <Card
            key={index}
            message={data.message}
            image={data.image}
            title={data.title}
            btn1Content={data["btn1-content"]}
            btn2Content={data["btn2-content"]}
            btn1Link = {data["btn1-link"]}
            btn2Link = {data["btn2-link"]}
            extras = {data.extras}
            />
          ))}
        </motion.div>
      </div>
      <motion.div
      initial={{y:-150}}
      animate={{y:0, transition:{duration:0.7, type:'spring'}}}  
      className="relative flex cursor-pointer w-full" onClick={handleForward}>
        <button className="blur-sm w-[100%] px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 text-xl text-red-500 z-10">
            Scroll DOWN
            </button>
            <button className="absolute w-[100%] px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 font-bold font-mono text-lg z-20">
            Scroll DOWN
            </button>
      </motion.div>
    </div>
  );
};

export default Wrapper;
