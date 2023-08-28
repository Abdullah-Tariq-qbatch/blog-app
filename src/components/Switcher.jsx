/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';

import { ReactComponent as SunSvg } from '../assets/svg/sun.svg';
import { ReactComponent as MoonSvg } from '../assets/svg/moon.svg';

import useDarkSide from '../utils/useDarkSide';
import { RenderIf } from '../utils/commonMethods';

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light',
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide(!darkSide);
  };

  return (
    <div
      role="checkbox"
      aria-checked={darkSide ? 'true' : 'false'}
      onClick={toggleDarkMode}
      onKeyDown={toggleDarkMode}
      className={`cursor-pointer w-12 h-5 ${darkSide ? 'bg-gray-100' : 'bg-gray-900'} rounded-full relative px-1.5 flex items-center${darkSide ? '' : ' justify-end'}`}
    >
      <div className={`w-4 h-4 rounded-full absolute transform duration-200 ease-out ${darkSide ? 'bg-gray-900' : 'bg-gray-100'} left-0.5 ${darkSide ? 'translate-x-7' : 'translate-x-0'}`} />
      <RenderIf
        isTrue={darkSide}
        fallback={(
          <SunSvg className="h-3 w-3 text-gray-100" />
)}
      >
        <MoonSvg className="h-3 w-3 text-gray-900" />
      </RenderIf>
    </div>
  );
}
