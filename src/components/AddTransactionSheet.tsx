import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { categories, getExpenseCategories, getIncomeCategories } from '@/data/categories';
import { TransactionType, CategoryId } from '@/types';
import { cn } from '@/lib/utils';

interface AddTransactionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionSheet({ isOpen, onClose }: AddTransactionSheetProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const addTransaction = useStore((state) => state.addTransaction);
  
  const availableCategories = type === 'expense' ? getExpenseCategories() : getIncomeCategories();

  const handleSubmit = () => {
    if (!amount || !selectedCategory) return;
    
    addTransaction({
      amount: parseInt(amount.replace(/\s/g, '')),
      type,
      category: selectedCategory,
      description: description || categories.find(c => c.id === selectedCategory)?.name || '',
      date: new Date().toISOString().split('T')[0],
    });
    
    // Notification de succès
    toast({
      title: t('transaction_added'),
      description: `${type === 'income' ? 'Revenu' : 'Dépense'} de ${amount} FCFA ajoutée`,
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setSelectedCategory(null);
    onClose();
  };

  const formatInputAmount = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto safe-area-bottom"
          >
            <div className="p-6">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-6" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-semibold">Nouvelle transaction</h2>
                <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Type Toggle */}
              <div className="flex gap-2 p-1 bg-secondary rounded-2xl mb-6">
                <button
                  onClick={() => { setType('expense'); setSelectedCategory(null); }}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-medium transition-all',
                    type === 'expense' 
                      ? 'bg-expense text-expense-foreground shadow-md' 
                      : 'text-muted-foreground'
                  )}
                >
                  Dépense
                </button>
                <button
                  onClick={() => { setType('income'); setSelectedCategory(null); }}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-medium transition-all',
                    type === 'income' 
                      ? 'bg-income text-income-foreground shadow-md' 
                      : 'text-muted-foreground'
                  )}
                >
                  Revenu
                </button>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">Montant (FCFA)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(formatInputAmount(e.target.value))}
                  placeholder="0"
                  className="input-mobile w-full text-2xl font-heading font-semibold text-center"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">Description (optionnel)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Courses au marché"
                  className="input-mobile w-full"
                />
              </div>

              {/* Categories */}
              <div className="mb-8">
                <label className="text-sm text-muted-foreground mb-3 block">Catégorie</label>
                <div className="grid grid-cols-4 gap-3">
                  {availableCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all',
                        selectedCategory === cat.id 
                          ? 'bg-primary text-primary-foreground shadow-primary' 
                          : 'bg-secondary hover:bg-secondary/80'
                      )}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-xs font-medium truncate w-full text-center">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!amount || !selectedCategory}
                className={cn(
                  'w-full py-4 rounded-2xl font-heading font-semibold text-lg flex items-center justify-center gap-2 transition-all',
                  amount && selectedCategory
                    ? 'bg-primary text-primary-foreground shadow-primary'
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                <Check className="w-5 h-5" />
                Enregistrer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
