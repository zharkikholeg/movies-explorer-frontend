import React from "react";
import './AboutMe.css';
import ava from '../../images/ava.jpg'

function AboutMe(props) {

  return (
    <div className="me">
      <h3 className="tech__heading">Студент</h3>
      <div className="project__delimiter"></div>
      <div className="me__wrapper">
        <div className="me__text-wrapper">
          <h2 className="me__name">Олег</h2>
          <p className="me__bio">Фронтенд-разработчик, 26 лет</p>
          <p className="me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <div className="me__links">
            <a className="me__link hover" href="https://www.facebook.com/yandex.practicum/">Facebook</a>
            <a className="me__link hover" href="https://github.com/zharkikholeg">Github</a>
          </div>
        </div>
        <img className="me__ava" src={ava} alt="аватар"></img>
      </div>
    </div>
  )
}

export default AboutMe;