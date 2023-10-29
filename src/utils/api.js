class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
    this._auth = data.headers.authorization;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);;
  }

  getInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._auth
      }
    })
    .then(this._getResponse)
    .catch(err => console.error(err))
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: this._auth
      }
    })
    .then(this._getResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.description
      })
    })
    .then(this._getResponse)
  }

  setAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._getResponse)
  }

  addCard(cardData) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._getResponse)
  }

  addLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._auth
      }
    })
    .then(this._getResponse)
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth
      }
    })
    .then(this._getResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth
      }
    })
    .then(this._getResponse)
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74/',
  headers: {
    authorization: '2df54e82-a7fc-4317-91ae-bd7672a9b070',
    'Content-Type': 'application/json'
  }
});

export default api;