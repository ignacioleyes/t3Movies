import clienteAxios from "./Axios.jsx";

export const getAllGenres = () => {
  try {
    const response = Promise.resolve(clienteAxios.get("/generos"));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
