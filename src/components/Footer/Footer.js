import React from "react";
import './Footer.css';

function Footer(props) {

  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__devider"></div>
      <div className="footer__wrapper">
        <p className="footer__year">&copy; 2021</p>
        <div className="footer__links">
          <a className="footer__link hover" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
          <a className="footer__link hover" href="https://github.com/zharkikholeg" target="_blank">Github</a>
          <a className="footer__link hover" href="https://www.facebook.com/yandex.practicum/" target="_blank">Facebook</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
