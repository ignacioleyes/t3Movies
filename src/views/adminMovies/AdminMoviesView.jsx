import React, { useState, useEffect } from 'react';
import { /* useHistory,  */useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


// Services
import { getAllMovies/* , getMovieById */ } from '../../services/Movies';

// Styles
import classes from './AdminMovies.module.css'

const AdminMoviesView = () => {
    // const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState();


// const dateData = data.fechaEstreno;
// console.log(dateData);

  // ------------------------------------------- //
  // -------------- Action Handlers ------------ //
  // ------------------------------------------- //

const handleData = async () => {
    try {
        const response = await getAllMovies();
        if (response){
            setData(response.data);
        }
    } catch (error) {
        toast.error('Error al obtener la data');
    }
}


  // ------------------------------------------- //
  // ---------- Side Effects Handlers ---------- //
  // ------------------------------------------- //

useEffect(() => {
    handleData();
}, [location])


  // ------------------------------------------- //
  // ----------------- Return ------------------ //
  // ------------------------------------------- //

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="card-group">
                    {data && data.map((movie, i) => (
                    <div className="col mb-2 mt-1" key={i}>
                        <div className="card h-100 ms-1 me-1">
                            <img src={movie.poster} className="card-img-top h-100" alt="..."/>
                            <div className={`card-body ${classes.bodyCard}`}>
                                <h5 className="card-title">{movie.titulo}</h5>
                                <p className="card-text">Fecha de estreno: {movie.fechaEstreno.toString().split('T00:00:00')}</p>
                                <button className="btn btn-primary">Editar Pelicula</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminMoviesView;