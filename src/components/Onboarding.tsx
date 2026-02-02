import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  emoji: string;
  tips: string[];
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Bienvenue à OwoTọ́ọ̀mọ̀',
    description: 'Votre gestionnaire financier personnel pour une meilleure gestion de votre argent',
    emoji: '👋',
    tips: [
      '📱 Application mobile-first',
      '🔒 Vos données restent privées (localStorage)',
      '🌍 Support de 6 langues',
    ],
  },
  {
    id: 2,
    title: 'Enregistrez vos transactions',
    description: 'Tracez facilement vos revenus et dépenses avec des catégories intelligentes',
    emoji: '💰',
    tips: [
      '➕ Cliquez le bouton + pour ajouter',
      '📊 Catégories: alimentation, transport, etc.',
      '📅 Historique complet de vos transactions',
    ],
  },
  {
    id: 3,
    title: 'Gérez vos budgets',
    description: 'Fixez des limites de dépenses par catégorie et restez dans le contrôle',
    emoji: '📈',
    tips: [
      '🎯 Définir un budget max par catégorie',
      '⚠️ Alertes quand vous approchez la limite',
      '📊 Suivi de la progression en temps réel',
    ],
  },
  {
    id: 4,
    title: 'Organisez vos tontines',
    description: 'Créez des groupes d\'épargne collective avec vos amis et famille',
    emoji: '🤝',
    tips: [
      '👥 Créer un groupe avec des membres',
      '💵 Chacun cotise régulièrement',
      '🎁 À chaque tour, un bénéficiaire reçoit le pot',
    ],
  },
  {
    id: 5,
    title: 'Sécurisez vos données',
    description: 'Protégez votre compte avec un code PIN et d\'autres options de sécurité',
    emoji: '🔐',
    tips: [
      '🔑 Code PIN personnel (4-6 chiffres)',
      '👁️ Masquer le solde à l\'écran',
      '📲 Biometric ready (iOS/Android)',
    ],
  },
  {
    id: 6,
    title: 'Exportez vos données',
    description: 'Téléchargez vos données en CSV ou JSON pour une sauvegarde sécurisée',
    emoji: '📤',
    tips: [
      '💾 Export en CSV (Excel compatible)',
      '📋 Export en JSON (structure complète)',
      '☁️ Cloud sync ready',
    ],
  },
  {
    id: 7,
    title: 'Changez de langue',
    description: 'L\'app supporte 6 langues pour vous',
    emoji: '🌍',
    tips: [
      '🇫🇷 Français',
      '🇳🇬 Yoruba (Yorùbá)',
      '🇬🇧 English, Español, Deutsch, 简体中文',
    ],
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col justify-between p-6 safe-area-top safe-area-bottom">
      {/* Header avec progression */}
      <div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Étape {currentStep + 1}/{steps.length}
            </p>
            <p className="text-sm font-medium text-primary">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </p>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* Contenu */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Emoji grand */}
            <div className="text-center">
              <div className="inline-block text-6xl mb-4">{step.emoji}</div>
            </div>

            {/* Titre et description */}
            <div className="space-y-2 text-center">
              <h2 className="font-heading text-2xl font-bold">{step.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Tips */}
            <div className="bg-accent/10 rounded-lg p-4 space-y-3">
              {step.tips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-sm text-foreground">{tip}</p>
                </motion.div>
              ))}
            </div>

            {/* Indicateurs de points */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  whileTap={{ scale: 0.8 }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStep ? 'bg-primary w-6' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Boutons navigation */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          disabled={isFirstStep}
          className="flex-1 py-3 border border-input rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
        >
          {isLastStep ? (
            <>
              <Check className="w-4 h-4" />
              Commencer
            </>
          ) : (
            <>
              Suivant
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Skip button */}
      <div className="text-center mt-4">
        <button
          onClick={onComplete}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Ignorer l'introduction
        </button>
      </div>
    </div>
  );
}
