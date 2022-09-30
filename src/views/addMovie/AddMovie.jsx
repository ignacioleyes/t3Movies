import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


// Services
import { postMovie } from '../../services/Movies';

// Styles
import classes from './AddMovies.module.css'


const AddMovie = () => {
    const auth = JSON.parse(Cookies.get('auth'));
    const token = auth.token;
    const location = useLocation();
    const history = useHistory();

  // ---------------------------------------------------
  // --------------------- States ----------------------
  // ---------------------------------------------------

    const[movie, setMovie] = useState();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isValid },
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



    return(
        <div></div>
    );
}

export default AddMovie;