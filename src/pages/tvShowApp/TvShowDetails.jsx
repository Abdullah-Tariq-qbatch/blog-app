import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/tvShowApp/Loader";
import TvShowPerformanceDetail from "../../components/tvShowApp/TvShowPerformanceDetail";
import { tvShowDetails } from "../../redux/shows/actionCreator";
import { useParams } from "react-router-dom";

const ImageSlider = React.lazy(() =>
  import("../../components/tvShowApp/ImageSlider"),
);

const TvShowDetails = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.TvShows);

  const params = useParams();

  useEffect(() => {
    dispatch(tvShowDetails(params.id));
  }, []);

  return (
    <>
      {stateData?.loading ? (
        <Loader />
      ) : (
        <div className="lg:mx-24">
          <div className="mb-2 grid place-items-center border-b-[1px] border-gray-300 pt-4 md:pb-6">
            <h1 className="text-4xl font-semibold dark:text-gray-400 md:pb-6">
              {stateData?.tvShowDetail?.name}
            </h1>
            <div />
            {/* lg:p-12 lg:justify-between lg:space-x-12 lg:flex-row md:flex-col  md:space-y-8 items-center space-y-8 */}
            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <Suspense fallback={<div>loading...</div>}>
                <ImageSlider
                  images={stateData?.tvShowDetail?.pictures}
                  backUpImg={stateData?.tvShowDetail?.image_thumbnail_path}
                />
              </Suspense>

              <div className="h-full px-2 lg:w-2/3">
                <h1 className="mb-4 text-xl font-bold dark:text-gray-400">
                  When will be {stateData?.tvShowDetail?.name} next episode air
                  date? Is {stateData?.tvShowDetail?.name} renewed or cancelled?
                  Where to countdown {stateData?.tvShowDetail?.name} air dates?
                  Is {stateData?.tvShowDetail?.name} worth watching?
                </h1>
                <p className="text-lg font-normal dark:text-gray-400 ">
                  {stateData?.tvShowDetail?.description}
                </p>
                {stateData?.tvShowDetail?.description_source && (
                  <p className="font-md font-bold dark:text-gray-400">
                    Source:{" "}
                    <a
                      href={stateData?.tvShowDetail?.description_source}
                      className="break-all text-blue-600"
                    >
                      {" "}
                      {stateData?.tvShowDetail?.description_source}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          <TvShowPerformanceDetail tvShowDetail={stateData?.tvShowDetail} />
        </div>
      )}
    </>
  );
};

export default TvShowDetails;
