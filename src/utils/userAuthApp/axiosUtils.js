import axios from "axios";

const MAX_RETRIES = parseInt(process.env.REACT_APP_MAX_RETRIES);
const INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN";
const INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN";

let setInvalidAccessToken = false;
let setInvalidRefreshToken = false;
let retryCount = 0;

const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
  timeout: 5000,
});

function isOnline() {
  return navigator.onLine;
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (!isOnline()) {
      return Promise.reject(new Error("Device is offline!"));
    }

    let accessToken;

    if (setInvalidAccessToken) {
      accessToken = INVALID_ACCESS_TOKEN;
      if (retryCount > 0) {
        setInvalidAccessToken = false;
      }
    } else {
      accessToken = localStorage.getItem("access_token");
    }

    if (accessToken) {
      if (localStorage.getItem("loginMethod") === "facebook") {
        config.params["access_token"] = accessToken;
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const statusCode = error?.response?.status;

    if (statusCode === 401 && retryCount < MAX_RETRIES) {
      retryCount++;

      let refreshToken;

      if (setInvalidRefreshToken) {
        refreshToken = INVALID_REFRESH_TOKEN;
      } else {
        refreshToken = localStorage.getItem("refresh_token");
      }

      if (refreshToken) {
        if (localStorage.getItem("loginMethod") === "google") {
          const body = {
            grant_type: "refresh_token",
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken,
          };

          const refreshResponse = await axiosInstance.post(
            "https://oauth2.googleapis.com/token",
            body,
          );

          const newAccessToken = refreshResponse.data.access_token;
          localStorage.setItem("access_token", newAccessToken);
        } else {
          const refreshResponse = await axiosInstance.post(
            "auth/refresh-token",
            {
              refreshToken: refreshToken,
            },
          );

          const newAccessToken = refreshResponse.data.access_token;
          const newRefreshToken = refreshResponse.data.refresh_token;
          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", newRefreshToken);
        }

        // platzi fake store api returns 401 for all invalid requests thus to prevent an infinite loop I have commented this line
        // retryCount--;

        const originalRequest = error.config;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
