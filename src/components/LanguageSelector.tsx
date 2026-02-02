import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, Trash2, Settings, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const languages = [
  { code: 'fr', name: 'Français', nativeName: 'Français', icon: '🇫🇷', category: 'african' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', icon: '🇳🇬', category: 'african' },
  { code: 'fon', name: 'Fon', nativeName: 'Fɔ́ngbè', icon: '🇧🇯', category: 'african' },
  { code: 'goun', name: 'Goun', nativeName: 'Gungbe', icon: '🇧🇯', category: 'african' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', icon: '🇹🇿', category: 'african' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wolof', icon: '🇸🇳', category: 'african' },
  { code: 'en', name: 'English', nativeName: 'English', icon: '🇬🇧', category: 'international' },
  { code: 'es', name: 'Español', nativeName: 'Español', icon: '🇪🇸', category: 'international' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', icon: '🇩🇪', category: 'international' },
  { code: 'zh', name: '中文', nativeName: '简体中文', icon: '🇨🇳', category: 'international' },
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [search, setSearch] = useState('');
  const [isClearingData, setIsClearingData] = useState(false);

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const africanLanguages = filteredLanguages.filter(lang => lang.category === 'african');
  const internationalLanguages = filteredLanguages.filter(lang => lang.category === 'international');

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setCurrentLang(lng);
      localStorage.setItem('preferredLanguage', lng);
      
      // Show success notification
      const langName = languages.find(l => l.code === lng)?.nativeName || lng;
      toast.success(t('language_changed') + ` - ${langName}`);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
      toast.error('Erreur lors du changement de langue');
    }
  };

  const handleClearData = async () => {
    setIsClearingData(true);
    try {
      // Effacer les données du localStorage
      localStorage.clear();
      sessionStorage.clear();
      
      // Effacer IndexedDB
      if ('indexedDB' in window) {
        const databases = await indexedDB.databases();
        await Promise.all(
          databases.map(db => indexedDB.deleteDatabase(db.name!))
        );
      }
      
      // Show success notification
      toast.success(t('data_cleared'));
      
      // Recharger la page pour réinitialiser l'application
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Erreur lors de l\'effacement des données:', error);
      toast.error('Erreur lors de l\'effacement des données');
    } finally {
      setIsClearingData(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {t('settings')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection de la langue */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {t('language')}
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Rechercher une langue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <div className="max-h-60 overflow-y-auto space-y-1">
              {/* Langues Africaines */}
              {africanLanguages.length > 0 && (
                <>
                  <div className="text-xs font-semibold text-gray-500 mt-2 mb-1">LANGUES AFRICAINES</div>
                  {africanLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        currentLang === lang.code
                          ? 'bg-green-100 border-green-500'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.icon}</span>
                          <div>
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-sm text-gray-600">{lang.nativeName}</div>
                          </div>
                        </div>
                        {currentLang === lang.code && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Langues Internationales */}
              {internationalLanguages.length > 0 && (
                <>
                  <div className="text-xs font-semibold text-gray-500 mt-2 mb-1">LANGUES INTERNATIONALES</div>
                  {internationalLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        currentLang === lang.code
                          ? 'bg-green-100 border-green-500'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.icon}</span>
                          <div>
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-sm text-gray-600">{lang.nativeName}</div>
                          </div>
                        </div>
                        {currentLang === lang.code && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bouton d'effacement des données */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600">
            <Trash2 className="h-4 w-4" />
            {t('clear_data')}
          </h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full" disabled={isClearingData}>
                {isClearingData ? 'Effacement...' : t('clear_data')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  {t('confirm_clear_data')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t('confirm_clear_data')}
                </p>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline">
                    {t('cancel')}
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleClearData}
                    disabled={isClearingData}
                  >
                    {isClearingData ? 'Effacement...' : t('confirm')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
