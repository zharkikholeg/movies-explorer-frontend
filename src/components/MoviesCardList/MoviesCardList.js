import React from "react";
import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import sample1 from '../../images/sample-1.jpg';
import sample2 from '../../images/sample-2.jpg';

function MoviesCardList(props) {

  return (
    <div className="cards">
      <MovieCard img={sample1} name={"33 слова о дизайне"} time={"1ч 42м"} liked={true} />
      <MovieCard img={sample1} name={"33 слова о дизайне"} time={"1ч 42м"} liked={true} />
      <MovieCard img={sample1} name={"33 слова о дизайне"} time={"1ч 42м"} liked={true} />
      <MovieCard img={sample1} name={"33 слова о дизайне"} time={"1ч 42м"} liked={true} />
      <MovieCard img={sample2} name={"В погоне за Бенкси"} time={"1ч 42м"} liked={false} />
      <div className="cards__more">
        <p className="cards__more__text">Ещё</p>
      </div>
    </div>
  )
}

export default MoviesCardList;
