/* eslint-disable import/no-extraneous-dependencies */
import React, { lazy, Suspense } from 'react';
import './App.css';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import MainLayout from './layout/MainLayout';

const Home = lazy(() => import('./pages/Home'));
// const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const CreateBlog = lazy(() => import('./pages/CreateBlog'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainLayout>
        <Routes>
          <Route
            exact
            path="/"
            element={(
              <Suspense fallback={<>...</>}>
                {' '}
                <Home />
              </Suspense>
)}
          />
          <Route
            exact
            path="/create-blog"
            element={(
              <Suspense fallback={<>...</>}>
                {' '}
                <CreateBlog />
              </Suspense>
)}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
