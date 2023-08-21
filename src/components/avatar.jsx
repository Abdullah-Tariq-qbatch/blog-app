/* eslint-disable react/prop-types */
import React from 'react';

export default function Avatar({ initials, bgColor }) {
  return (
    <div
      className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${bgColor}`}
    >
      <span className="font-semibold" style={{ fontSize: '10px' }}>{initials}</span>
    </div>
  );
}
