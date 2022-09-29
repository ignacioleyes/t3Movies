import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = (props) => {
  const { component, path } = props;

  return <Route component={component} path={path} exact />;
};

export default PublicRoute;