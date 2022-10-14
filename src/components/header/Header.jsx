import React from "react";

// I18n
import esi18n from "../../i18n/es.json";

// Styles
import classes from "./Header.module.css";

const Header = ({ pageName }) => {
  // ------------------------------------------- //
  // -------------- Action Handlers ------------ //
  // ------------------------------------------- //

  // ------------------------------------------- //
  // ---------- Side Effects Handlers ---------- //
  // ------------------------------------------- //

  // ------------------------------------------- //
  // ----------------- Return ------------------ //
  // ------------------------------------------- //

  return (
    <>
      <header className={classes.header}>
        <div className={classes.titleSectionContainer}>
          <div className={classes.pageTitleContainer}>
            <p className={classes.pageSection}>{pageName}</p>
            <span className={classes.arrowRight}>
              <i className="bi bi-chevron-right" />
            </span>
            <p className={`${classes.pageTitle}`}>{esi18n.viewTitles.home}</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
