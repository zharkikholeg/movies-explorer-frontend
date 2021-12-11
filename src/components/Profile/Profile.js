import React, { useState, useContext, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Profile.css';
import '../Register/Register.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';
import validate from '../../utils/formValidation';
import api from '../../utils/MainApi';


function Profile(props) {
  const history = useHistory();

  return (
    <div className="profile">
      <Header />
      <form className="profile__wrapper" onSubmit={props.handleSubmit}>
        <h2 className="profile__greeting">Привет, {props.currentUser.name}</h2>
        <div className="profile__input-wrapper">
          <p className="profile__label">Имя</p>
          <input className="profile__input" type="text" id="name" name="name" value={props.userInfo.name} onChange={props.handleChange} />
        </div>
        <div className="profile__devider"></div>
        <div className="profile__input-wrapper">
          <p className="profile__label">Email</p>
          <input className="profile__input" type="email" id="email" name="email" value={props.userInfo.email} onChange={props.handleChange} />
        </div>
        <input className={`profile__submit ${props.submitPossible ? "profile__submit_active hover" : ""}`} type="submit" value="Редактировать" />
        {props.showEmailError && <p className="register__error">Введенный вами email принадлежит другому пользователю</p>}
        <p className="profile__exit hover" onClick={() => { localStorage.clear(); props.handleLogout(); history.push('/'); }}>Выйти из аккаунта</p>
      </form>
      <Footer />
    </div>
  )
}

export default Profile;
