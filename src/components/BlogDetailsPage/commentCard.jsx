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
    <div className="bg-gray-200 border-b-2 border-gray-400 py-3">
      <DeleteFilled className="float-right mr-2" style={{ color: 'red' }} onClick={handleDelete} />
      <div className="flex items-center ml-2">
        <Avatar initials={`${commentDetails.user.username[0]}${commentDetails.user.username[1]}${commentDetails.user.username[2]}`} bgColor="bg-blue-500" />
        <p className="mx-2 text-xs text-gray-700 flex items-center hover:text-blue-500">
          {commentDetails.user.username}
        </p>
      </div>

      <p className="mt-1 ml-2">{commentDetails.body}</p>
    </div>
  );
}

export default Comment;
