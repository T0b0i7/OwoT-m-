import { motion } from 'framer-motion';
import { Edit2, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { Tontine } from '@/types';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { formatCFA } from '@/lib/format';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TontineActionsProps {
  tontine: Tontine;
  onBack: () => void;
}

export function TontineActions({ tontine, onBack }: TontineActionsProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showAdvance, setShowAdvance] = useState(false);
  const deleteTontine = useStore((state) => state.deleteTontine);
  const advanceTontineTour = useStore((state) => state.advanceTontineTour);
  const { toast } = useToast();

  // Calculate who has paid and who hasn't
  const paidMembers = tontine.contributions
    .filter((c) => c.tour === tontine.currentTour && c.isPaid)
    .map((c) => c.memberId);

  const unpaidMembers = tontine.members.filter((m) => !paidMembers.includes(m.id));
  const totalToPay = tontine.members.length * tontine.contributionAmount;
  const totalPaid = paidMembers.length * tontine.contributionAmount;

  const handleDelete = () => {
    deleteTontine(tontine.id);
    toast({
      title: 'Tontine supprimée',
      description: `${tontine.name} a été supprimée`,
    });
    onBack();
  };

  const handleAdvanceTour = () => {
    if (tontine.currentTour >= tontine.totalTours) {
      toast({
        title: 'Tontine terminée',
        description: 'Tous les tours ont été complétés',
        variant: 'destructive',
      });
      return;
    }

    advanceTontineTour(tontine.id);
    toast({
      title: 'Tour avancé',
      description: `Passage au tour ${tontine.currentTour + 1}/${tontine.totalTours}`,
    });
    setShowAdvance(false);
  };

  const canAdvance = tontine.currentTour < tontine.totalTours;

  return (
    <div className="space-y-4">
      {/* Récapitulatif du tour */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 space-y-3"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Progression du tour</p>
          <p className="text-xs font-semibold text-primary">
            {paidMembers.length}/{tontine.members.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(paidMembers.length / tontine.members.length) * 100}%` }}
            className="h-full bg-primary rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Amounts */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Collecté: {formatCFA(totalPaid)}</span>
          <span>Total: {formatCFA(totalToPay)}</span>
        </div>

        {/* Bénéficiaire */}
        <div className="bg-accent/20 rounded-lg p-2 mt-2">
          <p className="text-xs text-muted-foreground mb-1">Bénéficiaire ce tour</p>
          <p className="text-sm font-semibold">
            {tontine.members.find((m) => m.id === tontine.beneficiaryOrder[tontine.currentTour - 1])?.avatar}{' '}
            {tontine.members.find((m) => m.id === tontine.beneficiaryOrder[tontine.currentTour - 1])?.name}
          </p>
        </div>
      </motion.div>

      {/* Alertes */}
      {unpaidMembers.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 flex gap-2 border border-yellow-200 dark:border-yellow-800"
        >
          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">
              {unpaidMembers.length} membre(s) n'a pas payé
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
              {unpaidMembers.map((m) => m.name).join(', ')}
            </p>
          </div>
        </motion.div>
      )}

      {/* Boutons d'action */}
      <div className="space-y-2 pt-2">
        {/* Avancer tour */}
        {canAdvance && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdvance(true)}
            disabled={unpaidMembers.length > 0}
            className={cn(
              'w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all',
              unpaidMembers.length > 0
                ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            <ChevronRight className="w-4 h-4" />
            Avancer au tour suivant
          </motion.button>
        )}

        {/* Actions supplémentaires */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="py-2 border border-input rounded-lg font-medium hover:bg-secondary flex items-center justify-center gap-1"
          >
            <Edit2 className="w-4 h-4" />
            Modifier
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDelete(true)}
            className="py-2 border border-destructive text-destructive rounded-lg font-medium hover:bg-destructive/10 flex items-center justify-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </motion.button>
        </div>
      </div>

      {/* Dialog suppression */}
      {showDelete && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowDelete(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl p-6 z-50 w-[90%] max-w-sm"
          >
            <p className="text-2xl mb-2">⚠️</p>
            <h3 className="font-heading text-lg font-bold mb-2">Supprimer cette tontine?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cette action est irréversible et supprimera tous les enregistrements de paiement.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 py-2 border border-input rounded-lg font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        </>
      )}

      {/* Dialog avancer tour */}
      {showAdvance && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAdvance(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl p-6 z-50 w-[90%] max-w-sm"
          >
            <h3 className="font-heading text-lg font-bold mb-2">Avancer au tour suivant?</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Tour actuel: {tontine.currentTour + 1}/{tontine.totalTours}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Nouveau bénéficiaire: {tontine.members.find((m) => m.id === tontine.beneficiaryOrder[tontine.currentTour])?.avatar}{' '}
              {tontine.members.find((m) => m.id === tontine.beneficiaryOrder[tontine.currentTour])?.name}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdvance(false)}
                className="flex-1 py-2 border border-input rounded-lg font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleAdvanceTour}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
              >
                Avancer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
