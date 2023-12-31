import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="absolute ml-[10%] h-[3px] mt-2 w-[80%] bg-gray-300 z-[100]">
      <motion.div
        className="absolute top-0 left-0 h-full bg-blue-500"
        style={{ width: `${percentage}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.1 }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar