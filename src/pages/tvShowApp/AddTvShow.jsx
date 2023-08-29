import React from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CountryList from "../../components/tvShowApp/CountryList";
import { addTvShow } from "../../redux/shows/actionCreator";
import NetworkList from "../../components/tvShowApp/NetworkList";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    name: Yup.string().required("Tv Show name is required"),
    permalink: Yup.string().required("Permalink is required"),
    start_date: Yup.string().required("start_date is required"),
    country: Yup.string().required("Country is required"),
    network: Yup.string().required("Network is required"),
    image_thumbnail_path: Yup.string().required("Poster is required"),
  });

  const onSubmit = async (values, { setFieldValue }) => {
    values.end_date
      ? setFieldValue("status", "Ended")
      : setFieldValue("status", "Running");
    dispatch(addTvShow(values));
    navigate("/tvShows/all-tv-shows");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full md:w-1/2  flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Add TV-Show</h1>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            className="w-full flex flex-col items-center justify-center"
          >
            {({ values, setFieldValue }) => (
              <Form className="w-full flex flex-col items-center justify-center">
                {values.image_thumbnail_path && (
                  <img
                    className="h-6/12 w-6/12 border-[6px] border-white bg-white hover:bg-gray-50 mx-auto"
                    src={values.image_thumbnail_path}
                    alt="Selected"
                    style={{ maxWidth: "300px" }}
                  />
                )}
                <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 mb-2">
                  <div className="flex-col">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name of Tv Show"
                      className="w-full rounded-md bg-slate-300 p-2 hover:bg-gray-50"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={errorStyle}
                    />
                  </div>

                  <div className="flex-col">
                    <Field
                      type="text"
                      id="permalink"
                      name="permalink"
                      placeholder="Permalink"
                      className="w-full rounded-md bg-slate-300 p-2 hover:bg-gray-50"
                    />
                    <ErrorMessage
                      name="permalink"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 mb-2">
                  <div className="flex-col">
                    <label htmlFor="start-date" className="font-bold">
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
                    <label htmlFor="end-date" className="font-bold">
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

                <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2 lg:gap-2">
                  <div className="flex-col">
                    <Field
                      name="image_thumbnail_path"
                      type="file"
                      className="mb-2 w-full rounded-md bg-slate-300 p-1 mr-2 h-auto"
                      accept="image/*"
                      value=""
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue(
                            "image_thumbnail_path",
                            URL.createObjectURL(file)
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
                  <div className="flex flex-col">
                    <CountryList />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className={errorStyle}
                    />
                  </div>
                  {/* </div> */}
                </div>

                <NetworkList />
                <ErrorMessage
                  name="network"
                  component="div"
                  className={errorStyle}
                />

                <button
                  className="w-1/2  my-2 rounded-full bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 "
                  type="submit"
                >
                  Add TV-Show
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddTvShow;
