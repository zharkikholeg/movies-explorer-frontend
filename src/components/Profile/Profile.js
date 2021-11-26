import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Profile.css';

function Profile(props) {

  return (
    <div className="profile">
      <Header />
      <form className="profile__wrapper">
        <h2 className="profile__greeting">Привет, Виталий</h2>
        <div className="profile__input-wrapper">
          <p className="profile__label">Имя</p>
          <input className="profile__input" type="text" id="name" name="name" value="Виталий" />
        </div>
        <div className="profile__devider"></div>
        <div className="profile__input-wrapper">
          <p className="profile__label">Email</p>
          <input className="profile__input" type="email" id="email" name="email" value="pochta@yandex.ru" />
        </div>
        <input className="profile__submit" type="submit" value="Редактировать" />
        <p className="profile__exit">Выйти из аккаунта</p>
      </form>
      <Footer />
    </div>
  )
}

export default Profile;
