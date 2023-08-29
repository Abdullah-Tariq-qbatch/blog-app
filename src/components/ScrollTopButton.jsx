import React, { useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <button type="button" className="h-8 w-8 fixed bottom-24 left-5 z-50 border rounded-full border-gray-200 dark:border-gray-900 bg-gray-900 dark:bg-gray-200" style={{ display: visible ? 'inline' : 'none' }} onClick={scrollToTop}>
      <ArrowUpOutlined className="flex items-center w-full justify-center text-gray-200 dark:text-gray-900" />
    </button>
  );
}

export default ScrollTopButton;
