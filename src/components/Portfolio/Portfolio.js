import React from "react";
import './Portfolio.css';
import arrow from '../../images/arrow.svg'

function Portfolio(props) {

  return (
    <div className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <div className="portfolio__unit hover" onClick={() => window.open("https://github.com/zharkikholeg/how-to-learn", "_blank")}>
        <a className="portfolio__unit__name">Статичный сайт</a>
        <img className="portfolio__unit__arrow" src={arrow} alt="стрелочка"></img>
        <div className="portfolio__unit__devider"></div>
      </div>
      <div className="portfolio__unit hover" onClick={() => window.open("https://github.com/zharkikholeg/russian-travel", "_blank")}>
        <a className="portfolio__unit__name">Адаптивный сайт</a>
        <img className="portfolio__unit__arrow" src={arrow} alt="стрелочка"></img>
        <div className="portfolio__unit__devider"></div>
      </div>
      <div className="portfolio__unit hover" onClick={() => window.open("https://github.com/zharkikholeg/react-mesto-api-full ", "_blank")}>
        <a className="portfolio__unit__name">Одностраничное приложение</a>
        <img className="portfolio__unit__arrow" src={arrow} alt="стрелочка"></img>
        <div className="portfolio__unit__devider"></div>
      </div>
    </div>
  )
}

export default Portfolio;
