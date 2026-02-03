const CACHE_NAME = 'owotomomo-v1.0.0';
const STATIC_CACHE = 'owotomomo-static-v1.0.0';
const DYNAMIC_CACHE = 'owotomomo-dynamic-v1.0.0';

// Fichiers essentiels pour le fonctionnement hors ligne
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico',
  '/Owo.png',
  '/placeholder.svg'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Installation Service Worker - OwoTọ́ọ̀mọ̀');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('💾 Mise en cache des fichiers statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Activation Service Worker - OwoTọ́ọ̀mọ̀');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Stratégie : Cache First pour les fichiers statiques
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            console.log('✅ Servi depuis cache:', url.pathname);
            return response;
          }
          
          // Si pas en cache, essayer réseau puis mettre en cache
          return fetch(request)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
              
              console.log('🌐 Servi depuis réseau et mis en cache:', url.pathname);
              return response;
            })
            .catch(() => {
              console.log('❌ Erreur réseau, fallback offline');
              return new Response('OwoTọ́ọ̀mọ̀ - Hors ligne', {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'text/html' }
              });
            });
        })
    );
    return;
  }
  
  // Stratégie : Network First pour les données dynamiques
  if (url.pathname.startsWith('/api/') || request.method !== 'GET') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Mettre en cache les réponses réussies
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback vers le cache si réseau indisponible
          return caches.match(request);
        })
    );
    return;
  }
  
  // Pour les autres requêtes, essayer réseau puis cache
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// Notification de mise à jour
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fonction de synchronisation des transactions
async function syncTransactions() {
  console.log('🔄 Synchronisation des transactions');
  // Implémenter la logique de synchronisation ici
}

console.log('📱 Service Worker OwoTọ́ọ̀mọ̀ chargé avec succès !');
