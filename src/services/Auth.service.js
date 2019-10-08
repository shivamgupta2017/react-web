export class AuthService {

  constructor() { }

  async doSignUPNow(registrationData) {
    const url = process.env.REACT_APP_URL + 'entrance/signup';
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(registrationData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async doLogin(credential) {
    const url = process.env.REACT_APP_URL + 'entrance/login';
    return await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(credential)
    });
  }
}
