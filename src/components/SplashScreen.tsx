import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 30;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isComplete, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col items-center justify-center p-6 safe-area">
      {/* Logo avec animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <img
          src="/Owo.png"
          alt="OwoTọ́ọ̀mọ̀"
          className="w-32 h-32 object-contain"
        />
      </motion.div>

      {/* Titre avec animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-2"
      >
        <h1 className="font-heading text-4xl font-bold">
          <span className="text-foreground">Owo</span>
          <span className="text-primary">Tọ́ọ̀mọ̀</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mb-12 space-y-2"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">
          Gestionnaire Financier
        </p>
        <p className="text-xs text-muted-foreground">
          Gestion complète de vos finances & tontines
        </p>
      </motion.div>

      {/* Barre de progression */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-xs space-y-4"
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-4">
          {[0, 1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: progress >= (i + 1) * 25 ? 1 : 0.8,
                backgroundColor: progress >= (i + 1) * 25 ? 'var(--color-primary)' : 'var(--color-secondary)',
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.2 }}
            className="h-full bg-primary rounded-full"
          />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">
            Chargement...
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Préparation de votre espace personnel
          </p>
        </div>
      </motion.div>

      {/* Décoration */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-3xl"
      >
        💰
      </motion.div>
    </div>
  );
}
