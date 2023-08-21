/* eslint-disable react/prop-types */
import React from 'react';

function Cover({ coverImageSrc }) {
  return (
    <div className="h-96 bg-red-500 mx-10 mt-28 rounded-tl-lg rounded-tr-lg" style={{ backgroundSize: '100% 100%', backgroundImage: `url(${coverImageSrc})` }} />
  );
}

export default Cover;
