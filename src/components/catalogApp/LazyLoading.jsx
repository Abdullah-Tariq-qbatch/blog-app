import React, { Suspense } from "react";

import Loader from "./Loader";

const LazyLoading = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center w-full h-full ">
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoading;
