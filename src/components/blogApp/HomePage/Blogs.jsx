import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  groupBy, keyBy, countBy, debounce,
} from 'lodash';
import { WarningOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Card from './Card';
import Pagination from './Pagination';
import CardSkeleton from './CardSkeleton';
import { RenderIf } from '../../../utils/blogApp/commonMethods';

function Blogs({ userId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page'), 10) || 1;

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
        const tempList = groupBy(BlogsData.blogs, 'userId');
        setList(() => tempList[userId]);
      } else setList(() => BlogsData.blogs);
    }
    console.log(UserData);
    if (!BlogsData.loading && !UserData.loading) { setUsers(() => keyBy(UserData.users, 'id')); }
    if (!BlogsData.loading && !CommentData.loading) { SetPostComments(() => countBy(CommentData.comments, 'postId')); }
    if (userId) {
      const tempList = keyBy(UserData.users, 'id');
      setUser(tempList[userId]);
    }
  }, [BlogsData, UserData, CommentData]);

  useEffect(() => {
    console.log(users);
  }, [users])

  const debouncedFilter = useCallback(
    debounce((value) => {
      const filtered = BlogsData.blogs.filter(
        (item) => item.title.toLowerCase().includes(value.toLowerCase()),
      );
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
    displayedItems = displayedItems.sort(
      (a, b) => (b.reactions + postComments[b.id] || 0) - (a.reactions + postComments[a.id] || 0),
    );
  }

  const currentItems = displayedItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayedItems.length / itemsPerPage);
  const tempArray = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="mt-10 text-center text-2xl bg-white dark:bg-gray-800">
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold leading-normal text-gray-700 dark:text-gray-200 mb-2">
          Some Interesting Reads
          {' '}
          {userId ? `by ${user?.firstName} ${user?.maidenName} ${user?.lastName}` : ''}
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between w-full">
        <select id="countries" value={filter} onChange={(e) => setFilter(() => e.target.value)} className="block md:w-60 h-11 mx-10 sm:ml-10 text-sm outline-none dark:bg-gray-600 dark:border-gray-700 text-gray-400 dark:focus:text-gray-200 focus:text-gray-800 border-2 border-gray-300 rounded-lg bg-gray-50 dark:focus:ring-pink-800 dark:focus:border-pink-800 focus:ring-pink-500 focus:border-pink-500">
          <option value="">Choose a filter</option>
          <option value="Likeness">Likeness</option>
          <option value="Popularity">Popularity</option>
        </select>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="default-search"
          className="block md:w-60 h-11 mt-3 sm:mt-0  mx-10 sm:mr-10 p-4 text-sm outline-none  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-800 dark:focus:border-pink-800"
          placeholder="Search Blogs..."
          required
        />
      </div>
      <div className="flex justify-center mt-8 mx-5 sm:mx-10">
        <RenderIf
          isTrue={(BlogsData.loading || UserData.loading || CommentData.loading)}
          fallback={(
            <RenderIf
              isTrue={(currentItems.length)}
              fallback={(
                <div className="w-full flex flex-col justify-center items-center mt-10 text-black dark:text-gray-200">
                  <WarningOutlined className="text-4xl mb-3 text-indigo-custom" />
                  <h1 className="text-gray-700 dark:text-gray-200">Sorry, Your search has yielded no result</h1>
                </div>
)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentItems.map((blog) => (
                  <Card blog={blog} user={users[blog.userId]} key={`${blog.id} + ${blog.title}`} comments={postComments[blog.id]} />
                ))}
              </div>
            </RenderIf>
)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tempArray.map((item) => (
              <CardSkeleton key={item} />
            ))}
          </div>
        </RenderIf>
      </div>
      <div className="flex flex-col justify-center items-center sm:items-end mt-5 mr-0 sm:mr-20 pb-10">

        <nav aria-label="Page navigation example bg-white dark:bg-gray-700">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setSearchParams={setSearchParams}
          />
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

Blogs.propTypes = {
  userId: PropTypes.number,
};

Blogs.defaultProps = {
  userId: 0,
};

export default Blogs;
