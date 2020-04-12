import "./iconsLibrary";
import "./aos";

import axios from "axios";

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    //This is to request a new access token if the error was because its expiration
    if (error.response.data === "Token Expired") {
      try {
        const refTokenRes = await axios.post("/api/users/refresh-token", {
          username: localStorage.getItem("username"),
          refreshToken: localStorage.getItem("refreshToken")
        });

        localStorage.setItem(
          "refreshToken",
          refTokenRes.data.data.refreshToken
        );

        const res = await axios(error.config); //then we re-call the same method that got rejected
        return Promise.resolve(res);
      } catch (error) {
        //Refresh Token Invalid so we ask the user to login again
        localStorage.clear();
        window.location = "/login";
      }
    }
    // axios(error.config)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
