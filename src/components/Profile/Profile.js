import React, { useState, useContext, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Profile.css';
import '../Register/Register.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useHistory } from 'react-router-dom';
import validate from '../../utils/formValidation';
import api from '../../utils/MainApi';


function Profile(props) {
  const user = useContext(CurrentUserContext);
  const [showEmailError, setShowEmailError] = useState(false);
  const [submitPossible, setSubmitPossible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user[0].name,
    email: user[0].email,
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: userInfo[name] && error }),
    });
  }

  useEffect(() => {
    if (errors && Object.keys(errors).length === 0 && Object.keys(userInfo).length > 1)
      if (
        userInfo.name !== user[0].name ||
        userInfo.email !== user[0].email
      ) {
        console.log(userInfo.name !== user[0].name);
        console.log(userInfo.email !== user[0].email);

        setSubmitPossible(true);
      } else {
        setSubmitPossible(false);
      }
  }, [
    errors,
    user.email,
    user.name,
    userInfo.email,
    userInfo.name,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    if (submitPossible) {
      api.updateMe(userInfo.name, userInfo.email)
        .then((res) => {
          console.log(res);
          if (res.status == 409) {
            console.log('email error');
            setShowEmailError(true);
          } else {
            window.location.reload();
          }
        })
    }
  }

  return (
    <div className="profile">
      <Header />
      <form className="profile__wrapper" onSubmit={handleSubmit}>
        <h2 className="profile__greeting">Привет, {user[0].name}</h2>
        <div className="profile__input-wrapper">
          <p className="profile__label">Имя</p>
          <input className="profile__input" type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} />
        </div>
        <div className="profile__devider"></div>
        <div className="profile__input-wrapper">
          <p className="profile__label">Email</p>
          <input className="profile__input" type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} />
        </div>
        <input className={`profile__submit ${submitPossible ? "profile__submit_active hover" : ""}`} type="submit" value="Редактировать" />
        {showEmailError && <p className="register__error">Введенный вами email принадлежит другому пользователю</p>}
        <p className="profile__exit hover" onClick={() => { localStorage.clear(); props.handleLogout(); history.push('/'); }}>Выйти из аккаунта</p>
      </form>
      <Footer />
    </div>
  )
}

export default Profile;
