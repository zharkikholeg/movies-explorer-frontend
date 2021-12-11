import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound(props) {
  const history = useHistory();
  console.log(history)
  console.log("page rendered")

  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <p className="notfound__text">Страница не найдена</p>
      <p className="notfound__link" onClick={() => { history.go(-2) }} >Назад</p>
    </div>
  )
}

export default PageNotFound;