import React from "react";
import './SearchForm.css';
import search from '../../images/search.svg';
import tumb from '../../images/tumb.svg';

function SearchForm(props) {



  return (
    <>
      <form className="search" onSubmit={props.handleSearchSubmit}>
        <div className="search__left">
          <img src={search} className="search__icon" alt="иконка поиска"></img>
          <input className="search__input" placeholder="Фильм" type="text" id="film" name="film" onChange={props.handleSearchChange} />
          <input className="search__submit hover" type="submit" value="Найти" />
        </div>
        <div className="search__right">
          <div className="search__devider"></div>
          <div className={`search__slider ${props.shortActive ? "search__slider_active" : ""}`} onClick={props.handleShortClick}>
            <img src={tumb} className={`search__tumb ${props.shortActive ? "search__tumb_active" : ""}`} alt="тумблер переключателя"></img>
          </div>
          <div className="search__short">Короткометражки</div>
        </div>

      </form>
      <div className="search__delimiter"></div>
    </>
  )
}

export default SearchForm;