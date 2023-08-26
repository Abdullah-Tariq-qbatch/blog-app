import React from 'react';

import { ReactComponent as SpinnerSvg } from '../assets/svg/spinner.svg';

function Spinner() {
  return (
    <div className="w-full flex justify-center items-center dark:bg-gray-800 h-screen mt-10">
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-300 bg-opacity-50">
        <div role="status">
          <SpinnerSvg />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
