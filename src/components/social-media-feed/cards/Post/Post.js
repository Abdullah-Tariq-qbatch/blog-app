import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heart from "react-heart";
import _ from "lodash";

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
import { ReactComponent as CurveIcon } from "./../../../../assets/social-media-feed/svgs/curve-icon.svg";
import { ReactComponent as DeleteIcon } from "./../../../../assets/social-media-feed/svgs/delete-icon.svg";
import { getDataFromLocalStorage } from "./../../../../redux/posts/api-data";

const Post = (post) => {
  const userCommentInput = useRef();
  const [like, setLike] = useState(false);
  const { currentUser } = useSelector((state) => state.Users);
  const [alert, setAlert] = useState(false);
  const { comments } = useSelector((state) => state.UserComments);
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
          firstname: currentUser.firstName,
          lastname: currentUser.lastName,
          id: currentUser.id,
          username: currentUser.username,
        },
      };
      const newComments = _.concat(comment, post.comments);
      const newPost = { ...post, comments: [comment, ...post.comments] };
      const existingComments = getDataFromLocalStorage("userComments");
      existingComments.push(comment);
      const updatedCommentsJSON = JSON.stringify(existingComments);
      localStorage.setItem("userComments", updatedCommentsJSON);
      dispatch(updateUserPost(newPost));
      dispatch(updateUserComments(newComments));
      userCommentInput.current.value = "";
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

  return (
    <div className="w-3/4 m-auto mt-10 ">
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('${post.imageURL}')`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <CurveIcon />
          </div>{" "}
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative" style={{ marginTop: "-80px" }}>
                      <Avatar initials={post.alias} type="profile"></Avatar>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="flex flex-row py-6 px-3 sm:mt-0 ml-24 h-10 mb-14">
                      <DeleteIcon
                        height="40"
                        width="50"
                        strokeWidth="1.5"
                        className="mr-4 cursor-pointer"
                        onClick={deletePost}
                      />
                      <div>
                        <Heart
                          className="w-8 ml-3 mt-1"
                          isActive={like}
                          onClick={handlePostLike}
                        />
                      </div>
                    </div>
                  </div>
                  {alert && (
                    <DeleteMessage
                      onClickDelete={handleOnClickDelete}
                      onClickCancel={handleOnClickCancel}
                    ></DeleteMessage>
                  )}
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {post.reactions}
                        </span>
                        <span className="text-sm text-blueGray-400">Likes</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span
                          onClick={post.onClick}
                          className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                          {post.comments.length}
                        </span>
                        <span
                          className="text-sm text-blueGray-400"
                          onClick={post.onClick}
                        >
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {post.name}
                  </h3>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-envelope-open mr-2 text-lg text-blueGray-400"></i>
                    {post.title}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {post.body}
                      </p>
                      <div className="text-center">
                        <div className="flex xl:flex-row flex-col">
                          <div className="xl:w-9/12 xl:mx-1 xl:my-0 mb-1">
                            <form
                              onSubmit={handleUserComment}
                              className="flex flex-row"
                            >
                              <div className="ml-10 xl:w-96">
                                <input
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  type="text"
                                  ref={userCommentInput}
                                  required
                                  placeholder="Enter your comment"
                                />
                              </div>
                              <div className="w-1/2 xl:ml-4">
                                <Button
                                  onClick={handleUserComment}
                                  type="submit"
                                >
                                  <AddIcon className="h-5 w-5 mr-2" />
                                  Add Comment
                                </Button>
                              </div>
                            </form>
                          </div>
                          <div className="w-1/2">
                            <Button onClick={post.onClick}>
                              <ViewIcon />
                              View Comments
                            </Button>
                          </div>
                        </div>
                        <div>
                          {comments &&
                            comments.map(
                              (comment, id) =>
                                comment.postId === post.id && (
                                  <Comment {...comment} key={id}></Comment>
                                )
                            )}
                        </div>
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
