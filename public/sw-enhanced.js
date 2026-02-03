// Service Worker amélioré pour OwoTọ́ọ̀mọ̀ - Cache prédictif
const CACHE_VERSION = 'v1.0.1';
const STATIC_CACHE = `owotomomo-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `owotomomo-dynamic-${CACHE_VERSION}`;

// Fichiers essentiels + pré-cache des assets
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico',
  '/Owo.png',
  '/placeholder.svg'
];

// Installation avec cache agressif
self.addEventListener('install', (event) => {
  console.log('🔧 Installation Service Worker - OwoTọ́ọ̀mọ̀');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('💾 Mise en cache des fichiers statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Pré-cache des assets dynamiques
        return caches.open(STATIC_CACHE)
          .then((cache) => {
            // Ajouter les fichiers JS/CSS générés par le build
            return cache.addAll([
              '/assets/index-B-JjMirL.css',
              '/assets/index-CAj6cq07.js'
            ]).catch(() => {
              console.log('⚠️ Assets non encore générés, seront mis en cache à la première visite');
            });
          });
      })
      .catch((error) => {
        console.error('❌ Erreur lors de la mise en cache:', error);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation avec nettoyage des anciens caches
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

// Stratégie de cache ultra-agressive
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-HTTP (chrome-extension, file://, etc.)
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Pour toutes les requêtes de notre origine
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          // Cache hit - retourner depuis cache
          if (response) {
            console.log('✅ Cache hit:', url.pathname);
            return response;
          }
          
          // Cache miss - essayer réseau
          return fetch(request)
            .then((fetchResponse) => {
              // Vérifier la réponse
              if (!fetchResponse || fetchResponse.status !== 200) {
                return fetchResponse;
              }
              
              // Mettre en cache pour usage futur
              const responseToCache = fetchResponse.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                })
                .catch(() => {
                  // Ignorer erreurs de cache
                });
              
              console.log('🌐 Network hit + cache:', url.pathname);
              return fetchResponse;
            })
            .catch((error) => {
              console.error('❌ Network failed:', url.pathname, error);
              
              // Fallback intelligent
              if (request.destination === 'document') {
                // Pour les pages, retourner index.html
                return caches.match('/index.html');
              }
              
              // Pour les assets, essayer de trouver une alternative
              if (request.destination === 'script' || request.destination === 'style') {
                // Retourner une réponse vide pour JS/CSS manquants
                return new Response('', {
                  status: 200,
                  headers: { 'Content-Type': request.destination === 'script' ? 'application/javascript' : 'text/css' }
                });
              }
              
              // Pour les images, retourner placeholder
              if (request.destination === 'image') {
                return caches.match('/placeholder.svg');
              }
              
              // Erreur 404 pour tout le reste
              return new Response('Hors ligne', {
                status: 404,
                statusText: 'Not Available Offline'
              });
            });
        })
    );
    return;
  }
  
  // Pour les requêtes externes (CDN, API, etc.)
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Mettre en cache les réponses externes réussies
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
        // Essayer depuis cache dynamique
        return caches.match(request);
      })
  );
});

// Gestion des mises à jour
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync pour les données
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Synchronisation des données
async function syncData() {
  console.log('🔄 Synchronisation des données');
  // Implémenter la logique de sync ici
}

console.log('📱 Service Worker OwoTọ́ọ̀mọ̀ v1.0.1 - Mode Hors Ligne Ultra-Actif !');
