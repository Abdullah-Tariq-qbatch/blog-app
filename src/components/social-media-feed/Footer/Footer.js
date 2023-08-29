import React from "react";
import { NavLink } from "react-router-dom";
import "../../../index.css";

function Footer() {
  return (
    <footer className="bg-gray-100 w-full shadow mt-20">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col justify-between h-full text-center">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <NavLink to="/" className="flex items-center mb-4 sm:mb-0">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Logo"
            />
            <span className="self-center text-2xl text-gray-700 font-semibold whitespace-nowrap">
              Social Media App
            </span>
          </NavLink>
          <ul className="flex flex-wrap items-center mb-0 text-sm font-medium text-gray-700 sm:mt-5">
            <li>
              <NavLink to="/" className="mr-4 hover:underline md:mr-6 ">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="hover:underline">
                Contact
              </NavLink>
            </li>{" "}
          </ul>
        </div>
        <hr className="my-6 border-black"></hr>
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <NavLink to="/" className="hover:underline">
            Social Media Feed.{" "}
          </NavLink>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
