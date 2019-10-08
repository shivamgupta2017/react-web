export default class CommonService {
  constructor() { }
  doRequest() {

  }
  filterResponseByCode(statusCode) {
    if(statusCode===401) {
      return false;
    }
    return true;

  }
}