/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from '../assets/logo512.png';

function Footer() {
  return (

    <footer className="bg-gray-100 dark:bg-gray-900 w-full shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0">
            <img src={logo} className="h-8 mr-3" alt="Logo" />
            <span className="self-center text-2xl text-gray-700 dark:text-gray-100 font-semibold whitespace-nowrap">Blog App</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-700 dark:text-gray-200 sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-900 dark:border-gray-50 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-500 sm:text-center">
          © 2023
          {' '}
          <a href="#" className="hover:underline">MAT</a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>

  );
}

export default Footer;
