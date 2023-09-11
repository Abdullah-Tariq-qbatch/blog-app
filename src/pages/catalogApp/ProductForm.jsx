import "../../catalog.css";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { addProduct, editProduct } from "../../redux/products/actionCreator";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/catalogApp/Button";
import ColorVariation from "../../components/catalogApp/ColorVariation";
import ProductFormAPI from "../../components/catalogApp/forms/ProductFormAPI";
import ProductFormResponsive from "../../components/catalogApp/forms/ProductFormResponsive";
import RenderIf from "../../components/catalogApp/RenderIf";
import { fetchAllCategory } from "../../redux/categories/actionCreator";

const SizeVariation = React.lazy(() =>
  import(
    /* webpackChunkName: "SizeVariation" */ "../../components/catalogApp/SizeVariation"
  ),
);

let initialData = {
  title: "",
  description: "",
  thumbnail: "",
  category: "",
  brand: "",
  sizeData: [{ price: "", stock: "", name: "" }],
  colors: [{ hex: "", size: "" }],
};

function ProductForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.Categories);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    !values?.id ? dispatch(addProduct(values)) : dispatch(editProduct(values));
    navigate(-1);
  };

  useEffect(() => {
    !categories?.length && dispatch(fetchAllCategory());
  }, []);

  const validatorForAPI = Yup.object({
    title: Yup.string().required("Title is Required"),
    brand: Yup.string().required("Brand is Required"),
    description: Yup.string().required("Description is Required"),
    thumbnail: Yup.string().required("Image is Required"),
    category: Yup.string().required("Category is Required"),
    price: Yup.number().required("Price is Required"),
    stock: Yup.number().required("Stock is Required"),
  });

  const validatorForNew = Yup.object({
    title: Yup.string().required("Title is Required"),
    brand: Yup.string().required("Brand is Required"),
    description: Yup.string().required("Description is Required"),
    thumbnail: Yup.string().required("Image is Required"),
    category: Yup.string().required("Category is Required"),
    sizeData: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Name is Required"),
          price: Yup.string().required("Price is Required"),
          stock: Yup.string().required("Stock is Required"),
        }),
      )
      .min(1, "You need at least one Size")
      .required("Required"),
    colors: Yup.array()
      .of(
        Yup.object({
          hex: Yup.string().required("Color is Required"),
          size: Yup.string().required("Please select a size"),
        }),
      )
      .min(1, "You need at least one Color")
      .required("Required"),
  });

  const form = (initialState, validator) => {
    return (
      <Formik
        initialValues={initialState}
        validationSchema={validator}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="m-2 flex w-auto flex-col items-center justify-center rounded-lg bg-gray-50 p-8 dark:bg-gray-700 md:w-1/2">
            <h1 className="mb-4 text-2xl font-bold dark:text-gray-300">
              {values?.id ? "Edit Product" : "Add Product"}
            </h1>
            <RenderIf isTrue={values?.thumbnail}>
              <img
                className="h-6/12 m-2 w-6/12 rounded-md border-[6px] border-white bg-white"
                src={values.thumbnail}
                alt="Selected"
                style={{ maxWidth: "300px" }}
              />
            </RenderIf>

            <ProductFormResponsive
              containers={[
                <>
                  <div
                    className={
                      errors.title && touched.title ? "animate-pulse" : ""
                    }
                  >
                    <label htmlFor="title" className="mb-2 dark:text-gray-300">
                      Title
                    </label>
                    <Field
                      name={"title"}
                      placeholder="Enter title"
                      type={"text"}
                      className={`${
                        errors.title && touched.title
                          ? "border-2 border-red-500"
                          : ""
                      } w-full rounded-md bg-slate-300 p-2 placeholder:text-gray-600`}
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="title"
                      component={"div"}
                    />
                  </div>
                </>,
                <>
                  <div
                    className={
                      errors.brand && touched.brand ? "animate-pulse" : ""
                    }
                  >
                    <label htmlFor="brand" className="mb-2 dark:text-gray-300">
                      Brand
                    </label>
                    <Field
                      name={"brand"}
                      type="brand"
                      placeholder={"Enter brand"}
                      className={`${
                        errors.brand && touched.brand
                          ? "border-2 border-red-500"
                          : ""
                      } w-full rounded-md bg-slate-300 p-2 placeholder:text-gray-600`}
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="brand"
                      component={"div"}
                    />
                  </div>
                </>,
              ]}
            />

            <div
              className={`${
                errors.description && touched.description ? "animate-pulse" : ""
              } my-2 w-full`}
            >
              <label htmlFor="description" className="mb-2 dark:text-gray-300">
                Description
              </label>
              <Field
                name={"description"}
                type="text"
                as="textarea"
                placeholder={"Enter description"}
                className={`${
                  errors.description && touched.description
                    ? "border-2 border-red-500"
                    : ""
                } mt-2 w-full rounded-md bg-slate-300 p-2 placeholder:text-gray-600`}
              />
              <ErrorMessage
                className="text-red-500"
                name="description"
                component={"div"}
              />
            </div>
            <ProductFormResponsive
              containers={[
                <>
                  <div
                    className={`${
                      errors.description && touched.description
                        ? "animate-pulse"
                        : ""
                    } flex flex-col`}
                  >
                    <label
                      htmlFor="thumbnail"
                      className="mb-2 dark:text-gray-300"
                    >
                      Thumbnail
                    </label>
                    <Field
                      name="thumbnail"
                      type="file"
                      className="mb-2 mr-2 h-auto w-full rounded-md bg-slate-300 p-1 placeholder:text-gray-600"
                      accept="image/*"
                      value=""
                      onChange={(e) => {
                        const file = e.target.files[0];
                        file &&
                          setFieldValue("thumbnail", URL.createObjectURL(file));
                      }}
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="thumbnail"
                      component={"div"}
                    />
                  </div>
                </>,
                <>
                  <div
                    className={`${
                      errors.description && touched.description
                        ? "animate-pulse"
                        : ""
                    } flex flex-col`}
                  >
                    <label
                      htmlFor="category"
                      className="mb-2 dark:text-gray-300"
                    >
                      Category
                    </label>
                    <Field
                      name="category"
                      as="select"
                      className="mb-2 appearance-none rounded-md border border-gray-300 bg-slate-300 bg-[linear-gradient(45deg,transparent_50%,gray_50%),linear-gradient(135deg,gray_50%,transparent_50%),linear-gradient(to_right,#ccc,#ccc)] bg-[5px_5px,5px_5px,1px_1.5em] bg-[calc(100%_-_20px)_calc(1em_+_2px),calc(100%_-_15px)_calc(1em_+_2px),calc(100%_-_2.5em)_0.5em] bg-no-repeat py-2 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm placeholder:text-gray-600 hover:bg-gray-50 focus:outline-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => {
                        return (
                          <option
                            className="mb-4 w-full rounded-md bg-slate-300 p-2"
                            value={`${category}`}
                            key={index}
                          >
                            {category}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      className="text-red-500"
                      name="category"
                      component={"div"}
                    />
                  </div>
                </>,
              ]}
            />

            <RenderIf
              isTrue={!values?.sizeData}
              fallback={
                <>
                  <SizeVariation
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                  <ColorVariation
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </>
              }
            >
              <ProductFormAPI errors={errors} touched={touched} />
            </RenderIf>

            <Button
              className="mt-8 w-full rounded-md bg-blue-custom px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-800"
              type="submit"
              label={values?.id ? "Edit Product" : "Add Product"}
            />

            <p className="mt-4">
              <Link to="/catalog" className=" text-blue-500 underline">
                Home
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <>
      <div className="flex h-auto items-center justify-center">
        {form(
          location?.state?.product ?? initialData,
          location?.state?.product && location?.state?.product?.id < 101
            ? validatorForAPI
            : validatorForNew,
        )}
      </div>
    </>
  );
}

export default ProductForm;
