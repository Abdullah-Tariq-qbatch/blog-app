import React from 'react';
import Greeting from '../components/HomePage/Greeting';
import Blogs from '../components/HomePage/Blogs';

function Home() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Greeting />
      <Blogs />
    </div>
  );
}

export default Home;
