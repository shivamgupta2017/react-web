export class ContributionService {

  constructor() { }

  async postContribution(data) {
    const url = process.env.REACT_APP_URL + 'account/contribution';
    return await fetch(url, {
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
