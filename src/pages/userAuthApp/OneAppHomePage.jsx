import {
  DesktopOutlined,
  EditOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import React from "react";

function OneAppHomePage() {
  const cardData = [
    {
      path: "/profile",
      title: "Profile",
      description: "Visit the default profile page",
      component: <HomeOutlined />,
    },
    {
      path: "/tv-shows",
      title: "TV Shows",
      description: "Browse your favorite TV shows.",
      component: <DesktopOutlined />,
    },
    {
      path: "/catalog",
      title: "Products Catalog",
      description: "Discover our product catalog.",
      component: <ShoppingCartOutlined />,
    },
    {
      path: "/blog",
      title: "Blogs",
      description: "Read our latest blog posts.",
      component: <EditOutlined />,
    },
    {
      path: "/social-media",
      title: "Social Media",
      description: "Connect with us on social media.",
      component: <UserOutlined />,
    },
  ];

  return (
    <>
      <div className="flex h-screen flex-col bg-gray-200 p-4 dark:bg-gray-800">
        <div className="mb-2 flex flex-row items-center justify-center border-b-2 border-gray-800 dark:border-white">
          <h1 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">
            One App 2.0
          </h1>
        </div>
        <div className="grid h-full grid-cols-3 gap-4">
          {cardData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center justify-center space-x-2 rounded-md bg-gray-800 p-4 text-gray-200 shadow-md hover:bg-gray-950 dark:bg-gray-400 dark:text-gray-950 dark:hover:bg-gray-600"
            >
              <div className="flex flex-row items-center justify-center space-x-2 text-xl font-semibold">
                {item.component}
                <span>{item.title}</span>
              </div>
              <p className=" text-md font-light">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default OneAppHomePage;
