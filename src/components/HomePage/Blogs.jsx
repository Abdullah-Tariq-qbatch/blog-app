/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
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
import { useSearchParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import _ from 'lodash';
import Card from './Card';
import Pagination from './Pagination';

function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;

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
      <div className="flex flex-col justify-center items-end mt-5 mr-20 mb-10">
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

        <nav aria-label="Page navigation example">
          <Pagination currentPage={currentPage} totalPages={totalPages} setSearchParams={setSearchParams} />
        </nav>
      </div>
    </div>
  );
}

export default Blogs;
