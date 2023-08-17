/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import fetchBlogs from './redux/blogs/actionCreator';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <div className="App">
      dfa
    </div>
  );
}

export default App;
