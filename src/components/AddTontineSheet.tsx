import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Tontine } from '@/types';

interface AddTontineSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTontineSheet({ isOpen, onClose }: AddTontineSheetProps) {
  const [name, setName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('monthly');
  const [totalTours, setTotalTours] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const addTontine = useStore((state) => state.addTontine);

  const handleSubmit = () => {
    if (!name || !contributionAmount || !totalTours) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs requis',
        variant: 'destructive',
      });
      return;
    }

    const newTontine: Omit<Tontine, 'id'> = {
      name,
      contributionAmount: parseInt(contributionAmount.replace(/\s/g, '')),
      frequency,
      totalTours: parseInt(totalTours),
      members: [],
      contributions: [],
      currentTour: 1,
      startDate: new Date().toISOString().split('T')[0],
      beneficiaryOrder: [],
    };

    addTontine(newTontine);

    toast({
      title: 'Tontine créée',
      description: `${name} a été créée avec succès!`,
    });

    // Reset form
    setName('');
    setContributionAmount('');
    setFrequency('monthly');
    setTotalTours('');
    onClose();
  };

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 0) {
      const formatted = parseInt(cleaned).toLocaleString('fr-FR');
      setContributionAmount(formatted);
    } else {
      setContributionAmount('');
    }
  };

  const handleToursChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setTotalTours(cleaned);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold">Créer une tontine</h2>
              <button onClick={onClose} className="p-2 -mr-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Nom du groupe
                </label>
                <input
                  type="text"
                  placeholder="ex: Àjọ des amis"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Contribution Amount */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Montant de cotisation (FCFA)
                </label>
                <input
                  type="text"
                  placeholder="ex: 50 000"
                  value={contributionAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Fréquence
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as typeof frequency)}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="weekly">Hebdomadaire</option>
                  <option value="biweekly">Bi-hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>

              {/* Total Tours */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Nombre de tours
                </label>
                <input
                  type="text"
                  placeholder="ex: 5"
                  value={totalTours}
                  onChange={(e) => handleToursChange(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Chaque membre recevra le pot une fois
                </p>
              </div>

              {/* Info */}
              <div className="bg-accent/10 rounded-lg p-3 mt-4">
                <p className="text-xs text-muted-foreground">
                  💡 N'oubliez pas d'ajouter les membres du groupe après création!
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90"
            >
              <Check className="w-5 h-5" />
              Créer la tontine
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
