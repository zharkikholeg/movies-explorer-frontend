import React, { useState } from "react";
import './Register.css';
import logo from '../../images/logo.svg';
import { Link, Redirect, useHistory } from "react-router-dom";
import validate from '../../utils/formValidation';
import api from '../../utils/MainApi';


function Register(props) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitPossible, setSubmitPossible] = useState(false);
  const [showApiError, setShowApiError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && Object.keys(values).length > 2) {
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
    if (submitPossible) {
      api.register(values.name, values.email, values.password)
        .then((res) => {
          console.log(res);
          if (res.status === 400) {
            setShowApiError(true);
          } else if (res.status === 409) {
            setShowEmailError(true);
          } else {
            api.authorize(values.email, values.password)
              .then((data) => {
                console.log(data)
                if (data.token) {
                  setValues({});
                  props.handleLogin(values.email);
                  history.push('/movies');
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  return (
    <form className="register" onSubmit={handleSubmit}>
      {props.loggedIn && <Redirect to="/movies" />}
      <img src={logo} className="register__logo" alt="??????????????" onClick={() => props.history.push('/')} />
      <h1 className="register__heading">?????????? ????????????????????!</h1>
      <p className="register__label">??????</p>
      <input className="register__input" type="text" id="name" name="name" onChange={handleChange} />
      <p className="register__error">{errors.name}</p>
      <p className="register__label">Email</p>
      <input className="register__input" type="email" id="email" name="email" onChange={handleChange} />
      <p className="register__error">{errors.email}</p>
      <p className="register__label">????????????</p>
      <input className="register__input" type="password" id="password" name="password" onChange={handleChange} />
      <p className="register__error">{errors.password}</p>
      {showApiError && <p className="register__error">??????-???? ?????????? ???? ??????</p>}
      {showEmailError && <p className="register__error">???????????????????????? ?? ?????????? email ?????? ????????????????????</p>}

      <input className={`register__submit ${submitPossible ? "" : "register__submit_inactive"}`} type="submit" value="????????????????????????????????????" />
      <div className="register__footer-wrapper">
        <p className="register__question">?????? ?????????????????????????????????</p>
        <Link to="/signin" className="register__link">??????????</Link>
      </div>

    </form>
  )
}

export default Register;
