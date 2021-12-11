class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
  }

  register(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, email, password })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response;
        }
      })
      .catch((err) => { console.log(err) });
  }

  authorize(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password })
    })
      .then((response => response.json()))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .catch(err => console.log(err))
  }

  getMe(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }

  updateMe(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, email })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response;
        }
      })
      .catch((err) => { console.log(err) });
  }

  addMovie({ country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId }) {
    console.log(country)
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId })
    })
      .then((res) => this._getResponseData(res));
  }

  getMovies(token) {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }

  deleteMovie(id) {
    return fetch(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  url: 'https://api.olegzdiplom.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  },
});
export default api;