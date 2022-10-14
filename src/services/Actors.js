import clienteAxios from "./Axios.jsx";

export const getAllActors = () => {
  try {
    const response = Promise.resolve(clienteAxios.get("/actores"));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
