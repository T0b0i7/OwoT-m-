import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Globe, 
  Heart, 
  Handshake, 
  BookOpen, 
  Languages, 
  Mail, 
  Phone, 
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Award,
  MessageCircle,
  Send,
  FileText,
  Download,
  Upload
} from 'lucide-react';

interface TranslationContribution {
  id: string;
  contributorName: string;
  language: string;
  word: string;
  translation: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

const ContributorSpace = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'translate' | 'donate' | 'partnership'>('home');
  const [contributorInfo, setContributorInfo] = useState({
    name: '',
    email: '',
    language: '',
    motivation: ''
  });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [translations, setTranslations] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Mots à traduire dans l'application
  const wordsToTranslate = [
    { french: 'Bonjour', category: 'Salutations' },
    { french: 'Merci', category: 'Salutations' },
    { french: 'Au revoir', category: 'Salutations' },
    { french: 'Oui', category: 'Réponses' },
    { french: 'Non', category: 'Réponses' },
    { french: 'S\'il vous plaît', category: 'Politesse' },
    { french: 'Excusez-moi', category: 'Politesse' },
    { french: 'Comment allez-vous ?', category: 'Questions' },
    { french: 'Je ne comprends pas', category: 'Communication' },
    { french: 'Pouvez-vous m\'aider ?', category: 'Questions' },
    { french: 'Accueil', category: 'Navigation' },
    { french: 'Paramètres', category: 'Navigation' },
    { french: 'Profil', category: 'Navigation' },
    { french: 'Rechercher', category: 'Actions' },
    { french: 'Télécharger', category: 'Actions' },
    { french: 'Partager', category: 'Actions' },
    { french: 'Aimer', category: 'Actions' },
    { french: 'Commenter', category: 'Actions' },
    { french: 'Envoyer', category: 'Actions' },
    { french: 'Annuler', category: 'Actions' }
  ];

