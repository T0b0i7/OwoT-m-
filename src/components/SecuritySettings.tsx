import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SecuritySettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [security, setSecurity] = useState({
    pinEnabled: false,
    hideBalance: false,
    biometricEnabled: false,
  });

  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [showRemovePin, setShowRemovePin] = useState(false);

  // Charger les paramètres depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('securitySettings');
    if (saved) {
      setSecurity(JSON.parse(saved));
    }
  }, []);

  const handleSecurityChange = (key: string, value: boolean) => {
    const updated = { ...security, [key]: value };
    setSecurity(updated);
    localStorage.setItem('securitySettings', JSON.stringify(updated));
  };

  const handleSetPin = () => {
    if (!pin || !pinConfirm) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs',
        variant: 'destructive',
      });
      return;
    }

    if (pin !== pinConfirm) {
      toast({
        title: 'Erreur',
        description: 'Les codes PIN ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    if (pin.length < 4) {
      toast({
        title: 'Erreur',
        description: 'Le code PIN doit contenir au moins 4 chiffres',
        variant: 'destructive',
      });
      return;
    }

    localStorage.setItem('appPin', btoa(pin));
    const updated = { ...security, pinEnabled: true };
    setSecurity(updated);
    localStorage.setItem('securitySettings', JSON.stringify(updated));
    
    toast({
      title: 'Code PIN défini',
      description: 'Votre code PIN a été configuré avec succès',
    });

    setPin('');
    setPinConfirm('');
    setShowPinDialog(false);
  };

  const handleRemovePin = () => {
    const storedPin = localStorage.getItem('appPin');
    if (!storedPin) {
      toast({
        title: 'Erreur',
        description: 'Aucun code PIN configuré',
        variant: 'destructive',
      });
      return;
    }

    if (btoa(currentPin) !== storedPin) {
      toast({
        title: 'Erreur',
        description: 'Code PIN incorrect',
        variant: 'destructive',
      });
      return;
    }

    localStorage.removeItem('appPin');
    const updated = { ...security, pinEnabled: false };
    setSecurity(updated);
    localStorage.setItem('securitySettings', JSON.stringify(updated));
    
    toast({
      title: 'Code PIN supprimé',
      description: 'Votre code PIN a été supprimé',
    });

    setCurrentPin('');
    setShowRemovePin(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Sécurité et Protection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Code PIN */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Protection par code PIN
          </h3>

          <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Code PIN</p>
              <p className="text-xs text-gray-600 mt-1">
                {security.pinEnabled 
                  ? 'Code PIN activé - Vous devrez le saisir au démarrage'
                  : 'Ajouter un code PIN pour protéger l\'accès à l\'application'}
              </p>
            </div>
            <Switch
              checked={security.pinEnabled}
              onCheckedChange={(value) => {
                if (value) {
                  setShowPinDialog(true);
                } else {
                  setShowRemovePin(true);
                }
              }}
            />
          </div>

          {/* Dialog pour définir le PIN */}
          <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Définir un code PIN</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Code PIN (4-6 chiffres)</label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="0000"
                    maxLength={6}
                    className="w-full mt-2 px-3 py-2 border rounded-lg text-lg letter-spacing"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Confirmer le code PIN</label>
                  <input
                    type="password"
                    value={pinConfirm}
                    onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, ''))}
                    placeholder="0000"
                    maxLength={6}
                    className="w-full mt-2 px-3 py-2 border rounded-lg text-lg letter-spacing"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowPinDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSetPin}>
                    Définir le PIN
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog pour supprimer le PIN */}
          <Dialog open={showRemovePin} onOpenChange={setShowRemovePin}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Supprimer le code PIN
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Entrez votre code PIN actuel pour le supprimer
                </p>
                <input
                  type="password"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="0000"
                  maxLength={6}
                  className="w-full px-3 py-2 border rounded-lg text-lg letter-spacing"
                />
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setShowRemovePin(false)}>
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleRemovePin}>
                    Supprimer le PIN
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Autres options de sécurité */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold text-sm text-gray-700">Confidentialité</h3>

          <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Masquer le solde
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Masquer le solde sur l'écran d'accueil
              </p>
            </div>
            <Switch
              checked={security.hideBalance}
              onCheckedChange={(value) => handleSecurityChange('hideBalance', value)}
            />
          </div>

          {/* Biométrie (future feature) */}
          <div className="flex items-start justify-between p-3 bg-gray-100 rounded-lg opacity-60">
            <div>
              <p className="font-medium text-sm text-gray-700">Authentification biométrique</p>
              <p className="text-xs text-gray-600 mt-1">
                Disponible bientôt - Empreinte digitale / Reconnaissance faciale
              </p>
            </div>
            <Switch disabled checked={false} />
          </div>
        </div>

        {/* Historique d'accès */}
        <div className="p-3 bg-gray-50 rounded-lg space-y-2">
          <p className="font-medium text-sm">Historique de sécurité</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Dernière connexion: Aujourd'hui à 14:30</li>
            <li>✓ Appareil: Chrome sur Windows</li>
            <li>✓ Localisation: Non partagée</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
