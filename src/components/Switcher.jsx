/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkSide from '../utils/useDarkSide';

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light',
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <DarkModeSwitch
      checked={darkSide}
      sunColor="#111828"
      moonColor="#F3F4F6"
      onChange={toggleDarkMode}
      size={30}
    />
  );
}
