import React from "react";
import { useNavigate } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound(props) {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <p className="notfound__text">Страница не найдена</p>
      <p className="notfound__link" onClick={() => navigate(-1)} >Назад</p>
    </div>
  )
}

export default PageNotFound;