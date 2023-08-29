import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import './App.css';
import MainLayout from './layout/blogApp/MainLayout';
import Spinner from './components/blogApp/Spinner';
import ScrollToTop from './utils/blogApp/scrollToTop';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/blogApp/Home'));
const BlogDetail = lazy(() => import(/* webpackChunkName: "BlogDetail" */ './pages/blogApp/BlogDetail'));
const CreateBlog = lazy(() => import(/* webpackChunkName: "CreateBlog" */ './pages/blogApp/CreateBlog'));
const UserBlogs = lazy(() => import(/* webpackChunkName: "UserBlogs" */ './pages/blogApp/UserBlogs'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <Suspense fallback={<Spinner />}>
                {' '}
                <Home />
              </Suspense>
)}
          />
          <Route
            exact
            path="/create-blog"
            element={(
              <Suspense fallback={<Spinner />}>
                {' '}
                <CreateBlog />
              </Suspense>
)}
          />
          <Route
            exact
            path="/blog/:id"
            element={(
              <Suspense fallback={<Spinner />}>
                {' '}
                <BlogDetail />
              </Suspense>
)}
          />
          <Route
            exact
            path="/user/:id/blogs"
            element={(
              <Suspense fallback={<Spinner />}>
                {' '}
                <UserBlogs />
              </Suspense>
)}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
