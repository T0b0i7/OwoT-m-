// Service Worker simplifié mais ultra-efficace pour OwoTọ́ọ̀mọ̀
const CACHE_NAME = 'owotomomo-offline-v1';

// Installation - Mettre en cache l'essentiel
self.addEventListener('install', (event) => {
  console.log('🔧 Installation Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Mettre en cache la page principale
        return cache.add('/');
      })
      .then(() => self.skipWaiting())
  );
});

// Activation - Nettoyer les anciens caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Activation Service Worker');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepter toutes les requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorer les requêtes non-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Stratégie : Network First, puis Cache, puis Offline
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si réseau fonctionne, mettre en cache et retourner
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si réseau échoue, essayer le cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('✅ Servi depuis cache hors ligne');
              return cachedResponse;
            }
            
            // Pour les requêtes de page, retourner index.html
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // Pour les autres requêtes, retourner une erreur
            return new Response('Hors ligne', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

console.log('📱 Service Worker OwoTọ́ọ̀mọ̀ - Mode Hors Ligne Activé !');
