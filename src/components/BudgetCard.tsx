import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getCategoryById } from '@/data/categories';
import { formatCFA, getCurrentMonth } from '@/lib/format';
import { CategoryId } from '@/types';

interface BudgetCardProps {
  category: CategoryId;
  limit: number;
  spent: number;
  percentage: number;
}

export function BudgetCard({ category, limit, spent, percentage }: BudgetCardProps) {
  const cat = getCategoryById(category);
  const remaining = limit - spent;
  const isOverBudget = spent > limit;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ backgroundColor: cat.color + '20' }}
          >
            {cat.icon}
          </div>
          <div>
            <p className="font-medium">{cat.name}</p>
            <p className="text-xs text-muted-foreground">
              {isOverBudget ? 'Dépassé' : `Reste ${formatCFA(remaining)}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading font-semibold">{formatCFA(spent)}</p>
          <p className="text-xs text-muted-foreground">/ {formatCFA(limit)}</p>
        </div>
      </div>

      <div className="budget-progress">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="budget-progress-fill"
          style={{
            background: isOverBudget 
              ? 'hsl(var(--expense))' 
              : percentage > 80 
                ? 'hsl(45, 95%, 55%)' 
                : 'var(--gradient-primary)',
          }}
        />
      </div>
    </motion.div>
  );
}

export function BudgetList() {
  const budgets = useStore((state) => state.budgets);
  const transactions = useStore((state) => state.transactions);

  const currentBudgets = useMemo(() => {
    const month = getCurrentMonth();

    // Deduplicate by category for the current month
    const unique = budgets
      .filter((b) => b.month === month)
      .filter((b, i, arr) => arr.findIndex((x) => x.category === b.category) === i);

    return unique
      .map((b) => {
        const spent = transactions
          .filter(
            (t) =>
              t.type === 'expense' &&
              t.category === b.category &&
              t.date.startsWith(month)
          )
          .reduce((acc, t) => acc + t.amount, 0);

        const limit = b.limit || 0;
        const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

        return { ...b, spent, percentage };
      })
      .filter((b) => b.limit > 0);
  }, [budgets, transactions]);

  if (currentBudgets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-2">🎯</p>
        <p className="text-muted-foreground">Pas de budget défini</p>
        <p className="text-sm text-muted-foreground mt-1">
          Définissez des limites pour mieux gérer vos dépenses
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {currentBudgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          category={budget.category}
          limit={budget.limit}
          spent={budget.spent}
          percentage={budget.percentage}
        />
      ))}
    </div>
  );
}