  const languages = [
    { code: 'yo', name: 'Yorùbá', nativeName: 'Èdè Yorùbá', icon: '🇳🇬' },
    { code: 'fon', name: 'Fon', nativeName: 'Fɔ́ngbè', icon: '🇧🇯' },
    { code: 'goun', name: 'Goun', nativeName: 'Gungbe', icon: '🇧🇯' },
    { code: 'wo', name: 'Wolof', nativeName: 'Wolof', icon: '🇸🇳' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', icon: '🇹🇿' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa', icon: '🇳🇬' },
    { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', icon: '🇳🇬' },
    { code: 'zu', name: 'Zulu', nativeName: 'IsiZulu', icon: '🇿🇦' },
    { code: 'am', name: 'Amharique', nativeName: 'አማርኛ', icon: '🇪🇹' },
    { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', icon: '🇪🇹' }
  ];

  const handleContributionSubmit = () => {
    // Sauvegarder la contribution
    const contribution = {
      contributorInfo,
      selectedWords,
      translations,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('translation_contribution', JSON.stringify(contribution));
    setShowSuccess(true);
    
    // Envoyer la notification à l'admin
    if (window.notificationService) {
      window.notificationService.sendContributionNotification(
        contributorInfo.name,
        contributorInfo.language,
        selectedWords.length
      );
    }
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setShowSuccess(false);
      setActiveTab('home');
      setContributorInfo({ name: '', email: '', language: '', motivation: '' });
      setSelectedWords([]);
      setTranslations({});
    }, 3000);
  };

  const renderHome = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <Languages className="w-8 h-8 mr-3" />
          Espace Contributeurs Linguistiques
        </h1>
        <p className="text-lg mb-6">
          Rejoignez notre mission de rendre OwoTọ́ọ̀mọ̀ accessible dans toutes les langues africaines
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
            <Users className="w-6 h-6 mb-2" />
            <h3 className="font-semibold">500+ Contributeurs</h3>
            <p className="text-sm">Déjà engagés</p>
          </div>
          <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
            <Globe className="w-6 h-6 mb-2" />
            <h3 className="font-semibold">25+ Langues</h3>
            <p className="text-sm">En cours de traduction</p>
          </div>
          <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
            <Target className="w-6 h-6 mb-2" />
            <h3 className="font-semibold">1000+ Mots</h3>
            <p className="text-sm">À traduire</p>
          </div>
        </div>
      </div>

      {/* Options principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('translate')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
              Traduire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Contribuez à la traduction de l'application dans votre langue maternelle
            </p>
            <Button className="w-full">
              Commencer à traduire
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('donate')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-500" />
              Faire un don
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Soutenez financièrement le développement de l'application
            </p>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Faire un don
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('partnership')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Handshake className="w-6 h-6 mr-2 text-green-500" />
              Partenariat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Devenez partenaire pour un développement gagnant-gagnant
            </p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Devenir partenaire
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Témoignages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Témoignages de Contributeurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="italic mb-2">
                "Contribuer à la traduction en Yorùbá m'a permis de préserver ma langue tout en aidant ma communauté."
              </p>
              <p className="text-sm text-gray-600">- Adébáyọ̀, Nigéria</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="italic mb-2">
                "L'application est maintenant utilisée dans toute notre école grâce aux traductions en Fon."
              </p>
              <p className="text-sm text-gray-600">- Mariam, Bénin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTranslate = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          Traduire l'Application
        </h2>
        <Button variant="outline" onClick={() => setActiveTab('home')}>
          Retour
        </Button>
      </div>

      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Votre contribution a été enregistrée avec succès ! Merci de participer à l'évolution linguistique d'OwoTọ́ọ̀mọ̀.
          </AlertDescription>
        </Alert>
      )}

      {/* Informations du contributeur */}
      <Card>
        <CardHeader>
          <CardTitle>Informations du Contributeur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nom complet</label>
            <Input
              placeholder="Votre nom"
              value={contributorInfo.name}
              onChange={(e) => setContributorInfo({...contributorInfo, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="votre@email.com"
              value={contributorInfo.email}
              onChange={(e) => setContributorInfo({...contributorInfo, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Langue de traduction</label>
            <select
              className="w-full p-2 border rounded-md"
              value={contributorInfo.language}
              onChange={(e) => setContributorInfo({...contributorInfo, language: e.target.value})}
            >
              <option value="">Choisissez une langue</option>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.icon} {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pourquoi voulez-vous contribuer ?</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Partagez votre motivation..."
              value={contributorInfo.motivation}
              onChange={(e) => setContributorInfo({...contributorInfo, motivation: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sélection des mots à traduire */}
      <Card>
        <CardHeader>
          <CardTitle>Sélectionnez les mots à traduire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wordsToTranslate.map((word, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedWords.includes(word.french)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWords([...selectedWords, word.french]);
                      } else {
                        setSelectedWords(selectedWords.filter(w => w !== word.french));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium">{word.french}</p>
                    <p className="text-sm text-gray-500">{word.category}</p>
                  </div>
                </div>
                {selectedWords.includes(word.french) && (
                  <Input
                    placeholder="Traduction dans votre langue"
                    value={translations[word.french] || ''}
                    onChange={(e) => setTranslations({...translations, [word.french]: e.target.value})}
                    className="w-48"
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soumission */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => setActiveTab('home')}>
          Annuler
        </Button>
        <Button 
          onClick={handleContributionSubmit}
          disabled={!contributorInfo.name || !contributorInfo.email || !contributorInfo.language || selectedWords.length === 0}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Send className="w-4 h-4 mr-2" />
          Soumettre la traduction
        </Button>
      </div>
    </div>
  );

  const renderDonate = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-500" />
          Faire un Don
        </h2>
        <Button variant="outline" onClick={() => setActiveTab('home')}>
          Retour
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Soutenir le Développement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Votre soutien financier nous permet de continuer à développer et améliorer OwoTọ́ọ̀mọ̀ 
            pour rendre les langues africaines accessibles à tous.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Comment votre don aide :</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Développement de nouvelles fonctionnalités
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Amélioration des performances
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Support technique pour les contributeurs
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Organisation d'événements linguistiques
              </li>
            </ul>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Pour faire un don</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Téléphone :</span>
                <span className="bg-white px-3 py-1 rounded">57002427</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Email :</span>
                <span className="bg-white px-3 py-1 rounded">abattieucher@gmail.com</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Contactez-nous directement pour discuter des options de don
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Award className="w-8 h-8 mx-auto mb-2 text-bronze" />
              <h4 className="font-semibold">Don Bronze</h4>
              <p className="text-sm text-gray-600">1.000 - 5.000 FCFA</p>
              <p className="text-xs mt-2">Mention sur le site</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Award className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <h4 className="font-semibold">Don Argent</h4>
              <p className="text-sm text-gray-600">5.000 - 20.000 FCFA</p>
              <p className="text-xs mt-2">Badge de contributeur</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="font-semibold">Don Or</h4>
              <p className="text-sm text-gray-600">20.000+ FCFA</p>
              <p className="text-xs mt-2">Partenaire prioritaire</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPartnership = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Handshake className="w-6 h-6 mr-2 text-green-500" />
          Partenariat Gagnant-Gagnant
        </h2>
        <Button variant="outline" onClick={() => setActiveTab('home')}>
          Retour
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Devenez Partenaire</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Un partenariat avec OwoTọ́ọ̀mọ̀ offre des opportunités mutuelles de croissance 
            et d'impact dans la préservation des langues africaines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Avantages pour nos partenaires
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Visibilité sur notre plateforme (5000+ utilisateurs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Accès prioritaire aux nouvelles fonctionnalités</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Opportunités de co-développement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Partage des revenus (selon accord)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Types de partenariats
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Partenariats technologiques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Partenariats éducatifs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Partenariats institutionnels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Partenariats médiatiques</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Intéressé par un partenariat ?</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Téléphone :</span>
                <span className="bg-white px-3 py-1 rounded">57002427</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">Email :</span>
                <span className="bg-white px-3 py-1 rounded">abattieucher@gmail.com</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Contactez-nous pour discuter d'une collaboration personnalisée
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Exemples de partenariats réussis</h4>
            <div className="space-y-2 text-sm">
              <div className="border-l-4 border-yellow-400 pl-3">
                <p className="font-medium">Écoles primaires du Bénin</p>
                <p className="text-gray-600">Intégration dans les programmes scolaires</p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-3">
                <p className="font-medium">Radios communautaires</p>
                <p className="text-gray-600">Diffusion d'émissions linguistiques</p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-3">
                <p className="font-medium">Organisations culturelles</p>
                <p className="text-gray-600">Préservation du patrimoine linguistique</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'translate' && renderTranslate()}
        {activeTab === 'donate' && renderDonate()}
        {activeTab === 'partnership' && renderPartnership()}
      </div>
    </div>
  );
};

export default ContributorSpace;
