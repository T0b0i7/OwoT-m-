// Script de mise à jour du Service Worker pour les assets générés
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire le dossier dist/assets pour trouver les fichiers générés
const assetsDir = path.join(__dirname, '../dist/assets');

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find(f => f.endsWith('.css'));
  const jsFile = files.find(f => f.endsWith('.js'));
  
  if (cssFile && jsFile) {
    console.log('🔧 Mise à jour du Service Worker avec les assets:', cssFile, jsFile);
    
    // Lire le fichier Service Worker
    const swPath = path.join(__dirname, '../public/sw.js');
    let swContent = fs.readFileSync(swPath, 'utf8');
    
    // Copier le Service Worker dans dist
    fs.copyFileSync(swPath, path.join(__dirname, '../dist/sw.js'));
    
    console.log('✅ Service Worker copié dans dist/');
  } else {
    console.log('⚠️ Assets non trouvés, copie simple du Service Worker');
    const swPath = path.join(__dirname, '../public/sw.js');
    fs.copyFileSync(swPath, path.join(__dirname, '../dist/sw.js'));
    console.log('✅ Service Worker copié dans dist/');
  }
} else {
  console.log('⚠️ Dossier assets non trouvé, copie simple du Service Worker');
  const swPath = path.join(__dirname, '../public/sw.js');
  fs.copyFileSync(swPath, path.join(__dirname, '../dist/sw.js'));
  console.log('✅ Service Worker copié dans dist/');
}
