
class ApiUtil {

  get(url) {
    return this.send(url, 'GET');
  }

  post(url, body) {
    return this.send(url, 'POST', JSON.stringify(body));
  }

  put(url, body) {
    return this.send(url, 'PUT', JSON.stringify(body));
  }

  delete(url) {
    return this.send(url, 'DELETE');
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
