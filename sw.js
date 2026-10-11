// Service Worker for Vamsi CGL 2027 Tracker
const CACHE_NAME = 'vamsi-cgl-v6';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './syllabus-data.js',
  './flashcards-data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './decks/deck-registry.json',
  './decks/polity-constitution-pack.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(networkResponse => {
        if (event.request.url.includes('/decks/')) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    }).catch(() => {
      return caches.match('./index.html');
    })
  );
});
