import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CheckIconSvg } from '../assets/svg/checkIcon.svg';
import { ReactComponent as CloseIconSvg } from '../assets/svg/closeIcon.svg';

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

  function getMessage() {
    let content;
    if (Blogs.success) {
      content = Blogs.success;
    } else if (Comments.success) {
      content = Comments.success;
    } else if (Users.success) {
      content = Users.success;
    } else if (Blogs.error) {
      content = Blogs.error;
    } else if (Comments.error) {
      content = Comments.error;
    } else if (Users.error) {
      content = Users.error;
    } else {
      content = Users.error;
    }
    return content;
  }

  const BlogCheck = Blogs.success || Blogs.error;
  const CommentCheck = Comments.success || Comments.error;
  const UserCheck = Users.success || Users.error;

  const errorCheck = BlogCheck || UserCheck || CommentCheck;

  useEffect(() => {
    if (errorCheck) setShow(true);
  }, [Blogs, Users, Comments]);

  return (errorCheck) && show ? (
    <div className="fixed top-24 right-1 z-50">
      <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4  text-gray-500 dark:bg-gray-950 bg-white rounded-lg shadow" role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${(Blogs.success || Users.success || Comments.success) ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}  rounded-lg`}>
          <CheckIconSvg />
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{getMessage()}</div>
        <button type="button" onClick={handleClose} className="ml-auto -mx-1.5 -my-1.5 dark:bg-gray-950 bg-white text-gray-400 dark:text-gray-600 dark:hover:text-gray-200 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
          <span className="sr-only">Close</span>
          <CloseIconSvg />
        </button>
      </div>
    </div>
  ) : (
    <div className="hidden" />
  );
}

export default Toast;
