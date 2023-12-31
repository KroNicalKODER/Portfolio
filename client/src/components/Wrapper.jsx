import React, { useState, useEffect } from "react";
import cardsData from "../Data/card.json";
import Card from "./ProjectCard";

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

  const translateXValue = timesClicked * 21.5; // Adjust the multiplier as needed

  return (
    <div className="flex z-10">
      <div className="relative flex cursor-pointer" onClick={handleBackward}>
        <button className="blur-sm px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 text-xl text-red-500 z-10">
          B
        </button>
        <button className="absolute h-[86.42%] px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 font-bold font-mono text-lg z-20">
          B
        </button>
      </div>
      <div
        className="h-[45vh] w-[65vw] overflow-hidden flex"
      >
        <div 
            className="flex items-center transition-all duration-1000" id="wrappper"
            style={{ transform: `translateX(${translateXValue}vw)` }}    
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
              classGiven={index === selectedIndex ? "selected" : ""}
            />
          ))}
        </div>
      </div>
      <div className="relative flex cursor-pointer" onClick={handleForward}>
        <button className="blur-sm px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 text-xl text-red-500 z-10">
          F
        </button>
        <button className="absolute h-[86.42%] px-2 flex justify-center items-center my-[1.30rem] border-[#ff0000] border-2 font-bold font-mono text-lg z-20">
          F
        </button>
      </div>
    </div>
  );
};

export default Wrapper;
