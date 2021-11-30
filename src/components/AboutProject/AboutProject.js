import React from "react";
import './AboutProject.css';

function AboutProject(props) {

  return (
    <div className="project" id="more">
      <h3 className="project__heading">О Проекте</h3>
      <div className="project__delimiter"></div>
      <div className="project__mid-wrapper">
        <div className="project__feature">
          <h4 className="project__feature__heading">Дипломный проект включал 5 этапов</h4>
          <p className="project__feature__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__feature">
          <h4 className="project__feature__heading">На выполнение диплома ушло 5 недель</h4>
          <p className="project__feature__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__bar-wrapper">
        <div className="project__bar-green">
          <p className="project__bar-green__text"> 1 неделя</p>
        </div>
        <div className="project__bar-grey">
          <p className="project__bar-grey__text"> 4 недели</p>
        </div>
      </div>
      <div className="project__subtitles-wrapper">
        <div className="project__subtitles-small">
          <p className="project__subtitles-text">Back-end</p>
        </div>
        <div className="project__subtitles-big">
          <p className="project__subtitles-text">Front-end</p>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;