import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Budget, Tontine, CategoryId } from '@/types';
import { generateId, getCurrentMonth } from '@/lib/format';

interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  tontines: Tontine[];
  hasCompletedOnboarding: boolean;
  
  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  
  // Budget actions
  setBudget: (category: CategoryId, limit: number) => void;
  
  // Tontine actions
  addTontine: (tontine: Omit<Tontine, 'id'>) => void;
  updateTontine: (id: string, updates: Partial<Tontine>) => void;
  deleteTontine: (id: string) => void;
  addTontineContribution: (tontineId: string, memberId: string, amount: number, tour: number) => void;
  markContributionPaid: (tontineId: string, memberId: string, tour: number) => void;
  advanceTontineTour: (id: string) => void;
  
  // Onboarding
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  
  // Data management
  clearAllData: () => void;
  
  // Computed
  getBalance: () => number;
  getMonthlyIncome: (month?: string) => number;
  getMonthlyExpense: (month?: string) => number;
  getRecentTransactions: (limit?: number) => Transaction[];
  getBudgetProgress: (category: CategoryId, month?: string) => { spent: number; limit: number; percentage: number };
  getCategoryExpenses: (month?: string) => Record<CategoryId, number>;
}

// Sample data for demo
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 350000,
    type: 'income',
    category: 'salaire',
    description: 'Owó iṣẹ́ Oṣù Kínní',
    date: '2026-01-28',
    createdAt: '2026-01-28T10:00:00Z',
  },
  {
    id: '2',
    amount: 15000,
    type: 'expense',
    category: 'alimentation',
    description: 'Rírà ní Sandaga',
    date: '2026-01-29',
    createdAt: '2026-01-29T14:30:00Z',
  },
  {
    id: '3',
    amount: 5000,
    type: 'expense',
    category: 'transport',
    description: 'Táṣì lọ síbi iṣẹ́',
    date: '2026-01-29',
    createdAt: '2026-01-29T08:00:00Z',
  },
  {
    id: '4',
    amount: 25000,
    type: 'expense',
    category: 'communication',
    description: 'Ìbánisọ̀rọ̀ Orange',
    date: '2026-01-27',
    createdAt: '2026-01-27T16:00:00Z',
  },
  {
    id: '5',
    amount: 8000,
    type: 'expense',
    category: 'loisirs',
    description: 'Ìdàrayá pẹ̀lú àwọn ọ̀rẹ́',
    date: '2026-01-26',
    createdAt: '2026-01-26T20:00:00Z',
  },
  {
    id: '6',
    amount: 50000,
    type: 'income',
    category: 'business',
    description: 'Títà ọjà',
    date: '2026-01-25',
    createdAt: '2026-01-25T11:00:00Z',
  },
];

const sampleBudgets: Budget[] = [
  { id: '1', category: 'alimentation', limit: 80000, spent: 0, month: getCurrentMonth() },
  { id: '2', category: 'transport', limit: 40000, spent: 0, month: getCurrentMonth() },
  { id: '3', category: 'loisirs', limit: 30000, spent: 0, month: getCurrentMonth() },
  { id: '4', category: 'communication', limit: 35000, spent: 0, month: getCurrentMonth() },
];

