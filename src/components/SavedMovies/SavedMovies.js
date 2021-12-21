import React from "react";
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function SavedMovies(props) {
  const [loader, setLoader] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  console.log(props.likedMovies);


  return (
    <div className="saved-movies">
      <Header />
      <SearchForm
        handleSearchChange={props.handleSavedSearchChange}
        handleSearchSubmit={props.handleSavedSearchSubmit}
        shortActive={props.shortActive}
        handleShortClick={props.handleShortClick}
        showError={showError}
        searchValue={props.savedSearchValue}
      />
      <Preloader preloader={loader} />
      <MoviesCardList movies={props.likedMovies} notFound={false} handleLike={props.handleLike} likedMovies={props.likedMovies} />


      <Footer />
    </div>
  )
}

export default SavedMovies;