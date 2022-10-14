import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://localhost:7127/api",
});

clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error" && !error.response) {
      return Promise.reject("axios.errors.network");
    }
    const { status } = error.response;

    if (status === 400) {
      if (error.response.data.errors) {
        return Promise.reject(error.response.data.errors[0].msg);
      }
      return Promise.reject(error.response.data.msg);
    }
    if (status === 401) {
      return Promise.reject("axios.errors.unauthorized");
    }
    if (status === 404) {
      if (error.response.data.jbpm) {
        return Promise.reject(error.response.data.msg);
      }
      return Promise.reject("axios.errors.resourceNotFound");
    }
    if (status === 500) {
      if (error.response.data.msg) {
        return Promise.reject(error.response.data.msg);
      }
      return Promise.reject(error.response.data.error);
    }
    return null;
  }
);

export default clienteAxios;