const sampleTontines: Tontine[] = [
  {
    id: '1',
    name: 'Àjọ Àwọn Ọ̀rẹ́',
    contributionAmount: 25000,
    frequency: 'monthly',
    members: [
      { id: 'm1', name: 'Ìwọ', avatar: '👤' },
      { id: 'm2', name: 'Adé', phone: '+229 97 123 45 67' },
      { id: 'm3', name: 'Aìṣat', phone: '+229 96 234 56 78' },
      { id: 'm4', name: 'Bámidélé', phone: '+229 95 345 67 89' },
    ],
    contributions: [
      { id: 'c1', memberId: 'm1', amount: 25000, date: '2026-01-15', tour: 1, isPaid: true },
      { id: 'c2', memberId: 'm2', amount: 25000, date: '2026-01-15', tour: 1, isPaid: true },
      { id: 'c3', memberId: 'm3', amount: 25000, date: '2026-01-16', tour: 1, isPaid: true },
      { id: 'c4', memberId: 'm4', amount: 25000, date: '2026-01-17', tour: 1, isPaid: false },
    ],
    currentTour: 1,
    totalTours: 4,
    startDate: '2026-01-01',
    beneficiaryOrder: ['m1', 'm2', 'm3', 'm4'],
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      transactions: [],
      budgets: [],
      tontines: [],
      hasCompletedOnboarding: false,

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      setBudget: (category, limit) => {
        const month = getCurrentMonth();
        set((state) => {
          const existingIndex = state.budgets.findIndex(
            (b) => b.category === category && b.month === month
          );
          if (existingIndex >= 0) {
            const updated = [...state.budgets];
            updated[existingIndex] = { ...updated[existingIndex], limit };
            return { budgets: updated };
          }
          return {
            budgets: [
              ...state.budgets,
              { id: generateId(), category, limit, spent: 0, month },
            ],
          };
        });
      },

      addTontine: (tontine) => {
        set((state) => ({
          tontines: [...state.tontines, { ...tontine, id: generateId() }],
        }));
      },

      updateTontine: (id, updates) => {
        set((state) => ({
          tontines: state.tontines.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTontine: (id) => {
        set((state) => ({
          tontines: state.tontines.filter((t) => t.id !== id),
        }));
      },

      addTontineContribution: (tontineId, memberId, amount, tour) => {
        set((state) => ({
          tontines: state.tontines.map((t) =>
            t.id === tontineId
              ? {
                  ...t,
                  contributions: [
                    ...t.contributions,
                    {
                      id: generateId(),
                      memberId,
                      amount,
                      date: new Date().toISOString().split('T')[0],
                      tour,
                      isPaid: true,
                    },
                  ],
                }
              : t
          ),
        }));
      },

      markContributionPaid: (tontineId, memberId, tour) => {
        set((state) => ({
          tontines: state.tontines.map((t) =>
            t.id === tontineId
              ? {
                  ...t,
                  contributions: t.contributions.map((c) =>
                    c.memberId === memberId && c.tour === tour
                      ? { ...c, isPaid: true }
                      : c
                  ),
                }
              : t
          ),
        }));
      },

      advanceTontineTour: (id) => {
        set((state) => ({
          tontines: state.tontines.map((t) =>
            t.id === id && t.currentTour < t.totalTours
              ? { ...t, currentTour: t.currentTour + 1 }
              : t
          ),
        }));
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      resetOnboarding: () => {
        set({ hasCompletedOnboarding: false });
      },

      getBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, t) => {
          return acc + (t.type === 'income' ? t.amount : -t.amount);
        }, 0);
      },

      getMonthlyIncome: (month = getCurrentMonth()) => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income' && t.date.startsWith(month))
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getMonthlyExpense: (month = getCurrentMonth()) => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense' && t.date.startsWith(month))
          .reduce((acc, t) => acc + t.amount, 0);
      },

      getRecentTransactions: (limit = 5) => {
        const { transactions } = get();
        return [...transactions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit);
      },

      getBudgetProgress: (category, month = getCurrentMonth()) => {
        const { budgets, transactions } = get();
        const budget = budgets.find(
          (b) => b.category === category && b.month === month
        );
        const spent = transactions
          .filter(
            (t) =>
              t.type === 'expense' &&
              t.category === category &&
              t.date.startsWith(month)
          )
          .reduce((acc, t) => acc + t.amount, 0);
        
        const limit = budget?.limit || 0;
        const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
        
        return { spent, limit, percentage };
      },

      getCategoryExpenses: (month = getCurrentMonth()) => {
        const { transactions } = get();
        const expenses: Record<string, number> = {};
        
        transactions
          .filter((t) => t.type === 'expense' && t.date.startsWith(month))
          .forEach((t) => {
            expenses[t.category] = (expenses[t.category] || 0) + t.amount;
          });
        
        return expenses as Record<CategoryId, number>;
      },

      clearAllData: () => {
        set({
          transactions: [],
          budgets: [],
          tontines: [],
        });
      },
    }),
    {
      name: 'owotoomomo-storage',
    }
  )
);
