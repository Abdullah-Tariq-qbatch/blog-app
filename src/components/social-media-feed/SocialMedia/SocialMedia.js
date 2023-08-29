import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../../../index.css";

import Spinner from "./../Spinner/Spinner";

import store from "../../../redux/store";

const Header = lazy(() => import("./../Header/Header"));
const UsersFeed = lazy(() =>
  import("./../../../pages/social-media-feed/UsersFeed/UsersFeed")
);
const AddPost = lazy(() =>
  import("./../../../pages/social-media-feed/AddPost/AddPost")
);
const PostsFeed = lazy(() =>
  import("./../../../pages/social-media-feed/PostsFeed/PostsFeed")
);

const SocialMedia = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
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
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default SocialMedia;
