import React, { useState, useEffect } from 'react';
import { /* useHistory,  */useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// I18n
import esi18n from '../../i18n/es.json';

// Icons
import UpdateMovie from '../../assets/svg/pencilSquare'
import DeleteMovie from '../../assets/svg/trash'

// Services
import { getAllMovies, deleteMovie } from '../../services/Movies';

// Styles
import classes from './AdminMovies.module.css'

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
        toast.error(esi18n.toast.error.getList);
    }
}

const handleDelete = async (e) => {
    try {
        const response = await deleteMovie(e);
        if (response) {
            toast.success(esi18n.toast.succes.movieDeleted)
        }
    } catch (error) {
        toast.error(error);
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
            <div className="row row-cols-1 row-cols-md-1 g-4">
                <div className="card-group">
                    {data && data.map((movie, i) => (
                    <div className="col-3 mb-2 mt-1" key={i}>
                        <div className="card h-100 ms-1 me-1">
                            <img src={movie.poster} className="card-img-top h-100" alt="..."/>
                            <div className={`card-body ${classes.bodyCard}`}>
                                <h5 className="card-title">{movie.titulo}</h5>
                                <p className="card-text">Fecha de estreno: {movie.fechaEstreno.toString().split('T00:00:00')}</p>
                                <div className="d-flex flex-row-reverse bd-highlight">
                                <button 
                                className="actionBtn"
                                title={esi18n.buttonTitles.deleteMovie}
                                onClick={() => handleDelete(movie.id)}
                                >{<DeleteMovie/>}</button>
                                <button 
                                className="actionBtn"
                                title={esi18n.buttonTitles.editMovie}
                                >{<UpdateMovie/>}</button>
                                </div>
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