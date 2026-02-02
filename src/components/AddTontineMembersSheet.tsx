import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { TontineMember } from '@/types';

interface AddTontineMembersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tontineId: string;
}

export function AddTontineMembersSheet({ isOpen, onClose, tontineId }: AddTontineMembersSheetProps) {
  const [members, setMembers] = useState<Omit<TontineMember, 'id'>[]>([
    { name: '', phone: '', avatar: '👤' },
  ]);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const tontines = useStore((state) => state.tontines);
  const updateTontine = useStore((state) => state.updateTontine);

  const tontine = tontines.find((t) => t.id === tontineId);

  const handleAddMember = () => {
    setMembers([...members, { name: '', phone: '', avatar: '👤' }]);
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index: number, field: keyof TontineMember, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleAvatarChange = (index: number, avatar: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], avatar };
    setMembers(updated);
  };

  const handleSubmit = () => {
    const validMembers = members.filter((m) => m.name.trim().length > 0);

    if (validMembers.length === 0) {
      toast({
        title: 'Erreur',
        description: 'Veuillez ajouter au moins un membre',
        variant: 'destructive',
      });
      return;
    }

    if (!tontine) return;

    // Generate IDs for new members
    const newMembers: TontineMember[] = validMembers.map((m, idx) => ({
      id: `m${Date.now()}_${idx}`,
      name: m.name,
      phone: m.phone,
      avatar: m.avatar,
    }));

    // Create beneficiary order - repeat members if necessary
    const allMembers = [...tontine.members, ...newMembers];
    const beneficiaryOrder = [];
    for (let i = 0; i < tontine.totalTours; i++) {
      beneficiaryOrder.push(allMembers[i % allMembers.length].id);
    }

    // Update tontine
    updateTontine(tontineId, {
      members: allMembers,
      beneficiaryOrder,
    });

    toast({
      title: 'Membres ajoutés',
      description: `${newMembers.length} membre(s) ont été ajouté(s)!`,
    });

    // Reset and close
    setMembers([{ name: '', phone: '', avatar: '👤' }]);
    onClose();
  };

  const avatarOptions = ['👤', '👨', '👩', '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '🧑'];

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
              <div>
                <h2 className="font-heading text-xl font-bold">Ajouter des membres</h2>
                <p className="text-sm text-muted-foreground">
                  {tontine?.name}
                </p>
              </div>
              <button onClick={onClose} className="p-2 -mr-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="border border-input rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Membre {index + 1}</p>
                    {members.length > 1 && (
                      <button
                        onClick={() => handleRemoveMember(index)}
                        className="p-1 text-destructive hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Name */}
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    value={member.phone || ''}
                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />

                  {/* Avatar */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Avatar</p>
                    <div className="flex flex-wrap gap-2">
                      {avatarOptions.map((avatar) => (
                        <button
                          key={avatar}
                          onClick={() => handleAvatarChange(index, avatar)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            member.avatar === avatar
                              ? 'bg-primary/20 ring-2 ring-primary'
                              : 'bg-secondary hover:bg-secondary/80'
                          }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Member Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddMember}
                className="w-full py-2 border border-dashed border-primary text-primary rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-primary/5"
              >
                <Plus className="w-4 h-4" />
                Ajouter un membre
              </motion.button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90"
            >
              <Check className="w-5 h-5" />
              Ajouter {members.filter((m) => m.name.trim().length > 0).length} membre(s)
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
