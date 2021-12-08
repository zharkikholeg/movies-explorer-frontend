import React from "react";
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
  const [listLength, setListLength] = React.useState(7); // Изначальное число фильмов для рендера
  const [lengthIncrease, setLengthIncrease] = React.useState(7); // Число фильмов, появляющися при нажатии на кнопку "Ещё"
  const savedMovies = props.likedMovies;
  //console.log(savedMovies);



  // Определяем кол-во показываемых фильмов в зависимости от ширины экрана
  const defineListLength = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      setListLength(5);
      setLengthIncrease(5);
    } else {
      setListLength(7);
      setLengthIncrease(7);
    }
  };

  // Вешаем слушатели изменения ширины экрана
  React.useEffect(() => {
    defineListLength();
    window.addEventListener('resize', defineListLength);
    return () => {
      window.removeEventListener('resize', defineListLength);
    };
  }, []);

  //Обработка клика на кнопку "Ещё"
  function handleMoreClick() {
    setListLength(listLength + lengthIncrease);
  }

  const pathName = useLocation().pathname;




  return (
    <div className="cards">
      {props.showError ?
        <p className="cards__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        : <></>}
      {props.notFound ? <p className="cards__notfound">Ничего не найдено</p> : <></>}

      {props.movies
        .map((item) => (
          <MovieCard
            key={pathName === "/movies" ? item.id : item.movieId}
            card={item}
            liked={savedMovies.some((i) =>
              i.movieId === item.id || i.movieId === item.movieId ? true : false
            )}
            handleLike={props.handleLike}
          />
        ))
        .slice(0, listLength)}

      {props.movies.length > listLength ?
        <div className="cards__more" onClick={handleMoreClick}>
          <p className="cards__more__text">Ещё</p>
        </div> : <></>
      }
    </div>
  )
}

export default MoviesCardList;
