/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  HeartOutlined, CommentOutlined, ShareAltOutlined, HeartFilled, EditOutlined,
} from '@ant-design/icons';

import Image from '../components/Image';
import Avatar from '../components/Avatar';
import Cover from '../components/BlogDetailsPage/Cover';
import Comment from '../components/BlogDetailsPage/CommentCard';
import { updateBlog } from '../redux/blogs/actionCreator';
import { createComment } from '../redux/comments/actionCreator';

function getInitials(user) {
  return user?.firstName ? `${user?.firstName[0]}${user?.maidenName[0]}${user?.lastName[0]}` : 'ABC';
}

function BlogDetail() {
  const { id } = useParams();
  const location = useLocation();

  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);

  const [blog, setBlog] = useState({});
  const [userList, setUserList] = useState({});
  const [commentList, setCommentList] = useState({});

  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  const [commentText, setCommentText] = useState('');

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  useEffect(() => {
    if (!BlogsData.loading) {
      const filteredBlog = BlogsData.blogs.find((obj) => obj.id === parseInt(id));
      setBlog(filteredBlog);
    }

    if (!BlogsData.loading && !UserData.loading) {
      const usersById = _.keyBy(UserData.users, 'id');
      setUserList(usersById);
    }

    if (!BlogsData.loading && !CommentData.loading) {
      const commentsByPostId = _.groupBy(CommentData.comments, 'postId');
      setCommentList(commentsByPostId);
    }
  }, [BlogsData, UserData, CommentData, id]);

  const user = userList[blog.id] || {};
  const comments = commentList[blog.id] || [];

  const handleLike = () => {
    setLike((prevLike) => !prevLike);
  };

  useEffect(() => {
    if (like) {
      dispatch(updateBlog(blog.id, { ...blog, reactions: blog.reactions + 1 }));
    }
  }, [like, blog]);

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const imageSrc = blog?.image || 'https://img.freepik.com/free-photo/old-camera-notebook-laptop-with-blue-pencil-cup-cappuccino-white-background_23-2147979092.jpg';

  const handleAddComment = () => {
    setCommentText('');
    dispatch(createComment({ body: commentText, postId: blog.id, userId: 1 }));
  };

  return (
    <div className="h-full pb-14">

      <Cover coverImageSrc={imageSrc} />
      <div className="mx-10 bg-gray-200 rounded-bl-lg rounded-br-lg">
        <p className="text-4xl pt-10 pb-5 pl-5 font-semibold">{blog.title}</p>
        <Link to="/create-blog" state={blog}><EditOutlined className="float-right pr-5" /></Link>
        <div className="flex items-center pl-5 pb-5">
          {user?.image ? <Image src={user.image} /> : <Avatar initials={getInitials(user)} bgColor="bg-blue-500" />}
          <Link to="#">
            <p className="mx-2 text-base text-black flex items-center hover:text-blue-500">
              {user?.firstName}
              {' '}
              {user?.maidenName}
              {' '}
              {user?.lastName}
            </p>
          </Link>
        </div>
      </div>

      <div className="mx-10 mt-5 text-2xl">{blog.body}</div>

      <div className="mx-10 bg-gray-200 flex justify-center h-10 rounded-tl-lg rounded-tr-lg mt-5 border-b-2 border-gray-400">
        <div className="w-full flex justify-center text-lg items-center">
          {like ? <HeartFilled onClick={handleLike} style={{ color: '#fc0703' }} /> : <HeartOutlined onClick={handleLike} />}
          <p className="ml-1">{blog.reactions}</p>
        </div>
        <div className="w-full flex justify-center text-lg items-center border-l-2 border-r-2 border-gray-400">
          <CommentOutlined onClick={handleScroll} />
          <p className="ml-1">{comments.length}</p>

        </div>
        <div className="w-full flex justify-center text-lg items-center">
          <ShareAltOutlined />
          <p className="ml-1">Share</p>

        </div>
      </div>

      <div className="mx-10">
        {comments.map((comment) => <Comment commentDetails={comment} key={comment.id} />)}
      </div>
      <div className="mx-10 bg-gray-200 border-gray-400 py-5 px-3 h-24 rounded-bl-lg rounded-br-lg">
        <input type="text" value={commentText} onChange={handleInputChange} className="w-full rounded-sm border border-gray-400" name="Comment" id="comment" placeholder="Enter Your Comment" />
        <button type="button" onClick={handleAddComment} className="text-white mt-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-xs px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
      </div>
    </div>
  );
}

export default BlogDetail;
