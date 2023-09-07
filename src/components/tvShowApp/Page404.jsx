import React from "react";
import { NavLink } from "react-router-dom";
import { WarningFilled } from "@ant-design/icons";

const Page404 = ({ errorMsg }) => {
  return (
    <section
      className={`bg-white dark:bg-gray-800 ${
        errorMsg || "h-screen flex justify-center items-center"
      }`}
    >
      <div className="container flex mt-6 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <WarningFilled className=" text-3xl font-medium text-gray-500 rounded-full" />

          <h1 className=" text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {errorMsg ? errorMsg : "Page not found"}
          </h1>
          {!errorMsg && (
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              The page you are looking for doesn&apos;t exist.
            </p>
          )}

          <div className="flex items- justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <NavLink
              to={errorMsg ? "/tv-shows" : "/"}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-black dark:text-white hover:text-black-400 transition-colors duration-200 rounded-lg shrink-0 sm:w-auto bg-gray-100 dark:bg-gray-900 "
            >
              Take me home
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
