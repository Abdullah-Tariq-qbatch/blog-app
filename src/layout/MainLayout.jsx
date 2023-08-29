/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import ScrollTopButton from '../components/ScrollTopButton';

import { fetchUsers } from '../redux/users/actionCreator';
import { fetchBlogs } from '../redux/blogs/actionCreator';
import { fetchComments } from '../redux/comments/actionCreator';

export default function MainLayout({ children }) {
  document.title = 'Blogs';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
    dispatch(fetchComments());
  }, []);
  return (
    <div className="mt-20 h-full w-full bg-white dark:bg-gray-800 ease-linear selection:bg-gray-800 selection:text-gray-200 dark:selection:bg-gray-200 dark:selection:text-gray-800">
      <Navbar />
      <Toast />
      {children}
      <ScrollTopButton />
      <Footer />
    </div>
  );
}
