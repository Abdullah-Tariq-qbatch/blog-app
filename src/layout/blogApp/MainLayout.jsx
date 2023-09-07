/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";

import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer';
import Toast from '../../components/blogApp/Toast';

import { fetchUsers } from '../../redux/users/actionCreator';
import { fetchBlogs } from '../../redux/blogs/actionCreator';
import { fetchComments } from '../../redux/comments/actionCreator';

export default function MainLayout({links, logo, appName}) {
  document.title = 'Blogs';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
    dispatch(fetchComments());
  }, []);


  return (
    <div className="flex flex-col min-h-screen ">
     <Header links={links} logo={logo} />
      <main className="mt-20 flex-grow flex justify-center items-center bg-white dark:bg-gray-800">
      <div className='w-full h-full'><Toast /><Outlet /></div>
      </main>
      <Footer appName={appName} logo={logo} />
    </div>
  );
}
