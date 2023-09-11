import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { addUserPost, fetchPosts } from "./../../../redux/posts/actionCreator";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as AddIcon } from "./../../../assets/social-media-feed/svgs/add-icon.svg";
// import { current } from "immer";
import { getDataFromLocalStorage } from "./../../../redux/posts/api-data";
import slackNotification from "./../../../utils/social-media-feed/SlackNotification";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("*Title is required"),
  post: Yup.string().required("*Post content is required"),
  image: Yup.string().required("*Image is required"),
});

const AddPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.Posts);
  const { currentUser, users } = useSelector((state) => state.Users);
  const currentDummyJSONUser =
    users[localStorage.loginMethod ? 0 : currentUser.id - 1];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const { id, firstName, email, lastName } = currentDummyJSONUser;
    if (id) {
      const { title, post, image } = values;
      const existingPosts = getDataFromLocalStorage("posts");
      const maxId = posts.reduce((acc, { id }) => (id > acc ? id : acc), 0);
      const newPost = {
        id: maxId + existingPosts.length + 1,
        title: title,
        body: post,
        userId: id,
        imageURL: image,
        alias: firstName[0].toUpperCase() + lastName[0].toUpperCase(),
        email: email,
        name: firstName + " " + lastName,
        comments: [],
        reactions: 0,
        tags: [],
      };
      dispatch(addUserPost(newPost));
      existingPosts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(existingPosts));
      var raw = `{"text": "New Post have been added"}`;
      slackNotification(raw);
      setSubmitting(false);
      navigate("/social-media/my-posts");
    } else {
      toast.error("Current user does not exist!");
    }
  };
  return (
    <div className="mb-10 mt-12 flex items-center justify-center ">
      <div className="flex w-full items-center justify-center ">
        <Formik
          initialValues={{ title: "", post: "", image: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md dark:bg-[#4b5563]">
              <div className="mb-2 block text-2xl font-bold text-gray-700 dark:text-white">
                Create Post:
              </div>
              <div
                className={`${
                  errors.image && touched.image ? "animate-pulse" : ""
                }`}
              >
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Upload Image:
                </label>
                <input
                  className="mt-1 w-full rounded-md border p-2 focus:ring focus:ring-indigo-200 dark:text-white"
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setFieldValue("image", imageUrl);
                    } else {
                      setFieldValue("image", null);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div
                className={`${
                  errors.title && touched.title ? "animate-pulse" : ""
                }`}
              >
                <label className="mb-2 mt-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Title:
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title..."
                  className={`${
                    errors.title && touched.title
                      ? "border-2 border-red-500"
                      : ""
                  } mt-1 w-full rounded-md border p-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-200`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div
                className={`${
                  errors.post && touched.post ? "animate-pulse" : ""
                }`}
              >
                <label className="mb-2 mt-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Post:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  id="post"
                  name="post"
                  placeholder="Enter description..."
                  className={`${
                    errors.post && touched.post ? "border-2 border-red-500" : ""
                  } mt-1 w-full rounded-md border p-2 placeholder:text-gray-500 focus:ring focus:ring-indigo-200`}
                />
                <ErrorMessage
                  name="post"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-3 flex">
                <button
                  type="submit"
                  className="mx-auto mb-auto mt-auto inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-[#3C57E2] via-[#4E67E4] to-blueProfessional px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br"
                >
                  <AddIcon className="mr-2 h-5 w-5" />
                  <>Add Post</>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default AddPost;
