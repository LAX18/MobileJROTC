// Offline SW
const filesToCache = [
  'sw.js',
  'https://lax18.github.io/MobileJROTC/css/font.css',
  'https://lax18.github.io/MobileJROTC/css/material.indigo-red.min.css',
  'https://lax18.github.io/MobileJROTC/js/firebase.js',
  'https://lax18.github.io/MobileJROTC/js/material.min.js'
];

const staticCacheName = 'NokomisJROTC';


self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});
