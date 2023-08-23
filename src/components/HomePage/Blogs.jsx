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

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = memoizedFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(memoizedFilteredItems.length / itemsPerPage);

  return (
    <div className="mt-10 text-center text-2xl">
      <div className="text-center mt-12">
        <h3 className="text-4xl font-semibold leading-normal text-gray-700 mb-2">
          Some Interesting Reads
          {' '}
          {userId ? `by ${user?.firstName} ${user?.maidenName} ${user?.lastName}` : ''}
        </h3>
      </div>
      <div className="flex justify-end">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          id="default-search"
          className="block md:w-72 mt-5 mr-10 p-4 text-sm outline-none text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Search Blogs..."
          required
        />
      </div>

      <div className="flex justify-center mt-10">
        {BlogsData.loading || UserData.loading || CommentData.loading ? (
          <div className="w-full flex justify-center items-center h-60 mt-10">
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
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            {currentItems.map((blog) => (<Card blog={blog} user={users[blog.userId]} key={`${blog.id} + ${blog.title}`} comments={postComments[blog.id]} />))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center mt-10">
            <h1>Sorry, Your search has yielded no results</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-end mt-5 mr-20 mb-10">

        <nav aria-label="Page navigation example">
          <Pagination currentPage={currentPage} totalPages={totalPages} setSearchParams={setSearchParams} />
        </nav>
        <span className="text-sm text-gray-700 mt-3">
          Page Number :
          {' '}
          <span className="font-semibold text-pink-400 ">{currentPage}</span>
          {' '}
          out of
          {' '}
          <span className="font-semibold text-pink-400 ">{totalPages}</span>
        </span>
      </div>
    </div>
  );
}

export default Blogs;
