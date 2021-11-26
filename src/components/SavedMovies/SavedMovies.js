import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <div className="saved-movies">
      <Header />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />


      <Footer />
    </div>
  )
}

export default SavedMovies;