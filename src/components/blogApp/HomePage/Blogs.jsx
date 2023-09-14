/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { countBy, debounce, groupBy, keyBy } from "lodash";

import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import Pagination from "./Pagination";
import { RenderIf } from "../../../utils/blogApp/commonMethods";
import { WarningOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Blogs({ userId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const searchParam = searchParams.get("search");
  const filterParam = searchParams.get("filter");

  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);

  const [users, setUsers] = useState([]);
  const [postComments, SetPostComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (BlogsData.loading || UserData.loading || CommentData.loading) return;

    const commentsArray = countBy(CommentData.comments, "postId");
    const tempBlogList = groupBy(BlogsData.blogs, "userId");
    const tempUserList = keyBy(UserData.users, "id");

    if (userId) {
      setList(() => {
        const filteredBlogs = tempBlogList[userId].filter((item) =>
          searchParam
            ? item.title.toLowerCase().includes(searchParam.toLowerCase())
            : true,
        );
        return filterBlogs(filteredBlogs);
      });
      setUser(tempUserList[userId]);
    } else {
      setList(() => filterBlogs(BlogsData.blogs));
    }

    setUsers(() => tempUserList);
    SetPostComments(() => commentsArray);

    function filterBlogs(blogList) {
      if (filterParam === "Likeness") {
        return [...blogList].sort((a, b) => b.reactions - a.reactions);
      } else if (filterParam === "Popularity") {
        return [...blogList].sort(
          (a, b) =>
            b.reactions +
            (commentsArray[b.id] || 0) -
            (a.reactions + (commentsArray[a.id] || 0)),
        );
      } else if (!filterParam) return [...blogList];
      else return [];
    }
  }, [BlogsData, UserData, CommentData, userId, searchParam, filterParam]);

  const debouncedSetSearchParams = useCallback(
    debounce((value) => {
      const sendParam = {};
      if (currentPage > 1) sendParam.page = currentPage;
      if (filterParam) sendParam.search = searchParam;
      if (value) sendParam.search = value;
      setSearchParams(sendParam);
    }, 600),
    [],
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSetSearchParams(value);
  };

  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(0);
  let startIndex = undefined;
  let endIndex = undefined;
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;
    setTotalPages(Math.ceil(list.length / itemsPerPage));
    setCurrentItems(list.slice(startIndex, endIndex));
  }, [list, currentPage]);

  let tempArray = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="mt-10 bg-white text-center text-2xl dark:bg-gray-800">
      <div className="mt-12 text-center">
        <h3 className="mb-2 text-2xl font-semibold leading-normal text-gray-700 dark:text-gray-200">
          Some Interesting Reads{" "}
          {userId
            ? `by ${user?.firstName} ${user?.maidenName} ${user?.lastName}`
            : ""}
        </h3>
      </div>
      <div className="flex w-full flex-col justify-between sm:flex-row">
        <select
          id="filter"
          value={filterParam}
          onChange={(e) => {
            const sendParam = {};
            if (currentPage > 1) sendParam.page = currentPage;
            if (searchParam) sendParam.search = searchParam;
            if (e.target.value) sendParam.filter = e.target.value;
            setSearchParams(sendParam);
          }}
          className="mx-10 block h-11 rounded-lg border-2 border-gray-300 bg-gray-50 text-sm text-gray-400 outline-none focus:border-pink-500 focus:text-gray-800 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-600 dark:focus:border-pink-800 dark:focus:text-gray-200 dark:focus:ring-pink-800 sm:ml-10 md:w-60"
        >
          <option value="">Choose a filter</option>
          <option value="Likeness">Likeness</option>
          <option value="Popularity">Popularity</option>
        </select>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="default-search"
          className="mx-10 mt-3 block h-11 rounded-lg  border-2 border-gray-300 bg-gray-50 p-4 text-sm  text-gray-900 outline-none focus:border-pink-500 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 dark:focus:border-pink-800 dark:focus:ring-pink-800 sm:mr-10 sm:mt-0 md:w-60"
          placeholder="Search Blogs..."
          required
        />
      </div>
      <div className="mx-5 mt-8 flex justify-center sm:mx-10">
        <RenderIf
          isTrue={BlogsData.loading || UserData.loading || CommentData.loading}
          fallback={
            <RenderIf
              isTrue={currentItems.length}
              fallback={
                <div className="mt-10 flex w-full flex-col items-center justify-center text-black dark:text-gray-200">
                  <WarningOutlined className="mb-3 text-4xl text-indigo-custom" />
                  <h1 className="text-gray-700 dark:text-gray-200">
                    Sorry, Your search has yielded no result
                  </h1>
                </div>
              }
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentItems.map((blog) => (
                  <Card
                    blog={blog}
                    user={users[blog.userId]}
                    key={`${blog.id} + ${blog.title}`}
                    comments={postComments[blog.id]}
                  />
                ))}
              </div>
            </RenderIf>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tempArray.map((item) => (
              <CardSkeleton key={item} />
            ))}
          </div>
        </RenderIf>
      </div>
      <div className="sm:mr-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageNoClick={(no) => {
            const sendParam = {};
            if (filterParam) sendParam.filter = filterParam;
            if (searchParam) sendParam.search = searchParam;
            if (no > 1) sendParam.page = no;
            setSearchParams(sendParam);
          }}
        />
      </div>
    </div>
  );
}

export default Blogs;
