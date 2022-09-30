/* eslint-disable react-hooks/exhaustive-deps */
// import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


// Components
import CustomSelect from '../../components/customSelect/CustomSelect.jsx'

// I18n
import esi18n from '../../i18n/es.json';

// Services
import { postMovie } from '../../services/Movies';
import { getAllGenres } from '../../services/Genres';

// Styles
// import classes from './AddMovie.module.css'


const AddMovie = () => {
    // const auth = JSON.parse(Cookies.get('auth'));
    // const token = auth.token;
    const history = useHistory();

  // ---------------------------------------------------
  // --------------------- States ----------------------
  // ---------------------------------------------------

    const[genres, setGenres] = useState();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        mode: 'onChange',
        defaultValues: {
            titulo: '',
            enCines: '',
            fechaEstreno: '',
            generos: '',
            actores: ''
        },
      });

      const handleGenres = async () => {
        try {
            const result = await Promise.resolve(getAllGenres());
            const parsedResult = result.data.map((elem) => {
                return {
                    value: elem.id,
                    name: elem.nombre
                };
            });
            setGenres(parsedResult);
        } catch (error) {
            toast.error(esi18n.error.getList);
        }
      };

      const handleSelectedGenre = (e) => {
        setValue('genre', e);
      }

      const setLists = async () => {
        await handleGenres();
      };


      const onSubmit = async (data) => {
        const response = await Promise.resolve(
            postMovie({
                titulo: data.titulo,
                enCines: data.enCines,
                fechaEstreno: data.fechaEstreno,
                poster: data.poster,
                generos: data.generos,
                actores: data.actores
            })
        );
        if (response) {
            toast.success(esi18n.success.userCrtd);
            reset();
            history.push('/adminMovies');
        }
      }

    // ------------------------------------------- //
    // ---------- Side Effects Handlers ---------- //
    // ------------------------------------------- //

  useEffect(() => {
    setLists();
  }, []);


    return(
        <div className='container'>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p className=''>Crear Película</p>
                </div>
                <div className='row ms-4'>
                <div className="col-xl-6">
                  <div className="container-fluid px-3">
                    <div className="row">
                      <div className="col-12 mb-2 mt-3">
                        <label className="formLabel">{esi18n.formLabels.movieTitle}</label>
                      </div>
                      <div className="col-12 mb-2 mt-3">
                        <input
                          id="titulo"
                          name="titulo"
                          autoComplete="new-titulo"
                          placeholder={esi18n.placeHolders.movieTitle}
                          className={`formInput form-control ${errors.titulo ? 'is-invalid' : ''}`}
                          {...register('titulo')}
                        />
                        <div className="invalid-input ms-3 mt-2">{errors.titulo?.message}</div>
                      </div>
                    </div>
                  </div>
                </div>
                    <div className='col-xl-6'>
                        <div className='container-fluid px-3'>
                            <div className='row'>
                                <div className='col-12 mb-2 mt-3'>
                                    <label htmlFor='genresList' className='formLabel'>
                                    {esi18n.formLabels.genres}
                                    </label>
                                </div>
                                <div className='col-12 mb-2 mt-3'>
                                    <CustomSelect
                                    options={genres}
                                    setSelection={handleSelectedGenre}
                                    {...register('genres')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMovie;