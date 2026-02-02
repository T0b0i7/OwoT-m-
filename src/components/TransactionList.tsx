import { motion } from 'framer-motion';
import { Transaction } from '@/types';
import { getCategoryById } from '@/data/categories';
import { formatCFA, getRelativeTime } from '@/lib/format';

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

export function TransactionItem({ transaction, index }: TransactionItemProps) {
  const category = getCategoryById(transaction.category);
  const isExpense = transaction.type === 'expense';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="transaction-item"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
        style={{ backgroundColor: category.color + '20' }}
      >
        {category.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">
          {transaction.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {category.name} • {getRelativeTime(transaction.date)}
        </p>
      </div>

      <p className={isExpense ? 'amount-expense' : 'amount-income'}>
        {isExpense ? '-' : '+'}
        {formatCFA(transaction.amount)}
      </p>
    </motion.div>
  );
}

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
}

export function TransactionList({ transactions, title }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-2">📝</p>
        <p className="text-muted-foreground">Aucune transaction</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="font-heading font-semibold text-lg mb-4">{title}</h2>
      )}
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
