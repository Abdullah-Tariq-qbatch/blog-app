/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
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
import _ from 'lodash';
import { WarningOutlined } from '@ant-design/icons';

import Header from './Header';
import Card from './Card';
import Pagination from './Pagination';
import Spinner from '../Spinner';

function Blogs({ userId }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;

  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);

  const [users, setUsers] = useState([]);
  const [postComments, SetPostComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [list, setList] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!BlogsData.loading) {
      if (userId) {
        const tempList = _.groupBy(BlogsData.blogs, 'userId');
        setList((state) => tempList[userId]);
      } else setList((state) => BlogsData.blogs);
    }
    if (!BlogsData.loading && !UserData.loading) { setUsers((state) => _.keyBy(UserData.users, 'id')); }
    if (!BlogsData.loading && !CommentData.loading) { SetPostComments((state) => _.countBy(CommentData.comments, 'postId')); }
    if (userId) {
      const tempList = _.keyBy(UserData.users, 'id');
      setUser(tempList[userId]);
    }
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

  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let displayedItems = [...memoizedFilteredItems];

  if (filter === 'Likeness') {
    displayedItems = displayedItems.sort((a, b) => b.reactions - a.reactions);
  } else if (filter === 'Popularity') {
    displayedItems = displayedItems.sort((a, b) => (b.reactions + postComments[b.id] || 0) - (a.reactions + postComments[a.id] || 0));
  }

  const currentItems = displayedItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayedItems.length / itemsPerPage);

  return (
    <div className="mt-10 text-center text-2xl bg-white dark:bg-gray-800">
      <Header userId={userId} user={user} filter={filter} setFilter={setFilter} searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <div className="flex justify-center mt-8 mx-5 sm:mx-10">
        {BlogsData.loading || UserData.loading || CommentData.loading ? (
          <Spinner />
        ) : currentItems.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map((blog) => (<Card blog={blog} user={users[blog.userId]} key={`${blog.id} + ${blog.title}`} comments={postComments[blog.id]} />))}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center mt-10 text-black dark:text-gray-200">
            <WarningOutlined className="text-4xl mb-3 text-indigo-custom" />
            <h1 className="text-gray-700 dark:text-gray-200">Sorry, Your search has yielded no result</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center sm:items-end mt-5 mr-0 sm:mr-20 pb-10">

        <nav aria-label="Page navigation example bg-white dark:bg-gray-700">
          <Pagination currentPage={currentPage} totalPages={totalPages} setSearchParams={setSearchParams} />
        </nav>
        <span className="text-sm text-gray-700 dark:text-gray-200 mt-3">
          Page Number :
          {' '}
          <span className="font-semibold text-blue-custom ">{currentPage}</span>
          {' '}
          out of
          {' '}
          <span className="font-semibold text-blue-custom ">{totalPages}</span>
        </span>
      </div>
    </div>
  );
}

export default Blogs;
