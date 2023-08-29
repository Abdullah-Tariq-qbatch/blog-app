import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Root = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 h-auto">
        <main className="md:mx-8 lg:mx-24">
          <Outlet />
        </main>
      </div>
      <Footer className="fixed bottom-0 " />
    </>
  );
};

export default Root;
