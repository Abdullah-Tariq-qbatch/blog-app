/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { DeleteFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/comments/actionCreator';
import Avatar from '../Avatar';

function Comment({ commentDetails }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(commentDetails.id));
  };
  return (
    <article className="p-6 mb-6 text-base border-t border-gray-200">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900">
            <Avatar initials={`${commentDetails.user.username[0]}${commentDetails.user.username[1]}${commentDetails.user.username[2]}`} bgColor="bg-pink-500" />
            <span className="ml-2">
              {' '}
              {commentDetails.user.username}
            </span>
          </div>
        </div>
        <button
          id="dropdownComment3Button"
          onClick={handleDelete}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
        >
         <DeleteFilled className="text-red-custom" />
        </button>
      </footer>
      <p className="text-gray-500">{commentDetails.body}</p>
    </article>
  );
}

export default Comment;
