import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Contexts
import { HeaderContextProvider } from './context/HeaderContext.jsx';

// Router
import Routes from './routes/routes.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <HeaderContextProvider>
        <Switch>
          <Routes />
        </Switch>
        </HeaderContextProvider>
      </BrowserRouter>
      <ToastContainer theme="colored" autoClose={5000} pauseOnFocusLoss pauseOnHover />
    </>
  );
}

export default App;
