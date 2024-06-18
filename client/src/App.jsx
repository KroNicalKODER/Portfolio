import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import ScrollComponent from './components/ScrollComponent.jsx';
import Overview from './pages/Overview.jsx';
import Profile from './pages/Profile.jsx';
import Skill from './pages/Skill.jsx';
import Project from './pages/Project.jsx';
import Academics from './pages/Academics.jsx';
import Achievements from './pages/Achievements.jsx';
import Mobile from './pages/Mobile.jsx';
import Email from './pages/Email.jsx'

import MobileProject from './pages/Mobile/Project.jsx'
import MobileSkill from './pages/Mobile/Skills.jsx'
import MobileAcademics from './pages/Mobile/Academics.jsx'
import MobileAchievement from './pages/Mobile/Achievement.jsx';

const App = () => {
  const [currScreenCount, setCurrScreenCount] = useState(1);

  useEffect(() => {
    let allowScreenCountUpdate = true;
  
    const handleKeyPress = (event) => {
      if (
        (event.key === 'ArrowUp' || event.key === 'w') &&
        currScreenCount > 1
      ) {
        setCurrScreenCount((prevCount) => prevCount - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        (event.key === 'ArrowDown' || event.key === 's') &&
        currScreenCount < 6
      ) {
        if (allowScreenCountUpdate) {
          setCurrScreenCount((prevCount) => prevCount + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          allowScreenCountUpdate = false;
  
          // Allow ScreenCount update after 1 second
          setTimeout(() => {
            allowScreenCountUpdate = true;
          }, 1000);
        }
      }
    };
  
    const handleScroll = (event) => {
    };
  
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleScroll);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currScreenCount]);
 
  
  const LaptopScreen = () =>{
    return(
      <div className='bg-black max-h-screen max-w-[100%] text-white overflow-hidden'>
        <div className="absolute flex w-full justify-center items-center mt-12">
                <Link to={'/email'} className="border-2 z-10 border-white rounded-md px-5 font-inter font-bold cursor-pointer py-1">
                  Let's Talk
                </Link>
              </div>
        <ScrollComponent currScreenCount={currScreenCount} />
          {(currScreenCount === 1) && <Overview/>}
          {(currScreenCount === 2) && <Profile/>}
          {(currScreenCount === 3) && <Skill/>}
          {(currScreenCount === 4) && <Project/>}
          {(currScreenCount === 5) && <Academics/>}
          {(currScreenCount === 6) && <Achievements />}
      </div>
    )
  }

  const Layout = () =>{
    
    return (
      <div>
        {window.innerWidth > 768 && <LaptopScreen/>}
        {window.innerWidth <= 768 && <Mobile/>}
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Layout/>} />
        <Route exact path='/email' element={<Email/>} />
        <Route exact path='/mobile/project' element={<MobileProject/>} />
        <Route exact path='/mobile/skill' element={<MobileSkill/>} />
        <Route exact path='/mobile/academics' element={<MobileAcademics/>} />
        <Route exact path='/mobile/achieve' element={<MobileAchievement/>} />
      </Routes>

    </Router>
  );
};

export default App;
