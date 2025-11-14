import React from 'react';

const AnimatedBackground = ({ type = 'full' }) => {
  const className = type === 'hero' ? 'animated-bg-hero' : 'animated-bg-full';
  return (
    <div className={className}>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
  );
};

export default AnimatedBackground;