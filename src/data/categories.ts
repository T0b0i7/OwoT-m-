import { Category, CategoryId } from '@/types';

export const categories: Category[] = [
  { id: 'alimentation', name: 'Alimentation', nameAlt: 'Alimentation', icon: '🍚', color: 'hsl(24, 95%, 40%)', type: 'expense' },
  { id: 'transport', name: 'Transport', nameAlt: 'Transport', icon: '🚕', color: 'hsl(210, 58%, 36%)', type: 'expense' },
  { id: 'logement', name: 'Logement', nameAlt: 'Logement', icon: '🏠', color: 'hsl(156, 100%, 27%)', type: 'expense' },
  { id: 'sante', name: 'Santé', nameAlt: 'Santé', icon: '💊', color: 'hsl(352, 87%, 49%)', type: 'expense' },
  { id: 'education', name: 'Éducation', nameAlt: 'Éducation', icon: '📚', color: 'hsl(282, 74%, 35%)', type: 'expense' },
  { id: 'loisirs', name: 'Loisirs', nameAlt: 'Loisirs', icon: '🎉', color: 'hsl(49, 97%, 44%)', type: 'expense' },
  { id: 'shopping', name: 'Shopping', nameAlt: 'Shopping', icon: '🛍️', color: 'hsl(320, 65%, 45%)', type: 'expense' },
  { id: 'communication', name: 'Communication', nameAlt: 'Communication', icon: '📱', color: 'hsl(180, 60%, 35%)', type: 'expense' },
  { id: 'services', name: 'Services', nameAlt: 'Services', icon: '⚡', color: 'hsl(35, 80%, 40%)', type: 'expense' },
  { id: 'salaire', name: 'Salaire', nameAlt: 'Salaire', icon: '💰', color: 'hsl(156, 100%, 27%)', type: 'income' },
  { id: 'business', name: 'Business', nameAlt: 'Business', icon: '💼', color: 'hsl(210, 58%, 36%)', type: 'income' },
  { id: 'transfert', name: 'Transfert', nameAlt: 'Transfert', icon: '💸', color: 'hsl(282, 74%, 35%)', type: 'both' },
  { id: 'autre', name: 'Autre', nameAlt: 'Autre', icon: '📌', color: 'hsl(0, 0%, 45%)', type: 'both' },
];

export const getCategoryById = (id: CategoryId): Category => {
  return categories.find(c => c.id === id) || categories[categories.length - 1];
};

export const getExpenseCategories = (): Category[] => {
  return categories.filter(c => c.type === 'expense' || c.type === 'both');
};

export const getIncomeCategories = (): Category[] => {
  return categories.filter(c => c.type === 'income' || c.type === 'both');
};
