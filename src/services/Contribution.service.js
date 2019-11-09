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

  async getUserContribution() {
    const url = process.env.REACT_APP_URL + 'account/';
    return await fetch(url, {
      method: 'GET',
      // body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }
    });
  }

  async getContributionDetails(contributionId) {
    const url = process.env.REACT_APP_URL + 'account/' + contributionId;
    return await fetch(url, {
      method: 'GET',
      // body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }

    });

  }

  // getAccountDetail
  async getAccountDetail(userId) {
    const url = process.env.REACT_APP_URL + 'account/fnfDetails/' + userId;
    return await fetch(url, {
      method: 'GET',
      // body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }

    });

  }
  async putContribution(cotributionData) {
    const url = process.env.REACT_APP_URL + 'account/contribution/';

    return await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(cotributionData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }

    });

  }

  async deleteContributionRow(contributionId) {

    const url = process.env.REACT_APP_URL + 'account/contribution/' + contributionId;

    return await fetch(url, {
      method: 'DELETE',
      // body: JSON.stringify(cotributionData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }

    });


  }

  async doMakeSettlementWithContributor(contributorId) {

    const url = process.env.REACT_APP_URL + 'account/settlement/' + contributorId;

    return await fetch(url, {
      method: 'POST',
      // body: JSON.stringify(cotributionData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('Authorization')
      }

    });


  }

}
