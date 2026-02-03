// Enregistrement du Service Worker pour OwoTọ́ọ̀mọ̀
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker OwoTọ́ọ̀mọ̀ enregistré avec succès:', registration.scope);
        
        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouvelle version disponible
                console.log('🔄 Nouvelle version disponible');
                if (confirm('Une nouvelle version d\'OwoTọ́ọ̀mọ̀ est disponible. Voulez-vous mettre à jour ?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ Erreur d\'enregistrement du Service Worker:', error);
      });
  });
} else {
  console.warn('⚠️ Service Worker non supporté par ce navigateur');
}

// Gestion de l'état de connexion
function updateOnlineStatus() {
  const isOnline = navigator.onLine;
  const statusElement = document.getElementById('connection-status');
  
  if (statusElement) {
    if (isOnline) {
      statusElement.textContent = '🟢 En ligne';
      statusElement.className = 'online';
    } else {
      statusElement.textContent = '🔴 Hors ligne';
      statusElement.className = 'offline';
    }
  }
  
  // Afficher une notification
  if (isOnline) {
    console.log('🌐 Connexion rétablie');
  } else {
    console.log('📱 Mode hors ligne activé');
  }
}

// Écouter les changements de connexion
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Vérifier l'état initial
updateOnlineStatus();
