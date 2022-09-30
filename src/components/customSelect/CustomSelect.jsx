/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';

// Context
import { CustomSelectContext } from '../../context/CustomSelectContext.jsx';

// I18n
import esi18n from '../../i18n/es.json';

// Styles
import classes from './CustomSelect.module.css';

const CustomSelect = React.forwardRef(
  ({
    options,
    firstElement,
    setSelection,
    setLabelSelection,
    resetState,
    selected,
    changeStyle,
    id,
    disabled,
  }) => {
    const [open, setOpen] = useState(false);
    const [myOptions, setMyOptions] = useState();
    const [selectionLabel, setSelectionLabel] = useState();
    const [query, setQuery] = useState('');
    const [differentStyle, setDifferentStyle] = useState(false);
    const { reset, setReset } = useContext(CustomSelectContext);
    const toggle = () => setOpen(!open);
    const ref = React.createRef(null);

    // ------------------------------------------- //
    // ---------- Side Effects Handlers ---------- //
    // ------------------------------------------- //

    useEffect(() => {
      const checkIfClickedOutside = (e) => {
        if (open && ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('click', checkIfClickedOutside);
      return () => {
        document.removeEventListener('click', checkIfClickedOutside);
      };
    }, [open]);

    useEffect(() => {
      if (options && firstElement) {
        setMyOptions([
          {
            value: firstElement,
            name: firstElement,
          },
          ...options,
        ]);
      } else {
        setMyOptions(options);
      }
    }, [options]);

    useEffect(() => {
      if (reset) {
        setSelectionLabel(`${esi18n.customSelect.selection}`);
        setReset(false);
        setQuery('');
      }
    }, [reset]);

    useEffect(() => {
      setSelectionLabel(selected);
    }, [selected]);

    useEffect(() => {
      if (resetState) {
        setSelectionLabel(`${esi18n.customSelect.initialValue}`);
        setReset(false);
      }
    }, [resetState]);

    useEffect(() => {
      if (changeStyle) {
        setDifferentStyle(true);
      }
    }, []);

    // ------------------------------------------- //
    // -------------- Action Handlers ------------ //
    // ------------------------------------------- //

    const handleSelected = (option) => {
      setSelection(option.value);
      setSelectionLabel(option.name);
      if (setLabelSelection) {
        setLabelSelection(option.name);
      }
      setOpen(false);
    };

    const filter = () => {
      return myOptions.filter((option) => {
        if (option !== null) {
          return option.name?.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
        }
        return null;
      });
    };

    const emptyInput = () => {
      if (selectionLabel.length === 0) {
        setSelectionLabel(`${esi18n.customSelect.selection}`);
      }
    };

    // ------------------------------------------- //
    // ----------------- Return ------------------ //
    // ------------------------------------------- //

    return (
      <>
        {myOptions && (
          <div className={classes.wrapper} id={id}>
            <div
              className={!differentStyle ? classes.header : classes.headerDiffStyle}
              role={esi18n.customSelect.typeButton}
              onKeyPress={() => !disabled && toggle(!open)}
              onClick={() => !disabled && toggle(!open)}
              ref={ref}
            >
              <div className={classes.headerTitle}>
                <input
                  type="text"
                  ref={ref}
                  placeholder={selectionLabel || `${esi18n.customSelect.selection}`}
                  value={selectionLabel || query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectionLabel(e.target.value.length === 0 ? emptyInput : e.target.value);
                  }}
                  onClick={() => !disabled && toggle(!open)}
                />
              </div>
              <div>
                <span className={!open ? classes.arrowDown : classes.arrowDownOpen}>
                  <i className="bi bi-chevron-down" />
                </span>
              </div>
            </div>
            {open && (
              <div className={!differentStyle ? classes.listContainer : classes.listContainerDifStyle}>
                <ul className={classes.list}>
                  {filter(myOptions).map((option) => (
                    <li className={classes.listItem} onClick={() => handleSelected(option)} key={option.value}>
                      <button
                        className={classes.button}
                        type={esi18n.customSelect.typeButton}
                        onClick={() => !disabled && toggle(!open)}
                      >
                        <span>{option.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);

export default CustomSelect;