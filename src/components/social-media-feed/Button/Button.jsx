/* eslint-disable react/prop-types */
import React from 'react';
import "../../../index.css";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="mt-auto mb-auto inline-flex text-white bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 text-center"
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
