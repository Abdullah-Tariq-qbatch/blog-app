import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { lazy } from "react";

import AuthGuard from "./components/userAuthApp/AuthGuard";
import Layout from "./components/catalogApp/Layout";
import LazyLoading from "./components/catalogApp/LazyLoading";
import MainLayout from "./layout/blogApp/MainLayout";
import Notify from "./components/userAuthApp/Notify";
import Root from "./components/tvShowApp/Root";
import ScrollTopButton from "./components/blogApp/ScrollTopButton";
import SideBar from "./components/userAuthApp/SideBar";

const Header = lazy(() =>
  import(
    /* webpackChunkName: "Header" */ "./components/social-media-feed/Header/Header"
  )
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
  return (
    <BrowserRouter>
      <LazyLoading>
        <Notify />
        <SideBar />
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/tv-shows"
            element={
              <AuthGuard>
                <Root />
              </AuthGuard>
            }
          >
            <Route path="" element={<AllTvShows />} />
            <Route path="add-tv-show" element={<AddTvShow />} />
            <Route path="tv-show-details/:id" element={<TvShowDetails />} />
          </Route>
          <Route path="*" element={<Page404 />} />

          <Route
            path="/social-media"
            element={
              <AuthGuard>
                <Header />
              </AuthGuard>
            }
          >
            <Route path="posts-feed" element={<PostsFeed />} />
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

          <Route
            path="/catalog"
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            <Route exact path="" element={<AllProduct />} />
            <Route path="add" element={<ProductForm />} />
            <Route path="edit" element={<ProductForm />} />
          </Route>

          <Route
            path="/blog"
            element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            }
          >
            <Route exact path="" element={<BlogHome />} />
            <Route path=":id" element={<BlogDetails />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="user/:id/blogs" element={<UserBlogs />} />
          </Route>
        </Routes>
        <ScrollTopButton />
      </LazyLoading>
    </BrowserRouter>
  );
}

export default App;
