import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { LanguageSelector } from '@/components/LanguageSelector';
import { NotificationsSettings } from '@/components/NotificationsSettings';
import { SecuritySettings } from '@/components/SecuritySettings';
import { ExportSettings } from '@/components/ExportSettings';
import { Onboarding } from '@/components/Onboarding';

const SettingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const completeOnboarding = useStore((state) => state.completeOnboarding);
  const resetOnboarding = useStore((state) => state.resetOnboarding);

  const handleRestartOnboarding = () => {
    resetOnboarding(); // Réinitialise le flag
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    completeOnboarding();
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('settings')}</h1>
            <p className="text-gray-600">Personnalisez votre expérience OwoTọ́ọ̀mọ̀</p>
          </div>
        </div>

        {/* Relancer l'onboarding */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Besoin d'aide?</h3>
                <p className="text-sm text-blue-800 mb-4">
                  Revoyez le guide complet des 7 étapes pour bien comprendre toutes les fonctionnalités de OwoTọ́ọ̀mọ̀.
                </p>
                <Button
                  onClick={handleRestartOnboarding}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Relancer l'introduction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sélecteur de langue */}
        <LanguageSelector />

        {/* Notifications et Rappels */}
        <NotificationsSettings />

        {/* Sécurité */}
        <SecuritySettings />

        {/* Exportation */}
        <ExportSettings />

        {/* Informations sur l'application */}
        <Card>
          <CardHeader>
            <CardTitle>À propos de OwoTọ́ọ̀mọ̀</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <span className="font-medium">Version :</span> 1.0.0
              </div>
              <div>
                <span className="font-medium">Créé par :</span> Eucher ABATTI
              </div>
              <div>
                <span className="font-medium">Langues :</span> 6 langues disponibles
              </div>
              <div>
                <span className="font-medium">Type :</span> Gestionnaire Financier
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
