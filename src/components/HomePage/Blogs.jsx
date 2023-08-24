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
import { Oval } from 'react-loader-spinner';
import _ from 'lodash';
import Card from './Card';
import Pagination from './Pagination';

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
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold leading-normal text-gray-700 dark:text-gray-200 mb-2">
          Some Interesting Reads
          {' '}
          {userId ? `by ${user?.firstName} ${user?.maidenName} ${user?.lastName}` : ''}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <select id="countries" value={filter} onChange={(e) => setFilter((state) => e.target.value)} className="block md:w-60 h-11 ml-10 text-sm outline-none dark:bg-gray-600 dark:border-gray-700 text-gray-400 dark:focus:text-gray-200 focus:text-gray-800 border-2 border-gray-300 rounded-lg bg-gray-50 dark:focus:ring-pink-800 dark:focus:border-pink-800 focus:ring-pink-500 focus:border-pink-500">
          <option value="">Choose a filter</option>
          <option value="Likeness">Likeness</option>
          <option value="Popularity">Popularity</option>
        </select>

        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="default-search"
          className="block md:w-60 h-11 mr-10 p-4 text-sm outline-none  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-200 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-pink-800 dark:focus:border-pink-800"
          placeholder="Search Blogs..."
          required
        />
      </div>

      <div className="flex justify-center mt-8 mx-10">
        {BlogsData.loading || UserData.loading || CommentData.loading ? (
          <div className="w-full flex justify-center dark:bg-gray-800 items-center h-60 mt-10">
            <Oval
              height={80}
              width={80}
              color="#FE02CA"
              wrapperStyle={{}}
              wrapperClass=""
              visible
              ariaLabel="oval-loading"
              secondaryColor="#FF9EEB"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : currentItems.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map((blog) => (<Card blog={blog} user={users[blog.userId]} key={`${blog.id} + ${blog.title}`} comments={postComments[blog.id]} />))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center mt-10 text-black dark:text-gray-200">
            <h1>Sorry, Your search has yielded no results</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-end mt-5 mr-20 pb-10">

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
