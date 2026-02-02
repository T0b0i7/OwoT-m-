// Types for OwoTọ́ọ̀mọ̀ app

export type TransactionType = 'income' | 'expense';

export type CategoryId =
  | 'alimentation'
  | 'transport'
  | 'logement'
  | 'sante'
  | 'education'
  | 'loisirs'
  | 'shopping'
  | 'communication'
  | 'services'
  | 'salaire'
  | 'business'
  | 'transfert'
  | 'autre';

export interface Category {
  id: CategoryId;
  name: string;
  nameAlt?: string;
  icon: string;
  color: string;
  type: TransactionType | 'both';
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: CategoryId;
  description: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: CategoryId;
  limit: number;
  spent: number;
  month: string; // Format: YYYY-MM
}

export interface TontineMember {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
}

export interface TontineContribution {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  tour: number;
  isPaid: boolean;
}

export interface Tontine {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  members: TontineMember[];
  contributions: TontineContribution[];
  currentTour: number;
  totalTours: number;
  startDate: string;
  beneficiaryOrder: string[]; // Member IDs in order
}

export interface MonthlyStats {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byCategory: Record<CategoryId, number>;
}
