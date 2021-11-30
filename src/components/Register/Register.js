import React from "react";
import './Register.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();

  return (
    <form className="register">
      <img src={logo} className="register__logo" alt="логотип" onClick={() => navigate('/')} />
      <h1 className="register__heading">Добро пожаловать!</h1>
      <p className="register__label">Имя</p>
      <input className="register__input" type="text" id="name" name="name" />
      <p className="register__label">Email</p>
      <input className="register__input" type="email" id="email" name="email" />
      <p className="register__label">Пароль</p>
      <input className="register__input" type="password" id="password" name="password" />
      <input className="register__submit" type="submit" value="Зарегистрироваться" />
      <div className="register__footer-wrapper">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__link">Войти</Link>
      </div>

    </form>
  )
}

export default Register;
