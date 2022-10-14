import React from "react";

// I18n
import esi18n from "../../i18n/es.json";

// Styles
import classes from "./HomeView.module.css";

const HomeView = () => {
  // ------------------------------------------- //
  // ----------------- Return ------------------ //
  // ------------------------------------------- //

  return (
    <>
      <main className={classes.mainHome}>
        <p>{esi18n.viewTitles.home}</p>
      </main>
    </>
  );
};

export default HomeView;
