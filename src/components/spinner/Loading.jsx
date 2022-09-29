import React from 'react';

// Components
import Spinner from 'react-bootstrap/Spinner';

// Styles
import classes from './Loading.module.css';

const Loading = () => (
  <div className={classes.spinnerContainer}>
    <Spinner animation="border" role="status" variant="success" />
  </div>
);

export default Loading;