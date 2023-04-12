export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  updateDetails(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.work}`
      })
    })
      .then(res => this._checkResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.caption,
        link: data.link
      })
    })
      .then(res => this._checkResponse(res));
  }

  deleteUserCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeUserAvatar(avatar) {
    return fetch(this._url + "/users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      }),
    })
      .then(res => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
      authorization: '794ac1be-5763-4261-9759-e13254ae56ae',
      'Content-Type': 'application/json',
  },
});