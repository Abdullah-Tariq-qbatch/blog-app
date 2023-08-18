/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import Card from './Card';

function Blogs() {
  const BlogsData = useSelector((state) => state.Blogs);
  return (
    <div className="mt-10 text-center text-2xl font-serif">
      Some Interesting Reads
      {BlogsData.loading ? (
        <div className="w-full h-full flex justify-center mt-10">
          <ColorRing
            visible
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {BlogsData.blogs.map((blog) => (<Card blog={blog} key={blog.id} />))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
