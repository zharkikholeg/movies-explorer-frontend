import React from "react";
import './Tech.css';

function Tech(props) {

  return (
    <div className="tech">
      <h3 className="tech__heading">Технологии</h3>
      <div className="project__delimiter"></div>
      <div className="tech__mid-wrapper">
        <h2 className="tech__big-text">7 технологий</h2>
        <p className="tech__small-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="tech__tags-wrapper">
          <div className="tech__tag">
            <p className="tech__tag__text">HTML</p>
          </div>
          <div className="tech__tag">
            <p className="tech__tag__text">CSS</p>
          </div>
          <div className="tech__tag">
            <p className="tech__tag__text">JS</p>
          </div>
          <div className="tech__tag">
            <p className="tech__tag__text">React</p>
          </div>
          <div className="tech__tag">
            <p className="tech__tag__text">Git</p>
          </div>
          <div className="tech__tag">
            <p className="tech__tag__text">Express.js</p>
          </div>
          <div className="tech__tag">
            <p className="tech__tag__text">mongoDB</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tech;