self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('app-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './styles.css',
        './script.js',
        './manifest.json',
        './images/favicon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
