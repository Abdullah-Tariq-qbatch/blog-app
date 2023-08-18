/* eslint-disable max-len */
import React from 'react';
import cover from '../../assets/cover.jpg';

function Greeting() {
  return (
    <div className="w-full h-96 pt-5 relative overflow-hidden  bg-no-repeat p-12 flex justify-center" style={{ backgroundSize: '100% 100%', backgroundImage: `url(${cover})` }}>
      <h1
        className="overflow-hidden whitespace-nowrap font-mono font-bold animate-typing text-4xl mt-10"
      >
        Share Your Stories With the World
      </h1>
    </div>

  );
}

export default Greeting;
