import "../../App.css";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";

import CountryList from "../../components/tvShowApp/CountryList";
import NetworkList from "../../components/tvShowApp/NetworkList";
import React from "react";
import { addTvShow } from "../../redux/shows/actionCreator";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues = {
  id: "",
  name: "",
  permalink: "",
  start_date: "",
  end_date: "",
  country: "",
  network: "",
  status: "",
  image_thumbnail_path: "",
  myShow: true,
};

const AddTvShow = () => {
  const navigate = useNavigate();
  const currentDate = new moment().subtract(1, "days").format("y-MM-DD");

  const dispatch = useDispatch();

  const errorStyle = "text-red-500";
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("TV Show name is required"),
    permalink: Yup.string().required("Permalink is required"),
    start_date: Yup.string().required("Starting Date is required"),
    country: Yup.string().required("Country is required"),
    network: Yup.string().required("Network is required"),
    image_thumbnail_path: Yup.string().required("Poster is required"),
  });

  const onSubmit = async (values, { setFieldValue }) => {
    values.end_date
      ? setFieldValue("status", "Ended")
      : setFieldValue("status", "Running");
    dispatch(addTvShow(values));
    navigate("/tv-shows");
  };

  return (
    <>
      {/* <div className="flex items-center justify-center h-screen">
        <div className="w-full md:w-1/2  flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md"> */}
      <section className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
          <h2 className="mb-4 flex justify-center text-xl font-bold text-gray-700 dark:text-gray-200">
            Add TV-Show
          </h2>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            className="flex w-full flex-col items-center justify-center"
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="flex w-full flex-col items-center justify-center">
                {values.image_thumbnail_path && (
                  <img
                    className="h-6/12 mx-auto w-6/12 border-[6px] border-white bg-white hover:bg-gray-50"
                    src={values.image_thumbnail_path}
                    alt="Selected"
                    style={{ maxWidth: "300px" }}
                  />
                )}
                <div className="mb-2 grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                  <div
                    className={`${
                      errors.name && touched.name ? "animate-pulse" : ""
                    } flex-col`}
                  >
                    <label
                      htmlFor="Name"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name of TV Show"
                      className={`${
                        errors.name && touched.name
                          ? "border-2 border-red-500"
                          : ""
                      }  w-full rounded-md bg-slate-300 p-2 hover:bg-gray-50`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={errorStyle}
                    />
                  </div>

                  <div
                    className={`${
                      errors.permalink && touched.permalink
                        ? "animate-pulse"
                        : ""
                    } flex-col`}
                  >
                    <label
                      htmlFor="permalink"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Permalink
                    </label>
                    <Field
                      type="text"
                      id="permalink"
                      name="permalink"
                      placeholder="Permalink"
                      className={`${
                        errors.permalink && touched.permalink
                          ? "border-2 border-red-500"
                          : ""
                      }  w-full rounded-md bg-slate-300 p-2 hover:bg-gray-50`}
                    />
                    <ErrorMessage
                      name="permalink"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                </div>

                <div className="mb-2 grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
                  <div
                    className={`${
                      errors.start_date && touched.start_date
                        ? "animate-pulse"
                        : ""
                    } flex-col`}
                  >
                    <label
                      htmlFor="start-date"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Starting Date
                    </label>
                    <Field
                      type="date"
                      id="start_date"
                      name="start_date"
                      placeholder="Starting date of TV-Show"
                      max={currentDate}
                      className="w-full rounded-md bg-slate-300 p-2 hover:bg-gray-50"
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="end-date"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Ending Date
                    </label>
                    <Field
                      type="date"
                      id="end_date"
                      name="end_date"
                      placeholder="Ending date of TV-Show"
                      max={currentDate}
                      min={values.start_date}
                      className="w-full rounded-md bg-slate-300 p-2 hover:bg-gray-50"
                      disabled={values.start_date === ""}
                      title={
                        values.start_date === ""
                          ? "Please fill the starting date first"
                          : ""
                      }
                    />

                    <ErrorMessage
                      name="end_date"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                </div>

                <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2">
                  <div
                    className={`${
                      errors.image_thumbnail_path &&
                      touched.image_thumbnail_path
                        ? "animate-pulse"
                        : ""
                    } flex-col`}
                  >
                    <label
                      htmlFor="image_thumbnail_path"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Poster
                    </label>
                    <Field
                      name="image_thumbnail_path"
                      type="file"
                      className="mb-2 mr-2 h-auto w-full rounded-md bg-slate-300 p-1"
                      accept="image/*"
                      value=""
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue(
                            "image_thumbnail_path",
                            URL.createObjectURL(file),
                          );
                        }
                      }}
                    />
                    <ErrorMessage
                      name="image_thumbnail_path"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                  {/* <div className="grid grid-cols-1 "> */}
                  <div
                    className={`${
                      errors.country && touched.country ? "animate-pulse" : ""
                    } flex flex-col`}
                  >
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Country
                    </label>
                    <CountryList />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                  {/* </div> */}
                </div>

                <div
                  className={`${
                    errors.network && touched.network ? "animate-pulse" : ""
                  } flex w-full flex-col`}
                >
                  <label
                    htmlFor="network"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Network
                  </label>
                  <NetworkList />
                  <ErrorMessage
                    name="network"
                    component="div"
                    className={errorStyle}
                  />
                </div>

                <button
                  className="bg-primary-700 focus:ring-primary-200 mt-4 inline-flex items-center rounded-lg bg-blue-custom px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 sm:mt-6"
                  type="submit"
                >
                  Add TV-Show
                </button>
              </Form>
            )}
          </Formik>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default AddTvShow;
