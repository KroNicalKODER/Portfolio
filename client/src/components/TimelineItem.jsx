import React from 'react';
import { motion } from 'framer-motion';

// The circle + diagonal + rule line used on Academics / Achievements / Experience.
// The circle/diagonal is a fixed-size icon and the rule is drawn *below* the text,
// so wrapped or long subtitles can never collide with the line at any screen width.
// `index` staggers the entrance; `compact` is the mobile sizing.
const TimelineItem = ({ title, subtitle, index = 0, compact = false, href, children }) => {
  const lineDelay = index * 0.2;
  const textDelay = 0.6 + index * 0.4;
  const Title = href ? 'a' : 'div';
  const titleProps = href ? { href, target: '_blank', rel: 'noreferrer', className: 'hover:text-cyan-300 transition-colors' } : {};

  const slideLeft = { initial: { x: -400, opacity: 0 }, animate: { x: 0, opacity: 1 } };
  const slideRight = { initial: { x: 400, opacity: 0 }, animate: { x: 0, opacity: 1 } };
  const spring = (delay) => ({ duration: 1, type: 'spring', delay });

  const s = compact
    ? { wrap: 'ml-5 mt-7', icon: 'w-8 h-8', text: 'ml-10 pr-6', title: 'text-xs', sub: 'text-[0.65rem]', rule: 'ml-8 mr-5' }
    : { wrap: 'ml-32 mt-8 mr-16', icon: 'w-9 h-9', text: 'ml-11 pr-4', title: 'text-sm', sub: 'text-xs', rule: 'ml-9' };

  return (
    <motion.div className={`relative ${s.wrap}`}>
      <motion.svg
        {...slideLeft}
        transition={spring(lineDelay)}
        className={`absolute left-0 top-0 ${s.icon}`}
        viewBox="0 0 65 65"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="13.5" cy="13.5" r="11" stroke="#ECECEC" strokeWidth="4" />
        <line x1="21" y1="23" x2="60" y2="64" stroke="#ECECEC" strokeWidth="4" />
      </motion.svg>
      <div className={`${s.text} pb-2 font-inter`}>
        <motion.div {...slideLeft} transition={spring(textDelay)} className={`font-extrabold ${s.title}`}>
          <Title {...titleProps}>{title}</Title>
        </motion.div>
        <motion.div {...slideRight} transition={spring(textDelay)} className={`font-bold text-gray-300 leading-snug ${s.sub}`}>
          {subtitle}
        </motion.div>
      </div>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: lineDelay + 0.3 }}
        className={`${s.rule} h-[2px] bg-[#ECECEC] origin-left`}
      />
      {children}
    </motion.div>
  );
};

export default TimelineItem;
