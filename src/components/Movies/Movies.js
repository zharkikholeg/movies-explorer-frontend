import React from "react";
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';





function Movies(props) {

  return (
    <>
      <Header />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />


      <Footer />
    </>
  )
}

export default Movies;