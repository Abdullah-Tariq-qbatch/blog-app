import React from "react";

import "./Alert.css";
import "../../../index.css";

const Alert = ({ title, message }) => {
  return (
    <div className="alert-container">
      <section
        className="bg-yellow-100 mt-[-40px] ml-2 mr-4 border border-yellow-700 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">{title}</strong>
        <span className="block sm:inline">{message}</span>
      </section>
    </div>
  );
};

export default React.memo(Alert);
