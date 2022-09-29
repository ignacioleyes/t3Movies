import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderContextProvider = (props) => {
  const [subtitleStyle, setSubtitleStyle] = useState(null);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [headerState, setHeaderState] = useState();

  return (
    <HeaderContext.Provider
      value={{
        subtitleStyle,
        setSubtitleStyle,
        title,
        subTitle,
        setSubTitle,
        setTitle,
        headerState,
        setHeaderState,
      }}
    >
      {props.children}
    </HeaderContext.Provider>
  );
};

HeaderContextProvider.propTypes = {
  children: PropTypes.node,
};
