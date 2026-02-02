import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useStore } from '@/store/useStore';
import { getCategoryById } from '@/data/categories';
import { formatCFA, getCurrentMonth } from '@/lib/format';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function ExpensePieChart() {
  const transactions = useStore((state) => state.transactions);

  const expenses = useMemo(() => {
    const month = getCurrentMonth();
    const out: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(month))
      .forEach((t) => {
        out[t.category] = (out[t.category] || 0) + t.amount;
      });
    return out;
  }, [transactions]);

  const data = Object.entries(expenses)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => {
      const cat = getCategoryById(category as any);
      return {
        name: cat.name,
        value,
        color: cat.color,
        icon: cat.icon,
      };
    })
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((acc, d) => acc + d.value, 0);

  if (data.length === 0) {
    return (
      <div className="chart-container text-center py-8">
        <p className="text-4xl mb-2">📊</p>
        <p className="text-muted-foreground">Pas de dépenses ce mois</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="chart-container"
    >
      <h3 className="font-heading font-semibold mb-4">Répartition des dépenses</h3>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.slice(0, 5).map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.icon} {item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium">{formatCFA(item.value)}</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
