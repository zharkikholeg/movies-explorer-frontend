import React from "react";
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieApi from '../../utils/MoviesApi';






function Movies(props) {
  const [allMovies, setAllMovies] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [shortActive, setShortActive] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    //getMovies();
    props.tokenCheck();
  }, [])

  function handleError() {
    setShowError(true);
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setLoader(true);
    console.log(searchValue);
    movieApi.getAllMovies().then((res) => {

      // Сохраняем результат запроса со всеми фильмами
      setAllMovies(res);
      localStorage.setItem('allMovies', JSON.stringify(res));

      // Проверяем на соответствие поисковому запросу
      let movies = res.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchValue.toLowerCase());
      })
      //console.log(movies);

      // Проверяем на фильтранию по короткометражкам
      let checkedMovies = null;
      if (shortActive) {
        checkedMovies = movies.filter((item) => {
          return item.duration < 41;
        })
      } else {
        checkedMovies = movies;
      }

      //console.log(checkedMovies)
      // Проверяем, нашлось ли что-то, что соответствует и запросу, и фильтру по короткометражкам
      if (checkedMovies.length === 0) {
        setNotFound(true);
        //console.log('notFound changed')
      } else {
        setNotFound(false);
      }
      setMoviesToShow(checkedMovies);
      setLoader(false);
    })
      .catch((e) => {
        handleError();
      })

  }

  function handleShortClick() {
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
        showError={showError} />
      <Preloader preloader={loader} />
      <MoviesCardList movies={moviesToShow} notFound={notFound} handleLike={props.handleLike} likedMovies={props.likedMovies} />


      <Footer />
    </div>
  )
}

export default Movies;