

export default class Api {
  constructor(parameters) {
    this.parameters = parameters;
  }

  getCards() {
    return fetch(`${this.parameters.url}/cards`, {
      headers: this.parameters.headers
    })
    .then((result) => this.checkingResponse(result));
     
  }

  checkAnswer() {

  }

  getUserInfo() {
    return fetch(`${this.parameters.url}/users/me`, {
      headers: this.parameters.headers
    })
      .then((result) => this.checkingResponse(result));
    
  }

  checkingResponse(result) {
    return (result.ok) ? result.json() :
     Promise.reject(`Error: ${result.status}`);
  }

  setUserInfo(data) {
    this.data = data;
    this.name = this.data.name;
    this.about = this.data.about;
    return fetch(`${this.parameters.url}/users/me`, {
      method: 'PATCH',
      headers: this.parameters.headers,
      body: JSON.stringify({
        name: `${this.name}`,
        about: `${this.about}`,
      })
    })
    .then((result) => this.checkingResponse(result));
     
  }
}