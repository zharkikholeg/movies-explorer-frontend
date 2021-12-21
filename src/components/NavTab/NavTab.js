import React from "react";
import './NavTab.css';
import { useLocation, Link } from "react-router-dom";

function NavTab(props) {
  console.log(props.loggedIn)

  if (!props.loggedIn) {
    return (
      <div className="navtab">
        <Link className="navtab__link" to="/signup">Регистрация</Link>
        <Link className="navtab__link navtab__link_active" to="/signin">Войти</Link>
      </div>
    )
  } else {
    return (
      <div className="navtab">
        <Link className="navtab__link" to="/movies">Фильмы</Link>
        <Link className="navtab__link" to="/saved-movies">Сохраненные фильмы</Link>
        <Link className="navtab__link" to="/profile">Аккаунт</Link>
      </div>
    )
  }

}

export default NavTab;
