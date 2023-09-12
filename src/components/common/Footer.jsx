import { Link } from "react-router-dom";
import React from "react";

function Footer({ appName, logo }) {
  return (
    <footer className="w-full bg-gray-100 p-5 px-16 shadow dark:bg-gray-900">
      <div className="mx-auto w-full">
        <div className="flex flex-col items-center sm:flex sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="mb-4 flex items-center sm:mb-0">
            <img
              src={logo}
              className="mr-3 h-8 invert-0 dark:invert"
              alt="Logo"
            />
            <span className="text-md self-center whitespace-nowrap font-semibold text-gray-700 dark:text-gray-100 md:text-2xl">
              {appName}
            </span>
          </Link>
          <ul className="mb-1 flex flex-wrap items-center justify-center text-xs font-medium leading-loose text-gray-700 dark:text-gray-200 sm:mb-0 sm:justify-start sm:text-sm">
            <li>
              <Link href="/" className="mr-2 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="mr-2 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="mr-2 hover:underline md:mr-6 ">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-900 dark:border-gray-50 sm:mx-auto lg:my-8" />
        <span className="block text-center text-sm text-gray-500 dark:text-gray-500 sm:text-center">
          © 2023 . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
