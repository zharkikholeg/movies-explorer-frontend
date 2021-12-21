import React from "react";
import './Main.css';
import Promo from '../Promo/Promo';

import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main(props) {

  return (
    <>
      <Promo loggedIn={props.loggedIn} />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  )
}

export default Main;
