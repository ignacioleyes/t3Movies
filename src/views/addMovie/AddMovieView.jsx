/* eslint-disable react-hooks/exhaustive-deps */
// import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import CustomSelect from "../../components/customSelect/CustomSelect.jsx";

// I18n
import esi18n from "../../i18n/es.json";

// Services
import { getMovieById, postMovie } from "../../services/Movies";
import { getAllGenres } from "../../services/Genres";
import { getAllActors } from "../../services/Actors";

// Styles
// import classes from './AddMovie.module.css'

const AddMovie = () => {
  // const auth = JSON.parse(Cookies.get('auth'));
  // const token = auth.token;
  const history = useHistory();
  const location = useLocation();

  // ---------------------------------------------------
  // --------------------- States ----------------------
  // ---------------------------------------------------

  const [genres, setGenres] = useState();
  const [actors, setActors] = useState();
  const [isEdditing, setIsEdditing] = useState(false);
  const [movie, setMovie] = useState();
  const [title, setTitle] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      titulo: "",
      enCines: "",
      fechaEstreno: "",
      genero: "",
      actor: "",
    },
  });

  const handleGenres = async () => {
    try {
      const result = await Promise.resolve(getAllGenres());
      const parsedResult = result.data.map((elem) => {
        return {
          value: elem.id,
          name: elem.nombre,
        };
      });
      setGenres(parsedResult);
    } catch (error) {
      toast.error(esi18n.error.getList);
    }
  };

  const handleActors = async () => {
    try {
      const result = await Promise.resolve(getAllActors());
      const parsedResult = result.data.map((elem) => {
        return {
          value: elem.id,
          name: elem.nombre,
        };
      });
      setActors(parsedResult);
    } catch (error) {
      toast.error(esi18n.error.getList);
    }
  };

  const handleData = async (id) => {
    try {
      const response = await getMovieById(id);
      if (response) {
        const theMovie = {
          id: response.data.id,
          titulo: response.data.titulo,
          fechaEstreno: response.data.fechaEstreno,
          poster: response.data.poster,
          genero: response.data.genero,
          actor: response.data.actor,
        };
        setMovie(theMovie);
      }
    } catch (error) {}
  };

  const handleSelectedGenre = (e) => {
    setValue("genero", e);
  };

  const handleSelectedActor = (e) => {
    setValue("actor", e);
  };

  const setLists = async () => {
    await handleGenres();
    await handleActors();
  };

  const returnToList = () => {
    history.push("/adminMovies");
  };

  const onSubmit = async (data) => {
    try {
      const file = data.poster[0];
      const response = await postMovie({
        titulo: data.titulo,
        fechaEstreno: data.fechaEstreno,
        poster: file,
        genero: data.genero,
        actor: data.actor,
      });
      if (response) {
        toast.success(esi18n.toast.succes.movieCrtd);
        reset();
        history.push("/adminMovies");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // ------------------------------------------- //
  // ---------- Side Effects Handlers ---------- //
  // ------------------------------------------- //

  useEffect(() => {
    setLists();
  }, []);

  useEffect(() => {
    if (location.state) {
      const id = location.state.id;
      setIsEdditing(true);
      handleData(id);
    }
  }, [location]);

  useEffect(() => {
    if (movie) {
      reset(movie);
    }
  }, [movie]);

  return (
    <div className="container formContainer">
      <form className="formAdd" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="formTitle">{title}</p>
        </div>
        <div className="row ms-4">
          <div className="col-xl-6">
            <div className="container-fluid px-3">
              <div className="row">
                <div className="col-12 mb-2 mt-3">
                  <label className="formLabel">
                    {esi18n.formLabels.movieTitle}
                  </label>
                </div>
                <div className="col-12 mb-2 mt-3">
                  <input
                    id="titulo"
                    name="titulo"
                    autoComplete="new-titulo"
                    placeholder={esi18n.placeHolders.movieTitle}
                    className={`formInput form-control ${
                      errors.titulo ? "is-invalid" : ""
                    }`}
                    {...register("titulo")}
                  />
                  <div className="invalid-input ms-3 mt-2">
                    {errors.titulo?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isEdditing && (
            <div className="col-xl-6">
              <div className="container-fluid px-3">
                <div className="row">
                  <div className="col-12 mb-2 mt-3">
                    <label htmlFor="genresList" className="formLabel">
                      {esi18n.formLabels.genres}
                    </label>
                  </div>
                  <div className="col-12 mb-2 mt-3">
                    <CustomSelect
                      options={genres}
                      setSelection={handleSelectedGenre}
                      {...register("genero")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {genres && movie && (
            <div className="col-xl-6">
              <div className="container-fluid px-3">
                <div className="row">
                  <div className="col-12 mb-2 mt-3">
                    <label htmlFor="genresList" className="formLabel">
                      {esi18n.formLabels.genres}
                    </label>
                  </div>
                  <div className="col-12 mb-2 mt-3">
                    <CustomSelect
                      options={genres}
                      setSelection={handleSelectedGenre}
                      selected={
                        genres.find((grs) => {
                          return grs.value === movie.genero;
                        })?.name
                      }
                      {...register("genero")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row ms-4">
          {!isEdditing && (
            <div className="col-xl-6">
              <div className="container-fluid px-3">
                <div className="row">
                  <div className="col-12 mb-2 mt-3">
                    <label htmlFor="genresList" className="formLabel">
                      {esi18n.formLabels.actors}
                    </label>
                  </div>
                  <div className="col-12 mb-2 mt-3">
                    <CustomSelect
                      options={actors}
                      setSelection={handleSelectedActor}
                      {...register("actor")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-xl-6">
            <div className="container-fluid px-3">
              <div className="row">
                <div className="col-12 mb-2 mt-3">
                  <label className="formLabel">
                    {esi18n.formLabels.moviePoster}
                  </label>
                </div>
                <div className="col-12 mb-2 mt-3">
                  <input
                    type="file"
                    name="poster"
                    placeholder={esi18n.placeHolders.movieTitle}
                    className={`formInput form-control ${
                      errors.titulo ? "is-invalid" : ""
                    }`}
                    {...register("poster")}
                  />
                  <div className="invalid-input ms-3 mt-2">
                    {errors.titulo?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ms-4">
          <div className="col-xl-6">
            <div className="container-fluid px-3">
              <div className="row">
                <div className="col-12 mb-2 mt-3">
                  <label className="formLabel">
                    {esi18n.formLabels.releaseDate}
                  </label>
                </div>
                <div className="col-12 mb-2 mt-3">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="new-date"
                    placeholder={esi18n.placeHolders.movieTitle}
                    className={`formInput form-control ${
                      errors.titulo ? "is-invalid" : ""
                    }`}
                    {...register("fechaEstreno")}
                  />
                  <div className="invalid-input ms-3 mt-2">
                    {errors.titulo?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6" />
          <div className="col-xl-6" />
          <div className="col-xl-6">
            <div className="d-flex flex-row-reverse mb-2 mt-1 ms-2 me-2 container-fluid">
              <div className="col-md-6 mb-3 px-2">
                <button className="btnSave" disabled={!isValid} type="submit">
                  {esi18n.buttons.save}
                </button>
              </div>
              <div className="col-md-6 mb-3 px-2">
                <button
                  className="btnCancel"
                  onClick={returnToList}
                  type="button"
                >
                  {esi18n.buttons.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
