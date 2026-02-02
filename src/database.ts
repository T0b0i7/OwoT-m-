// Base de données locale invisible pour OwoTọ́ọ̀mọ̀
import { openDB } from 'idb';

const DB_NAME = 'OwoTọ́ọ̀mọ̀DB';
const DB_VERSION = 1;

// Ouvrir la base de données
export const db = await openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Table des transactions
    if (!db.objectStoreNames.contains('transactions')) {
      const transactionStore = db.createObjectStore('transactions', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      transactionStore.createIndex('date', 'date');
      transactionStore.createIndex('type', 'type'); // income/expense
      transactionStore.createIndex('category', 'category');
    }

    // Table des catégories
    if (!db.objectStoreNames.contains('categories')) {
      const categoryStore = db.createObjectStore('categories', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      categoryStore.createIndex('name', 'name');
    }

    // Table des budgets
    if (!db.objectStoreNames.contains('budgets')) {
      const budgetStore = db.createObjectStore('budgets', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      budgetStore.createIndex('category', 'category');
      budgetStore.createIndex('month', 'month');
    }

    // Table des tontines
    if (!db.objectStoreNames.contains('tontines')) {
      const tontineStore = db.createObjectStore('tontines', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      tontineStore.createIndex('name', 'name');
      tontineStore.createIndex('status', 'status');
    }

    // Table des paramètres utilisateur
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings', { keyPath: 'key' });
    }
  },
});

// Fonctions pour effacer toutes les données
export const clearAllData = async () => {
  try {
    const tx = db.transaction(['transactions', 'categories', 'budgets', 'tontines', 'settings'], 'readwrite');
    
    await Promise.all([
      tx.objectStore('transactions').clear(),
      tx.objectStore('categories').clear(),
      tx.objectStore('budgets').clear(),
      tx.objectStore('tontines').clear(),
      tx.objectStore('settings').clear(),
    ]);
    
    await tx.done;
    console.log('Toutes les données ont été effacées avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'effacement des données:', error);
    return false;
  }
};

// Fonctions pour les transactions
export const addTransaction = async (transaction) => {
  return await db.add('transactions', {
    ...transaction,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString()
  });
};

export const getTransactions = async () => {
  return await db.getAll('transactions');
};

export const deleteTransaction = async (id) => {
  return await db.delete('transactions', id);
};

// Fonctions pour les catégories
export const getDefaultCategories = async () => {
  const defaultCategories = [
    { name: 'Alimentation', type: 'expense', icon: '🍔', color: '#FF6B6B' },
    { name: 'Transport', type: 'expense', icon: '🚗', color: '#4ECDC4' },
    { name: 'Logement', type: 'expense', icon: '🏠', color: '#45B7D1' },
    { name: 'Santé', type: 'expense', icon: '🏥', color: '#96CEB4' },
    { name: 'Loisirs', type: 'expense', icon: '🎮', color: '#FFEAA7' },
    { name: 'Salaire', type: 'income', icon: '💰', color: '#55A3FF' },
    { name: 'Autre', type: 'expense', icon: '📦', color: '#DFE6E9' }
  ];

  const tx = db.transaction('categories', 'readwrite');
  for (const category of defaultCategories) {
    await tx.store.add(category);
  }
  await tx.done;
  
  return defaultCategories;
};

export const getCategories = async () => {
  let categories = await db.getAll('categories');
  if (categories.length === 0) {
    categories = await getDefaultCategories();
  }
  return categories;
};

// Fonctions pour les paramètres
export const getSetting = async (key) => {
  const setting = await db.get('settings', key);
  return setting ? setting.value : null;
};

export const setSetting = async (key, value) => {
  return await db.put('settings', { key, value });
};

// Initialiser les données par défaut
export const initializeApp = async () => {
  try {
    // Vérifier si c'est le premier lancement
    const isFirstLaunch = await getSetting('isFirstLaunch');
    
    if (!isFirstLaunch) {
      // Initialiser les catégories par défaut
      await getDefaultCategories();
      
      // Marquer comme initialisé
      await setSetting('isFirstLaunch', false);
      await setSetting('language', 'fr');
      await setSetting('currency', 'FCFA');
      
      console.log('Application initialisée avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
  }
};
