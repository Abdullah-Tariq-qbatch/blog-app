/* eslint-disable react/prop-types */
import React, { Suspense } from "react";
import Loader from "./Loader";

const LazyLoading = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen ">
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoading;
