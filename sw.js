const CACHE_NAME = "dom-miniaturas-cache-v2";

// Arquivos que devem ser atualizados sempre que você modifica o site
const urlsToCache = [
  "/dom-miniaturas/index.html?v=2",
  "/dom-miniaturas/manifest.json",
  "/dom-miniaturas/icon-192.png",
  "/dom-miniaturas/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
