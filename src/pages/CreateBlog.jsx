/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlog, updateBlog } from '../redux/blogs/actionCreator';

function CreateBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;
  const [selectedImage, setSelectedImage] = useState(blog?.image ? blog.image : null);
  const [title, setTitle] = useState(blog?.title ? blog.title : '');
  const [body, setBody] = useState(blog?.body ? blog.body : '');

  const imageInputRef = useRef(null);

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (title && body && selectedImage) {
      if (blog) {
        dispatch(updateBlog(blog.id, {
          ...blog, file: selectedImage, title, body,
        }));
        navigate(`/blog/${blog.id}`);
      } else {
        dispatch(createBlog({
          file: selectedImage, title, body, userId: 1,
        }));
        navigate('/');
      }
    }
  };

  return (
    <div className="mt-24 mb-5">
      <h1 className="mx-10 text-4xl mb-10">{blog ? 'Update Blog' : 'Write Your Own Blog'}</h1>

      <div className="bg-gray-200 mx-5 py-5 rounded-lg">
        <form className="mx-10 ">
          <h3 className="mt-10 text-xl mb-3">
            Cover Photo
            {' '}
            <span>{ }</span>
          </h3>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center  md:h-96 md:w-2/3 sm:w-96 sm:h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
              {selectedImage ? (
                <img src={selectedImage} ref={imageInputRef} className=" w-full h-full object-cover" alt="Uploaded" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                    {' '}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              )}
              <input
                required
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h3 className="mt-10 text-xl mb-3">Title</h3>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

          <h3 className="mt-10 text-xl mb-3">Body</h3>
          <textarea
            required
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="8"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
          />

          <button type="submit" onClick={handleSubmit} className=" mt-10 px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {blog ? 'Update Blog' : 'Publish Blog'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default CreateBlog;
