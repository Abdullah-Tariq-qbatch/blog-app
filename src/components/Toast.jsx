/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../redux/blogs/actionCreator';
import { clearMessageComments } from '../redux/comments/actionCreator';
import { clearMessageUser } from '../redux/users/actionCreator';

function Toast() {
  const Blogs = useSelector((state) => state.Blogs);
  const Users = useSelector((state) => state.Users);
  const Comments = useSelector((state) => state.Comments);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    if (Blogs.success || Blogs.error) {
      dispatch(clearMessage());
    } else if (Comments.success || Comments.error) {
      dispatch(clearMessageComments());
    } else {
      dispatch(clearMessageUser());
    }
  };

  useEffect(() => {
    if (Blogs.success || Blogs.error || Users.success || Users.error || Comments.success || Comments.error) setShow(true);
  }, [Blogs, Users, Comments]);
  return (Blogs.success || Users.success || Comments.success || Blogs.error || Users.error || Comments.error) && show ? (
    <div className="fixed top-24 right-1 z-50">
      <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4  text-gray-500 dark:bg-gray-950 bg-white rounded-lg shadow" role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${(Blogs.success || Users.success || Comments.success) ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}  rounded-lg`}>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{Blogs.success ? Blogs.success : Comments.success ? Comments.success : Users.success ? Users.success : Blogs.error ? Blogs.error : Comments.error ? Comments.error : Users.error ?? Users.error }</div>
        <button type="button" onClick={handleClose} className="ml-auto -mx-1.5 -my-1.5 dark:bg-gray-950 bg-white text-gray-400 dark:text-gray-600 dark:hover:text-gray-200 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Toast;
