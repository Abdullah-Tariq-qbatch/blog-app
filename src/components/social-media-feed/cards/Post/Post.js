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

import { ReactComponent as DeleteIcon } from "./../../../../assets/social-media-feed/svgs/delete-icon.svg";
import { getDataFromLocalStorage } from "./../../../../redux/posts/api-data";

const Post = (post) => {
  const userCommentInput = useRef();
  const [like, setLike] = useState(false);
  const { currentUser } = useSelector((state) => state.Users);
  const [alert, setAlert] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { comments } = post;
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
            currentUser.name.split(" ")[0],
          lastname:
            currentUser.lastName ||
            currentUser.family_name ||
            currentUser.name.split(" ")[1],
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

  return (
    <div className="w-3/4 m-auto">
      <main className="profile-page">
        <section className="block h-[500px]">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${post.imageURL}')`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-[1000px] opacity-20 bg-black"
            ></span>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 order-2 lg:order-1">
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

                  <div className="w-full lg:w-3/12 px-4 lg:order-2 order-1 flex justify-center">
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
                  <div className="w-full lg:w-4/12 px-4 order-3">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <DeleteIcon
                          height="40"
                          width="50"
                          strokeWidth="1.5"
                          className="mr-4 cursor-pointer"
                          onClick={deletePost}
                        />
                      </div>

                      <div className="lg:mr-4 p-3 text-center">
                        <Heart
                          className="w-8 ml-3 mt-1"
                          isActive={like}
                          onClick={handlePostLike}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
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
                        <div className="grid grid-cols-12">
                          <div className=" xl:mx-1 xl:my-0 mb-1 col-span-9">
                            <form
                              onSubmit={handleUserComment}
                              className="flex flex-row"
                            >
                              <div className="xl:w-96">
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
                          <div className="w-full col-span-3">
                            <Button
                              onClick={() => setShowComments((state) => !state)}
                            >
                              <ViewIcon />
                              View Comments
                            </Button>
                          </div>
                        </div>
                        <div className={showComments ? "block" : "hidden"}>
                          {comments &&
                            comments.map((comment, id) => (
                              <Comment {...comment} key={id}></Comment>
                            ))}
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
