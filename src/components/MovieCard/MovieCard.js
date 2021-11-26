import React from "react";
import './MovieCard.css';
import cross from '../../images/cross.svg';
import likeActive from '../../images/like_active.svg';
import likeInactive from '../../images/like_inactive.svg';
import { useLocation } from "react-router-dom";


function MovieCard(props) {

  let likedIcon = null;
  if (useLocation().pathname === "/saved-movies") {
    likedIcon = cross;
  } else {
    likedIcon = likeActive;
  }

  return (
    <div className="card">
      <div className="card__text">
        <h5 className="card__name">{props.name}</h5>
        <p className="card__time">{props.time}</p>
        <img src={props.liked ? likedIcon : likeInactive} alt="кнопка лайка" className="card__like" />
      </div>
      <img src={props.img} alt={`скриншот фильма ${props.name}`} className="card__img" />
    </div>
  )
}

export default MovieCard;