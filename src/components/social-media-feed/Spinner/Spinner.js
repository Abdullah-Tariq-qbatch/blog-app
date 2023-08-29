import React from "react";
import { TailSpin } from "react-loader-spinner";
import "../../../index.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
