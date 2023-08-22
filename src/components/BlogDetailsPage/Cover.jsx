/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Cover({ coverImageSrc }) {
  return (
    <div className="h-96 bg-white mx-10 mt-28 rounded-tl-lg rounded-tr-lg overflow-hidden">
      <img src={coverImageSrc} className=" w-full h-auto object-contain" alt="" />
    </div>

  );
}

export default Cover;
