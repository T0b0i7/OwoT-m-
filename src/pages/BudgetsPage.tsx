import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { AddTransactionSheet } from '@/components/AddTransactionSheet';
import { BudgetList } from '@/components/BudgetCard';
import { useStore } from '@/store/useStore';
import { getExpenseCategories } from '@/data/categories';
import { formatCFA, formatMonth, getCurrentMonth } from '@/lib/format';
import { Settings } from 'lucide-react';

const BudgetsPage = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showBudgetEditor, setShowBudgetEditor] = useState(false);
  const setBudget = useStore((state) => state.setBudget);
  const budgets = useStore((state) => state.budgets);
  const transactions = useStore((state) => state.transactions);

  const expenseCategories = getExpenseCategories();

  const { totalBudget, totalSpent, percentage } = useMemo(() => {
    const month = getCurrentMonth();
    const monthlyBudgets = budgets.filter((b) => b.month === month);
    const totalBudget = monthlyBudgets.reduce((acc, b) => acc + b.limit, 0);

    const totalSpent = transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(month))
      .reduce((acc, t) => acc + t.amount, 0);

    const percentage = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

    return { totalBudget, totalSpent, percentage };
  }, [budgets, transactions]);

  const getBudgetLimit = (categoryId: string) => {
    const month = getCurrentMonth();
    const budget = budgets.find((b) => b.category === categoryId && b.month === month);
    return budget?.limit || 0;
  };

  const getProgressClass = () => {
    if (percentage < 60) return 'safe';
    if (percentage < 85) return 'warning';
    return 'danger';
  };

  return (
    <div className="mobile-container safe-area-top">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between py-4 mb-4"
      >
        <div>
          <h1 className="font-heading text-2xl font-bold">Ètò Owó</h1>
          <p className="text-muted-foreground text-sm capitalize">
            {formatMonth(getCurrentMonth())}
          </p>
        </div>
        <button
          onClick={() => setShowBudgetEditor(!showBudgetEditor)}
          className="p-2 bg-muted rounded-xl"
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.header>

      {/* Benin flag stripe */}
      <div className="benin-stripe mb-4" />

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="stat-card mb-6"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Owó tí ná</p>
            <p className="font-heading text-2xl font-bold font-mono">{formatCFA(totalSpent)}</p>
            <p className="text-xs text-muted-foreground mt-1">Dépensé</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Ìdíwọ̀n</p>
            <p className="font-heading text-lg font-semibold text-muted-foreground font-mono">{formatCFA(totalBudget)}</p>
            <p className="text-xs text-muted-foreground mt-1">Budget total</p>
          </div>
        </div>
        <div className="budget-progress">
          <div
            className={`budget-progress-fill ${getProgressClass()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {percentage.toFixed(0)}% du budget utilisé
        </p>
        {percentage >= 85 && (
          <p className="text-xs text-expense mt-1 text-center">⚠️ Ẹ ṣọ́ra! Attention!</p>
        )}
        {percentage < 60 && (
          <p className="text-xs text-income mt-1 text-center">✅ Ó dára! Bien géré!</p>
        )}
      </motion.div>

      {/* Budget List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-heading font-semibold text-lg mb-1">Àwọn Ẹka</h2>
        <p className="text-xs text-muted-foreground mb-4">Par catégorie</p>
        <BudgetList />
      </motion.div>

      {/* Quick Add Budgets */}
      {showBudgetEditor && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6"
        >
          <h3 className="font-heading font-semibold text-lg mb-1">
            Ṣètò Ìdíwọ̀n
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Définir un budget</p>
          <div className="space-y-3">
            {expenseCategories.slice(0, 6).map((cat) => {
              const limit = getBudgetLimit(cat.id);
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <div className="flex-1">
                    <span className="font-medium text-sm">{cat.name}</span>
                    {cat.nameAlt && (
                      <span className="text-xs text-muted-foreground ml-1">({cat.nameAlt})</span>
                    )}
                  </div>
                  <input
                    type="number"
                    placeholder="Limite"
                    defaultValue={limit || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (value > 0) setBudget(cat.id, value);
                    }}
                    className="w-24 px-3 py-2 text-sm rounded-lg bg-muted text-right font-mono"
                  />
                  <span className="text-xs text-muted-foreground">F</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <BottomNav onAddClick={() => setShowAddTransaction(true)} />
      <AddTransactionSheet
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
      />
    </div>
  );
};

export default BudgetsPage;
