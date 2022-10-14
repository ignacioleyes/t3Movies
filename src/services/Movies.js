import clienteAxios from "./Axios.jsx";

export const getAllMovies = () => {
  try {
    const response = Promise.resolve(clienteAxios.get("/peliculas"));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMovieById = (id) => {
  try {
    const response = Promise.resolve(clienteAxios.get(`/peliculas/${id}`));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const postMovie = async (data) => {
  try {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("fechaEstreno", data.fechaEstreno);
    formData.append("poster", data.poster);
    formData.append("genero", data.genero);
    formData.append("actor", data.actor);
    const response = await clienteAxios.post("/peliculas", formData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteMovie = (id) => {
  try {
    const response = Promise.resolve(clienteAxios.delete(`/peliculas/${id}`));
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
