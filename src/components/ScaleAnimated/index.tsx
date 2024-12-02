// src/components/ScaleAnimated
import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface ScaleAnimatedProps {
  children: React.ReactNode;
  className?: string;
  isEnabled?: boolean;
}

const ScaleAnimated: React.FC<ScaleAnimatedProps> = ({ children, className, isEnabled = true }) => {
  return (
    <motion.div
      className={twMerge('flex w-fit', className)} // Merges class names
      whileTap={isEnabled ? { scale: 0.9 } : { scale: 1 }} // Scale rate on click
      transition={{ duration: 0.3 }} // Animation duration
    >
      {children}
    </motion.div>
  );
};

export default ScaleAnimated;
