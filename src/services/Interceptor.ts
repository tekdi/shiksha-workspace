import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    config.headers.Cookie =
      "connect.sid=s%3ATGY6tTa_ebtGxIDtZLgmsiNXX4fQP5zY.TM%2BvrVtWPetWWpXhnq7R9yfNw8Sw5AVqFOCkqhQ%2Fm00";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
