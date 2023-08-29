/* eslint-disable react/prop-types */
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="m-0 h-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
