import React from 'react';
import { Oval } from 'react-loader-spinner';

function Spinner() {
  return (
    <div className="w-full flex justify-center h-screen pt-10">
      <Oval
        height={80}
        width={80}
        color="#0066ff"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="#001f4d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Spinner;
