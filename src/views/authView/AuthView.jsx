import Cookies from 'js-cookie';
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// I18n
import esi18n from '../../i18n/es.json';

// Image
import Image from '../../assets/image/best-movies.jpg';

// Services
import loginService from '../../services/Auth';

const AuthView = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();


  // ------------------------------------------------ //
  // ---------------- Action Handlers---------------- //
  // ------------------------------------------------ //

  const onSubmitHandler = async () => {
    if (!emailRef.current.value.trim().length !== 0 && !passwordRef.current.value.trim().length !== 0) {
      try {
        const response = await Promise.resolve(
          loginService({ email: emailRef.current.value.trim(), password: passwordRef.current.value.trim() })
        );
        if (response) {
          const res = JSON.stringify({
            token: response.data.token,
          });
          Cookies.set('auth', res);
          history.push('/home');
        }
      } catch (error) {
        toast.error(esi18n.toast.error.credentials);
      }
    }
  };

  // ------------------------------------------- //
  // ----------------- Return ------------------ //
  // ------------------------------------------- //

  return (
    <div className="container-fluid">
      <div className="otherContainer row">
        <div className="col-7">
        <div style={{ width: '100%', height: '100%', backgroundImage: `url(${Image})` }}></div>
        </div>
        <div className="authContainer col-md-5">
          <div className="d-flex justify-content-center">
            <form className="mt-5" style={{ width: '70%' }}>
              <div className=" authTitle mb-5">{esi18n.auth.logIn}</div>
              <div className="mb-5">
                <div className="row">
                  <label className="authLabel mt-5 mb-3">{esi18n.formLabels.username}</label>
                </div>
                <input
                  type="text"
                  id="email"
                  placeholder={esi18n.auth.insertEmail}
                  ref={emailRef}
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <div className="row">
                  <label className="authLabel  mb-3" htmlFor="password">
                    {esi18n.formLabels.password}
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder={esi18n.auth.insertPass}
                  ref={passwordRef}
                  className="form-control"
                />
              
              </div>
              <div className="row ">
                <Button className="authBtn mt-5" onClick={onSubmitHandler}>
                  {esi18n.buttons.login}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
