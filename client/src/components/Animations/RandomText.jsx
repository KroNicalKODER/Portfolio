import React, { useEffect, useState } from 'react';
import data from './data.json';

const RandomText = ({inMobile = false}) => {
  const [toNum,setToNum] = useState(70000)
  const [bold, setBold] = useState('font-bold')
  const [size, setSize] = useState('text-xl')
  const [lsize, setLsize] = useState('text-base')
  const [smSize, setSmSize] = useState('')
  const [str1,setStr1] = useState('')
  const [str2,setStr2] = useState('')
  useEffect(() => {
    const animation = document.getElementById('animation');

    // if (animation == null || document.getElementById('animation1') == null) return;
    if(inMobile){
      setBold('font-medium')
      setSize('text-md')
      setSmSize('text-xs')
      setLsize('text-sm')
      setToNum(10000)
    }
    const h1 = [];
    const h2 = [];
    let index = 1;

    for (let itr in data.data) {
      h1.push(data.data[itr]['t1']);
      h2.push(data.data[itr]['t2']);
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function generateString(len) {
      let str = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < len; ++i) str += chars[Math.floor(Math.random() * chars.length)];
      return str;
    }

    function printString(str, len) {
      let str1 = str.substring(0, len);
      setStr1(str1)
      let str2 = str.substring(len + 1);
      setStr2(str2)
      // animation.innerHTML = str1;
      // document.getElementById('animation1').innerHTML = str2;
    }

    function display(stri, len) {
      for (let i = 0; i < toNum; i++) {
        const str = generateString(stri.length);
        setTimeout(() => printString(str, len), 1);
      }
      setTimeout(() => printString(stri, len), 1);
    }

    let str0 = h1[0] + ' ' + h2[0];
    display(str0, h1[0].length);
    const intervalId = setInterval(() => {
      if (index === 4) {
        index = 0;
      }
      let str = h1[index] + ' ' + h2[index];
      display(str, h1[index].length);
      index = index + 1;
    }, 5000);

    // Clear the interval when the component is about to unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="root">
      <div className=''>
        <div id="animation" className={`dood whitespace-nowrap ${lsize} ${bold}`}>{str1}</div>
        <div id="animation1" className={`dood whitespace-nowrap ${smSize} ${bold} text-red-500`}>{str2}</div>
      </div>
    </div>
  );
};

export default RandomText;
