/* eslint-disable react/prop-types */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Alert from "./../../../components/social-media-feed/Alert/Alert";
import Spinner from "./../../../components/social-media-feed/Spinner/Spinner";
import Post from "./../../../components/social-media-feed/cards/Post/Post";

import {
  fetchPosts,
  reInitializePosts,
} from "./../../../redux/posts/actionCreator";
import { reInitializeComments } from "./../../../redux/user-comments/actionCreator";
import { fetchUsersSocialMediaFeed } from "./../../../redux/users/actionCreator";
import { updateSingleUserComments } from "./../../../redux/user-comments/actionCreator";
import { toast } from "react-toastify";

const PostsFeed = ({ pageLink }) => {
  const dispatch = useDispatch();
  const { posts, loading, success, error } = useSelector(
    (state) => state.Posts
  );
  const usersData = useSelector((state) => state.Users);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userid");
  const { currentUser } = usersData;
  const comments = useSelector((state) => state.UserComments);

  useEffect(() => {
    if (pageLink === "my-posts") {
      dispatch(fetchPosts(currentUser.id));
    } else if (pageLink !== "user") {
      dispatch(fetchPosts());
      dispatch(fetchUsersSocialMediaFeed());
    } else {
      dispatch(fetchPosts(userId));
    }
  }, [location, dispatch, pageLink, userId, currentUser.id]);

  useEffect(() => {
    if (comments.success) {
      toast.success(comments.success);
      dispatch(reInitializeComments());
    }
    if (comments.error) {
      toast.error(comments.error);
      dispatch(reInitializeComments());
    }
  }, [comments.success, comments.error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(reInitializePosts());
    }
    if (error) {
      toast.error(error);
      dispatch(reInitializePosts());
    }
  }, [success, error]);

  const handlePostClick = (postId) => {
    //getAllComments
    const post = posts.find((post) => {
      return post.id === postId;
    });
    const finalComments = [...post.comments];
    !finalComments.length
      ? toast.error("Alert: No comments exists")
      : dispatch(updateSingleUserComments(finalComments));
  };

  return (
    <div className="grid grid-cols-1">
      {loading ? (
        <Spinner />
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            onClick={() => handlePostClick(post.id)}
          />
        ))
      )}
      {!posts.length && <Alert title="Alert: " message="No posts found!" />}
    </div>
  );
};

export default PostsFeed;
