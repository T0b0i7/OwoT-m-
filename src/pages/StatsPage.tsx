import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { AddTransactionSheet } from '@/components/AddTransactionSheet';
import { ExpensePieChart } from '@/components/ExpenseChart';
import { useStore } from '@/store/useStore';
import { formatCFA, formatMonth, getCurrentMonth } from '@/lib/format';

const StatsPage = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const transactions = useStore((state) => state.transactions);

  const { monthlyIncome, monthlyExpense, savings } = useMemo(() => {
    const month = getCurrentMonth();
    const monthlyIncome = transactions
      .filter((t) => t.type === 'income' && t.date.startsWith(month))
      .reduce((acc, t) => acc + t.amount, 0);
    const monthlyExpense = transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(month))
      .reduce((acc, t) => acc + t.amount, 0);
    const savings = monthlyIncome - monthlyExpense;
    return { monthlyIncome, monthlyExpense, savings };
  }, [transactions]);

  return (
    <div className="mobile-container safe-area-top">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 mb-4">
        <h1 className="font-heading text-2xl font-bold">Ìṣirò</h1>
        <p className="text-muted-foreground text-sm capitalize">{formatMonth(getCurrentMonth())}</p>
      </motion.header>

      {/* Benin flag stripe */}
      <div className="benin-stripe mb-4" />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="stat-card">
          <p className="text-xs text-muted-foreground">Owó tí wá</p>
          <p className="font-heading text-xl font-bold text-income font-mono">{formatCFA(monthlyIncome)}</p>
          <p className="text-xs text-muted-foreground mt-1">Revenus</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-muted-foreground">Owó tí lọ</p>
          <p className="font-heading text-xl font-bold text-expense font-mono">{formatCFA(monthlyExpense)}</p>
          <p className="text-xs text-muted-foreground mt-1">Dépenses</p>
        </div>
      </div>

      <div className="stat-card mb-6">
        <p className="text-xs text-muted-foreground">Owó tí kù</p>
        <p className={`font-heading text-2xl font-bold font-mono ${savings >= 0 ? 'text-income' : 'text-expense'}`}>
          {savings >= 0 ? '+' : ''}{formatCFA(savings)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Épargne ce mois</p>
        {savings > 0 && (
          <p className="text-xs text-primary mt-2">Ó dára! 🎉 Bon travail!</p>
        )}
      </div>

      <ExpensePieChart />

      <BottomNav onAddClick={() => setShowAddTransaction(true)} />
      <AddTransactionSheet isOpen={showAddTransaction} onClose={() => setShowAddTransaction(false)} />
    </div>
  );
};

export default StatsPage;
