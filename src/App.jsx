// eslint-disable-next-line import/no-extraneous-dependencies
import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extrganeous-dependencies
import { ToastContainer } from 'react-toastify';
import Spinner from './components/social-media-feed/Spinner/Spinner';

const Header = lazy(() => import('./components/social-media-feed/Header/Header'));
const UsersFeed = lazy(() => import('./pages/social-media-feed/UsersFeed/UsersFeed'));
const AddPost = lazy(() => import('./pages/social-media-feed/AddPost/AddPost'));
const PostsFeed = lazy(() => import('./pages/social-media-feed/PostsFeed/PostsFeed'));

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<PostsFeed />} />
            <Route path="/users-feed" element={<UsersFeed />} />
            <Route
              path="/posts-feed/user"
              element={<PostsFeed pageLink="user" />}
            />
            <Route
              path="/my-posts"
              element={<PostsFeed pageLink="my-posts" />}
            />
            <Route path="/add-post" element={<AddPost />} />
            <Route
              path="/edit-post"
              element={<AddPost pageLink="edit" />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
