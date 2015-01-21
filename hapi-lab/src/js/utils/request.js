function request(url) {
  if (request._cache[url])
    return Promise.resolve(request._cache[url]);

  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.onload = function () {
      if (req.status === 404) {
        reject(new Error('not found'));
      } else {
        // fake a slow response every now and then
        setTimeout(function () {
          let data = JSON.parse(req.response);
          resolve(data);
          request._cache[url] = data;
        }, Math.random() > 0.5 ? 0 : 1000);
      }
    };
    req.open('GET', url);
    req.send();
  });
}
request._cache = {};

export default request;
