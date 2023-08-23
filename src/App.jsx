/* eslint-disable import/no-extraneous-dependencies */
import React, { lazy, Suspense } from 'react';
import './App.css';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import MainLayout from './layout/MainLayout';
import Toast from './components/Toast';
import Spinner from './components/Spinner';
import Footer from './components/Footer';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const BlogDetail = lazy(() => import(/* webpackChunkName: "BlogDetail" */ './pages/BlogDetail'));
const CreateBlog = lazy(() => import(/* webpackChunkName: "CreateBlog" */ './pages/CreateBlog'));
const UserBlogs = lazy(() => import(/* webpackChunkName: "UserBlogs" */ './pages/UserBlogs'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toast />
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
