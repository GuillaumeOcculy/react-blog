import axios from "axios";

const mot = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    accept: "application/json"
  }
});

mot.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
      return;
      // https://github.com/axios/axios/issues/690#issuecomment-278372400
    }

    return Promise.reject(error);
  }
);

export default mot;
