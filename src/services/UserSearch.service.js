export default class UserSearch {

  constructor() { }

  async doSearchUsers(searchContext = '', getAll = false) {
    const url = process.env.REACT_APP_URL + 'account/contributors/search/' + (searchContext ? searchContext : false) + (getAll ? '/' + 1 : '/' + 0);

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