const CACHE_NAME = 'projectnews-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/projectnews.css',
  '/projectnews.js',
  '/projectnews.png',
  '/imgs/gpu.png',
  '/imgs/programa.png'
];

// Instalação do Service Worker e cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta requisições para usar cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Atualiza cache quando o Service Worker é ativado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      })
    ))
  );
});
