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
      backgroundImage:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80",
    },
    {
      path: "/tv-shows",
      title: "TV Shows",
      description: "Browse your favorite TV shows.",
      component: <DesktopOutlined />,
      backgroundImage:
        "https://images.unsplash.com/photo-1574974409771-cebec54deb00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2873&q=80",
    },
    {
      path: "/catalog",
      title: "Products Catalog",
      description: "Discover our product catalog.",
      component: <ShoppingCartOutlined />,
      backgroundImage:
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80",
    },
    {
      path: "/blog",
      title: "Blogs",
      description: "Read our latest blog posts.",
      component: <EditOutlined />,
      backgroundImage:
        "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2873&q=80",
    },
    {
      path: "/social-media",
      title: "Social Media",
      description: "Connect with us on social media.",
      component: <UserOutlined />,
      backgroundImage:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
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
        <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
          {cardData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex scale-100 transform flex-col items-center justify-center space-x-2 rounded-md bg-cover bg-center p-4 text-gray-200 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 dark:text-gray-950"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
              }}
            >
              <div className="rounded-md bg-gray-800 bg-opacity-50 p-4 dark:bg-gray-300 dark:bg-opacity-50">
                <div className="flex flex-row items-center justify-center space-x-2 text-xl font-semibold">
                  {item.component}
                  <span>{item.title}</span>
                </div>
                <p className=" text-md font-light">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default OneAppHomePage;
