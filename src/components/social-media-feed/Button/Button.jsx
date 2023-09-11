import "../../../index.css";

import React from "react";

function Button({
  onClick,
  children,
  className = "mb-auto mt-auto inline-flex rounded-lg bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br",
}) {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}

export default Button;
