import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Contexts
import { CustomSelectContextProvider } from './context/CustomSelectContext.jsx';

// Router
import Routes from './routes/routes.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <CustomSelectContextProvider>
        <Switch>
          <Routes />
        </Switch>
        </CustomSelectContextProvider>
      </BrowserRouter>
      <ToastContainer theme="colored" autoClose={5000} pauseOnFocusLoss pauseOnHover />
    </>
  );
}

export default App;
