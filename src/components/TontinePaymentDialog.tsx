import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { TontineMember } from '@/types';
import { formatCFA } from '@/lib/format';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';

interface TontinePaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  member: TontineMember;
  amount: number;
  tontineId: string;
  tour: number;
  isPaid: boolean;
}

export function TontinePaymentDialog({
  isOpen,
  onClose,
  member,
  amount,
  tontineId,
  tour,
  isPaid,
}: TontinePaymentDialogProps) {
  const markContributionPaid = useStore((state) => state.markContributionPaid);
  const { toast } = useToast();

  const handleMarkPaid = () => {
    markContributionPaid(tontineId, member.id, tour);
    toast({
      title: 'Paiement enregistré',
      description: `${member.name} a payé ${formatCFA(amount)}`,
    });
    onClose();
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl p-6 z-50 w-[90%] max-w-sm shadow-lg"
          >
            <div className="text-center space-y-4">
              <p className="text-4xl">{member.avatar || '👤'}</p>
              <h2 className="font-heading text-xl font-bold">{member.name}</h2>
              
              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Montant à payer</p>
                <p className="text-2xl font-bold text-accent">{formatCFA(amount)}</p>
              </div>

              {isPaid && (
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    Déjà payé
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 border border-input rounded-lg font-medium hover:bg-secondary"
                >
                  Annuler
                </button>
                {!isPaid && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMarkPaid}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Marquer payé
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
