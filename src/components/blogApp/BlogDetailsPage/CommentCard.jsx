/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { DeleteFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';

import { deleteComment } from '../../../redux/comments/actionCreator';

function Comment({ commentDetails }) {
  const dispatch = useDispatch();

  return (
    <article className="p-6 mb-6 text-base border-t border-gray-200">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900">
            <Avatar initials={`${commentDetails.user.username[0]}${commentDetails.user.username[1]}${commentDetails.user.username[2]}`} bgColor="bg-pink-500" />
            <span className="ml-2 text-black dark:text-white">
              {' '}
              {commentDetails.user.username}
            </span>
          </div>
        </div>
        <button
          id="dropdownComment3Button"
          onClick={() => dispatch(deleteComment(commentDetails.id))}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 dark:bg-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
        >
          <DeleteFilled className="text-red-custom" />
        </button>
      </footer>
      <p className="text-gray-500 dark:text-gray-200">{commentDetails.body}</p>
    </article>
  );
}

Comment.propTypes = {
  commentDetails: PropTypes.object.isRequired,
};

export default Comment;
