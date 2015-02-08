declare module 'jsonp' {
  function jsonp(url: string, options: any, callback?: (err, data) => void);
  export = jsonp;
}
