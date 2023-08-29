import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

function AuthGuard({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/login") {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
        toast.error("Please login first!");
      }
    }
  }, [navigate]);

  return <>{children}</>;
}

export default AuthGuard;
