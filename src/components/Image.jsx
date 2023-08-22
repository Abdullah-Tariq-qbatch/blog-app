/* eslint-disable react/prop-types */
import React from 'react';

export default function Image({ src }) {
  return (
    <div
      className="w-6 h-6 flex items-center justify-center rounded-full text-white border border-gray-400"
    >
      <img src={src} alt="" />
    </div>
  );
}
