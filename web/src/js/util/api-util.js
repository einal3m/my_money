
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

  send(url, method, body) {
    return new Promise(function(resolve, reject) {
      console.log(`ApiUtil ${method}: ${url}`);
      var request = new XMLHttpRequest();

      request.open(method, url);
      request.setRequestHeader("Content-type", "application/json");

      request.onload = function() {
        if (request.status == 200 || request.status == 201) {
          resolve(JSON.parse(request.response));
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
