import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthModal from "../../../components/userAuthApp/forms/AuthModal";
import BackgroundImage from "../../../components/userAuthApp/BackgroundImage";
import FormikInput from "../../../components/userAuthApp/forms/FormikInput";
import Joi from "joi";
import RedirectionLink from "../../../components/userAuthApp/forms/RedirectionLink";
import ShowPasswordCheckBox from "../../../components/userAuthApp/forms/ShowPasswordCheckBox";
import Spinner from "../../../components/userAuthApp/Spinner";
import SubmitButton from "../../../components/userAuthApp/forms/SubmitButton";
import _ from "lodash";
import getInvalidPasswordMessage from "../../../utils/userAuthApp/getInvalidPasswordMessage";
import { signUpUser } from "../../../redux/users/actionCreator";
import { useNavigate } from "react-router-dom";
import validatePassword from "../../../utils/userAuthApp/validatePassword";

function SignUpPage() {
  const showLoader = useSelector((state) => state.Users.loading);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.access_token;
    if (accessToken) {
      navigate("/");
      return;
    }
  }, []);

  const validationSchema = Joi.object({
    name: Joi.string()
      .max(20)
      .regex(/^(?=.*[a-zA-Z])[a-zA-Z ]+$/, "alphabets only")
      .required()
      .label("First Name"),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).max(50).required().label("Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .label("Confirm Password")
      .messages({ "any.only": "Passwords do not match" }),
  });

  function validate(values) {
    const { error } = validationSchema.validate(values, { abortEarly: false });
    if (!error) return {};

    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleSignup(values, { setSubmitting }) {
    setSubmitting(true);

    // Check if the password is valid
    const rules = validatePassword(values.password);
    if (!_.isEmpty(rules)) {
      const message = getInvalidPasswordMessage(rules);
      alert(
        `Your password fails to pass the following rule(s):\n\n${message} `,
      );
      return;
    }

    // If all is good then create the new user
    const body = {
      name: values.name.trim(),
      email: values.email,
      password: values.password,
      avatar: "https://robohash.org/hicveldicta.png",
    };

    dispatch(signUpUser(body, navigate));

    setSubmitting(false);
  }

  return (
    <>
      <Spinner show={showLoader} />
      <BackgroundImage>
        <AuthModal text={"Sign Up"}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignup}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
                <FormikInput
                  name="name"
                  type="text"
                  placeholder="Name"
                  error={errors.name}
                  touched={touched.name}
                />
                <FormikInput
                  name="email"
                  type="text"
                  placeholder="Email"
                  error={errors.email}
                  touched={touched.email}
                />
                <FormikInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />
                <FormikInput
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
                <ShowPasswordCheckBox
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton text={"Sign Up"} />
              </Form>
            )}
          </Formik>
          <RedirectionLink
            linkText={"Already a user?"}
            redirectTo={"/login"}
            pageTitle={"Login"}
          />
        </AuthModal>
      </BackgroundImage>
    </>
  );
}

export default SignUpPage;
