/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Cover({ coverImageSrc }) {
  return (
    <div className="md:h-96 md:w-2/3 sm:w-96 sm:h-60 m-auto bg-white mt-28 rounded-tl-lg rounded-tr-lg overflow-hidden">
      <img src={coverImageSrc} className=" w-full h-auto object-contain" alt="Blog Cover Image Loading..." />
    </div>

  );
}

export default Cover;
