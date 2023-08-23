/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import cover from '../../assets/cover.jpeg';

function Greeting() {
  return (
    <div className="w-full h-96 mt-5 relative overflow-hidden  bg-no-repeat md:p-12 sm:p-5 flex justify-center  bg-center bg-cover" style={{ backgroundImage: `url(${cover})` }}>
      <span id="blackOverlay" className="w-full top-0 h-full absolute opacity-50 bg-black" />
      <h1
        className="overflow-hidden whitespace-nowrap z-30 text-gray-200 font-bold animate-typing md:text-4xl sm:text-xs mt-10"
      >
        Share Your Stories With the World
      </h1>
    </div>
  );
}

export default Greeting;
