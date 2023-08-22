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
  const imageSrc = blog?.image ? blog.image : 'https://img.freepik.com/free-photo/old-camera-notebook-laptop-with-blue-pencil-cup-cappuccino-white-background_23-2147979092.jpg';
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col">
      <img className="rounded-t-lg w-96 h-60" src={imageSrc} alt="" />

      <div className="mt-2 mx-3">
        <Link to={`/blog/${blog.id}`} state={{ blog, user, comments }}>
          <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 text-left hover:text-blue-500">{blog.title}</p>
        </Link>
      </div>
      <div className="flex items-center mt-3 ml-2">
        {user?.image ? <Image src={user.image} /> : <Avatar initials={getInitials(user)} bgColor="bg-blue-500" />}
        <Link to="#">
          <p className="mx-2 text-base text-gray-700 flex items-center hover:text-blue-500">
            {user?.firstName}
            {' '}
            {user?.maidenName}
            {' '}
            {user?.lastName}
          </p>
        </Link>
      </div>

      <footer className="mt-auto p-4">
        <hr />
        <div className="flex items-center justify-between">
          <div className="text-lg">
            {' '}
            <HeartOutlined />
            {'  '}
            {blog.reactions}
          </div>
          <div className="text-lg">
            <CommentOutlined />
            {'  '}
            {comments || 0}
          </div>
        </div>

      </footer>
    </div>

  );
}

export default Card;
