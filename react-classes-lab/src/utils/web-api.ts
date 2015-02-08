/// <reference path='../../typings/jsonp.d.ts' />
/// <reference path='../../typings/es6-promise/es6-promise.d.ts' />

import jsonp = require('jsonp');

export function getPosts(url) {
  return new Promise((resolve, reject) => {
    jsonp(url, {param: 'jsonp'}, (err, data) => {
      err ? reject(err) : resolve(data.data.children)
    })
  })
}

export function extractPosts(posts) {
  return posts
    .filter(post => !post.data.over_18)
    .map(post => post.data.url)
    .filter(url => /jpg|jpeg|gif?$/.exec(url))
    .map(url => url.replace(/v$/,''))
}
