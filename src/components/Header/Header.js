import React from "react";
import './Header.css';
import Navigation from '../Navigation/Navigation';


function Header(props) {

  return (
    <header className="header">
      <Navigation />
    </header>
  )
}

export default Header;