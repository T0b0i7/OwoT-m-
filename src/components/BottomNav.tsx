import { useLocation, useNavigate } from 'react-router-dom';
import { Home, PieChart, Users, Target, Plus, Settings, Languages, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const mainNavItems = [
  { path: '/', icon: Home, label: 'Accueil', sublabel: 'Accueil' },
  { path: '/stats', icon: PieChart, label: 'Stats', sublabel: 'Statistiques' },
  { path: '/budgets', icon: Target, label: 'Budget', sublabel: 'Budgets' },
  { path: '/tontine', icon: Users, label: 'Tontine', sublabel: 'Tontine' },
];

const secondaryNavItems = [
  { path: '/settings', icon: Settings, label: 'Params', sublabel: 'Paramètres' },
  { path: '/contributeurs', icon: Languages, label: 'Contributeurs', sublabel: 'Espace Contributeurs' },
];

interface BottomNavProps {
  onAddClick: () => void;
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button - Jaune Richesse */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAddClick}
        className="fab"
      >
        <Plus className="w-7 h-7 text-foreground" />
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="flex justify-around items-center max-w-md mx-auto py-2">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn('nav-item relative', isActive && 'active')}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </button>
            );
          })}

          {/* Menu Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn('nav-item relative', isMenuOpen && 'active')}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-20 left-0 right-0 bg-background border-t border-border z-50 rounded-t-2xl shadow-lg"
            >
              <div className="p-4">
                <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
                  Plus d'options
                </h3>
                <div className="space-y-2">
                  {secondaryNavItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                      <motion.button
                        key={item.path}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 p-3 rounded-xl transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1 text-left">
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.sublabel}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
