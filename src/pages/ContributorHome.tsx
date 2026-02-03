import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Languages, 
  Users, 
  Heart, 
  Handshake, 
  ArrowRight,
  Globe,
  BookOpen,
  Award,
  Target,
  Star,
  MessageCircle
} from 'lucide-react';

const ContributorHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 p-4 rounded-full">
              <Languages className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Espace Contributeurs OwoTọ́ọ̀mọ̀
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre mission de préserver et promouvoir les langues africaines 
            à travers la technologie et la collaboration
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">500+</h3>
            <p className="text-gray-600">Contributeurs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Globe className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">25+</h3>
            <p className="text-gray-600">Langues Africaines</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
            <p className="text-gray-600">Mots Traduits</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">15+</h3>
            <p className="text-gray-600">Pays Africains</p>
          </div>
        </div>

        {/* Actions principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <BookOpen className="w-6 h-6 mr-2" />
                Traduire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Contribuez à la traduction de l'application dans votre langue maternelle
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>✓ 20+ langues africaines</p>
                <p>✓ 1000+ mots à traduire</p>
                <p>✓ Validation communautaire</p>
              </div>
              <Button 
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate('/contributeurs')}
              >
                Commencer à traduire
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Heart className="w-6 h-6 mr-2" />
                Faire un don
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Soutenez financièrement le développement et l'amélioration de l'application
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>✓ Nouvelles fonctionnalités</p>
                <p>✓ Support technique</p>
                <p>✓ Événements linguistiques</p>
              </div>
              <Button 
                className="w-full mt-4 bg-red-500 hover:bg-red-600"
                onClick={() => navigate('/contributeurs')}
              >
                Faire un don
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Handshake className="w-6 h-6 mr-2" />
                Partenariat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Devenez partenaire pour un développement gagnant-gagnant
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>✓ Visibilité accrue</p>
                <p>✓ Co-développement</p>
                <p>✓ Partage des revenus</p>
              </div>
              <Button 
                className="w-full mt-4 bg-green-500 hover:bg-green-600"
                onClick={() => navigate('/contributeurs')}
              >
                Devenir partenaire
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-orange-100 to-red-100">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Contactez-nous pour contribuer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-blue-500 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Par Téléphone</h3>
                <p className="text-2xl font-bold text-blue-600">57002427</p>
                <p className="text-sm text-gray-600 mt-1">
                  Disponible 24h/24 et 7j/7
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-center mb-3">
                  <div className="bg-green-500 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Par Email</h3>
                <p className="text-lg font-bold text-green-600">abattieucher@gmail.com</p>
                <p className="text-sm text-gray-600 mt-1">
                  Réponse sous 24h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Témoignages */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Témoignages de nos contributeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Adébáyọ̀</h4>
                  <p className="text-sm text-gray-600">Nigéria, Yorùbá</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Contribuer à la traduction en Yorùbá m'a permis de préserver ma langue 
                tout en aidant ma communauté à accéder à la technologie."
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Mariam</h4>
                  <p className="text-sm text-gray-600">Bénin, Fon</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "L'application est maintenant utilisée dans toute notre école grâce 
                aux traductions en Fon que nous avons contribuées à créer."
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Koffi</h4>
                  <p className="text-sm text-gray-600">Côte d'Ivoire, Baoulé</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Être partenaire d'OwoTọ́ọ̀mọ̀ a ouvert de nouvelles opportunités 
                pour notre entreprise tout en préservant notre culture."
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorHome;
