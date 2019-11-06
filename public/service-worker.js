const staticCacheName = 'cache-1.0.1';

const filesToCache = [
  '/',
  '/scripts.min.js',
  '/styles.min.css',
  '/images/cover.jpg',
  '/fonts/merriweather.woff',
  '/fonts/merriweather.woff2'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request)
    })
  );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
