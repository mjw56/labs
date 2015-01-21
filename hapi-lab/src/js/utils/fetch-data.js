export default function(routes, params) {
  let data = {};

  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(d => { data[route.name] = d;});
    })
  ).then(() => data);
}
