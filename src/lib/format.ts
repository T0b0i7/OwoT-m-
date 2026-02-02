// Format amount in FCFA
export const formatCFA = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' F';
};

// Format date in French
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};

// Format full date
export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

// Format month
export const formatMonth = (dateString: string): string => {
  const date = new Date(dateString + '-01');
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

// Get current month string (YYYY-MM)
export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Get relative time description
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
  return formatDate(dateString);
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get concrete equivalents for amounts
export const getEquivalent = (amount: number): string => {
  if (amount < 1000) return '';
  if (amount < 2000) return '≈ 1 taxi en ville';
  if (amount < 5000) return '≈ 2-3 repas au maquis';
  if (amount < 10000) return '≈ 5 repas au maquis';
  if (amount < 25000) return `≈ ${Math.floor(amount / 2000)} repas au maquis`;
  if (amount < 50000) return '≈ 1 semaine de transport';
  if (amount < 100000) return '≈ 1 plein d\'essence';
  return `≈ ${Math.floor(amount / 50000)} pleins d'essence`;
};
