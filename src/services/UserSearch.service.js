export default class UserSearch {

  constructor() { }

  async doSearchUsers(searchContext) {
    const url = process.env.REACT_APP_URL + 'account/contributors/search/' + searchContext;

    return await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });
  }

}