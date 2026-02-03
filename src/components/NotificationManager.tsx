import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Heart, 
  Handshake,
  Send,
  Settings,
  Eye,
  Trash2,
  Clock,
  User,
  Globe,
  BookOpen,
  Award
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'contribution' | 'donation' | 'partnership' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

interface NotificationSettings {
  emailNotifications: boolean;
  adminNotifications: boolean;
  emailRecipient: string;
  notificationTypes: {
    contributions: boolean;
    donations: boolean;
    partnerships: boolean;
    system: boolean;
  };
}

// Déclaration des types globaux
declare global {
  interface Window {
    notificationService?: {
      sendContributionNotification: (contributorName: string, language: string, wordCount: number) => void;
      sendDonationNotification: (amount: string, donorName?: string) => void;
      sendPartnershipNotification: (companyName: string, partnershipType: string) => void;
    };
  }
}

const NotificationManager = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    adminNotifications: true,
    emailRecipient: 'abattieucher@gmail.com',
    notificationTypes: {
      contributions: true,
      donations: true,
      partnerships: true,
      system: true
    }
  });
  const [showSettings, setShowSettings] = useState(false);

  // Charger les notifications au démarrage
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    setNotifications(savedNotifications);
    
    const savedSettings = JSON.parse(localStorage.getItem('notification_settings') || '{}');
    setSettings({...settings, ...savedSettings});
  }, []);

  // Sauvegarder les notifications
  useEffect(() => {
    localStorage.setItem('admin_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Envoyer une notification
  const sendNotification = (type: Notification['type'], title: string, message: string, data?: any) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      data
    };

    const newNotifications = [notification, ...notifications];
    setNotifications(newNotifications);

    // Envoyer par email si activé
    if (settings.emailNotifications && settings.notificationTypes[type]) {
      sendEmailNotification(notification);
    }

    // Notification browser si admin activé
    if (settings.adminNotifications && settings.notificationTypes[type]) {
      showBrowserNotification(notification);
    }
  };

  // Envoyer notification par email (simulation)
  const sendEmailNotification = async (notification: Notification) => {
    try {
      // Simuler l'envoi d'email
      const emailData = {
        to: settings.emailRecipient,
        subject: `OwoTọ́ọ̀mọ̀ - ${notification.title}`,
        body: `
          <h2>${notification.title}</h2>
          <p>${notification.message}</p>
          <p><strong>Date:</strong> ${new Date(notification.timestamp).toLocaleString('fr-FR')}</p>
          <p><strong>Type:</strong> ${notification.type}</p>
          <hr>
          <p><em>Cet email a été envoyé automatiquement par le système de notifications d'OwoTọ́ọ̀mọ̀</em></p>
        `,
        timestamp: notification.timestamp
      };

      // Sauvegarder l'email dans localStorage (simulation)
      const sentEmails = JSON.parse(localStorage.getItem('sent_emails') || '[]');
      sentEmails.push({
        ...emailData,
        sentAt: new Date().toISOString(),
        status: 'sent'
      });
      localStorage.setItem('sent_emails', JSON.stringify(sentEmails));

      console.log('Email envoyé:', emailData);
    } catch (error) {
      console.error('Erreur envoi email:', error);
    }
  };

  // Afficher notification browser
  const showBrowserNotification = (notification: Notification) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico',
            tag: notification.id
          });
        }
      });
    }
  };

  // Marquer comme lu
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Supprimer notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Marquer tout comme lu
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Vider toutes les notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Obtenir l'icône selon le type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'contribution': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'donation': return <Heart className="w-5 h-5 text-red-500" />;
      case 'partnership': return <Handshake className="w-5 h-5 text-green-500" />;
      case 'system': return <AlertCircle className="w-5 h-5 text-gray-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Demander la permission pour les notifications browser
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Initialiser le service global
  useEffect(() => {
    window.notificationService = {
      sendContributionNotification: (contributorName: string, language: string, wordCount: number) => {
        sendNotification(
          'contribution',
          '📖 Nouvelle Contribution Linguistique',
          `${contributorName} a soumis ${wordCount} traductions en ${language}`,
          { contributorName, language, wordCount }
        );
      },
      sendDonationNotification: (amount: string, donorName?: string) => {
        sendNotification(
          'donation',
          '💝 Nouveau Don Reçu',
          `${donorName || 'Un anonyme'} a fait un don de ${amount} FCFA`,
          { amount, donorName }
        );
      },
      sendPartnershipNotification: (companyName: string, partnershipType: string) => {
        sendNotification(
          'partnership',
          '🤝 Demande de Partenariat',
          `${companyName} souhaite établir un partenariat ${partnershipType}`,
          { companyName, partnershipType }
        );
      }
    };
  }, [settings, notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
          <Button variant="outline" onClick={markAllAsRead}>
            <Eye className="w-4 h-4 mr-2" />
            Tout marquer comme lu
          </Button>
          <Button variant="outline" onClick={clearAll}>
            <Trash2 className="w-4 h-4 mr-2" />
            Vider tout
          </Button>
        </div>
      </div>

      {/* Paramètres */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                />
                <span>Notifications par email</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.adminNotifications}
                  onChange={(e) => setSettings({...settings, adminNotifications: e.target.checked})}
                />
                <span>Notifications admin</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email destinataire</label>
              <Input
                type="email"
                value={settings.emailRecipient}
                onChange={(e) => setSettings({...settings, emailRecipient: e.target.value})}
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Types de notifications</h4>
              <div className="space-y-2">
                {Object.entries(settings.notificationTypes).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationTypes: {
                          ...settings.notificationTypes,
                          [key]: e.target.checked
                        }
                      })}
                    />
                    <span className="capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button onClick={() => localStorage.setItem('notification_settings', JSON.stringify(settings))}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucune notification</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={!notification.read ? 'border-l-4 border-l-blue-500' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(notification.timestamp).toLocaleString('fr-FR')}
                        </span>
                        <Badge variant={notification.read ? 'secondary' : 'default'}>
                          {notification.read ? 'Lu' : 'Non lu'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
