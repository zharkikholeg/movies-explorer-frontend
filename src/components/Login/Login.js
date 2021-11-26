import React from "react";
import '../Register/Register.css';
import './Login.css'
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  return (
    <form className="register">
      <img src={logo} className="register__logo" onClick={() => navigate('/')} alt="логотип" />
      <h1 className="register__heading">Рады видеть!</h1>
      <p className="register__label">Email</p>
      <input className="register__input" type="email" id="email" name="email" />
      <p className="register__label">Пароль</p>
      <input className="register__input" type="password" id="password" name="password" />
      <input className="register__submit" type="submit" value="Войти" />
      <div className="register__footer-wrapper">
        <p className="register__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="register__link">Регистрация</Link>
      </div>

    </form>
  )
}

export default Login;