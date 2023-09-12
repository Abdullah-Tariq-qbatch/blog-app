/* eslint-disable no-unused-vars */
import React from "react";

import Blogs from "../../components/blogApp/HomePage/Blogs";

import cover from "../../assets/blogApp/image/jpeg/cover.jpeg";

function Home() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div
        className="relative flex h-48 w-full justify-center  overflow-hidden bg-cover bg-center bg-no-repeat sm:h-96  sm:p-5 md:p-12"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <span
          id="blackOverlay"
          className="absolute top-0 h-full w-full bg-black opacity-30 dark:opacity-50"
        />
        <h1 className="z-30 mt-10 animate-typing overflow-hidden whitespace-nowrap font-bold text-gray-200 sm:text-xs md:text-4xl">
          Share Your Stories With the World
        </h1>
      </div>
      <Blogs />
    </div>
  );
}

export default Home;
