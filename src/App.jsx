import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/catalogApp/Layout";
import LazyLoading from "./components/catalogApp/LazyLoading";

const ProductForm = React.lazy(() =>
  import(/* webpackChunkName: "productForm" */ "./pages/catalogApp/ProductForm")
);
const AllProduct = React.lazy(() =>
  import(/* webpackChunkName: "allProducts" */ "./pages/catalogApp/AllProducts")
);

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LazyLoading>
        <Routes>
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
