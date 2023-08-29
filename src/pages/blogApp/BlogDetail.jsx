/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { memoize, find, groupBy } from 'lodash';
import {
  HeartOutlined,
  ShareAltOutlined,
  HeartFilled,
  EditOutlined,
} from '@ant-design/icons';

import Image from '../../components/blogApp/ProfileImage';
import Avatar from '../../components/blogApp/Avatar';
import Comment from '../../components/blogApp/BlogDetailsPage/CommentCard';
import Spinner from '../../components/blogApp/Spinner';

import likeAudio from '../../assets/blogApp/audio/likeSound.mp3';
import { copyLink, likeBlog } from '../../redux/blogs/actionCreator';
import { createComment } from '../../redux/comments/actionCreator';
import { defaultImageUrl, dummyParagraph } from '../../constants/blogApp/constants';
import { getInitials, RenderIf } from '../../utils/blogApp/commonMethods';

function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);

  const memoizedFindBlog = memoize(
    (Id) => find(BlogsData.blogs, (obj) => obj.id === parseInt(Id, 10)),
  );
  const memoizedFindUser = memoize((userId) => find(UserData.users, { id: userId }));
  const memoizedGroupComments = memoize((comments) => groupBy(comments, 'postId'));

  const blog = memoizedFindBlog(id);
  const user = memoizedFindUser(blog.userId);
  const commentsListedByPost = memoizedGroupComments(CommentData.comments);
  const comments = commentsListedByPost[blog.id];

  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState('');

  const imageSrc = blog?.file
    ? blog.file
    : defaultImageUrl;

  const blogRef = useRef(blog);

  useEffect(() => {
    blogRef.current = blog;
  }, [blog]);

  useEffect(() => () => {
    dispatch(
      likeBlog(blog.id, blogRef.current, blogRef.current?.file),
    );
  }, []);

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleLike = () => {
    setLike(!like);
    if (like) {
      blog.reactions -= 1;
    } else {
      blog.reactions += 1;
      const audio = new Audio(likeAudio);
      audio.play();
    }
  };

  const handleAddComment = () => {
    setCommentText('');
    dispatch(
      createComment({ body: commentText, postId: blog.id, userId: 1 }),
    );
  };

  const handleShare = () => {
    const currentPageURL = window.location.href;
    navigator.clipboard.writeText(currentPageURL);
    dispatch(copyLink('Link Copied'));
  };

  return (
    <>
      <RenderIf isTrue={BlogsData.loading}>
        <Spinner />
      </RenderIf>
      <div className="w-full bg-white dark:bg-gray-800 flex flex-col pb-9">
        <img className="w-full h-full" src={imageSrc} alt="" />

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg px-5 -mt-24 sm:-mt-48 md:-mt-96 mx-auto w-11/12 mb-5">
          <div className="flex justify-center -mt-7">
            <RenderIf isTrue={user?.image} fallback={<Avatar initials={getInitials(user)} bgColor="bg-blue-500" />}>
              <Image src={user.image} />
            </RenderIf>
          </div>
          <div className="flex items-center justify-center mt-5">
            <Link to={`/blog/user/${user?.id}/blogs`}>
              <p className="mx-2 text-base text-gray-500 dark:text-gray-400 text-center dark:hover:text-pink-800 hover:text-pink-custom">
                {user?.firstName}
                {' '}
                {user?.maidenName}
                {' '}
                {user?.lastName}
              </p>
            </Link>
          </div>
          <p className="md:text-4xl text-center sm:text-xl py-10 font-semibold text-gray-700 dark:text-gray-200">
            {blog.title}
          </p>
          <div className="flex justify-center w-2/3 m-auto">
            <div className="w-1/3 flex justify-center items-center">
              <RenderIf isTrue={like} fallback={<HeartOutlined className="pr-2 text-pink-custom text-xl" onClick={handleLike} />}>
                <HeartFilled
                  onClick={handleLike}
                  className="pr-2 text-pink-custom text-xl"
                />
              </RenderIf>
              <p className=" text-gray-600 dark:text-gray-400">{blog.reactions}</p>
            </div>

            <div className="w-1/3 flex justify-center items-center">
              <Link to="/blog/create-blog" state={blog}>
                <EditOutlined className="text-indigo-custom text-xl" />
              </Link>
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <ShareAltOutlined onClick={handleShare} className=" text-blue-custom text-xl" />
            </div>
          </div>

          <hr className="w-4/5 m-auto my-8" />

          <div className="max-w-3xl mx-auto px-4 text-xs sm:text-xl text-justify leading-relaxed my-10 text-gray-600 dark:text-gray-50">
            <p>{blog.body}</p>
            <p className="my-2">{dummyParagraph}</p>
            <p className="my-2">{dummyParagraph}</p>
            <p className="my-2">{dummyParagraph}</p>
          </div>

          <hr className="w-4/5 m-auto my-8" />

          <section className=" py-8 lg:py-8">
            <div className="max-w-3xl mx-auto px-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-700 dark:text-gray-200">
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
                    <textarea id="comment" value={commentText} onChange={handleInputChange} rows="4" className="rounded-lg pl-2 pt-2 pr-2 pb-2 w-full px-0 text-sm text-gray-900 dark:text-gray-200 dark:bg-gray-600 bg-white border-2 dark:border-gray-800 border-gray-300 outline-none focus:border-pink-500 focus:ring-0" placeholder="Write a comment..." required />
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
    </>
  );
}

export default BlogDetail;
