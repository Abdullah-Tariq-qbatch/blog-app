/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import _ from 'lodash';
import Card from './Card';

function Blogs() {
  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);

  const [users, setUsers] = useState([]);
  const [postComments, SetPostComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!BlogsData.loading) setList(BlogsData.blogs);
    if (!BlogsData.loading && !UserData.loading) { setUsers(_.keyBy(UserData.users, 'id')); }
    if (!BlogsData.loading && !CommentData.loading) { SetPostComments(_.countBy(CommentData.comments, 'postId')); }
  }, [BlogsData.loading, UserData.loading, CommentData.loading]);

  const debouncedFilter = useCallback(
    _.debounce((value) => {
      const filtered = BlogsData.blogs.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
      setList(filtered);
    }, 600),
    [list],
  );
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedFilter(value);
  };

  const memoizedFilteredItems = useMemo(() => list, [list]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = memoizedFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(memoizedFilteredItems.length / itemsPerPage);

  return (
    <div className="mt-10 text-center text-2xl font-serif">
      <h1 className="text-3xl">Some Interesting Reads</h1>
      <div className="flex justify-end">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="default-search"
          className="block md:w-72 mt-5 mr-10 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Blogs..."
          required
        />
      </div>

      <div className="flex justify-center mt-10">
        {BlogsData.loading || UserData.loading || CommentData.loading ? (
          <div className="w-full flex justify-center h-full mt-10">
            <Oval
              height={80}
              width={80}
              color="#0066ff"
              wrapperStyle={{}}
              wrapperClass=""
              visible
              ariaLabel="oval-loading"
              secondaryColor="#001f4d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            {currentItems.map((blog) => (<Card blog={blog} user={users[blog.userId]} key={blog.id} comments={postComments[blog.id]} />))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center float-right mt-5 mr-20 mb-20">
        <span className="text-sm text-gray-700 ">
          Showing
          {' '}
          <span className="font-semibold text-gray-900 ">{indexOfFirstItem + 1}</span>
          {' '}
          to
          {' '}
          <span className="font-semibold text-gray-900 ">{indexOfLastItem < memoizedFilteredItems.length ? indexOfLastItem : memoizedFilteredItems.length}</span>
          {' '}
          of
          {' '}
          <span className="font-semibold text-gray-900 ">{memoizedFilteredItems.length}</span>
          {' '}
          Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button onClick={() => setCurrentPage((state) => (state === 1 ? 1 : state - 1))} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 rounded-l hover:bg-blue-900">
            <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Prev
          </button>
          <button onClick={() => setCurrentPage((state) => (state < totalPages ? state + 1 : state))} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-500 border-0 border-l border-gray-700 rounded-r hover:bg-blue-900">
            Next
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
