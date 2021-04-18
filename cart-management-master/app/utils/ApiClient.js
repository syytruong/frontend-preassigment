/* eslint-disable no-param-reassign */
import axios from 'axios';

class ApiClient {
  constructor() {
    axios.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = axios;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    switch (error.response.status) {
      case 401:
        // this.redirectTo(document, '/');
        console.log('ERROR API return status 401');
        break;
      case 404:
        console.log('ERROR API return status 404');
        // this.redirectTo(document, '/404');
        break;
      default:
        console.log('ERROR API return status 500');
        // this.redirectTo(document, '/500');
        break;
    }
    return error.response;
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path) {
    return this.service.get(path).then(response => response);
  }

  post(path, payload) {
    return this.service
      .request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then(response => response);
  }

  patch(path, payload) {
    return this.post(path, { ...payload, method: 'PATCH' });
  }

  delete(path) {
    return this.post(path, { method: 'DELETE' });
  }
}

export default new ApiClient();
