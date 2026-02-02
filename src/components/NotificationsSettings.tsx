import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NotificationsSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    lowBalance: true,
    budgetAlert: true,
    dailyReminder: false,
    tontineReminder: true,
  });

  const [reminders, setReminders] = useState({
    lowBalanceThreshold: '10000',
    budgetWarnPercent: '80',
    dailyReminderTime: '08:00',
    tontineReminderDay: '15',
  });

  // Charger les paramètres depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
    const savedReminders = localStorage.getItem('reminderSettings');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  const handleNotificationChange = (key: string, value: boolean) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    localStorage.setItem('notificationSettings', JSON.stringify(updated));
    toast({
      title: 'Paramètre mis à jour',
      description: `Notification ${key} ${value ? 'activée' : 'désactivée'}`,
    });
  };

  const handleReminderChange = (key: string, value: string) => {
    const updated = { ...reminders, [key]: value };
    setReminders(updated);
    localStorage.setItem('reminderSettings', JSON.stringify(updated));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications et Rappels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notifications principales */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-gray-700">Alertes</h3>
          
          {/* Solde faible */}
          <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Solde faible</p>
              <p className="text-xs text-gray-600 mt-1">
                Recevoir une alerte quand le solde descend en dessous de
              </p>
              <input
                type="number"
                value={reminders.lowBalanceThreshold}
                onChange={(e) => handleReminderChange('lowBalanceThreshold', e.target.value)}
                className="mt-2 w-32 px-2 py-1 text-sm border rounded"
                placeholder="10000"
              />
              <span className="ml-2 text-sm text-gray-600">FCFA</span>
            </div>
            <Switch
              checked={notifications.lowBalance}
              onCheckedChange={(value) => handleNotificationChange('lowBalance', value)}
            />
          </div>

          {/* Dépassement de budget */}
          <div className="flex items-start justify-between p-3 bg-orange-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Dépassement de budget</p>
              <p className="text-xs text-gray-600 mt-1">
                Alerte quand la dépense atteint
              </p>
              <input
                type="number"
                min="0"
                max="100"
                value={reminders.budgetWarnPercent}
                onChange={(e) => handleReminderChange('budgetWarnPercent', e.target.value)}
                className="mt-2 w-20 px-2 py-1 text-sm border rounded"
                placeholder="80"
              />
              <span className="ml-2 text-sm text-gray-600">% du budget</span>
            </div>
            <Switch
              checked={notifications.budgetAlert}
              onCheckedChange={(value) => handleNotificationChange('budgetAlert', value)}
            />
          </div>

          {/* Rappel tontine */}
          <div className="flex items-start justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Rappel Tontine</p>
              <p className="text-xs text-gray-600 mt-1">
                Rappel le jour
              </p>
              <input
                type="number"
                min="1"
                max="31"
                value={reminders.tontineReminderDay}
                onChange={(e) => handleReminderChange('tontineReminderDay', e.target.value)}
                className="mt-2 w-20 px-2 py-1 text-sm border rounded"
                placeholder="15"
              />
              <span className="ml-2 text-sm text-gray-600">de chaque mois</span>
            </div>
            <Switch
              checked={notifications.tontineReminder}
              onCheckedChange={(value) => handleNotificationChange('tontineReminder', value)}
            />
          </div>
        </div>

        {/* Rappels quotidiens */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Rappels quotidiens
          </h3>

          <div className="flex items-start justify-between p-3 bg-purple-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Rappel quotidien</p>
              <p className="text-xs text-gray-600 mt-1">
                Vous rappeler de vérifier vos dépenses à
              </p>
              <input
                type="time"
                value={reminders.dailyReminderTime}
                onChange={(e) => handleReminderChange('dailyReminderTime', e.target.value)}
                className="mt-2 px-2 py-1 text-sm border rounded"
              />
            </div>
            <Switch
              checked={notifications.dailyReminder}
              onCheckedChange={(value) => handleNotificationChange('dailyReminder', value)}
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-3 bg-gray-50 rounded-lg flex gap-2 text-xs text-gray-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            Les notifications seront affichées dans l'application. Pour recevoir des notifications 
            sur votre appareil, veuillez autoriser les permissions du navigateur.
          </p>
        </div>

        <Button variant="outline" className="w-full">
          Tester les notifications
        </Button>
      </CardContent>
    </Card>
  );
};
