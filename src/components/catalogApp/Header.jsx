/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";

import "../../catalog.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-800">
        <div className="flex justify-between mx-10 md:mx-10 items-center">
          <NavLink
            to={"/catalog"}
            className="text-white text-lg hidden md:flow-root font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md "
          >
            Home
          </NavLink>
          <div className="w-full my-2 md:w-1/2">
            <Search />
          </div>
          <button
            onClick={() => {
              navigate("/catalog/add", { state: { product: undefined } });
            }}
            className="justify-center hidden md:flex text-white text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap items-center"
          >
            Add Product
            <PlusOutlined className="ml-2" />
          </button>
        </div>
      </div>
      <div className="bg-gray-800 flow-root static md:hidden py-2">
        <div className="grid gap-8 grid-cols-2 mx-10">
          <NavLink
            to="/catalog"
            className="text-white text-[15px] md:text-lg font-semibold bg-gray-700 px-4 py-2 hover:bg-gray-600 flex justify-center items-center rounded-md"
          >
            Home
          </NavLink>
          <button
            onClick={() => {
              navigate("/catalog/add", { state: { product: undefined } });
            }}
            className="justify-center text-white text-[15px] md:text-lg font-semibold bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md whitespace-nowrap flex items-center"
          >
            Add Product
            <PlusOutlined className="ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
