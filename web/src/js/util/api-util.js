
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
      console.log(`ApiUtil Error: ${method} ${url}`, e);
    });
  }

  send(url, method, body) {
    return new Promise(function(resolve, reject) {
      console.log(`ApiUtil ${method}: ${url}`);
      var request = new XMLHttpRequest();

      request.open(method, url);
      request.setRequestHeader("Content-type", "application/json");

      request.onload = function() {
        if (request.status == 200 || request.status == 201 || request.status == 204) {
          let response;
          if (request.response) {
            response = JSON.parse(request.response);
          }
          resolve(response);
        }
        else {
          reject(Error(request.statusText));
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
