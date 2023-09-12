/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Toast from "../../components/blogApp/Toast";

import { fetchUsers } from "../../redux/users/actionCreator";
import { fetchBlogs } from "../../redux/blogs/actionCreator";
import { fetchComments } from "../../redux/comments/actionCreator";

export default function MainLayout({ links, logo, appName }) {
  document.title = appName;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname.includes("/blog")) {
      dispatch(fetchBlogs());
      dispatch(fetchUsers());
      dispatch(fetchComments());
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col ">
      <Header links={links} logo={logo} />
      <main className="mt-20 flex flex-grow items-center justify-center bg-white dark:bg-gray-800">
        <div className="h-full w-full">
          <Toast />
          <Outlet />
        </div>
      </main>
      <Footer appName={appName} logo={logo} />
    </div>
  );
}
