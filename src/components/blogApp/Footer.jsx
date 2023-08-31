import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/blogApp/image/png/logo512.png';

function Footer() {
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 w-full shadow p-5 px-16">
      <div className="w-full mx-auto">
        <div className="sm:flex flex flex-col sm:flex-row items-center sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <img src={logo} className="h-8 mr-3 invert-0 dark:invert" alt="Logo" />
            <span className="self-center text-2xl text-gray-700 dark:text-gray-100 font-semibold whitespace-nowrap">Blog App</span>
          </Link>
          <ul className="flex flex-wrap items-center justify-center sm:justify-start mb-1 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 sm:mb-0 leading-loose">
            <li>
              <Link href="/" className="mr-2 hover:underline md:mr-6 ">About</Link>
            </li>
            <li>
              <Link href="/" className="mr-2 hover:underline md:mr-6">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/" className="mr-2 hover:underline md:mr-6 ">Licensing</Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-900 dark:border-gray-50 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-500 text-center sm:text-center">
          © 2023
          {' '}
          MAT
          . All Rights Reserved.
        </span>
      </div>
    </footer>

  );
}

export default Footer;
