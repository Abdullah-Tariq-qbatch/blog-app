import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/catalogApp/Layout";
import LazyLoading from "./components/catalogApp/LazyLoading";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Root from "./components/tvShowApp/Root";

const Header = lazy(() =>
    import("./components/social-media-feed/Header/Header")
);
const UsersFeed = lazy(() =>
    import("./pages/social-media-feed/UsersFeed/UsersFeed")
);
const AddPost = lazy(() => import("./pages/social-media-feed/AddPost/AddPost"));
const PostsFeed = lazy(() =>
    import("./pages/social-media-feed/PostsFeed/PostsFeed")
);
const AllTvShows = lazy(() =>
    import(/* webpackChunkName: "allTvShows" */ "./pages/tvShowApp/AllTvShows")
);
const AddTvShow = lazy(() =>
    import(/* webpackChunkName: "addTvShow " */ "./pages/tvShowApp/AddTvShow")
);
const TvShowDetails = lazy(() =>
    import(
        /* webpackChunkName: "addTvShow " */ "./pages/tvShowApp/TvShowDetails"
    )
);

const Page404 = lazy(() =>
    import(/* webpackChunkName: "page404 " */ "./components/tvShowApp/Page404")
);

const ProductForm = lazy(() =>
    import(
        /* webpackChunkName: "productForm" */ "./pages/catalogApp/ProductForm"
    )
);
const AllProduct = lazy(() =>
    import(
        /* webpackChunkName: "allProducts" */ "./pages/catalogApp/AllProducts"
    )
);

function App() {
    return (
        <BrowserRouter>
            <LazyLoading>
            <ToastContainer />
                <Routes>
                    <Route path="/tvShows" element={<Root />}>
                        <Route path="add-tv-show" element={<AddTvShow />} />
                        <Route path="all-tv-shows" element={<AllTvShows />} />
                        <Route
                            path="tv-show-details/:id"
                            element={<TvShowDetails />}
                        />
                        <Route path="*" element={<Page404 />} />
                    </Route>
            
                    
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
                    
                    <Route path="/catalog" element={<Layout />}>
                        <Route exact path="" element={<AllProduct />} />
                        <Route path="add" element={<ProductForm />} />
                        <Route path="edit" element={<ProductForm />} />
                    </Route>
                </Routes>
            </LazyLoading>
        </BrowserRouter>
    );
}

export default App;
