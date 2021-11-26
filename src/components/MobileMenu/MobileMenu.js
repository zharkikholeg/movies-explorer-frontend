import React from "react";
import './MobileMenu.css';
import cross from "../../images/cross.svg";
import person from '../../images/person.svg';
import { Link, useLocation } from "react-router-dom";

function MobileMenu(props) {
  const path = useLocation().pathname;

  return (
    <div className={`mobmenu ${props.opened ? "mobmenu_active" : " "}`}>
      <div className="mobmenu__container">
        <img src={cross} alt="кнопка закрытия меню" className="mobmenu__close" onClick={props.handleMenuClose} />
        <Link className="mobmenu__link" to="/">Главная</Link>
        <Link className={`mobmenu__link ${path === "/movies" ? "mobmenu__link_active" : " "}`} to="/movies">Фильмы</Link>
        <Link className={`mobmenu__link ${path === "/saved-movies" ? "mobmenu__link_active" : " "}`} to="/saved-movies">Сохранённые фильмы</Link>
        <div className="mobmenu__bottom-wrapper">
          <Link className="mobmenu__account" to="/profile">Аккаунт</Link>
          <div className="mobmenu__image-wrapper">
            <img src={person} alt="войти" className="mobmenu__person" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;