import React, { useEffect, useState, useMemo } from 'react';
import data from './data.json';

const RandomText = ({ inMobile = false }) => {
  const [bold, setBold] = useState('font-bold');
  const [size, setSize] = useState('text-xl');
  const [lsize, setLsize] = useState('text-base');
  const [smSize, setSmSize] = useState('');
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');

  const texts = useMemo(() => {
    return data.data.map(item => `${item.t1} ${item.t2}`);
  }, []);

  useEffect(() => {
    if (inMobile) {
      setBold('font-medium');
      setSize('text-md');
      setSmSize('text-xs');
      setLsize('text-sm');
    }

    const generateString = (len) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
      return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const printString = (str, len) => {
      setStr1(str.substring(0, len));
      setStr2(str.substring(len + 1));
    };

    const display = (stri, len) => {
      const randomStrings = Array.from({ length: 10 }, () => generateString(stri.length));
      let index = 0;
      
      const updateText = () => {
        if (index < randomStrings.length) {
          printString(randomStrings[index], len);
          index++;
          requestAnimationFrame(updateText);
        } else {
          printString(stri, len);
        }
      };

      updateText();
    };

    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= texts.length) {
        index = 0;
      }
      const str = texts[index];
      display(str, str.indexOf(' '));
      index++;
    }, 5000);

    // Initial display
    display(texts[0], texts[0].indexOf(' '));

    // Clear the interval when the component is about to unmount
    return () => clearInterval(intervalId);
  }, [inMobile, texts]);

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
