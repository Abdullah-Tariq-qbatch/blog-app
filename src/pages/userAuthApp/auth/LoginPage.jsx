import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import AuthModal from "../../../components/userAuthApp/forms/AuthModal";
import BackgroundImage from "../../../components/userAuthApp/BackgroundImage";
import FacebookLoginButton from "../../../components/userAuthApp/buttons/FacebookLoginButton";
import FormikInput from "../../../components/userAuthApp/forms/FormikInput";
import GoogleLoginButton from "../../../components/userAuthApp/buttons/GoogleLoginButton";
import Joi from "joi";
import RedirectionLink from "../../../components/userAuthApp/forms/RedirectionLink";
import ShowPasswordCheckBox from "../../../components/userAuthApp/forms/ShowPasswordCheckBox";
import Spinner from "../../../components/userAuthApp/Spinner";
import SubmitButton from "../../../components/userAuthApp/forms/SubmitButton";
import axios from "axios";
import { loginUser } from "../../../redux/users/actionCreator";
import playNotification from "../../../utils/userAuthApp/playNotification";
import { toast } from "react-toastify";
import { useFacebookLogin } from "facebook-oauth-react";
import { useGoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const showLoader = useSelector((state) => state.Users.loading);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const redirectPath = location?.state?.redirectPath ?? "/";

  const dispatch = useDispatch();

  const accessToken = localStorage.access_token;

  useEffect(() => {
    if (accessToken) {
      navigate("/");
      return;
    }
  }, []);

  const validationSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
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
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleLogin(values, { setSubmitting }) {
    setSubmitting(true);

    const body = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginUser(body, navigate, redirectPath));

    setSubmitting(false);
  }

  async function responseGoogle(codeResponse) {
    try {
      const body = {
        code: codeResponse.code,
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        redirect_uri: window.location.origin,
      };
      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        body,
      );
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("loginMethod", "google");
      navigate(redirectPath);
      toast.success("Google login successful!");
      playNotification();
    } catch (error) {
      console.error(error);
    }
  }

  function errorGoogle() {
    toast.error("Google login failed!");
  }

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: responseGoogle,
    onError: errorGoogle,
  });

  function responseFacebook(response) {
    localStorage.setItem("access_token", response.accessToken);
    localStorage.setItem("loginMethod", "facebook");
    navigate(redirectPath);
    toast.success("Facebook login successful!");
    playNotification();
  }

  const facebookLogin = useFacebookLogin({ onSuccess: responseFacebook });

  return (
    !accessToken && (
      <>
        <Spinner show={showLoader} />
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
              redirectTo={"/signup"}
              pageTitle={"Sign Up"}
            />
          </AuthModal>
        </BackgroundImage>
      </>
    )
  );
}

export default LoginPage;
