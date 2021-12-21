class MovieApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getAllMovies() {
    return fetch(this.url, {
      method: 'GET',
      headers: this.headers
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
  }
}

const movieApi = new MovieApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default movieApi;
