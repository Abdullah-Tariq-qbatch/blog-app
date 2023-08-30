/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Switcher from './Switcher';
import { ReactComponent as HamburgerSvg } from '../../assets/blogApp/svg/hamburger.svg';
import { ReactComponent as CrossSvg } from '../../assets/blogApp/svg/cross.svg';

import logo from '../../assets/blogApp/image/png/logo512.png';
import { RenderIf } from '../../utils/blogApp/commonMethods';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 dark:bg-gray-900 p-5 mb-8 z-40">
      <div className="flex items-center justify-between flex-wrap mx-10">
        <Link to="/blog/" className="flex items-center flex-shrink-0 text-white mr-16 cursor-pointer">
          <img src={logo} className="w-10 h-10 invert-0 dark:invert" alt="Logo" />
        </Link>
        <div className="block lg:hidden">
          <button
            onClick={handleClick}
            className="flex items-center px-3 py-2 rounded text-black dark:text-white hover:text-black-400"
            type="button"
          >
            <RenderIf
              isTrue={isOpen}
              fallback={(
                <HamburgerSvg className="fill-current h-3 w-3 block" />
            )}
            >
              <CrossSvg className="fill-current h-3 w-3 block" />
            </RenderIf>
          </button>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="text-sm lg:flex-grow flex-col lg:flex-row flex items-start mb-5 lg:mb-0">
            <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 dark:text-gray-200 mr-4" onClick={handleClick}>Home</Link>
            <Link to="/blog/create-blog" className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 dark:text-gray-200 mr-4" onClick={handleClick}>Write a Blog</Link>
          </div>
          <Switcher />
        </div>
      </div>
    </nav>

  );
}
export default Navbar;
