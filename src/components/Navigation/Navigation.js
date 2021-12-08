import React from "react";
import './Navigation.css';
import logo from '../../images/logo.svg';
import person from '../../images/person.svg';
import { Link } from "react-router-dom";
import { useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu'
import { useHistory } from 'react-router-dom';

function Navigation(props) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const history = useHistory();

  function handleMenuOpen() {
    setIsMenuOpened(true);
  }

  function handleMenuClose() {
    setIsMenuOpened(false);
  }

  return (
    <nav className="nav">
      <img src={logo} alt="логотип" className="nav__logo" onClick={() => history.push('/')} />
      <div className="nav__middle">
        <Link className="nav__link" to="/movies">Фильмы</Link>
        <Link className="nav__link" to="/saved-movies">Сохраненные фильмы</Link>
      </div>
      <div className="nav__right">
        <Link className="nav__account" to="/profile">Аккаунт</Link>
        <div className="nav__image-wrapper">
          <img src={person} alt="войти" className="nav__person" />
        </div>
        <div className="nav__burger" onClick={handleMenuOpen}>
          <div className="nav__burger__line"></div>
          <div className="nav__burger__line"></div>
          <div className="nav__burger__line"></div>
        </div>
      </div>
      <MobileMenu opened={isMenuOpened} handleMenuClose={handleMenuClose} />
    </nav>
  )
}

export default Navigation;
