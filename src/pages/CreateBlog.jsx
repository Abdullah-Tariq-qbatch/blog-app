/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as FileUploadIconSvg } from '../assets/svg/uploadFileIcon.svg';
import { createBlog, updateBlog } from '../redux/blogs/actionCreator';

function CreateBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  const dispatch = useDispatch();

  const initialValues = {
    title: blog?.title || '',
    body: blog?.body || '',
    file: blog?.file || null,
  };

  const onSubmit = (values, { setSubmitting }) => {
    if (blog) {
      dispatch(updateBlog(blog.id, { ...blog, ...values }));
      navigate(`/blog/${blog.id}`);
    } else {
      dispatch(createBlog({ ...values, userId: 1 }));
      navigate('/');
    }
    setSubmitting(false);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title';
    }
    if (!values.body) {
      errors.body = 'Body';
    }
    if (!values.file) {
      errors.file = 'Cover Photo';
    }

    return errors;
  };

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-200">
          {blog ? 'Update Blog' : 'Write Your Own Blog'}
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          enableReinitialize
        >
          {({
            values, isSubmitting, setFieldValue, errors, touched,
          }) => (
            <Form>
              {errors.file && touched.file ? (<ErrorMessage name="file" component="h3" className="text-red-custom mb-3 animate-pulse text-sm font-medium" />) : (
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Cover Photo
                </h3>
              )}

              <div className={`flex items-center justify-center w-full ${errors.file && touched.file ? 'animate-pulse' : ''}`}>
                <label
                  htmlFor="dropzone-file"
                  className={`flex flex-col items-center justify-center md:h-96 md:w-full sm:w-96 sm:h-60 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-600 focus:ring-indigo-custom focus:border-indigo-custom ${errors.file && touched.file ? 'border-red-custom dark:border-red-800' : 'border-gray-300 dark:border-gray-700'}`}
                >
                  {values.file ? (
                    <img
                      src={values.file}
                      className="w-full h-full object-cover rounded-lg"
                      alt="Uploaded"
                    />
                  ) : (
                    <div className="flex w-full h-full flex-col items-center justify-center pt-5 pb-6">
                      <FileUploadIconSvg />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        {' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
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
                        reader.onload = (e) => {
                          setFieldValue('file', e.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mt-5">
                <div className="sm:col-span-2">
                  {errors.title && touched.title ? (<ErrorMessage name="title" component="label" className="text-red-custom block mb-2 text-sm font-medium animate-pulse" />) : (
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                  )}

                  <Field
                    type="text"
                    name="title"
                    id="title"
                    className={`bg-gray-50 dark:bg-gray-600 border-2 outline-none border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-indigo-custom focus:border-indigo-custom block w-full p-2.5 ${errors.title && touched.title ? 'animate-pulse border-red-custom dark:border-red-800' : 'border-gray-300 dark:border-gray-700'}`}
                    placeholder="Type blog title"
                  />

                </div>

                <div className="sm:col-span-2">
                  {errors.body && touched.body ? (<ErrorMessage name="body" component="label" className="text-red-custom block mb-2 text-sm font-medium animate-pulse" />) : (
                    <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Body
                    </label>
                  )}

                  <Field
                    as="textarea"
                    id="body"
                    name="body"
                    rows="8"
                    className={`block p-2.5 w-full text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-600 rounded-lg border-2 border-gray-300 dark:border-gray-700 outline-none focus:ring-indigo-custom focus:border-indigo-custom ${errors.body && touched.body ? 'animate-pulse border-red-custom dark:border-red-800' : 'border-gray-300 dark:border-gray-700'}`}
                    placeholder="Your blog content here"
                  />

                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-blue-custom hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {blog ? 'Update Blog' : 'Publish Blog'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default CreateBlog;
