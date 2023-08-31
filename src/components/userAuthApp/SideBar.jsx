import {
  DesktopOutlined,
  EditOutlined,
  HomeOutlined,
  LeftSquareOutlined,
  LogoutOutlined,
  RightSquareOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import RenderIf from "../catalogApp/RenderIf";
import { logout } from "../../redux/users/actionCreator";
import { useDispatch } from "react-redux";

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout(navigate));
    toggleSidebar();
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return location.pathname !== "/signup" && location.pathname !== "/login" && (
    <RenderIf
      isTrue={showSidebar}
      fallback={
        <div
          className="fixed top-1/2 z-50 mt-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm  bg-gray-800 text-white hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600"
          onClick={toggleSidebar}
        >
          <RightSquareOutlined />
        </div>
      }
    >
      <aside
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 z-50 w-2/3 transform flex-col items-center justify-start bg-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-900 md:w-1/3 lg:w-1/6`}
      >
        {showSidebar && (
          <div
            className="absolute left-[100%] top-1/2 mt-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm bg-gray-800 text-white hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600"
            onClick={toggleSidebar}
          >
            <LeftSquareOutlined />
          </div>
        )}

        <div className="flex flex-row items-center justify-around px-4 dark:text-white text-gray-800">
          <h1 className="text-md px-2 py-4 text-center font-semibold md:text-xl">
            One App 2.0
          </h1>
        </div>

        <hr className="mx-2 dark:border-white border-gray-800" />

        <nav>
          <ul className="flex flex-col justify-center space-y-4 p-2">
            <li>
              <Link
                to={"/"}
                onClick={toggleSidebar}
                className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-start hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600 hover:shadow-md"
              >
                <HomeOutlined />
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/tv-shows"}
                onClick={toggleSidebar}
                className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-start hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600 hover:shadow-md"
              >
                <DesktopOutlined />
                <p>TV Shows</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/catalog"}
                onClick={toggleSidebar}
                className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-start hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600 hover:shadow-md"
              >
                <ShoppingCartOutlined />
                <p>Products Catalog</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/blog"}
                onClick={toggleSidebar}
                className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-start hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600 hover:shadow-md"
              >
                <EditOutlined />
                <p>Blogs</p>
              </Link>
            </li>
            <li>
              <Link
                to={"/social-media"}
                onClick={toggleSidebar}
                className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-start hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600 hover:shadow-md"
              >
                <UserOutlined />
                <p>Social Media</p>
              </Link>
            </li>{" "}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer flex-row items-center justify-start space-x-2 rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-start hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600 hover:shadow-md"
                >
                  <LogoutOutlined />
                  <p>Logout</p>
                </button>
              </li>
          </ul>
        </nav>
      </aside>
    </RenderIf>
  );
};

export default SideBar;
