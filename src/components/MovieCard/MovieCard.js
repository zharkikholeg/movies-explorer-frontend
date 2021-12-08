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

  console.log("card is liked: " + props.liked)


  function handleLikeClick() {
    props.handleLike(props.card);
  }

  let imgSrc = null;
  if (useLocation().pathname === "/saved-movies") {
    console.log(props.card);
    imgSrc = props.card.image;
  } else {
    imgSrc = `https://api.nomoreparties.co${props.card.image.url}`;
  }

  const duration = `${Math.floor(props.card.duration / 60)}ч ${props.card.duration % 60}м`;

  return (
    <div className="card">
      <div className="card__text">
        <h5 className="card__name" onClick={() => window.open(props.card.trailerLink, "_blank")}>{props.card.nameRU}</h5>
        <p className="card__time">{duration}</p>
        <img src={props.liked ? likedIcon : likeInactive} alt="кнопка лайка" className="card__like" onClick={handleLikeClick} />
      </div>
      <img src={imgSrc} alt={`скриншот фильма ${props.name}`} className="card__img" onClick={() => window.open(props.card.trailerLink, "_blank")} />
    </div>
  )
}

export default MovieCard;