import React from "react";
import './SearchForm.css';
import search from '../../images/search.svg';
import tumb from '../../images/tumb.svg';

function SearchForm(props) {

  return (
    <>
      <form className="search">
        <div className="search__left">
          <img src={search} className="search__icon" alt="иконка поиска"></img>
          <input className="search__input" placeholder="Фильм" type="text" id="film" name="film" />
          <input className="search__submit" type="submit" value="Найти" />
        </div>
        <div className="search__right">
          <div className="search__devider"></div>
          <div className="search__slider">
            <img src={tumb} className="search__tumb" alt="тумблер переключателя"></img>
          </div>
          <div className="search__short">Короткометражки</div>
        </div>

      </form>
      <div className="search__delimiter"></div>
    </>
  )
}

export default SearchForm;