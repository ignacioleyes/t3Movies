import React, { useState, useEffect } from 'react';
import { /* useHistory,  */useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


// Services
import { getAllMovies/* , getMovieById */ } from '../../services/Movies';

const AdminMoviesView = () => {
    // const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState();


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
            <div className="row row-cols-2 mt-5 ms-5">
                <div className="col-3 mb-5 mt-1">
                {data && data.map((movie) => (
                    <div className="card" style={{with:'8rem'}}>
                        <img src={movie.poster} className="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 className="card-title">{movie.titulo}</h5>
                            <p className="card-text">{movie.fechaEstreno}</p>
                            <button className="btn btn-primary">Editar Pelicula</button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default AdminMoviesView;