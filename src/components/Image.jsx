/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Image({ src }) {
  return (
    <div
      className="w-14 h-14 bg-white flex items-center justify-center rounded-full text-white border border-pink-custom"
    >
      <img src={src} alt="" className="w-full h-full" />
    </div>
  );
}
