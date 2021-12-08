import React from "react";
import { Redirect } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound(props) {

  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <p className="notfound__text">Страница не найдена</p>
      <p className="notfound__link" onClick={() => props.history.goBack()} >Назад</p>
    </div>
  )
}

export default PageNotFound;