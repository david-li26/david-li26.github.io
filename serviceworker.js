const CACHE_NAME = 'calcura-cache-v2';
const OFFLINE_URL = '/fallback/offline.html';

const FALLBACK_HTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><title>Offline</title></head>
  <body style="background:#000;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center;">
    <div style="font-size:4rem;">📶❗</div>
    <h1>No internet connection</h1>
    <p>Don’t worry — we’ll reconnect when you’re back online.</p>
  </body>
  </html>
`;

const ASSETS_TO_CACHE = [
  '/',
  '/bmr-calculator.html',
  OFFLINE_URL,
  '/styles/default.css',
  '/styles/bmr-calculator.css',
  '/styles/fallback.css',
  '/styles/fonts/montserrat.woff2',
  '/styles/media/background-dark.webp',
  '/styles/media/background-light.webp',
  '/styles/media/calcura-icon.png',
  '/styles/media/pwa-icon.png',
  '/styles/media/calcura-icon-60x60.webp',
  '/scripts/script.js',
  '/scripts/global.js'
];

// Install: cache assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve cache first, fallback to network, then offline page
self.addEventListener('fetch', event => {
  const { request } = event;

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      return fetch(request).then(networkResponse => {
        // If network response is OK, use it
        if (networkResponse.ok) {
          return networkResponse;
        }

        // If network response is 401 or other error, fallback to cache
        if (cachedResponse) {
          return cachedResponse;
        }

        // If it's an HTML request, show offline fallback
        if (request.destination === 'document') {
          return caches.match(OFFLINE_URL).catch(() =>
            new Response(FALLBACK_HTML, {
              headers: { 'Content-Type': 'text/html' }
            })
          );
        }

        // Otherwise, return the failed response
        return networkResponse;
      }).catch(() => {
        // Network fetch failed entirely
        if (cachedResponse) {
          return cachedResponse;
        }

        if (request.destination === 'document') {
          return caches.match(OFFLINE_URL).catch(() =>
            new Response(FALLBACK_HTML, {
              headers: { 'Content-Type': 'text/html' }
            })
          );
        }
      });
    })
  );
});
