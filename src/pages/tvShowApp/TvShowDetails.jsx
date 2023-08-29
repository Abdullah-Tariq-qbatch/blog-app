import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { tvShowDetails } from "../../redux/shows/actionCreator";
import TvShowPerformanceDetail from "../../components/tvShowApp/TvShowPerformanceDetail";
import Loader from "../../components/tvShowApp/Loader";

const ImageSlider = React.lazy(() =>
  import("../../components/tvShowApp/ImageSlider")
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
        <div>
          <div className="grid place-items-center pt-4 md:pb-6">
            <h1 className="text-4xl font-extrabold md:pb-6">
              {stateData?.tvShowDetail?.name}
            </h1>
            <div />
            {/* lg:p-12 lg:justify-between lg:space-x-12   lg:flex-row md:flex-col  md:space-y-8 items-center space-y-8 */}
            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <Suspense fallback={<div>loading...</div>}>
                <ImageSlider
                  images={stateData?.tvShowDetail?.pictures}
                  backUpImg={stateData?.tvShowDetail?.image_thumbnail_path}
                />
              </Suspense>

              <div className="h-full lg:w-2/3">
                <p className="mb-4 text-lg  dark:text-gray-400 font-bold">
                  When will be {stateData?.tvShowDetail?.name} next episode air
                  date? Is {stateData?.tvShowDetail?.name} renewed or cancelled?
                  Where to countdown {stateData?.tvShowDetail?.name} air dates?
                  Is {stateData?.tvShowDetail?.name} worth watching?
                </p>
                <p className="text-lg  dark:text-gray-400 font-normal ">
                  {stateData?.tvShowDetail?.description}
                </p>
                {stateData?.tvShowDetail?.description_source && (
                  <p>
                    source:{" "}
                    <a
                      href={stateData?.tvShowDetail?.description_source}
                      className="text-blue-600 break-all"
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
