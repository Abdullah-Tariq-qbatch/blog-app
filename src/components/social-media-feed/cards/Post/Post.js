import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heart from "react-heart";
import _ from "lodash";
import "../../../../index.css";

import DeleteMessage from "../../DeleteMessage/DeleteMessage";
import Comment from "../Comment/Comment";
import Avatar from "../../Avatar/Avatar";
import Button from "../../Button/Button";

import { toast } from "react-toastify";
import { updateUserComments } from "./../../../../redux/user-comments/actionCreator";
import {
  updateUserPost,
  deleteUserPost,
} from "./../../../../redux/posts/actionCreator";
import { ReactComponent as AddIcon } from "./../../../../assets/social-media-feed/svgs/add-icon.svg";
import { ReactComponent as ViewIcon } from "./../../../../assets/social-media-feed/svgs/view-icon.svg";
import { ReactComponent as HideIcon } from "./../../../../assets/social-media-feed/svgs/hide-icon.svg";

import { ReactComponent as DeleteIcon } from "./../../../../assets/social-media-feed/svgs/delete-icon.svg";
import { getDataFromLocalStorage } from "./../../../../redux/posts/api-data";

const Post = (post) => {
  const userCommentInput = useRef();
  const [like, setLike] = useState(false);
  const { currentUser } = useSelector((state) => state.Users);
  console.log("current user: ", currentUser);
  const [alert, setAlert] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const handlePostLike = () => {
    setLike(!like);
    const newPost = { ...post };
    if (like) {
      newPost.reactions = newPost.reactions - 1;
    } else {
      newPost.reactions = newPost.reactions + 1;
    }
    dispatch(updateUserPost(newPost));
  };
  const handleUserComment = (e) => {
    if (userCommentInput.current.value !== "") {
      e.preventDefault();
      let comment = {
        body: userCommentInput.current.value,
        postId: post.id,
        user: {
          firstname:
            currentUser.firstName ||
            currentUser.given_name ||
            currentUser.name.split(" ")[0] ||
            currentUser.name,
          lastname:
            currentUser.lastName ||
            currentUser.family_name ||
            currentUser.name.split(" ")[1] ||
            currentUser.name,
          id: currentUser.id || 1000,
          username: currentUser.username || currentUser.name,
        },
      };
      const newComments = _.concat(comment, post.comments);
      const newPost = { ...post, comments: [comment, ...post.comments] };
      const existingComments = getDataFromLocalStorage("userComments");
      existingComments.push(comment);
      setShowComments();
      const updatedCommentsJSON = JSON.stringify(existingComments);
      localStorage.setItem("userComments", updatedCommentsJSON);
      dispatch(updateUserPost(newPost));
      dispatch(updateUserComments(newComments));
      userCommentInput.current.value = "";
      setShowComments((state) => !state);
    } else {
      toast.error("Alert: Please enter comment");
    }
  };
  const deletePost = () => {
    setAlert(true);
  };
  const handleOnClickDelete = () => {
    dispatch(deleteUserPost(post.id));
  };

  const handleOnClickCancel = () => {
    setAlert(false);
  };

  const handleCommentsClick = () => {
    setShowComments((state) => !state);
    post.onClick();
  };

  return (
    <div className="m-auto w-3/4">
      <main className="profile-page">
        <section className="block h-[500px]">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${post.imageURL}')`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <span
              id="blackOverlay"
              className="h-[1000px] w-full bg-black opacity-20"
            ></span>
          </div>
        </section>
        <section className="bg-blueGray-200 relative py-16">
          <div className="container mx-auto px-4">
            <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl dark:bg-[#4b5563] dark:text-white">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="order-2 w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                          {post.reactions}
                        </span>
                        <span className="text-blueGray-400 text-sm">Likes</span>
                      </div>
                      <div className="p-3 text-center lg:mr-4">
                        <span
                          onClick={post.onClick}
                          className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide"
                        >
                          {post.comments.length}
                        </span>
                        <span
                          className="text-blueGray-400 text-sm"
                          onClick={post.onClick}
                        >
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="order-1 flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative" style={{ marginTop: "-80px" }}>
                      <Avatar initials={post.alias} type="profile"></Avatar>
                    </div>
                  </div>

                  {alert && (
                    <DeleteMessage
                      onClickDelete={handleOnClickDelete}
                      onClickCancel={handleOnClickCancel}
                    ></DeleteMessage>
                  )}
                  <div className="order-3 w-full px-4 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <DeleteIcon
                          height="40"
                          width="50"
                          strokeWidth="1.5"
                          className="mr-4 cursor-pointer"
                          onClick={deletePost}
                        />
                      </div>

                      <div className="p-3 text-center lg:mr-4">
                        <Heart
                          inactiveColor="#e83f8c"
                          activeColor="#e83f8c"
                          className="text:white ml-3 mt-1 w-8"
                          isActive={like}
                          onClick={handlePostLike}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <h3 className="text-blueGray-700 mb-2 text-4xl font-semibold leading-normal">
                    {post.name}
                  </h3>
                  <div className="text-blueGray-600 mb-2 mt-10">
                    <i className="fas fa-envelope-open text-blueGray-400 mr-2 text-lg"></i>
                    {post.title}
                  </div>
                </div>
                <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-9/12">
                      <p className="text-blueGray-700 mb-4 text-lg leading-relaxed">
                        {post.body}
                      </p>
                      <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-12 mb-1 xl:mx-1 xl:my-0">
                          <form
                            onSubmit={handleUserComment}
                            className="flex flex-col justify-center lg:flex-row"
                          >
                            <div className="col-span-6 mx-auto xl:w-full">
                              <input
                                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                type="text"
                                ref={userCommentInput}
                                required
                                placeholder="Your comment"
                              />
                            </div>
                            <div className="col-span-3 mx-2 mt-4 whitespace-nowrap lg:mx-1 lg:ml-4 lg:mt-0 xl:ml-4">
                              <Button onClick={handleUserComment} type="submit">
                                <AddIcon className="mr-2 h-5 w-5" />
                                Add Comment
                              </Button>
                            </div>
                            <div className="col-span-3 mt-4 whitespace-nowrap lg:mx-2 lg:mt-0 xl:ml-4">
                              <Button
                                onClick={handleCommentsClick}
                                type="button"
                              >
                                {showComments ? (
                                  <>
                                    <HideIcon />
                                    Hide Comments
                                  </>
                                ) : (
                                  <>
                                    <ViewIcon />
                                    View Comments
                                  </>
                                )}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className={showComments ? "block" : "hidden"}>
                        {post.comments &&
                          post.comments.map((comment, id) => (
                            <Comment {...comment} key={id}></Comment>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default React.memo(Post);
