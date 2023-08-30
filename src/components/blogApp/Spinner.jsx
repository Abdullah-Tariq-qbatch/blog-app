import React from "react";
import { ReactComponent as SpinnerSvg } from "../../assets/blogApp/svg/spinner.svg";

function Spinner() {
  return (
    <div className="w-full flex justify-center items-center dark:bg-gray-800 h-screen mt-10">
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-300 bg-opacity-50">
        <div role="status">
          <SpinnerSvg className="mr-2 inline h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600" />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
