import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const CustomSelectContext = createContext();

export const CustomSelectContextProvider = (props) => {
  const [reset, setReset] = useState(false);
  const [differentStyle, setDifferentStyle] = useState(true);

  return (
    <CustomSelectContext.Provider
      value={{
        reset,
        differentStyle,
        setReset,
        setDifferentStyle,
      }}
    >
      {props.children}
    </CustomSelectContext.Provider>
  );
};

CustomSelectContextProvider.propTypes = {
  children: PropTypes.node,
};