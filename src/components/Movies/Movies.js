import React from "react";
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';


function Movies(props) {
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [shortActive, setShortActive] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    props.tokenCheck();
    const jwt = localStorage.getItem('jwt');
    props.getMovies(jwt);
    getLocalData();
    updateContextFromMovies();
  }, [])


  function handleError() {
    setShowError(true);
  }

  function updateContextFromMovies() {
    const jwt = localStorage.getItem('jwt');
    api.getMe(jwt)
      .then((res) => {
        if (res) {
          props.updateContext(res);
        }
      })
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
    localStorage.setItem('searchValue', e.target.value);
  }

  function setLocalData(searchResult, searchValue, shortActive) {
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
    localStorage.setItem('searchValue', searchValue);
    localStorage.setItem('shortActive', shortActive);
  }

  function getLocalData() {
    const searchResult = JSON.parse(localStorage.getItem('searchResult'));
    const searchValue = localStorage.getItem('searchValue');
    const shortActive = (localStorage.getItem('shortActive') === "true");
    if (searchResult != null) {
      setSearchResult(searchResult);
      setSearchValue(searchValue);
      setShortActive(shortActive);
      if (shortActive) {
        const toShow = searchResult.filter((item) => {
          return item.duration < 41;
        })
        setMoviesToShow(toShow);
      } else {
        setMoviesToShow(searchResult);
      }
    } else {
      setLoader(true);
      movieApi.getAllMovies().then((res) => {
        setMoviesToShow(res);
        setLoader(false);
      })
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setShortActive(false);
    setLoader(true);
    console.log(searchValue);
    if (allMovies.length !== 0) {
      // Проверяем на соответствие поисковому запросу
      let movies = allMovies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchValue.toLowerCase());
      })



      // Проверяем, нашлось ли что-то, что соответствует и запросу
      if (movies.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setSearchResult(movies);
      setMoviesToShow(movies);
      setLoader(false);
      setLocalData(movies, searchValue, shortActive);
    } else {
      movieApi.getAllMovies().then((res) => {
        //console.log(searchValue);

        // Сохраняем результат запроса со всеми фильмами
        setAllMovies(res);
        console.log(allMovies);
        localStorage.setItem('allMovies', JSON.stringify(res));

        // Проверяем на соответствие поисковому запросу
        let movies = res.filter((item) => {
          return item.nameRU.toLowerCase().includes(searchValue.toLowerCase());
        })



        // Проверяем, нашлось ли что-то, что соответствует и запросу
        if (movies.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setSearchResult(movies);
        setMoviesToShow(movies);
        setLoader(false);
        setLocalData(movies, searchValue, shortActive);
      })
        .catch((e) => {
          handleError();
        })
    }
  }

  function handleShortClick() {
    if (!shortActive) {
      console.log("нужно отфильтровать");
      console.log(searchResult);
      const toShow = searchResult.filter((item) => {
        return item.duration < 41;
      });
      setMoviesToShow(toShow);
    } else {
      console.log("нужно убрать фильтр");
      setMoviesToShow(searchResult);
    }
    localStorage.setItem('shortActive', !shortActive);
    setShortActive(!shortActive);
  }


  return (
    <div className="movies">
      <Header />
      <SearchForm
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        shortActive={shortActive}
        handleShortClick={handleShortClick}
        showError={showError}
        searchValue={searchValue}
      />
      <Preloader preloader={loader} />
      <MoviesCardList movies={moviesToShow} notFound={notFound} handleLike={props.handleLike} likedMovies={props.likedMovies} />


      <Footer />
    </div>
  )
}

export default Movies;