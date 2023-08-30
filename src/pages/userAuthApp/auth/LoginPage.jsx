import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";

import AuthModal from "../../../components/userAuthApp/forms/AuthModal";
import BackgroundImage from "../../../components/userAuthApp/BackgroundImage";
import FacebookLoginButton from "../../../components/userAuthApp/buttons/FacebookLoginButton";
import FormikInput from "../../../components/userAuthApp/forms/FormikInput";
import GoogleLoginButton from "../../../components/userAuthApp/buttons/GoogleLoginButton";
import Joi from "joi";
import RedirectionLink from "../../../components/userAuthApp/forms/RedirectionLink";
import ShowPasswordCheckBox from "../../../components/userAuthApp/forms/ShowPasswordCheckBox";
import SubmitButton from "../../../components/userAuthApp/forms/SubmitButton";
import { ToastContext } from "../../../contexts/userAuthApp/ToastContext";
import { loginUser } from "../../../redux/users/actionCreator";
import playNotification from "../../../utils/userAuthApp/playNotification";
import { useDispatch } from "react-redux";
import { useFacebookLogin } from "facebook-oauth-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Joi.object({
    username: Joi.string().alphanum().max(20).required().label("Username"),
    password: Joi.string().min(8).max(50).required().label("Password"),
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
    username: "",
    password: "",
  };

  const toast = useContext(ToastContext);

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleLogin(values, { setSubmitting }) {
    setSubmitting(true);

    const body = {
      username: values.username,
      password: values.password,
    };

    dispatch(loginUser(body, navigate));

    setSubmitting(false);
  }

  async function responseGoogle(tokenResponse) {
    localStorage.setItem("access_token", tokenResponse.access_token);
    localStorage.setItem("loginMethod", "google");
    navigate("/home");
    toast.success("Google login successful!");
    playNotification();
  }

  function errorGoogle() {
    toast.error("Google login failed!");
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: errorGoogle,
  });

  function responseFacebook(response) {
    localStorage.setItem("access_token", response.accessToken);
    localStorage.setItem("loginMethod", "facebook");
    navigate("/home");
    toast.success("Facebook login successful!");
    playNotification();
  }

  const facebookLogin = useFacebookLogin({ onSuccess: responseFacebook });

  return (
    <>
      <BackgroundImage>
        <AuthModal text={"Login"}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="w-52 md:w-72">
                <FormikInput
                  name="username"
                  type="text"
                  placeholder="Username"
                  error={errors.username}
                  touched={touched.username}
                />
                <FormikInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />
                <ShowPasswordCheckBox
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <SubmitButton text={"Login"} />
                <GoogleLoginButton googleLogin={googleLogin} />
                <FacebookLoginButton facebookLogin={facebookLogin} />
              </Form>
            )}
          </Formik>
          <RedirectionLink
            linkText={"Not a user?"}
            redirectTo={"/"}
            pageTitle={"Sign Up"}
          />
        </AuthModal>
      </BackgroundImage>
    </>
  );
}

export default LoginPage;