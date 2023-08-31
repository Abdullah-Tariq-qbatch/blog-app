import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="bg-[#F9FAFB]">
      <Header />
      <main className="m-0 h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
