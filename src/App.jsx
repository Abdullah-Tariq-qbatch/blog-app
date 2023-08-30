import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import AuthGuard from "./components/userAuthApp/AuthGuard";
import Layout from "./components/catalogApp/Layout";
import LazyLoading from "./components/catalogApp/LazyLoading";
import MainLayout from "./layout/blogApp/MainLayout";
import Notify from "./components/userAuthApp/Notify";
import Root from "./components/tvShowApp/Root";
import Spinner from "./components/userAuthApp/Spinner";
import { ToastContext } from "./contexts/userAuthApp/ToastContext";
import ScrollTopButton from "./components/blogApp/ScrollTopButton";
import SideBar from "./components/userAuthApp/SideBar";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";


const Header = lazy(() =>
  import("./components/social-media-feed/Header/Header")
);
const UsersFeed = lazy(() =>
  import(
    /* webpackChunkName: "usersFeed" */ "./pages/social-media-feed/UsersFeed/UsersFeed"
  )
);
const AddPost = lazy(() =>
  import(
    /* webpackChunkName: "addPost" */ "./pages/social-media-feed/AddPost/AddPost"
  )
);
const PostsFeed = lazy(() =>
  import(
    /* webpackChunkName: "postsFeed" */ "./pages/social-media-feed/PostsFeed/PostsFeed"
  )
);
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

const ProductForm = lazy(() =>
  import(/* webpackChunkName: "productForm" */ "./pages/catalogApp/ProductForm")
);
const AllProduct = lazy(() =>
  import(/* webpackChunkName: "allProducts" */ "./pages/catalogApp/AllProducts")
);

const BlogDetails = lazy(() =>
  import(/* webpackChunkName: "BlogDetail" */ "./pages/blogApp/BlogDetail")
);
const CreateBlog = lazy(() =>
  import(/* webpackChunkName: "CreateBlog" */ "./pages/blogApp/CreateBlog")
);
const BlogHome = lazy(() =>
  import(/* webpackChunkName: "BlogHome" */ "./pages/blogApp/Home")
);
const UserBlogs = lazy(() =>
  import(/* webpackChunkName: "UserBlogs" */ "./pages/blogApp/UserBlogs")
);

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "./pages/userAuthApp/HomePage")
);
const LoginPage = lazy(() =>
  import(
    /* webpackChunkName: "LoginPage" */ "./pages/userAuthApp/auth/LoginPage"
  )
);
const SignUpPage = lazy(() =>
  import(
    /* webpackChunkName: "SignUpPage" */ "./pages/userAuthApp/auth/SignUpPage"
  )
);

function App() {
  const showLoader = useSelector((state) => state.Users.loading);
  return (
    <BrowserRouter>
      <LazyLoading>
        <Spinner show={showLoader} />
        <Notify />
        <ToastContainer />
        <ToastContext.Provider value={toast}>
          <AuthGuard>
            <SideBar />
            <Routes>
              <Route exact path="/" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />

              <Route path="/tv-shows" element={<Root />}>
                <Route path="" element={<AllTvShows />} />
                <Route path="add-tv-show" element={<AddTvShow />} />
                <Route path="tv-show-details/:id" element={<TvShowDetails />} />
                <Route path="*" element={<Page404 />} />
              </Route>

              <Route path="/social-media" element={<Header />}>
                <Route path="postfeed" element={<PostsFeed />} />
                <Route path="" element={<PostsFeed />} />
                <Route path="users-feed" element={<UsersFeed />} />
                <Route
                  path="posts-feed/user"
                  element={<PostsFeed pageLink="user" />}
                />
                <Route
                  path="my-posts"
                  element={<PostsFeed pageLink="my-posts" />}
                />
                <Route path="add-post" element={<AddPost />} />
              </Route>

              <Route path="/catalog" element={<Layout />}>
                <Route exact path="" element={<AllProduct />} />
                <Route path="add" element={<ProductForm />} />
                <Route path="edit" element={<ProductForm />} />
              </Route>

              <Route path="/blog" element={<MainLayout />}>
                <Route exact path="" element={<BlogHome />} />
                <Route path=":id" element={<BlogDetails />} />
                <Route path="create-blog" element={<CreateBlog />} />
                <Route path="user/:id/blogs" element={<UserBlogs />} />
              </Route>
            </Routes>
          </AuthGuard>
        </ToastContext.Provider>
        <ScrollTopButton />
      </LazyLoading>
    </BrowserRouter>
  );
}

export default App;
