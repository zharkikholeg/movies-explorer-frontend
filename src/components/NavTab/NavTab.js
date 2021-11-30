import React from "react";
import './NavTab.css';
import { useLocation, Link } from "react-router-dom";

function NavTab(props) {

  return (
    <div className="navtab">
      <Link className="navtab__link" to="/signup">Регистрация</Link>
      <Link className="navtab__link navtab__link_active" to="/signin">Войти</Link>
    </div>
  )
}

export default NavTab;
