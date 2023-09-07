import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";

import Header from '../../components/common/Header'
import Footer from '../../components/blogApp/Footer';
import Toast from '../../components/blogApp/Toast';
import logo from '../../assets/blogApp/image/png/logo512.png';

import { fetchUsers } from '../../redux/users/actionCreator';
import { fetchBlogs } from '../../redux/blogs/actionCreator';
import { fetchComments } from '../../redux/comments/actionCreator';

export default function MainLayout() {
  document.title = 'Blogs';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
    dispatch(fetchComments());
  }, []);

  const links = [
    {
      text: 'Blog Home',
      url: '/blog/'
    },
    {
      text: 'Write a Blog',
      url: '/blog/create-blog'
    },
  ]
  return (
    <div className="mt-20 h-full w-full bg-white dark:bg-gray-800 ease-linear selection:bg-gray-800 selection:text-gray-200 dark:selection:bg-gray-200 dark:selection:text-gray-800">
      <Header links={links} logo={logo} />
      <Toast />
      <Outlet />
      <Footer />
    </div>
  );
}
