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
import api from '../../utils/MainApi';
import { useState, useCallback, useEffect } from 'react';


function App(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [likedMovies, setLikedMovies] = useState([]) // Все сохраненные фильмы данного пользователя
  const [filteredLikedMovies, setFilteredLikedMovies] = useState([]) // Сохрененные фильмы, который удовлетворяют условию поиска
  const [finalSaved, setFinalSaved] = useState([]) // Сохраненные фильмы, которые будут рендериться
  const [savedSearchValue, setSavedSearchalue] = useState("");
  const [shortActive, setShortActive] = useState(false);

  // Проверяем, авторизован ли пользователь, и получаем с сервера список фильмов с лайком
  useEffect(() => {
    tokenCheck();
  }, [])

  function updateContext(user) {
    setCurrentUser(user);
  }


  function handleLogin() {
    setLoggedIn(true);
    //tokenCheck();
  }

  function handleLogout() {
    setLoggedIn(false);
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
              history.push(location);
            }
          })
      }
    }
  }

  // конструкция i.movieId === movie.id || i.movieId === movie.movieId используется потому, что api проекта и api BeatFilm используют movieId и id соответственно
  function handleLike(movie) {
    const jwt = localStorage.getItem('jwt');
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
          getMovies(jwt);
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
              getMovies(jwt);
              setFilteredLikedMovies([]);
            })
            .catch((err) => {
              console.log(err);
            })
          : ''
      );
    }
  }

  const getMovies = (token) => {
    api
      .getMovies(token)
      .then((res) => {
        localStorage.setItem('saved', JSON.stringify(res));
        const savedMovies = res;
        const jwt = localStorage.getItem('jwt');
        api.getMe(jwt)
          .then((res) => {
            //console.log(res[0]._id)
            const myLikes = savedMovies.filter((item) => {
              return item.owner == res[0]._id;
            })
            console.log("getMovies called")
            setLikedMovies(myLikes);
            setFilteredLikedMovies(myLikes);
            setFinalSaved(myLikes);
            localStorage.setItem('saved', JSON.stringify(myLikes));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  //  логика для сохраненных фильмов
  function handleSavedSearchSubmit(e) {
    e.preventDefault();
    setShortActive(false);
    console.log("search")
    const toShow = likedMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(savedSearchValue.toLowerCase());
    })
    setFilteredLikedMovies(toShow);
    setFinalSaved(toShow);
  }

  function handleSavedSearchChange(e) {
    setSavedSearchalue(e.target.value);
  }

  function handleShortClick() {
    if (!shortActive) {
      const toShow = filteredLikedMovies.filter((item) => {
        return item.duration < 41;
      });
      setFinalSaved(toShow);
    } else {
      setFinalSaved(filteredLikedMovies);
    }
    setShortActive(!shortActive);
  }




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
            likedMovies={likedMovies} // здесь - карточки с лайком
            tokenCheck={tokenCheck}
            updateContext={updateContext}
            getMovies={getMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            handleLike={handleLike}
            likedMovies={finalSaved} // тут - именно те, которые нужно отрендерить
            handleSavedSearchSubmit={handleSavedSearchSubmit}
            handleSavedSearchChange={handleSavedSearchChange}
            savedSearchValue={savedSearchValue}
            handleShortClick={handleShortClick}
            shortActive={shortActive}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
          />
          <Route path='/signup'>
            <Register handleLogin={handleLogin} loggedIn={loggedIn} />
          </Route>
          <Route path='/signin'>
            <Login handleLogin={handleLogin} loggedIn={loggedIn} tokenCheck={tokenCheck} />
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
