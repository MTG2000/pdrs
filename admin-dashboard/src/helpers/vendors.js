import "./iconsLibrary";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
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
      await axios.post("/api/users/refresh-token", {
        username: localStorage.getItem("username"),
        refreshToken: localStorage.getItem("refreshToken")
      });

      const res = await axios(error.config); //then we re-call the same method that got rejected
      return Promise.resolve(res);
    }
    // axios(error.config)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
