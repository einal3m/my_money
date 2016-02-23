import apiStatusActions from '../actions/api-status-actions';

class ApiUtil {

  get(options) {
    return this.makeRequest(options.url, 'GET', null, options.onSuccess);
  }

  post(options) {
    return this.makeRequest(options.url, 'POST', JSON.stringify(options.body), options.onSuccess);
  }

  put(options) {
    return this.makeRequest(options.url, 'PUT', JSON.stringify(options.body), options.onSuccess);
  }

  delete(options) {
    return this.makeRequest(options.url, 'DELETE', null, options.onSuccess);
  }

  makeRequest(url, method, body, onSuccessCallback) {
    return this.send(url, method, body).then(response => {
      if (onSuccessCallback) {
        onSuccessCallback(response);
      }
    }).catch(function(e) {
      apiStatusActions.storeApiError(e.message);
      console.log(`Api Error: ${method} ${url}, $e.message`);
    });
  }

  send(url, method, body) {
    return new Promise(function(resolve, reject) {
      console.log(`ApiUtil ${method}: ${url}`);
      var request = new XMLHttpRequest();

      request.open(method, url);
      request.setRequestHeader("Content-type", "application/json");

      request.onload = function() {
        if (request.status === 200 || request.status === 201 || request.status === 204) {
          let response;
          if (request.response) {
            response = JSON.parse(request.response);
          }
          resolve(response);
        }
        else if (request.status === 422) {
          reject(Error(JSON.parse(request.response).message));
        } else {
          reject(Error("Unknown Error"));
        }
      };

      request.onerror = function() {
        reject(Error("Network Error"));
      };

      request.send(body);
    });
  }
}

export default new ApiUtil();
