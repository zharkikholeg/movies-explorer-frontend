import './App.css';
import React from "react";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { BrowserRouter as Router, Route, Routes, withRouter } from 'react-router-dom';


function App(props) {
  return (
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" exact>
            <Route exact path='/' element={<Main />} />
          </Route>
          <Route path="/movies">
            <Route path='/movies' element={<Movies />} />
          </Route>
          <Route path="/saved-movies">
            <Route path='/saved-movies' element={<SavedMovies />} />
          </Route>
          <Route path="/signup">
            <Route path='/signup' element={<Register />} />
          </Route>
          <Route path="/signin">
            <Route path='/signin' element={<Login />} />
          </Route>
          <Route path="/profile">
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path="*">
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
