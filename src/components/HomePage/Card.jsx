/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Image from '../ProfileImage';
import Avatar from '../Avatar';

import { defaultImageUrl } from '../../constants/constants';
import { getInitials, RenderIf } from '../../utils/commonMethods';

function Card({ blog, user, comments }) {
  const imageSrc = blog?.file ? blog.file : defaultImageUrl;
  return (
    <div className="max-w-sm bg-white dark:bg-gray-950 border dark:border-gray-950 border-gray-200 rounded-lg shadow flex flex-col">
      <div className="relative z-0">
        <img className="rounded-t-lg w-96 h-44" src={imageSrc} alt="" />
        <span id="blackOverlay" className="w-full rounded-t-lg h-full absolute top-0 left-1/2 transform -translate-x-1/2 bg-black opacity-0 dark:opacity-30 flex justify-center items-center" />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-900 rounded-lg px-5 -mt-14 mx-auto w-11/12 mb-5 z-10">
        <div className="flex justify-center -mt-7">
          <RenderIf isTrue={user?.image} fallback={<Avatar initials={getInitials(user)} bgColor="bg-pink-custom" />}>
            <Image src={user.image} />
          </RenderIf>
        </div>

        <div className="flex justify-center mt-1">
          <Link to={`/user/${user?.id}/blogs`}>
            <p className="mx-2 text-xs text-gray-400 dark:text-gray-200 flex items-center dark:hover:text-pink-800 hover:text-pink-custom">
              {user?.firstName}
              {' '}
              {user?.maidenName}
              {' '}
              {user?.lastName}
            </p>
          </Link>
        </div>

        <div className="mt-2 mx-3 max-h-14 h-14">
          <Link to={`/blog/${blog?.id}`} state={{ blog, user, comments }}>
            <p className="mb-2 text-base font-bold text-center tracking-tight text-gray-700 dark:text-gray-50 hover:text-pink-custom dark:hover:text-pink-800">{blog.title}</p>
          </Link>
        </div>

        <footer className="mt-5 p-4">
          <hr />
          <div className="flex items-center justify-between text-base">
            <div className="flex items-center">
              {' '}
              <HeartOutlined className="text-pink-custom" />
              {'  '}
              <span className="pl-1 pb-1 text-gray-500 dark:text-gray-200">
                {' '}

                {blog.reactions}
              </span>
            </div>
            <div className="flex items-center">
              <CommentOutlined className="text-blue-custom" />
              {'  '}
              <span className="pl-1 pb-1 text-gray-500 dark:text-gray-200">{comments || 0}</span>
            </div>
          </div>
        </footer>
      </div>

    </div>

  );
}

Card.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  comments: PropTypes.number.isRequired,
};

export default Card;
