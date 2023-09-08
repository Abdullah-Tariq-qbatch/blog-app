import React from "react";
import { NavLink } from "react-router-dom";
import { WarningFilled } from "@ant-design/icons";

import RenderIf from "./RenderIf";

const NotFound = ({ errorMsg }) => {
  return (
    <section>
      <div className="container flex mt-6 mx-auto mb-10">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <WarningFilled className="text-8xl text-gray-500 mb-5" />

          <h1 className=" text-2xl font-semibold  md:text-3xl text-gray-800 dark:text-gray-200">
            {errorMsg ? errorMsg : "Page not found"}
          </h1>
          <RenderIf isTrue={!errorMsg}>
            <p className="mt-4 text-gray-800 dark:text-gray-200">
              The page you are looking for doesn&apos;t exist.
            </p>
          </RenderIf>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <NavLink
              to="/catalog"
              className="w-full px-5 py-2 text-gray-200 dark:text-gray-800 text-sm tracking-wid transition-colors duration-200 bg-gray-800 dark:bg-gray-200  rounded-lg shrink-0 sm:w-auto hover:bg-gray-600 dark:hover:bg-white "
            >
              Take me home
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
