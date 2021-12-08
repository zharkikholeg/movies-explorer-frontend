import React from "react";
import '../Register/Register.css';
import './Login.css'
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import api from '../../utils/MainApi';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import validate from '../../utils/formValidation';

function Login(props) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitPossible, setSubmitPossible] = useState(false);
  const [showApiError, setShowApiError] = useState(false);

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && Object.keys(values).length > 1) {
      setSubmitPossible(true);
    } else {
      setSubmitPossible(false);
    }
  }, [values, errors])

  function handleChange(e) {
    console.log(errors);
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: values[name] && error }),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(submitPossible);
    if (submitPossible) {
      api.authorize(values.email, values.password)
        .then((data) => {
          if (!data) {
            console.log("неверные имя пользователя или пароль");
            setShowApiError(true);
          } else {
            console.log(data)
            if (data.token) {
              setValues({});
              props.handleLogin(values.email);
              props.history.push('/movies');
            }
          }

        })
        .catch(err => console.log(err));
    }
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <img src={logo} className="register__logo" onClick={() => props.history.push('/')} alt="логотип" />
      <h1 className="register__heading">Рады видеть!</h1>
      <p className="register__label">Email</p>
      <input className="register__input" type="email" id="email" name="email" value={values.email || ''} onChange={handleChange} />
      <p className="register__error">{errors.email}</p>
      <p className="register__label">Пароль</p>
      <input className="register__input" type="password" id="password" name="password" value={values.password || ''} onChange={handleChange} />
      <p className="register__error">{errors.password}</p>
      {showApiError && <p className="register__error">Неверные имя пользователя или пароль</p>}
      <input className={`register__submit ${submitPossible ? "" : "register__submit_inactive"}`} type="submit" value="Войти" />
      <div className="register__footer-wrapper">
        <p className="register__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="register__link">Регистрация</Link>
      </div>

    </form>
  )
}

export default withRouter(Login);