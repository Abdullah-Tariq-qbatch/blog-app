import React from 'react';
import Blogs from '../../components/blogApp/HomePage/Blogs';

import cover from '../../assets/blogApp/image/jpeg/cover.jpeg';

function Home() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="w-full h-48 sm:h-96 mt-5 relative overflow-hidden  bg-no-repeat md:p-12 sm:p-5 flex justify-center  bg-center bg-cover" style={{ backgroundImage: `url(${cover})` }}>
        <span id="blackOverlay" className="w-full top-0 h-full absolute opacity-30 dark:opacity-50 bg-black" />
        <h1
          className="overflow-hidden whitespace-nowrap z-30 text-gray-200 font-bold animate-typing md:text-4xl sm:text-xs mt-10"
        >
          Share Your Stories With the World
        </h1>
      </div>
      <Blogs />
    </div>
  );
}

export default Home;
