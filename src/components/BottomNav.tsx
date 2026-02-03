import { useLocation, useNavigate } from 'react-router-dom';
import { Home, PieChart, Users, Target, Plus, Settings, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Accueil', sublabel: 'Accueil' },
  { path: '/stats', icon: PieChart, label: 'Stats', sublabel: 'Statistiques' },
  { path: '/budgets', icon: Target, label: 'Budget', sublabel: 'Budgets' },
  { path: '/tontine', icon: Users, label: 'Tontine', sublabel: 'Tontine' },
  { path: '/settings', icon: Settings, label: 'Params', sublabel: 'Paramètres' },
  { path: '/contributeurs', icon: Languages, label: 'Contributeurs', sublabel: 'Espace Contributeurs' },
];

interface BottomNavProps {
  onAddClick: () => void;
}

export function BottomNav({ onAddClick }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

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
          {navItems.map((item) => {
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
        </div>
      </nav>
    </>
  );
}
