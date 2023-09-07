/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

import Switcher from '../blogApp/Switcher';
import { ReactComponent as HamburgerSvg } from '../../assets/blogApp/svg/hamburger.svg';
import { ReactComponent as CrossSvg } from '../../assets/blogApp/svg/cross.svg';

import { RenderIf } from '../../utils/blogApp/commonMethods';

function Header({ logo, links }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  
  

  

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 dark:bg-gray-900 p-5 mb-8 z-40">
      <div className="flex items-center justify-between flex-wrap mx-10">
        <Link to={links[0].url} className="flex items-center flex-shrink-0 text-white mr-16 cursor-pointer">
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
            {links?.map((link) => (
              <NavLink
                to={link.url}
                key={link.text}
                className={`block mt-4 lg:inline-block lg:mt-0 mr-4 ${location.pathname === link.url ? 'text-pink-custom dark:text-pink-500' : 'text-gray-700 dark:text-gray-200'} `}
                onClick={handleClick}
              >
                {link.text}
              </NavLink>
            ))}
          </div>
          <Switcher />
        </div>
      </div>
    </nav>
  );
}
export default Header;
