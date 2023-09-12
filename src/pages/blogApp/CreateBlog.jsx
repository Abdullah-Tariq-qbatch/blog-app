import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as FileUploadIconSvg } from "../../assets/blogApp/svg/uploadFileIcon.svg";
import { createBlog, updateBlog } from "../../redux/blogs/actionCreator";
import { RenderIf } from "../../utils/blogApp/commonMethods";

function CreateBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;
  const CurrentUser = useSelector((state) => state.Users.currentUser);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    title: blog?.title || "",
    body: blog?.body || "",
    file: blog?.file || null,
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (blog) {
      if (blog?.file) delete blog.file;
      dispatch(
        updateBlog(
          blog.id,
          { ...blog, title: values.title, body: values.body },
          values.file,
        ),
      );
      navigate(`/blog/${blog.id}`);
    } else {
      dispatch(
        createBlog(
          {
            title: values.title,
            body: values.body,
            reactions: 0,
            userId: CurrentUser.id || 1,
          },
          values.file,
        ),
      );
      navigate("/blog");
    }
    setSubmitting(false);
    setUnsavedChanges(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title";
    }
    if (!values.body) {
      errors.body = "Body";
    }
    if (!values.file) {
      errors.file = "Cover Photo";
    }

    return errors;
  };

  useEffect(() => {
    // Add an event listener for beforeunload
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        // Display a confirmation prompt
        event.returnValue =
          "You have unsaved changes. Do you really want to leave?";
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-200">
          {blog ? "Update Blog" : "Write Your Own Blog"}
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          enableReinitialize
        >
          {({
            values,
            isSubmitting,
            setFieldValue,
            errors,
            touched,
            dirty,
          }) => {
            setUnsavedChanges(dirty);
            return (
              <Form>
                <RenderIf
                  isTrue={errors.file && touched.file}
                  fallback={
                    <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cover Photo
                    </h3>
                  }
                >
                  <ErrorMessage
                    name="file"
                    component="h3"
                    className="mb-3 animate-pulse text-sm font-medium text-red-custom"
                  />
                </RenderIf>
                <div
                  className={`flex w-full items-center justify-center ${
                    errors.file && touched.file ? "animate-pulse" : ""
                  }`}
                >
                  <label
                    htmlFor="dropzone-file"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 focus:border-indigo-custom focus:ring-indigo-custom dark:border-gray-700 dark:bg-gray-600 sm:h-60 sm:w-96 md:h-96 md:w-full ${
                      errors.file && touched.file
                        ? "border-red-custom dark:border-red-800"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <RenderIf
                      isTrue={values.file}
                      fallback={
                        <div className="flex h-full w-full flex-col items-center justify-center pb-6 pt-5">
                          <FileUploadIconSvg className="mb-4 h-8 w-8 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      }
                    >
                      <img
                        src={values.file}
                        className="h-full w-full rounded-lg object-cover"
                        alt="Uploaded"
                      />
                    </RenderIf>
                    <input
                      id="dropzone-file"
                      name="file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) =>
                            setFieldValue("file", e.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <RenderIf
                      isTrue={errors.title && touched.title}
                      fallback={
                        <label
                          htmlFor="title"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Title
                        </label>
                      }
                    >
                      <ErrorMessage
                        name="title"
                        component="label"
                        className="mb-2 block animate-pulse text-sm font-medium text-red-custom"
                      />
                    </RenderIf>
                    <Field
                      type="text"
                      name="title"
                      id="title"
                      className={`block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-indigo-custom focus:ring-indigo-custom dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 ${
                        errors.title && touched.title
                          ? "animate-pulse border-red-custom dark:border-red-800"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="Type blog title"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <RenderIf
                      isTrue={errors.body && touched.body}
                      fallback={
                        <label
                          htmlFor="body"
                          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Body
                        </label>
                      }
                    >
                      <ErrorMessage
                        name="body"
                        component="label"
                        className="mb-2 block animate-pulse text-sm font-medium text-red-custom"
                      />
                    </RenderIf>
                    <Field
                      as="textarea"
                      id="body"
                      name="body"
                      rows="8"
                      className={`block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-indigo-custom focus:ring-indigo-custom dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 ${
                        errors.body && touched.body
                          ? "animate-pulse border-red-custom dark:border-red-800"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                      placeholder="Your blog content here"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary-700 focus:ring-primary-200 mt-4 inline-flex items-center rounded-lg bg-blue-custom px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 sm:mt-6"
                  disabled={isSubmitting}
                >
                  {blog ? "Update Blog" : "Publish Blog"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default CreateBlog;
