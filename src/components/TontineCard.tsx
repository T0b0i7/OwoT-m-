import { motion } from 'framer-motion';
import { Tontine, TontineMember } from '@/types';
import { formatCFA, formatDate } from '@/lib/format';
import { Check, Clock, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TontineCardProps {
  tontine: Tontine;
  onClick?: () => void;
}

export function TontineCard({ tontine, onClick }: TontineCardProps) {
  const paidCount = tontine.contributions.filter(
    (c) => c.tour === tontine.currentTour && c.isPaid
  ).length;
  const totalMembers = tontine.members.length;
  const progress = (paidCount / totalMembers) * 100;
  const currentBeneficiary = tontine.members.find(
    (m) => m.id === tontine.beneficiaryOrder[tontine.currentTour - 1]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="tontine-card cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg">{tontine.name}</h3>
          <p className="text-sm text-muted-foreground">
            Tour {tontine.currentTour}/{tontine.totalTours}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{totalMembers} membres</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <span className="text-sm font-medium text-primary">
          {formatCFA(tontine.contributionAmount)}/mois
        </span>
      </div>

      {/* Current beneficiary */}
      {currentBeneficiary && (
        <div className="bg-accent/20 rounded-xl p-3 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Bénéficiaire ce tour</p>
          <p className="font-medium text-accent-foreground">
            {currentBeneficiary.avatar || '👤'} {currentBeneficiary.name}
          </p>
        </div>
      )}

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Cotisations reçues</span>
          <span className="font-medium">
            {paidCount}/{totalMembers}
          </span>
        </div>
        <div className="budget-progress">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="budget-progress-fill"
            style={{
              background: progress === 100 ? 'var(--gradient-success)' : 'var(--gradient-primary)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface TontineMemberItemProps {
  member: TontineMember;
  isPaid: boolean;
  amount: number;
  isCurrentBeneficiary: boolean;
  onClick?: () => void;
}

export function TontineMemberItem({
  member,
  isPaid,
  amount,
  isCurrentBeneficiary,
  onClick,
}: TontineMemberItemProps) {
  return (
    <motion.div
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      onClick={onClick}
      className={cn(
        'tontine-member',
        isCurrentBeneficiary && 'ring-2 ring-accent',
        onClick && 'cursor-pointer hover:bg-secondary/50'
      )}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
        {member.avatar || member.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="font-medium">
          {member.name}
          {isCurrentBeneficiary && (
            <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
              Bénéficiaire
            </span>
          )}
        </p>
        {member.phone && (
          <p className="text-xs text-muted-foreground">{member.phone}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{formatCFA(amount)}</span>
        {isPaid ? (
          <div className="w-6 h-6 rounded-full bg-income flex items-center justify-center">
            <Check className="w-4 h-4 text-income-foreground" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
