import React from 'react';
import { useParams } from 'react-router-dom';

import Blogs from '../components/HomePage/Blogs';

function UserBlogs() {
  const { id } = useParams();
  return (
    <div>
      <Blogs userId={id} />
    </div>
  );
}

export default UserBlogs;
