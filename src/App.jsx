import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Root from "./components/tvShowApp/Root";

import Loader from "./components/tvShowApp/Loader";

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
          </Routes>
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
