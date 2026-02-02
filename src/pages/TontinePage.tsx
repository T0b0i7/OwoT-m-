import { useState } from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from '@/components/BottomNav';
import { AddTransactionSheet } from '@/components/AddTransactionSheet';
import { AddTontineSheet } from '@/components/AddTontineSheet';
import { AddTontineMembersSheet } from '@/components/AddTontineMembersSheet';
import { TontineCard, TontineMemberItem } from '@/components/TontineCard';
import { TontinePaymentDialog } from '@/components/TontinePaymentDialog';
import { TontineActions } from '@/components/TontineActions';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Users } from 'lucide-react';

const TontinePage = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddTontine, setShowAddTontine] = useState(false);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [selectedTontine, setSelectedTontine] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const tontines = useStore((state) => state.tontines);

  const activeTontine = tontines.find((t) => t.id === selectedTontine);
  const selectedMember = activeTontine?.members.find((m) => m.id === selectedMemberId);
  const selectedMemberContribution = selectedMember
    ? activeTontine!.contributions.find(
        (c) => c.memberId === selectedMember.id && c.tour === activeTontine!.currentTour
      )
    : undefined;

  if (activeTontine) {
    return (
      <div className="mobile-container safe-area-top">
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 py-4 mb-4">
          <button onClick={() => setSelectedTontine(null)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold">{activeTontine.name}</h1>
            <p className="text-sm text-muted-foreground">Ìgbà {activeTontine.currentTour}/{activeTontine.totalTours}</p>
          </div>
          <button
            onClick={() => setShowAddMembers(true)}
            className="p-2 hover:bg-secondary rounded-lg"
            title="Ajouter des membres"
          >
            <Users className="w-5 h-5" />
          </button>
        </motion.header>

        {/* Benin flag stripe */}
        <div className="benin-stripe mb-4" />

        {/* Actions et gestion */}
        <div className="mb-6">
          <TontineActions tontine={activeTontine} onBack={() => setSelectedTontine(null)} />
        </div>

        <h2 className="font-heading font-semibold mb-3">Àwọn Ẹlẹ́ọ̀</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Membres ({activeTontine.members.length})
        </p>
        
        {activeTontine.members.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg mb-4">
            <p className="text-sm text-muted-foreground">Aucun membre pour le moment</p>
            <p className="text-xs text-muted-foreground mt-1">Utilisez le bouton + pour en ajouter</p>
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            {activeTontine.members.map((member) => {
              const contribution = activeTontine.contributions.find(
                (c) => c.memberId === member.id && c.tour === activeTontine.currentTour
              );
              const isBeneficiary = activeTontine.beneficiaryOrder[activeTontine.currentTour - 1] === member.id;
              return (
                <TontineMemberItem
                  key={member.id}
                  member={member}
                  isPaid={contribution?.isPaid ?? false}
                  amount={activeTontine.contributionAmount}
                  isCurrentBeneficiary={isBeneficiary}
                  onClick={() => setSelectedMemberId(member.id)}
                />
              );
            })}
          </div>
        )}

        <BottomNav onAddClick={() => setShowAddTransaction(true)} />
        <AddTransactionSheet isOpen={showAddTransaction} onClose={() => setShowAddTransaction(false)} />
        <AddTontineMembersSheet
          isOpen={showAddMembers}
          onClose={() => setShowAddMembers(false)}
          tontineId={selectedTontine!}
        />
        {selectedMember && (
          <TontinePaymentDialog
            isOpen={!!selectedMemberId}
            onClose={() => setSelectedMemberId(null)}
            member={selectedMember}
            amount={activeTontine.contributionAmount}
            tontineId={selectedTontine!}
            tour={activeTontine.currentTour}
            isPaid={selectedMemberContribution?.isPaid ?? false}
          />
        )}
      </div>
    );
  }

  return (
    <div className="mobile-container safe-area-top">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 mb-4">
        <h1 className="font-heading text-2xl font-bold">Àwọn Àjọ Mi</h1>
        <p className="text-muted-foreground text-sm">Mes tontines</p>
      </motion.header>

      {/* Benin flag stripe */}
      <div className="benin-stripe mb-4" />

      {tontines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-5xl mb-3">🤝</p>
          <p className="font-medium mb-1">Kò sí àjọ síbẹ̀</p>
          <p className="text-sm text-muted-foreground">Pas encore de tontine</p>
          <p className="text-xs text-muted-foreground mt-3">
            Appuyez sur le bouton + pour en créer une
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tontines.map((tontine) => (
            <TontineCard key={tontine.id} tontine={tontine} onClick={() => setSelectedTontine(tontine.id)} />
          ))}
        </div>
      )}

      <BottomNav onAddClick={() => setShowAddTontine(true)} />
      <AddTontineSheet isOpen={showAddTontine} onClose={() => setShowAddTontine(false)} />
      <AddTransactionSheet isOpen={showAddTransaction} onClose={() => setShowAddTransaction(false)} />
    </div>
  );
};

export default TontinePage;
