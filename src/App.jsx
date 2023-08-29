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

import { Provider } from "react-redux";
import store from "./redux/store";
import Root from "./components/tvShowApp/Root";

import Loader from "./components/tvShowApp/Loader";

const Header = lazy(() => import('./components/social-media-feed/Header/Header'));
const UsersFeed = lazy(() => import('./pages/social-media-feed/UsersFeed/UsersFeed'));
const AddPost = lazy(() => import('./pages/social-media-feed/AddPost/AddPost'));
const PostsFeed = lazy(() => import('./pages/social-media-feed/PostsFeed/PostsFeed'));



const AllTvShows = lazy(() =>
  import(/* webpackChunkName: "allTvShows" */ "./pages/tvShowApp/AllTvShows")
);
const AddTvShow = lazy(() =>
  import(/* webpackChunkName: "addTvShow " */ "./pages/tvShowApp/AddTvShow")
);
const TvShowDetails = lazy(() =>
  import(/* webpackChunkName: "addTvShow " */ "./pages/tvShowApp/TvShowDetails")
);

const Page404 = lazy(() =>
  import(/* webpackChunkName: "page404 " */ "./components/tvShowApp/Page404")
);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/tvShows" element={<Root />}>
              <Route path="add-tv-show" element={<AddTvShow />} />
              <Route path="all-tv-shows" element={<AllTvShows />} />
              <Route path="tv-show-details/:id" element={<TvShowDetails />} />
              <Route path="*" element={<Page404 />} />
            </Route>
            <ToastContainer />
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
      </Provider>
    </BrowserRouter>
  );
}

export default App;
