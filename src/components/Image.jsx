/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Image({ src }) {
  return (
    <div
      className="w-14 h-14 bg-white dark:bg-gray-900 flex items-center justify-center rounded-full text-white border border-pink-custom dark:border-pink-800"
    >
      <img src={src} alt="" className="w-full h-full" />
    </div>
  );
}
