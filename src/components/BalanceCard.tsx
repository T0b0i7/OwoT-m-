import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { formatCFA, getCurrentMonth } from '@/lib/format';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function BalanceCard() {
  const transactions = useStore((state) => state.transactions);
  
  const { balance, monthlyIncome, monthlyExpense } = useMemo(() => {
    const month = getCurrentMonth();
    const balance = transactions.reduce((acc, t) => {
      return acc + (t.type === 'income' ? t.amount : -t.amount);
    }, 0);
    const monthlyIncome = transactions
      .filter((t) => t.type === 'income' && t.date.startsWith(month))
      .reduce((acc, t) => acc + t.amount, 0);
    const monthlyExpense = transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(month))
      .reduce((acc, t) => acc + t.amount, 0);
    return { balance, monthlyIncome, monthlyExpense };
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="balance-card"
    >
      <p className="text-white/80 text-sm font-medium mb-1">VOTRE SOLDE</p>
      <h1 className="font-heading text-4xl font-bold text-white mb-1 font-mono">
        {formatCFA(balance)}
      </h1>
      <p className="text-white/60 text-xs mb-6">Votre argent</p>

      <div className="flex gap-4">
        <div className="flex-1 bg-white/20 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/80 text-xs">Revenus</span>
          </div>
          <p className="font-heading font-semibold text-white text-lg font-mono">
            +{formatCFA(monthlyIncome)}
          </p>
        </div>

        <div className="flex-1 bg-white/20 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/80 text-xs">Dépenses</span>
          </div>
          <p className="font-heading font-semibold text-white text-lg font-mono">
            -{formatCFA(monthlyExpense)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
