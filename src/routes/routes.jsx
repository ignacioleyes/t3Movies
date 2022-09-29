import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Loading from '../components/spinner/Loading.jsx';

// I18n
import esi18n from '../i18n/es.json';

// Routes
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

const Routes = () => {

// views
const AuthView = lazy(() => import('../views/authView/AuthView.jsx'));
const HomeView = lazy(() => import('../views/homeView/HomeView.jsx'));
const AdminMoviesView = lazy(() => import('../views/adminMovies/AdminMoviesView.jsx'))

// ------------------------------------------- //
// ----------------- Return ------------------ //
// ------------------------------------------- //

return(
    <Suspense fallback={<Loading />}>
    <Switch>
        <Route path="/" exact component={() => <Redirect to={{ pathname: '/auth' }}/>}></Route>
        <PublicRoute path="/auth" component={AuthView} />
        <Route path="/" exact component={() => <Redirect to={{ pathname: '/home' }} />} />
        <PrivateRoute pageName={esi18n.viewTitles.home} path="/home" component={HomeView} />
        <PrivateRoute pageName={esi18n.viewTitles.AdminMovies} path="/adminMovies" component={AdminMoviesView} />
    </Switch>
    </Suspense>
)

};

export default Routes;