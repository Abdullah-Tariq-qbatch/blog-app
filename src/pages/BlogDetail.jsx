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
import { updateBlog, likeBlog } from '../redux/blogs/actionCreator';
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

  const imageSrc = blog?.image
    ? blog.image
    : 'https://img.freepik.com/free-photo/old-camera-notebook-laptop-with-blue-pencil-cup-cappuccino-white-background_23-2147979092.jpg';

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  useEffect(() => {
    if (like) {
      dispatch(
        likeBlog(blog.id, { ...blog, reactions: blog.reactions + 1 }),
      );
    }
  }, [like]);

  const handleLike = () => {
    setLike((state) => !state);
    const audio = new Audio(likeAudio);
    audio.play();
  };

  const handleAddComment = () => {
    setCommentText('');
    dispatch(
      createComment({ body: commentText, postId: blog.id, userId: 1 }),
    );
  };

  return BlogsData.loading ? (
    <div className="w-full flex justify-center h-full mt-10">
      <Oval
        height={80}
        width={80}
        color="#0066ff"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="#001f4d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  ) : (
    <div className="h-full pb-14 mx-10">
      <Cover coverImageSrc={imageSrc} />
      <div className="md:w-2/3 sm:w-96  m-auto bg-gray-200 rounded-bl-lg rounded-br-lg">
        <p className="md:text-4xl sm:text-xl pt-10 pb-5 pl-5 font-semibold">
          {blog.title}
        </p>
        <div className="flex justify-between">

          <div className="flex items-center pl-5 pb-5">
            {user?.image ? (
              <Image src={user.image} />
            ) : (
              <Avatar
                initials={getInitials(user)}
                bgColor="bg-blue-500"
              />
            )}
            <Link to={`/user/${user.id}/blogs`}>
              <p className="mx-2 text-base text-black flex items-center hover:text-blue-500">
                {user?.firstName}
                {' '}
                {user?.maidenName}
                {' '}
                {user?.lastName}
              </p>
            </Link>
          </div>
          <div className="flex justify-center">
            {like ? (
              <HeartFilled
                onClick={handleLike}
                className="pr-2 pt-2"
                style={{ color: '#fc0703' }}
              />
            ) : (
              <HeartOutlined className="pr-2 pt-2" onClick={handleLike} />
            )}
            <p className="pr-5 pt-1">{blog.reactions}</p>
            <Link to="/create-blog" state={blog}>
              <EditOutlined className="pr-3" />
            </Link>
            <ShareAltOutlined className="pr-8 pt-2" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 text-xl text-justify leading-relaxed my-10">
        <p>{blog.body}</p>
        <p className="my-2">In sunt eiusmod ipsum ad pariatur reprehenderit est ut. Cupidatat velit cupidatat incididunt pariatur sit eiusmod. Minim cupidatat sint irure culpa voluptate veniam quis magna est. Non in cupidatat culpa magna eiusmod. Labore culpa aliqua consectetur ipsum reprehenderit nulla qui aute quis.</p>
        <p className="my-2">In sunt eiusmod ipsum ad pariatur reprehenderit est ut. Cupidatat velit cupidatat incididunt pariatur sit eiusmod. Minim cupidatat sint irure culpa voluptate veniam quis magna est. Non in cupidatat culpa magna eiusmod. Labore culpa aliqua consectetur ipsum reprehenderit nulla qui aute quis.</p>
        <p className="my-2">In sunt eiusmod ipsum ad pariatur reprehenderit est ut. Cupidatat velit cupidatat incididunt pariatur sit eiusmod. Minim cupidatat sint irure culpa voluptate veniam quis magna est. Non in cupidatat culpa magna eiusmod. Labore culpa aliqua consectetur ipsum reprehenderit nulla qui aute quis.</p>
      </div>

      <section className="bg-white py-8 lg:py-8">
        <div className="max-w-3xl mx-auto px-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Discussion
              {' '}
              (
              {comments?.length || 0}
              )
            </h2>
          </div>
          <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-200">
              <div className="px-4 py-2 bg-gray-100 rounded-t-lg">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" value={commentText} onChange={handleInputChange} rows="4" className="rounded-lg pl-2 pt-2 pr-2 pb-2 w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0" placeholder="Write a comment..." required />
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t">
                <button type="button" onClick={handleAddComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
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
  );
}

export default BlogDetail;
