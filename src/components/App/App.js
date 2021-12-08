import './App.css';
import React from "react";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch, withRouter, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import movieApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';
import { useState, useCallback, useEffect } from 'react';


function App(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [likedMovies, setLikedMovies] = useState([])

  // Проверяем, авторизован ли пользователь, и получаем с сервера список фильмов с лайком
  useEffect(() => {
    tokenCheck();
    getMovies();
  }, [])


  function handleLogin() {
    setLoggedIn(true);
  }

  function tokenCheck() {
    if (loggedIn) {
      history.push(location);
    } else {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        api.getMe(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
              console.log('loggedIn set true');
              history.push(location);
            }
          })
      }
    }
  }

  // конструкция i.movieId === movie.id || i.movieId === movie.movieId используется потому, что api проекта и api BeatFilm используют movieId и id соответственно
  function handleLike(movie) {
    console.log('like clicked');
    const liked = likedMovies.some((i) =>
      i.movieId === movie.id || i.movieId === movie.movieId ? true : false
    );
    console.log(liked)
    if (!liked) {
      api.addMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
      })
        .then(() => {
          getMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likedMovies.some((i) =>
        i.movieId === movie.id || i.movieId === movie.movieId
          ? api
            .deleteMovie(i._id)
            .then(() => {
              getMovies();
            })
            .catch((err) => {
              console.log(err);
            })
          : ''
      );
    }
  }

  const getMovies = () => {
    api
      .getMovies()
      .then((res) => {
        localStorage.setItem('saved', JSON.stringify(res));
        const savedMovies = JSON.parse(localStorage.getItem('saved'));
        setLikedMovies(savedMovies);
      })

      .catch((err) => console.log(err));
  };






  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            handleLike={handleLike}
            likedMovies={likedMovies}
            tokenCheck={tokenCheck}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            handleLike={handleLike}
            likedMovies={likedMovies}
            tokenCheck={tokenCheck}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
          />
          <Route path='/signup'>
            <Register handleLogin={handleLogin} />
          </Route>
          <Route path='/signin'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div >
  );
}

export default withRouter(App);
