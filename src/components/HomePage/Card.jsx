/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';
import Image from '../Image';
import Avatar from '../Avatar';

function getInitials(user) {
  return `${user?.firstName[0]}${user?.maidenName[0]}${user?.lastName[0]}`;
}

function Card({ blog, user, comments }) {
  const imageSrc = blog?.file ? blog.file : 'https://img.freepik.com/free-photo/old-camera-notebook-laptop-with-blue-pencil-cup-cappuccino-white-background_23-2147979092.jpg';
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col">
      <img className="rounded-t-lg w-96 h-60" src={imageSrc} alt="" />

      <div className="bg-gray-50 rounded-lg px-5 -mt-5 mx-auto w-11/12 mb-5">
        <div className="flex justify-center -mt-7">
          {user?.image ? <Image src={user.image} /> : <Avatar initials={getInitials(user)} bgColor="bg-blue-500" />}
        </div>

        <div className="flex justify-center mt-1">
          <Link to={`/user/${user.id}/blogs`}>
            <p className="mx-2 text-base text-gray-400 flex items-center hover:text-pink-500">
              {user?.firstName}
              {' '}
              {user?.maidenName}
              {' '}
              {user?.lastName}
            </p>
          </Link>
        </div>

        <div className="mt-2 mx-3 max-h-20 h-20">
          <Link to={`/blog/${blog.id}`} state={{ blog, user, comments }}>
            <p className="mb-2 text-xl font-bold text-center tracking-tight text-gray-700 hover:text-pink-500">{blog.title}</p>
          </Link>
        </div>

        <footer className="mt-5 p-4">
          <hr />
          <div className="flex items-center justify-between">
            <div className="text-lg flex items-center">
              {' '}
              <HeartOutlined className="text-pink-400" />
              {'  '}
              <span className="pl-1 pb-1 text-gray-500">
                {' '}

                {blog.reactions}
              </span>
            </div>
            <div className="text-lg flex items-center">
              <CommentOutlined className="text-pink-400" />
              {'  '}
              <span className="pl-1 pb-1 text-gray-500">{comments || 0}</span>
            </div>
          </div>
        </footer>
      </div>

    </div>

  );
}

export default Card;
