import React from "react";
import './Promo.css'
import NavTab from '../NavTab/NavTab';
import logo from '../../images/logo.svg';
import web from '../../images/web.svg';

function Promo(props) {

  return (
    <div className="promo">
      <div className="promo__top-container">
        <img src={logo} alt="логотип" className="promo__logo" />
        <NavTab loggedIn={props.loggedIn} />
      </div>
      <div className="promo__wrapper">
        <div className="promo__wrapper-text">
          <h2 className="promo__heading">Учебный проект студента факультета Веб-разработки</h2>
          <h4 className="promo__subheading">Листайте ниже, чтобы узнать больше про этот проект и его создателя</h4>
          <a href="#more" className="promo__button hover">Узнать больше</a>
        </div>
        <img src={web} alt="глобус из слов web" className="promo__img"></img>
      </div>
    </div>
  )
}

export default Promo;