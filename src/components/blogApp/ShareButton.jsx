/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
  ShareAltOutlined,
  FacebookFilled,
  WhatsAppOutlined,
  InstagramFilled,
  LinkOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { copyLink } from "../../redux/blogs/actionCreator";

import { RenderIf } from "../../utils/blogApp/commonMethods";

const ShareButton = () => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const shareOnClick = () => {
    setShowDropDown((state) => !state);
  };

  const copyLinkOnClick = () => {
    const currentPageURL = window.location.href;
    navigator.clipboard.writeText(currentPageURL);
    setShowDropDown(false);
    dispatch(copyLink("Link Copied"));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <ShareAltOutlined
        className="text-xl text-blue-custom"
        onClick={shareOnClick}
      />
      <RenderIf isTrue={showDropDown}>
        <div
          ref={dropdownRef}
          className="absolute ml-1 mt-2 h-40 w-36 rounded-md border border-gray-300 bg-gray-100 py-2 dark:border-gray-950 dark:bg-gray-800"
        >
          <div className="h-full w-full flex-col items-center justify-center">
            <div className="px-1">
              <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-blue-custom p-0.5 text-white hover:bg-blue-800 dark:border-gray-950 dark:text-gray-950">
                <FacebookFilled className="mr-2 " />
                Facebook
              </button>
            </div>
            <hr className="my-1 border-gray-300 dark:border-gray-950" />
            <div className="px-1">
              <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-blue-custom p-0.5 text-white hover:bg-blue-800  dark:border-gray-950 dark:text-gray-950">
                <WhatsAppOutlined className="mr-2" />
                Whatsapp
              </button>
            </div>
            <hr className="my-1 border-gray-300 dark:border-gray-950" />
            <div className="px-1">
              <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-blue-custom p-0.5 text-white hover:bg-blue-800  dark:border-gray-950 dark:text-gray-950">
                <InstagramFilled className="mr-2" />
                Instagram
              </button>
            </div>
            <hr className="my-1 border-gray-300 dark:border-gray-950" />
            <div className="px-1">
              <button
                onClick={copyLinkOnClick}
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-blue-custom p-0.5 text-white hover:bg-blue-800  dark:border-gray-950 dark:text-gray-950"
              >
                <LinkOutlined className="mr-2" />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default ShareButton;
