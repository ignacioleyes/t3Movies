import React, { useState } from 'react';
import { Route } from 'react-router-dom';

// Components
import Header from '../components/header/Header.jsx';
import Sidebar from '../components/sidebar/Sidebar.jsx';

// Styles
import '../components/sidebar/Sidebar.scss';

const PrivateRoute = (props) => {
  const { component, path, pageName, hideHeader, hideSidebar } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  // ------------------------------------------- //
  // -------------- Action Handlers ------------ //
  // ------------------------------------------- //

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  // ------------------------------------------- //
  // ----------------- Return ------------------ //
  // ------------------------------------------- //

  return (
    <div className="app dashboardContainer">
      {!hideSidebar && (
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
      )}
      <main className="dashboard">
        {!hideHeader && <Header pageName={pageName} />}
        <section className="homeSection">
          <Route component={component} path={path} exact />
        </section>
      </main>
    </div>
  );
};

export default PrivateRoute;