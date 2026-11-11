import React, { useEffect, useState, useMemo } from 'react';
import { roles } from '../../Data/profile';

// Cycles through roles with a "decoding" scramble effect every 4s.
const RandomText = ({ inMobile = false }) => {
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');

  const texts = useMemo(() => roles.map((r) => `${r.t1} ${r.t2}`), []);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
    const generateString = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const printString = (str, len) => {
      setStr1(str.substring(0, len));
      setStr2(str.substring(len + 1));
    };

    let frame = 0;
    const display = (target, splitAt) => {
      const scrambles = Array.from({ length: 12 }, () => generateString(target.length));
      let i = 0;
      const tick = () => {
        if (i < scrambles.length) {
          printString(scrambles[i++], splitAt);
          frame = requestAnimationFrame(tick);
        } else {
          printString(target, splitAt);
        }
      };
      tick();
    };

    let index = 0;
    const show = () => {
      const str = texts[index % texts.length];
      display(str, str.indexOf(' '));
      index++;
    };
    show();
    const intervalId = setInterval(show, 4000);
    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(frame);
    };
  }, [texts]);

  const big = inMobile ? 'text-sm font-medium' : 'text-base font-bold';
  const small = inMobile ? 'text-xs font-medium' : 'text-sm font-bold';

  return (
    <div className="font-inter">
      <div className={`whitespace-nowrap ${big}`}>{str1}</div>
      <div className={`whitespace-nowrap ${small} text-red-500`}>{str2}</div>
    </div>
  );
};

export default RandomText;
