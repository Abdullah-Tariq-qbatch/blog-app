import React from "react";
import logo from "../../assets/catalogApp/Images/logo512.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 shadow">
      <div className="mx-10 p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0">
            <img src={logo} className="h-8 mr-3" alt="Logo" />
            <span className=" text-2xl text-white font-semibold whitespace-nowrap">
              Prodcut Catalog App
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-700 sm:mb-0">
            <li>
              <Link
                href="#"
                className="mr-4 hover:underline md:mr-6 text-white"
              >
                About
              </Link>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 text-white">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2023{" "}
          <a href="#" className="hover:underline">
            NK
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
