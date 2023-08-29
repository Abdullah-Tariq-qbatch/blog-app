/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import {
  fetchFacebookUserData,
  fetchGoogleUserData,
  fetchUserData,
} from "../../redux/users/actionCreator";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function AuthGuard({ children }) {
  const [renderChildren, setRenderChildren] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserDetails = useCallback(async () => {
    const loginMethod = localStorage.getItem("loginMethod");
    switch (loginMethod) {
      case "google":
        dispatch(fetchGoogleUserData(navigate));
        break;
      case "facebook":
        dispatch(fetchFacebookUserData(navigate));
        break;
      default:
        dispatch(fetchUserData(localStorage.getItem("userId"), navigate));
        break;
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      setRenderChildren(true);
      return;
    }

    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      getUserDetails();
      setRenderChildren(true);
      return;
    }

    navigate("/login");
    toast.error("Please login first!");
    setRenderChildren(true);
  }, [location, getUserDetails]);

  return <>{renderChildren && children}</>;
}

export default AuthGuard;
