/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { memoize, find, groupBy } from "lodash";
import {
  HeartOutlined,
  ShareAltOutlined,
  HeartFilled,
  EditOutlined,
} from "@ant-design/icons";

import Image from "../../components/blogApp/ProfileImage";
import Avatar from "../../components/blogApp/Avatar";
import Comment from "../../components/blogApp/BlogDetailsPage/CommentCard";
import Spinner from "../../components/blogApp/Spinner";
import ShareButton from "../../components/blogApp/ShareButton";

import likeAudio from "../../assets/blogApp/audio/likeSound.mp3";
import { copyLink, likeBlog } from "../../redux/blogs/actionCreator";
import { createComment } from "../../redux/comments/actionCreator";
import {
  defaultImageUrl,
  dummyParagraph,
} from "../../constants/blogApp/constants";
import { getInitials, RenderIf } from "../../utils/blogApp/commonMethods";

function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const BlogsData = useSelector((state) => state.Blogs);
  const UserData = useSelector((state) => state.Users);
  const CommentData = useSelector((state) => state.Comments);
  const CurrentUser = useSelector((state) => state.Users.currentUser);

  const memoizedFindBlog = memoize((Id) =>
    find(BlogsData.blogs, (obj) => obj.id === parseInt(Id, 10)),
  );
  const memoizedFindUser = memoize((userId) =>
    find(UserData.users, { id: userId }),
  );
  const memoizedGroupComments = memoize((comments) =>
    groupBy(comments, "postId"),
  );

  const blog = memoizedFindBlog(id);
  const user = memoizedFindUser(blog.userId);
  const commentsListedByPost = memoizedGroupComments(CommentData.comments);
  const comments = commentsListedByPost[blog.id];

  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState("");

  const imageSrc = blog?.file ? blog.file : defaultImageUrl;

  const blogRef = useRef(blog);

  useEffect(() => {
    blogRef.current = blog;
  }, [blog]);

  useEffect(
    () => () => {
      dispatch(likeBlog(blog.id, blogRef.current, blogRef.current?.file));
    },
    [],
  );

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
    setCommentText("");
    dispatch(
      createComment({
        body: commentText,
        postId: blog.id,
        userId: CurrentUser.id || 1,
      }),
    );
  };

  const handleShare = () => {
    const currentPageURL = window.location.href;
    navigator.clipboard.writeText(currentPageURL);
    dispatch(copyLink("Link Copied"));
  };

  return (
    <>
      <RenderIf isTrue={BlogsData.loading}>
        <Spinner />
      </RenderIf>
      <div className="flex w-full flex-col bg-white pb-9 dark:bg-gray-800">
        <img className="h-full w-full" src={imageSrc} alt="" />

        <div className="mx-auto -mt-24 mb-5 w-11/12 rounded-lg bg-gray-50 px-5 dark:bg-gray-700 sm:-mt-48 md:-mt-96">
          <div className="-mt-7 flex justify-center">
            <RenderIf
              isTrue={user?.image}
              fallback={
                <Avatar initials={getInitials(user)} bgColor="bg-blue-500" />
              }
            >
              <Image src={user.image} />
            </RenderIf>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <Link to={`/blog/user/${user?.id}/blogs`}>
              <p className="mx-2 text-center text-base text-gray-500 hover:text-pink-custom dark:text-gray-400 dark:hover:text-pink-800">
                {user?.firstName} {user?.maidenName} {user?.lastName}
              </p>
            </Link>
          </div>
          <p className="py-10 text-center font-semibold text-gray-700 dark:text-gray-200 sm:text-xl md:text-4xl">
            {blog.title}
          </p>
          <div className="m-auto flex w-2/3 justify-center">
            <div className="flex w-1/4 items-center justify-center">
              <RenderIf
                isTrue={like}
                fallback={
                  <HeartOutlined
                    className="pr-2 text-xl text-pink-custom"
                    onClick={handleLike}
                  />
                }
              >
                <HeartFilled
                  onClick={handleLike}
                  className="pr-2 text-xl text-pink-custom"
                />
              </RenderIf>
              <p className=" text-gray-600 dark:text-gray-400">
                {blog.reactions}
              </p>
            </div>

            <div className="flex w-1/4 items-center justify-center">
              <Link to="/blog/create-blog" state={blog}>
                <EditOutlined className="text-xl text-indigo-custom" />
              </Link>
            </div>
            <div className="flex w-1/4 items-center justify-center">
              <ShareButton />
            </div>
          </div>

          <hr className="m-auto my-8 w-4/5" />

          <div className="mx-auto my-10 max-w-3xl px-4 text-justify text-xs leading-relaxed text-gray-600 dark:text-gray-50 sm:text-xl">
            <p>{blog.body}</p>
            <p className="my-2">{dummyParagraph}</p>
            <p className="my-2">{dummyParagraph}</p>
            <p className="my-2">{dummyParagraph}</p>
          </div>

          <hr className="m-auto my-8 w-4/5" />

          <section className=" py-8 lg:py-8">
            <div className="mx-auto max-w-3xl border-b border-gray-200 px-4">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 sm:text-lg lg:text-2xl">
                  Discussion ({comments?.length || 0})
                </h2>
              </div>
              <form>
                <div className="mb-4 w-full rounded-lg">
                  <div className="rounded-t-lg px-4 py-2">
                    <textarea
                      id="comment"
                      value={commentText}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full rounded-lg border-2 border-gray-300 bg-white px-0 pb-2 pl-2 pr-2 pt-2 text-sm text-gray-900 outline-none focus:border-pink-500 focus:ring-0 dark:border-gray-800 dark:bg-gray-600 dark:text-gray-200"
                      placeholder="Write a comment..."
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 pb-2">
                    <button
                      type="button"
                      onClick={handleAddComment}
                      className="inline-flex items-center rounded-lg bg-blue-custom px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
                    >
                      Post comment
                    </button>
                    <div className="flex space-x-1 pl-0 sm:pl-2" />
                  </div>
                </div>
              </form>
              {comments?.map((comment) => (
                <Comment
                  commentDetails={comment}
                  key={`${comment.body} + ${blog.id}`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default BlogDetail;
