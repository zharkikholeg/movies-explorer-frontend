import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import api from '../../utils/MainApi';


function SavedMovies(props) {
  const [notFound, setNotFound] = React.useState(false);
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [shortActive, setShortActive] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  //console.log(user[0]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    api.getMe(jwt)
      .then((res) => {
        const userId = res[0]._id;
        const savedMovies = JSON.parse(localStorage.getItem('saved'));
        const movies = savedMovies.filter((item) => {
          console.log(item.owner === userId)
          return item.owner === userId;
        })
        setMoviesToShow(movies);
        setFilteredMovies(movies);
      })
      .catch((e) => {
        handleError();
      })
  }, [])

  function handleError() {
    setShowError(true);
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleShortClick() {
    setShortActive(!shortActive);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    // Проверяем на соответствие поисковому запросу
    let movies = moviesToShow.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchValue.toLowerCase());
    })
    // Проверяем на фильтранию по короткометражкам
    let checkedMovies = null;
    if (shortActive) {
      checkedMovies = movies.filter((item) => {
        return item.duration < 41;
      })
    } else {
      checkedMovies = movies;
    }
    // Проверяем, нашлось ли что-то, что соответствует и запросу, и фильтру по короткометражкам
    if (checkedMovies.length === 0) {
      setNotFound(true);
      //console.log('notFound changed')
    } else {
      setNotFound(false);
    }
    setFilteredMovies(checkedMovies);
  }

  return (
    <div className="saved-movies">
      <Header />
      <SearchForm
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        shortActive={shortActive}
        handleShortClick={handleShortClick}
        showError={showError} />
      <Preloader preloader={loader} />
      <MoviesCardList movies={filteredMovies} notFound={notFound} handleLike={props.handleLike} likedMovies={props.likedMovies} />


      <Footer />
    </div>
  )
}

export default SavedMovies;