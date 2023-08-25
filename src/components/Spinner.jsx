/* eslint-disable no-unused-vars */
import React from 'react';
import { Oval } from 'react-loader-spinner';

function Spinner() {
  return (
    <div className="w-full flex justify-center items-center dark:bg-gray-800 h-screen mt-10">
      <Oval
        height={80}
        width={80}
        color="#FE02CA"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="#FF9EEB"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Spinner;
