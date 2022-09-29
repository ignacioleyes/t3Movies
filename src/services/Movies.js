import clienteAxios from './Axios.jsx';

export const getAllMovies = () => {
  try {
    const response = Promise.resolve(
      clienteAxios.get('/peliculas')
    );
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
}

export const postMovie = (data) => {
  try {
    const response = Promise.resolve(clienteAxios.post('/peliculas', {
        titulo: data.titulo,
        enCines: data.enCines,
        fechaEstreno: data.fechaEstreno,
        poster: data.poster,
        generos: data.generos,
        actores: data.actores
      })
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

