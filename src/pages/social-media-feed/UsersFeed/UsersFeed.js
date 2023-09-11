import React, { useEffect, useRef, useState } from "react";
import {
  fetchUsersSocialMediaFeed,
  reInitializeUsers,
  searchAllUsers,
} from "./../../../redux/users/actionCreator";
import { useDispatch, useSelector } from "react-redux";

import Alert from "./../../../components/social-media-feed/Alert/Alert";
import Pagination from "./../../../components/blogApp/HomePage/Pagination";
import { SearchOutlined } from "@ant-design/icons";
import User from "./../../../components/social-media-feed/cards/User/User";
import { fetchPosts } from "./../../../redux/posts/actionCreator";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
const limit = 12;
const UsersFeed = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const navigate = useNavigate();
  const { users, success, error, total } = useSelector((state) => state.Users);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const posts = useSelector((state) => state.Posts);
  const [page, onPageChange] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    dispatch(
      fetchUsersSocialMediaFeed(limit, Math.floor(page * limit - limit)),
    );
  }, [dispatch, page]);

  useEffect(() => {
    if (success) {
      dispatch(reInitializeUsers());
    }
    if (error) {
      dispatch(reInitializeUsers());
    }
  }, [success, error]);

  const handlePageClick = (page) => {
    onPageChange(page);
    navigate(`/social-media/users-feed?page=${page}`);
  };

  useEffect(() => {
    if (posts.success) {
      toast.success(posts.success);
      dispatch(reInitializeUsers());
    }
    if (posts.error) {
      toast.error(posts.error);
      dispatch(reInitializeUsers());
    }
  }, [posts.success, posts.error]);

  const handleOnClick = (userId) => {
    //update posts according to user Id
    dispatch(fetchPosts(userId));
  };
  const updateDebounceText = debounce((text) => {
    searchRef.current.value = text;
    dispatch(searchAllUsers(text));
    if (text === "") {
      dispatch(fetchUsersSocialMediaFeed(limit, page * limit - limit));
    }
  });

  return (
    <>
      <div className="mt-2 flex w-full items-center justify-center space-x-2 dark:text-white">
        <SearchOutlined />
        <input
          type="search"
          id="default-search"
          className="w-2/3 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-center text-sm text-black focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-[#4b5563] dark:text-white dark:placeholder-white dark:focus:border-gray-500 dark:focus:ring-gray-500 lg:w-1/4"
          placeholder="Search users..."
          ref={searchRef}
          onChange={(event) => updateDebounceText(event.target.value)}
        />
      </div>
      <div className="mx-2 mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {page > 0 &&
          users &&
          users.map((user) => (
            <User
              key={user.id}
              {...user}
              onClick={() => handleOnClick(user.id)}
            />
          ))}
        {(page < 1 || !users.length) && (
          <div className="mt-12 ">
            <Alert title="Alert: " message="No users exist!" />
          </div>
        )}
      </div>
      <div className="mr-2">
        <Pagination
          currentPage={page}
          handlePageNoClick={handlePageClick}
          totalPages={Math.ceil(total / limit)}
        />
      </div>
    </>
  );
};

export default UsersFeed;
