/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Oval } from 'react-loader-spinner';
import {
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  HeartFilled,
  EditOutlined,
} from '@ant-design/icons';

import Image from '../components/Image';
import Avatar from '../components/Avatar';
import Cover from '../components/BlogDetailsPage/Cover';
import Comment from '../components/BlogDetailsPage/CommentCard';
import { copyLink, likeBlog } from '../redux/blogs/actionCreator';
import { createComment } from '../redux/comments/actionCreator';
import likeAudio from '../assets/likeSound.mp3';

function getInitials(user) {
  return user?.firstName
    ? `${user?.firstName[0]}${user?.maidenName[0]}${user?.lastName[0]}`
    : 'ABC';
}

function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);

  const memoizedFindBlog = _.memoize((Id) => _.find(BlogsData.blogs, (obj) => obj.id === parseInt(Id)));
  const memoizedFindUser = _.memoize((userId) => _.find(UserData.users, { id: userId }));
  const memoizedGroupComments = _.memoize((comments) => _.groupBy(comments, 'postId'));

  const blog = memoizedFindBlog(id);
  const user = memoizedFindUser(blog.userId);
  const commentsListedByPost = memoizedGroupComments(CommentData.comments);
  const comments = commentsListedByPost[blog.id];

  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState('');

  const imageSrc = blog?.file
    ? blog.file
    : 'https://img.freepik.com/free-photo/old-camera-notebook-laptop-with-blue-pencil-cup-cappuccino-white-background_23-2147979092.jpg';

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleLike = () => {
    setLike((state) => true);
    const audio = new Audio(likeAudio);
    audio.play();
    dispatch(
      likeBlog(blog.id, { ...blog, reactions: blog.reactions + 1 }, 'Blog Liked'),
    );
  };

  const handleDisLike = () => {
    setLike((state) => false);
    if (blog.reactions) {
      dispatch(
        likeBlog(blog.id, { ...blog, reactions: blog.reactions - 1 }, 'Blog Unliked'),
      );
    } else {
      dispatch(
        likeBlog(blog.id, { ...blog, reactions: 0 }, 'Blog Unliked'),
      );
    }
  };

  const handleAddComment = () => {
    setCommentText('');
    dispatch(
      createComment({ body: commentText, postId: blog.id, userId: 1 }),
    );
  };

  const handleShare = () => {
    const currentURL = window.location.href;
    const tempInput = document.createElement('input');
    tempInput.value = currentURL;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    dispatch(copyLink('Link Copied'));
  };

  return BlogsData.loading ? (
    <div className="w-full flex justify-center items-center h-screen mt-10">
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
  ) : (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow flex flex-col pb-9">
      <img className="rounded-t-lg w-full h-full" src={imageSrc} alt="" />

      <div className="bg-gray-50 rounded-lg px-5 -mt-24 sm:-mt-48 md:-mt-96 mx-auto w-11/12 mb-5">
        <div className="flex justify-center -mt-7">
          {user?.image ? <Image src={user.image} /> : <Avatar initials={getInitials(user)} bgColor="bg-blue-500" />}
        </div>
        <div className="flex items-center justify-center mt-5">
          <Link to={`/user/${user.id}/blogs`}>
            <p className="mx-2 text-base text-gray-500 flex items-center hover:text-pink-custom">
              {user?.firstName}
              {' '}
              {user?.maidenName}
              {' '}
              {user?.lastName}
            </p>
          </Link>
        </div>
        <p className="md:text-4xl text-center sm:text-xl py-10 pl-5 font-semibold text-gray-700">
          {blog.title}
        </p>
        <div className="flex justify-center w-2/3 m-auto">
          <div className="w-1/3 flex justify-center">
            {like ? (
              <HeartFilled
                onClick={handleDisLike}
                className="pr-2 pt-2 text-pink-custom"
              />
            ) : (
              <HeartOutlined className="pr-2 pt-2 text-pink-custom" onClick={handleLike} />
            )}
            <p className="pt-1 text-gray-600">{blog.reactions}</p>
          </div>

          <div className="w-1/3 flex justify-center">
            <Link to="/create-blog" state={blog}>
              <EditOutlined className="text-indigo-custom" />
            </Link>
          </div>
          <div className="w-1/3 flex justify-center">
            <ShareAltOutlined onClick={handleShare} className="pt-2 text-blue-custom" />
          </div>
        </div>

        <hr className="w-4/5 m-auto my-8" />

        <div className="max-w-3xl mx-auto px-4 text-xl text-justify leading-relaxed my-10 text-gray-600">
          <p>{blog.body}</p>
          <p className="my-2">In sunt eiusmod ipsum ad pariatur reprehenderit est ut. Cupidatat velit cupidatat incididunt pariatur sit eiusmod. Minim cupidatat sint irure culpa voluptate veniam quis magna est. Non in cupidatat culpa magna eiusmod. Labore culpa aliqua consectetur ipsum reprehenderit nulla qui aute quis.</p>
          <p className="my-2">In sunt eiusmod ipsum ad pariatur reprehenderit est ut. Cupidatat velit cupidatat incididunt pariatur sit eiusmod. Minim cupidatat sint irure culpa voluptate veniam quis magna est. Non in cupidatat culpa magna eiusmod. Labore culpa aliqua consectetur ipsum reprehenderit nulla qui aute quis.</p>
          <p className="my-2">In sunt eiusmod ipsum ad pariatur reprehenderit est ut. Cupidatat velit cupidatat incididunt pariatur sit eiusmod. Minim cupidatat sint irure culpa voluptate veniam quis magna est. Non in cupidatat culpa magna eiusmod. Labore culpa aliqua consectetur ipsum reprehenderit nulla qui aute quis.</p>
        </div>

        <hr className="w-4/5 m-auto my-8" />

        <section className=" py-8 lg:py-8">
          <div className="max-w-3xl mx-auto px-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-700">
                Discussion
                {' '}
                (
                {comments?.length || 0}
                )
              </h2>
            </div>
            <form>
              <div className="w-full mb-4 rounded-lg">
                <div className="px-4 py-2 rounded-t-lg">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea id="comment" value={commentText} onChange={handleInputChange} rows="4" className="rounded-lg pl-2 pt-2 pr-2 pb-2 w-full px-0 text-sm text-gray-900 bg-white border-2 border-gray-300 outline-none focus:border-pink-500 focus:ring-0" placeholder="Write a comment..." required />
                </div>
                <div className="flex items-center justify-between px-4 pb-2">
                  <button type="button" onClick={handleAddComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-custom rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Post comment
                  </button>
                  <div className="flex pl-0 space-x-1 sm:pl-2" />
                </div>
              </div>
            </form>
            {comments?.map((comment) => (
              <Comment commentDetails={comment} key={`${comment.body} + ${blog.id}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BlogDetail;
