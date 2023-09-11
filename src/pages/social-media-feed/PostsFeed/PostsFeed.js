import "react-toastify/dist/ReactToastify.css";

import {
  fetchPosts,
  reInitializePosts,
} from "./../../../redux/posts/actionCreator";
import { useDispatch, useSelector } from "react-redux";

import Alert from "./../../../components/social-media-feed/Alert/Alert";
import Post from "./../../../components/social-media-feed/cards/Post/Post";
import React from "react";
import Spinner from "./../../../components/social-media-feed/Spinner/Spinner";
import { fetchUsersSocialMediaFeed } from "./../../../redux/users/actionCreator";
import { reInitializeComments } from "./../../../redux/user-comments/actionCreator";
import { toast } from "react-toastify";
import { updateSingleUserComments } from "./../../../redux/user-comments/actionCreator";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PostsFeed = ({ pageLink }) => {
  const dispatch = useDispatch();
  const { posts, loading, success, error } = useSelector(
    (state) => state.Posts,
  );
  const { currentUser } = useSelector((state) => state.Users);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userid");
  const comments = useSelector((state) => state.UserComments);

  useEffect(() => {
    if (pageLink === "my-posts") {
      dispatch(fetchPosts(localStorage.loginMethod ? 1 : currentUser.id));
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
    <div className="mt-10 grid grid-cols-1 ">
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
