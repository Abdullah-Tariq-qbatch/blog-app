/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function Cover({ coverImageSrc }) {
  return (
    <div className="h-full w-full bg-white mt-20">
      <img src={coverImageSrc} className=" w-full h-auto object-contain" alt="Blog Cover Image Loading..." />
    </div>

  );
}

export default Cover;
