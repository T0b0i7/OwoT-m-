import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BalanceCard } from '@/components/BalanceCard';
import { TransactionList } from '@/components/TransactionList';
import { BottomNav } from '@/components/BottomNav';
import { AddTransactionSheet } from '@/components/AddTransactionSheet';
import { useStore } from '@/store/useStore';
import { formatMonth, getCurrentMonth } from '@/lib/format';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const transactions = useStore((state) => state.transactions);
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);
  const navigate = useNavigate();

  return (
    <div className="mobile-container safe-area-top">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between py-4 mb-2"
      >
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="OwoTọ́ọ̀mọ̀ Logo" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-muted-foreground text-sm">Bonjour 👋</p>
            <h1 className="font-heading text-xl font-bold">OwoTọ́ọ̀mọ̀</h1>
          </div>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-xs">Ce mois</p>
          <p className="font-medium text-sm capitalize">
            {formatMonth(getCurrentMonth())}
          </p>
        </div>
      </motion.header>

      {/* Benin flag stripe */}
      <div className="benin-stripe mb-4" />

      {/* Balance Card */}
      <div className="mb-6">
        <BalanceCard />
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <button
          onClick={() => navigate('/budgets')}
          className="stat-card text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl mb-1">🎯</p>
              <p className="font-medium text-sm">Budget</p>
              <p className="text-xs text-muted-foreground">Gérer mes limites</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>

        <button
          onClick={() => navigate('/tontine')}
          className="stat-card text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl mb-1">🤝</p>
              <p className="font-medium text-sm">Tontine</p>
              <p className="text-xs text-muted-foreground">Mes tontines</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg">Transactions récentes</h2>
          <button
            onClick={() => navigate('/transactions')}
            className="text-sm text-primary font-medium"
          >
            Voir tout
          </button>
        </div>
        <TransactionList transactions={recentTransactions} />
      </motion.div>

      {/* Bottom Navigation */}
      <BottomNav onAddClick={() => setShowAddTransaction(true)} />

      {/* Add Transaction Sheet */}
      <AddTransactionSheet
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
      />
    </div>
  );
};

export default Dashboard;
