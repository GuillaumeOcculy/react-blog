import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const BlogAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: headers,
});

BlogAPI.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      BlogAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

BlogAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
      return;
      // https://github.com/axios/axios/issues/690#issuecomment-278372400
    }

    return Promise.reject(error);
  }
);

export default BlogAPI;
