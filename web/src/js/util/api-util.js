
class ApiUtil {

  get(url) {
    return new Promise(function(resolve, reject) {
      console.log('ApiUtil.get', url);
      var request = new XMLHttpRequest();
      request.open('GET', url);

      request.onload = function() {
        if (request.status == 200) {
          resolve(JSON.parse(request.response));
        }
        else {
          reject(Error(request.statusText));
        }
      };

      request.onerror = function() {
        reject(Error("Network Error"));
      };

      request.send();
    });
  }
}

export default new ApiUtil();
