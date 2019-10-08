export default class ContributorService {
  serverUrl = process.env.REACT_APP_URL + 'account/contributor/';

 async addNewContributors(data) {
    return await fetch(this.serverUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });


  }



}