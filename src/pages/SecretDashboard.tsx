import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  EyeOff, 
  Download, 
  Trash2, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  MapPin,
  Wifi,
  Battery,
  Camera,
  Mic,
  Settings,
  Bell,
  Mail,
  CheckCircle,
  AlertCircle,
  Heart,
  Handshake,
  BookOpen,
  Shield,
  LogOut,
  Link,
  Cpu,
  HardDrive
} from 'lucide-react';
import NotificationManager from '@/components/NotificationManager';
import { linkTracker } from '@/utils/linkTracker';

interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  isAdmin: boolean;
}

interface ClickData {
  id: string;
  timestamp: string;
  linkUrl: string;
  linkType: 'download' | 'social' | 'external' | 'internal';
  userAgent: string;
  referrer: string;
  device: string;
  browser: string;
  os: string;
  language: string;
  screenResolution: string;
  sessionId: string;
  // Informations détaillées existantes
  ipAddress: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  connectionType: string;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
  platform: string;
  cpuCores: number;
  memory: string;
  batteryLevel?: number;
  isOnline: boolean;
  viewport: string;
  colorDepth: string;
  pixelRatio: string;
  javaEnabled: boolean;
  pdfViewerEnabled: boolean;
  flashEnabled: boolean;
  silverlightEnabled: boolean;
  quickTimeEnabled: boolean;
  realPlayerEnabled: boolean;
  vlcEnabled: boolean;
  wmpEnabled: boolean;
  // DÉTECTION ULTRA-PRÉCISE APPAREIL
  deviceType: 'desktop' | 'laptop' | 'smartphone' | 'tablet' | 'phablet' | 'wearable' | 'tv' | 'unknown';
  deviceBrand: string;
  deviceModel: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  touchSupport: boolean;
  maxTouchPoints: number;
  deviceOrientation: string;
  devicePixelRatio: number;
  hardwareConcurrency: number;
  deviceMemory: number;
  connectionEffectiveType: string;
  connectionDownlink: number;
  connectionRtt: number;
  connectionSaveData: boolean;
  // CAPACITÉS AVANCÉES
  webglSupport: boolean;
  webglVersion: string;
  webglRenderer: string;
  canvasFingerprint: string;
  audioFingerprint: string;
  fontsAvailable: string[];
  screenOrientation: string;
  screenAvailWidth: number;
  screenAvailHeight: number;
  screenColorDepth: number;
  screenPixelDepth: number;
  // NAVIGATEUR AVANCÉ
  browserName: string;
  browserVersion: string;
  browserEngine: string;
  browserMajorVersion: string;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isOpera: boolean;
  isIE: boolean;
  // OS AVANCÉ
  osName: string;
  osVersion: string;
  osFamily: string;
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isIPhone: boolean;
  isIPad: boolean;
  // CAPACITÉS SPÉCIFIQUES
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasGeolocation: boolean;
  hasNotification: boolean;
  hasBluetooth: boolean;
  hasUSB: boolean;
  hasVR: boolean;
  hasAR: boolean;
  hasGamepad: boolean;
  hasTouch: boolean;
  hasPointer: boolean;
  // PERFORMANCE
  hardwarePerformance: 'low' | 'medium' | 'high' | 'unknown';
  gpuInfo: string;
  renderPerformance: number;
  memoryPerformance: number;
  cpuPerformance: number;
  networkPerformance: number;
}

const SecretDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'notifications'>('overview');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Charger les données depuis localStorage
    const storedUsers = localStorage.getItem('secretDashboard_users');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Créer un compte admin par défaut
      const defaultAdmin: User = {
        id: Date.now().toString(),
        username: 'admin',
        password: 'owotomomo2024',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isAdmin: true
      };
      setUsers([defaultAdmin]);
      localStorage.setItem('secretDashboard_users', JSON.stringify([defaultAdmin]));
    }

    // Charger les clics
    const storedClicks = localStorage.getItem('secretDashboard_clicks');
    if (storedClicks) {
      setClicks(JSON.parse(storedClicks));
    }

    // Charger les clics de liens
    const linkClicks = linkTracker.getAllClicks();
    if (linkClicks.length > 0) {
      setClicks(prev => [...prev, ...linkClicks]);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      // Mettre à jour le dernier login
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { ...u, lastLogin: new Date().toISOString() }
          : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('secretDashboard_users', JSON.stringify(updatedUsers));
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (users.find(u => u.username === newUsername)) {
      setError('Ce nom d\'utilisateur existe déjà');
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: newUsername,
      password: newPassword,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isAdmin: false
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('secretDashboard_users', JSON.stringify(updatedUsers));
    
    // Se connecter automatiquement
    setIsAuthenticated(true);
    setShowCreateAccount(false);
    setUsername(newUsername);
    setPassword(newPassword);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setNewUsername('');
    setNewPassword('');
  };

  const exportData = () => {
    const data = {
      users,
      clicks,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `owotomomo-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.')) {
      setClicks([]);
      localStorage.removeItem('secretDashboard_clicks');
      linkTracker.clearAllClicks();
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'smartphone':
        return <Smartphone className="w-4 h-4 text-blue-500" />;
      case 'tablet':
        return <Tablet className="w-4 h-4 text-green-500" />;
      case 'desktop':
      case 'laptop':
        return <Monitor className="w-4 h-4 text-purple-500" />;
      default:
        return <Monitor className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStats = () => {
    const today = new Date().toDateString();
    const todayClicks = clicks.filter(c => 
      new Date(c.timestamp).toDateString() === today
    );
    const uniqueUsers = new Set(clicks.map(c => c.ipAddress)).size;
    
    return {
      totalClicks: clicks.length,
      todayClicks: todayClicks.length,
      uniqueUsers,
      totalUsers: users.length
    };
  };

  const stats = getStats();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-orange-600">
              🛡️ Accès Sécurisé
            </CardTitle>
            <p className="text-gray-600">
              Espace d'administration OwoTọ́ọ̀mọ̀
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {!showCreateAccount ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom d'utilisateur
                  </label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nouveau nom d'utilisateur
                  </label>
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Choisissez un nom d'utilisateur"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Choisissez un mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                  <Users className="w-4 h-4 mr-2" />
                  Créer le compte
                </Button>
              </form>
            )}
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowCreateAccount(!showCreateAccount);
                  setError('');
                  setUsername('');
                  setPassword('');
                  setNewUsername('');
                  setNewPassword('');
                }}
                className="text-orange-600 hover:text-orange-700 text-sm"
              >
                {showCreateAccount 
                  ? "Déjà un compte ? Se connecter" 
                  : "Pas de compte ? Créer un compte"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              🛡️ Tableau de Bord Administratif
            </h1>
            <p className="text-gray-600 mt-2">
              Suivi des visites et analytics d'OwoTọ́ọ̀mọ̀
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Navigation par onglets */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'visits'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Visites</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'notifications'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'overview' && (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Visites</p>
                      <p className="text-2xl font-bold text-gray-800">{clicks.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Visites Aujourd'hui</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {clicks.filter(c => {
                          const today = new Date().toDateString();
                          const clickDate = new Date(c.timestamp).toDateString();
                          return today === clickDate;
                        }).length}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs Uniques</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {new Set(clicks.map(c => c.ipAddress)).size}
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Comptes Créés</p>
                      <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mb-8">
              <Button onClick={exportData} className="bg-blue-500 hover:bg-blue-600">
                <Download className="w-4 h-4 mr-2" />
                Exporter les données
              </Button>
              <Button onClick={clearAllData} variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Effacer toutes les données
              </Button>
            </div>
          </>
        )}

        {activeTab === 'visits' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Visites Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clicks.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune visite enregistrée</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Appareil</th>
                        <th className="text-left p-2">Navigateur</th>
                        <th className="text-left p-2">OS</th>
                        <th className="text-left p-2">Langue</th>
                        <th className="text-left p-2">IP</th>
                        <th className="text-left p-2">Localisation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clicks.slice(0, 50).map((click) => (
                        <tr key={click.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            {new Date(click.timestamp).toLocaleString('fr-FR')}
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              {getDeviceIcon(click.deviceType)}
                              <span>{click.deviceBrand} {click.deviceModel}</span>
                            </div>
                          </td>
                          <td className="p-2">{click.browserName} {click.browserVersion}</td>
                          <td className="p-2">{click.osName} {click.osVersion}</td>
                          <td className="p-2">{click.language}</td>
                          <td className="p-2">{click.ipAddress}</td>
                          <td className="p-2">
                            {click.city}, {click.country}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <NotificationManager />
        )}
      </div>
    </div>
  );
};

export default SecretDashboard;

interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  isAdmin: boolean;
}

interface ClickData {
  id: string;
  timestamp: string;
  linkUrl: string;
  linkType: 'download' | 'social' | 'external' | 'internal';
  userAgent: string;
  referrer: string;
  device: string;
  browser: string;
  os: string;
  language: string;
  screenResolution: string;
  sessionId: string;
  // Informations détaillées existantes
  ipAddress: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  connectionType: string;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
  platform: string;
  cpuCores: number;
  memory: string;
  batteryLevel?: number;
  isOnline: boolean;
  viewport: string;
  colorDepth: string;
  pixelRatio: string;
  javaEnabled: boolean;
  pdfViewerEnabled: boolean;
  flashEnabled: boolean;
  silverlightEnabled: boolean;
  quickTimeEnabled: boolean;
  realPlayerEnabled: boolean;
  vlcEnabled: boolean;
  wmpEnabled: boolean;
  // DÉTECTION ULTRA-PRÉCISE APPAREIL
  deviceType: 'desktop' | 'laptop' | 'smartphone' | 'tablet' | 'phablet' | 'wearable' | 'tv' | 'unknown';
  deviceBrand: string;
  deviceModel: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  touchSupport: boolean;
  maxTouchPoints: number;
  deviceOrientation: string;
  devicePixelRatio: number;
  hardwareConcurrency: number;
  deviceMemory: number;
  connectionEffectiveType: string;
  connectionDownlink: number;
  connectionRtt: number;
  connectionSaveData: boolean;
  // CAPACITÉS AVANCÉES
  webglSupport: boolean;
  webglVersion: string;
  webglRenderer: string;
  canvasFingerprint: string;
  audioFingerprint: string;
  fontsAvailable: string[];
  screenOrientation: string;
  screenAvailWidth: number;
  screenAvailHeight: number;
  screenColorDepth: number;
  screenPixelDepth: number;
  // NAVIGATEUR AVANCÉ
  browserName: string;
  browserVersion: string;
  browserEngine: string;
  browserMajorVersion: string;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isOpera: boolean;
  isIE: boolean;
  // OS AVANCÉ
  osName: string;
  osVersion: string;
  osFamily: string;
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isIPhone: boolean;
  isIPad: boolean;
  // CAPACITÉS SPÉCIFIQUES
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasGeolocation: boolean;
  hasNotification: boolean;
  hasBluetooth: boolean;
  hasUSB: boolean;
  hasVR: boolean;
  hasAR: boolean;
  hasGamepad: boolean;
  hasTouch: boolean;
  hasPointer: boolean;
  // PERFORMANCE
  hardwarePerformance: 'low' | 'medium' | 'high' | 'unknown';
  gpuInfo: string;
  renderPerformance: number;
  memoryPerformance: number;
  cpuPerformance: number;
  networkPerformance: number;
}

const SecretDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'notifications'>('overview');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Charger les données depuis localStorage
    const storedUsers = localStorage.getItem('secretDashboard_users');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Créer compte admin par défaut
      const adminUser: User = {
        id: '1',
        username: 'admin',
        password: 'owotomomo2024',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isAdmin: true
      };
      setUsers([adminUser]);
      localStorage.setItem('secretDashboard_users', JSON.stringify([adminUser]));
    }
    
    // Charger les clics depuis le tracker
    const linkStats = linkTracker.getClickStats();
    const linkClicks = JSON.parse(localStorage.getItem('linkClicks') || '[]');
    const pageClicks = JSON.parse(localStorage.getItem('secretDashboard_clicks') || '[]');
    
    // Combiner tous les clics
    const allClicks = [...linkClicks, ...pageClicks];
    setClicks(allClicks);

    // Tracker les visites de cette page
    trackPageVisit();
  }, []);

  const trackPageVisit = () => {
    const deviceInfo = getAdvancedDeviceInfo();
    const browserInfo = getAdvancedBrowserInfo();
    const osInfo = getAdvancedOSInfo();
    const capabilities = getAdvancedCapabilities();
    const performance = getPerformanceMetrics();
    const connection = getConnectionInfo();
    
    const clickData: ClickData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      linkUrl: window.location.href,
      linkType: 'internal',
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      device: deviceInfo.deviceType,
      browser: browserInfo.browserName,
      os: osInfo.osName,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      sessionId: Date.now().toString(),
      // Informations détaillées existantes
      ipAddress: generateSimulatedIP(),
      country: getCountryFromLanguage(),
      city: getCityFromLanguage(),
      region: getRegionFromLanguage(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connectionType: connection.connectionEffectiveType,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack === '1',
      platform: navigator.platform,
      cpuCores: navigator.hardwareConcurrency || 0,
      memory: `${deviceInfo.deviceMemory}GB`,
      batteryLevel: undefined,
      isOnline: navigator.onLine,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: `${screen.colorDepth}-bit`,
      pixelRatio: `${window.devicePixelRatio}x`,
      javaEnabled: checkJavaEnabled(),
      pdfViewerEnabled: checkPDFViewer(),
      flashEnabled: checkFlashEnabled(),
      silverlightEnabled: checkSilverlightEnabled(),
      quickTimeEnabled: checkQuickTimeEnabled(),
      realPlayerEnabled: checkRealPlayerEnabled(),
      vlcEnabled: checkVLCEnabled(),
      wmpEnabled: checkWMPEnabled(),
      // DÉTECTION ULTRA-PRÉCISE APPAREIL
      deviceType: deviceInfo.deviceType,
      deviceBrand: deviceInfo.deviceBrand,
      deviceModel: deviceInfo.deviceModel,
      isMobile: deviceInfo.isMobile,
      isTablet: deviceInfo.isTablet,
      isDesktop: deviceInfo.isDesktop,
      touchSupport: deviceInfo.touchSupport,
      maxTouchPoints: deviceInfo.maxTouchPoints,
      deviceOrientation: deviceInfo.deviceOrientation,
      devicePixelRatio: deviceInfo.devicePixelRatio,
      hardwareConcurrency: deviceInfo.hardwareConcurrency,
      deviceMemory: deviceInfo.deviceMemory,
      connectionEffectiveType: connection.connectionEffectiveType,
      connectionDownlink: connection.connectionDownlink,
      connectionRtt: connection.connectionRtt,
      connectionSaveData: connection.connectionSaveData,
      // CAPACITÉS AVANCÉES
      webglSupport: capabilities.webglSupport,
      webglVersion: capabilities.webglVersion,
      webglRenderer: capabilities.webglRenderer,
      canvasFingerprint: capabilities.canvasFingerprint,
      audioFingerprint: capabilities.audioFingerprint,
      fontsAvailable: capabilities.fontsAvailable,
      screenOrientation: capabilities.screenOrientation,
      screenAvailWidth: capabilities.screenAvailWidth,
      screenAvailHeight: capabilities.screenAvailHeight,
      screenColorDepth: capabilities.screenColorDepth,
      screenPixelDepth: capabilities.screenPixelDepth,
      // NAVIGATEUR AVANCÉ
      browserName: browserInfo.browserName,
      browserVersion: browserInfo.browserVersion,
      browserEngine: browserInfo.browserEngine,
      browserMajorVersion: browserInfo.browserMajorVersion,
      isChrome: browserInfo.isChrome,
      isFirefox: browserInfo.isFirefox,
      isSafari: browserInfo.isSafari,
      isEdge: browserInfo.isEdge,
      isOpera: browserInfo.isOpera,
      isIE: browserInfo.isIE,
      // OS AVANCÉ
      osName: osInfo.osName,
      osVersion: osInfo.osVersion,
      osFamily: osInfo.osFamily,
      isWindows: osInfo.isWindows,
      isMac: osInfo.isMac,
      isLinux: osInfo.isLinux,
      isAndroid: osInfo.isAndroid,
      isIOS: osInfo.isIOS,
      isIPhone: osInfo.isIPhone,
      isIPad: osInfo.isIPad,
      // CAPACITÉS SPÉCIFIQUES
      hasCamera: capabilities.hasCamera,
      hasMicrophone: capabilities.hasMicrophone,
      hasGeolocation: capabilities.hasGeolocation,
      hasNotification: capabilities.hasNotification,
      hasBluetooth: capabilities.hasBluetooth,
      hasUSB: capabilities.hasUSB,
      hasVR: capabilities.hasVR,
      hasAR: capabilities.hasAR,
      hasGamepad: capabilities.hasGamepad,
      hasTouch: capabilities.hasTouch,
      hasPointer: capabilities.hasPointer,
      // PERFORMANCE
      hardwarePerformance: performance.hardwarePerformance,
      gpuInfo: performance.gpuInfo,
      renderPerformance: performance.renderPerformance,
      memoryPerformance: performance.memoryPerformance,
      cpuPerformance: performance.cpuPerformance,
      networkPerformance: performance.networkPerformance
    };

    const existingClicks = JSON.parse(localStorage.getItem('secretDashboard_clicks') || '[]');
    existingClicks.push(clickData);
    localStorage.setItem('secretDashboard_clicks', JSON.stringify(existingClicks));
    setClicks(existingClicks);
  };

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  };

  const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const getOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  };

  // Nouvelles fonctions utilitaires pour les informations détaillées
  const generateSimulatedIP = () => {
    const hash = Date.now().toString().split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const ip1 = Math.abs(hash % 256);
    const ip2 = Math.abs((hash >> 8) % 256);
    const ip3 = Math.abs((hash >> 16) % 256);
    const ip4 = Math.abs((hash >> 24) % 256);
    
    return `${ip1}.${ip2}.${ip3}.${ip4}`;
  };

  const getCountryFromLanguage = () => {
    const lang = navigator.language.split('-')[1] || navigator.language;
    const countries: {[key: string]: string} = {
      'fr': 'France',
      'en': 'United States',
      'es': 'Spain',
      'de': 'Germany',
      'it': 'Italy',
      'pt': 'Portugal',
      'nl': 'Netherlands',
      'yo': 'Nigeria',
      'fon': 'Benin',
      'goun': 'Benin',
      'wo': 'Senegal',
      'zh': 'China',
      'ja': 'Japan',
      'ko': 'South Korea',
      'ru': 'Russia',
      'ar': 'Saudi Arabia'
    };
    return countries[lang] || 'Unknown';
  };

  const getCityFromLanguage = () => {
    const lang = navigator.language.split('-')[1] || navigator.language;
    const cities: {[key: string]: string} = {
      'fr': 'Paris',
      'en': 'New York',
      'es': 'Madrid',
      'de': 'Berlin',
      'it': 'Rome',
      'pt': 'Lisbon',
      'nl': 'Amsterdam',
      'yo': 'Lagos',
      'fon': 'Cotonou',
      'goun': 'Porto-Novo',
      'wo': 'Dakar',
      'zh': 'Beijing',
      'ja': 'Tokyo',
      'ko': 'Seoul',
      'ru': 'Moscow',
      'ar': 'Riyadh'
    };
    return cities[lang] || 'Unknown';
  };

  const getRegionFromLanguage = () => {
    const lang = navigator.language.split('-')[1] || navigator.language;
    const regions: {[key: string]: string} = {
      'fr': 'Île-de-France',
      'en': 'New York',
      'es': 'Madrid',
      'de': 'Berlin',
      'it': 'Lazio',
      'pt': 'Lisbon',
      'nl': 'North Holland',
      'yo': 'Lagos State',
      'fon': 'Littoral',
      'goun': 'Ouémé',
      'wo': 'Dakar',
      'zh': 'Beijing',
      'ja': 'Kanto',
      'ko': 'Seoul',
      'ru': 'Moscow',
      'ar': 'Riyadh'
    };
    return regions[lang] || 'Unknown';
  };

  const getConnectionType = () => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      return connection.effectiveType || connection.type || 'Unknown';
    }
    
    const start = performance.now();
    const end = performance.now();
    const latency = end - start;
    
    if (latency < 50) return '4g';
    if (latency < 150) return '3g';
    if (latency < 300) return '2g';
    return 'slow-2g';
  };

  const getMemoryInfo = () => {
    if ('deviceMemory' in navigator) {
      return `${(navigator as any).deviceMemory}GB`;
    }
    return 'Unknown';
  };

  const checkJavaEnabled = () => {
    try {
      return !!(navigator as any).javaEnabled();
    } catch {
      return false;
    }
  };

  const checkPDFViewer = () => {
    return navigator.mimeTypes['application/pdf'] !== undefined;
  };

  const checkFlashEnabled = () => {
    return navigator.mimeTypes['application/x-shockwave-flash'] !== undefined;
  };

  const checkSilverlightEnabled = () => {
    return navigator.mimeTypes['application/x-silverlight'] !== undefined;
  };

  const checkQuickTimeEnabled = () => {
    return navigator.mimeTypes['video/quicktime'] !== undefined;
  };

  const checkRealPlayerEnabled = () => {
    return navigator.mimeTypes['audio/x-pn-realaudio'] !== undefined;
  };

  const checkVLCEnabled = () => {
    return navigator.mimeTypes['application/x-vlc-plugin'] !== undefined;
  };

  const checkWMPEnabled = () => {
    return navigator.mimeTypes['application/x-mplayer2'] !== undefined;
  };

  // MÉTHODES AVANCÉES POUR LA DÉTECTION ULTRA-PRÉCISE

  const getAdvancedDeviceInfo = () => {
    const ua = navigator.userAgent;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    
    // Détection précise du type d'appareil
    let deviceType: ClickData['deviceType'] = 'unknown';
    let deviceBrand = 'Unknown';
    let deviceModel = 'Unknown';
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;

    // Détection mobile
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      isMobile = true;
      
      // iPhone
      if (/iPhone/i.test(ua)) {
        deviceType = 'smartphone';
        deviceBrand = 'Apple';
        deviceModel = 'iPhone';
        isDesktop = false;
        isTablet = false;
      }
      // iPad
      else if (/iPad/i.test(ua)) {
        deviceType = 'tablet';
        deviceBrand = 'Apple';
        deviceModel = 'iPad';
        isTablet = true;
        isMobile = false;
        isDesktop = false;
      }
      // Android
      else if (/Android/i.test(ua)) {
        deviceBrand = 'Android';
        if (width >= 768) {
          deviceType = 'tablet';
          deviceModel = 'Android Tablet';
          isTablet = true;
          isMobile = false;
        } else {
          deviceType = 'smartphone';
          deviceModel = 'Android Smartphone';
          isDesktop = false;
          isTablet = false;
        }
      }
      // Samsung
      else if (/Samsung/i.test(ua)) {
        deviceBrand = 'Samsung';
        if (/Galaxy.*Tab/i.test(ua)) {
          deviceType = 'tablet';
          deviceModel = 'Galaxy Tab';
          isTablet = true;
          isMobile = false;
        } else {
          deviceType = 'smartphone';
          deviceModel = 'Galaxy Smartphone';
          isDesktop = false;
          isTablet = false;
        }
      }
      // Autres mobiles
      else {
        deviceType = 'smartphone';
        deviceBrand = 'Other';
        deviceModel = 'Mobile Device';
        isDesktop = false;
        isTablet = false;
      }
    }
    // Détection desktop
    else {
      isDesktop = true;
      isMobile = false;
      isTablet = false;
      
      // Windows
      if (/Windows/i.test(ua)) {
        deviceBrand = 'Windows PC';
        if (/Windows NT/i.test(ua)) {
          deviceType = 'desktop';
          deviceModel = 'Windows Desktop';
        } else {
          deviceType = 'laptop';
          deviceModel = 'Windows Laptop';
        }
      }
      // Mac
      else if (/Mac/i.test(ua)) {
        deviceBrand = 'Apple';
        deviceType = 'desktop';
        deviceModel = 'Mac';
      }
      // Linux
      else if (/Linux/i.test(ua)) {
        deviceBrand = 'Linux';
        deviceType = 'desktop';
        deviceModel = 'Linux Desktop';
      }
      else {
        deviceType = 'desktop';
        deviceBrand = 'Unknown';
        deviceModel = 'Desktop';
      }
    }

    return {
      deviceType,
      deviceBrand,
      deviceModel,
      isMobile,
      isTablet,
      isDesktop,
      touchSupport,
      maxTouchPoints,
      deviceOrientation: screen.orientation?.type || 'unknown',
      devicePixelRatio: window.devicePixelRatio,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory || 0
    };
  };

  const getAdvancedBrowserInfo = () => {
    const ua = navigator.userAgent;
    
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let browserEngine = 'Unknown';
    let browserMajorVersion = 'Unknown';
    let isChrome = false;
    let isFirefox = false;
    let isSafari = false;
    let isEdge = false;
    let isOpera = false;
    let isIE = false;

    // Chrome
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
      isChrome = true;
      browserName = 'Chrome';
      browserEngine = 'Blink';
      const match = ua.match(/Chrome\/(\d+)/);
      if (match) {
        browserVersion = match[1];
        browserMajorVersion = match[1];
      }
    }
    // Firefox
    else if (/Firefox/i.test(ua)) {
      isFirefox = true;
      browserName = 'Firefox';
      browserEngine = 'Gecko';
      const match = ua.match(/Firefox\/(\d+)/);
      if (match) {
        browserVersion = match[1];
        browserMajorVersion = match[1];
      }
    }
    // Safari
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
      isSafari = true;
      browserName = 'Safari';
      browserEngine = 'WebKit';
      const match = ua.match(/Version\/(\d+)/);
      if (match) {
        browserVersion = match[1];
        browserMajorVersion = match[1];
      }
    }
    // Edge
    else if (/Edg/i.test(ua)) {
      isEdge = true;
      browserName = 'Edge';
      browserEngine = 'Blink';
      const match = ua.match(/Edg\/(\d+)/);
      if (match) {
        browserVersion = match[1];
        browserMajorVersion = match[1];
      }
    }
    // Opera
    else if (/Opera|OPR/i.test(ua)) {
      isOpera = true;
      browserName = 'Opera';
      browserEngine = 'Blink';
      const match = ua.match(/(Opera|OPR)\/(\d+)/);
      if (match) {
        browserVersion = match[2];
        browserMajorVersion = match[2];
      }
    }
    // IE
    else if (/MSIE|Trident/i.test(ua)) {
      isIE = true;
      browserName = 'Internet Explorer';
      browserEngine = 'Trident';
      const match = ua.match(/MSIE (\d+)|rv:(\d+)/);
      if (match) {
        browserVersion = match[1] || match[2];
        browserMajorVersion = match[1] || match[2];
      }
    }

    return {
      browserName,
      browserVersion,
      browserEngine,
      browserMajorVersion,
      isChrome,
      isFirefox,
      isSafari,
      isEdge,
      isOpera,
      isIE
    };
  };

  const getAdvancedOSInfo = () => {
    const ua = navigator.userAgent;
    
    let osName = 'Unknown';
    let osVersion = 'Unknown';
    let osFamily = 'Unknown';
    let isWindows = false;
    let isMac = false;
    let isLinux = false;
    let isAndroid = false;
    let isIOS = false;
    let isIPhone = false;
    let isIPad = false;

    // Windows
    if (/Windows/i.test(ua)) {
      isWindows = true;
      osName = 'Windows';
      osFamily = 'Windows';
      const match = ua.match(/Windows NT (\d+\.\d+)/);
      if (match) {
        osVersion = match[1];
      }
    }
    // Mac
    else if (/Mac/i.test(ua)) {
      isMac = true;
      osName = 'macOS';
      osFamily = 'macOS';
      const match = ua.match(/Mac OS X (\d+[._]\d+)/);
      if (match) {
        osVersion = match[1].replace('_', '.');
      }
    }
    // Linux
    else if (/Linux/i.test(ua) && !/Android/i.test(ua)) {
      isLinux = true;
      osName = 'Linux';
      osFamily = 'Linux';
    }
    // Android
    else if (/Android/i.test(ua)) {
      isAndroid = true;
      osName = 'Android';
      osFamily = 'Android';
      const match = ua.match(/Android (\d+\.\d+)/);
      if (match) {
        osVersion = match[1];
      }
    }
    // iOS
    else if (/iPhone|iPad|iPod/i.test(ua)) {
      isIOS = true;
      osName = 'iOS';
      osFamily = 'iOS';
      const match = ua.match(/OS (\d+[._]\d+)/);
      if (match) {
        osVersion = match[1].replace('_', '.');
      }
      if (/iPhone/i.test(ua)) {
        isIPhone = true;
      } else if (/iPad/i.test(ua)) {
        isIPad = true;
      }
    }

    return {
      osName,
      osVersion,
      osFamily,
      isWindows,
      isMac,
      isLinux,
      isAndroid,
      isIOS,
      isIPhone,
      isIPad
    };
  };

  const getAdvancedCapabilities = () => {
    // WebGL
    let webglSupport = false;
    let webglVersion = 'None';
    let webglRenderer = 'Unknown';
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      if (gl) {
        webglSupport = true;
        webglVersion = 'WebGL 1.0';
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
      
      // WebGL 2.0
      const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext;
      if (gl2) {
        webglVersion = 'WebGL 2.0';
      }
    } catch (e) {
      // WebGL non supporté
    }

    // Canvas Fingerprint
    let canvasFingerprint = '';
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Canvas fingerprint', 2, 2);
        canvasFingerprint = canvas.toDataURL().slice(-50);
      }
    } catch (e) {
      // Erreur canvas
    }

    // Audio Fingerprint
    let audioFingerprint = '';
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const context = new AudioContext();
        audioFingerprint = context.destination?.channelCount?.toString() || 'unknown';
      }
    } catch (e) {
      // Audio non supporté
    }

    // Fonts disponibles
    const fontsAvailable = [];
    const testFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS', 'Impact', 'Lucida Console'];
    
    testFonts.forEach(font => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = `72px ${font}`;
        const width = ctx.measureText('mmmmmmmmmmlli').width;
        ctx.font = `72px monospace`;
        const monospaceWidth = ctx.measureText('mmmmmmmmmmlli').width;
        if (width !== monospaceWidth) {
          fontsAvailable.push(font);
        }
      }
    });

    // Capacités spécifiques
    const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasMicrophone = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasGeolocation = 'geolocation' in navigator;
    const hasNotification = 'Notification' in window;
    const hasBluetooth = 'bluetooth' in navigator;
    const hasUSB = 'usb' in navigator;
    const hasVR = 'xr' in navigator || 'vr' in navigator;
    const hasAR = 'xr' in navigator;
    const hasGamepad = 'getGamepads' in navigator;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasPointer = 'pointerEnabled' in navigator;

    return {
      webglSupport,
      webglVersion,
      webglRenderer,
      canvasFingerprint,
      audioFingerprint,
      fontsAvailable,
      screenOrientation: screen.orientation?.type || 'unknown',
      screenAvailWidth: screen.availWidth,
      screenAvailHeight: screen.availHeight,
      screenColorDepth: screen.colorDepth,
      screenPixelDepth: screen.pixelDepth,
      hasCamera,
      hasMicrophone,
      hasGeolocation,
      hasNotification,
      hasBluetooth,
      hasUSB,
      hasVR,
      hasAR,
      hasGamepad,
      hasTouch,
      hasPointer
    };
  };

  const getPerformanceMetrics = () => {
    // Performance matérielle
    let hardwarePerformance: 'low' | 'medium' | 'high' | 'unknown' = 'unknown';
    const cpuCores = navigator.hardwareConcurrency || 0;
    const deviceMemory = (navigator as any).deviceMemory || 0;
    
    if (cpuCores >= 8 && deviceMemory >= 8) {
      hardwarePerformance = 'high';
    } else if (cpuCores >= 4 && deviceMemory >= 4) {
      hardwarePerformance = 'medium';
    } else if (cpuCores > 0 && deviceMemory > 0) {
      hardwarePerformance = 'low';
    }

    // GPU Info
    let gpuInfo = 'Unknown';
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
    } catch (e) {
      // GPU non détecté
    }

    // Performance de rendu
    let renderPerformance = 0;
    try {
      const startTime = performance.now();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        for (let i = 0; i < 1000; i++) {
          ctx.fillRect(0, 0, 1, 1);
        }
        renderPerformance = performance.now() - startTime;
      }
    } catch (e) {
      // Erreur performance
    }

    return {
      hardwarePerformance,
      gpuInfo,
      renderPerformance,
      memoryPerformance: deviceMemory,
      cpuPerformance: cpuCores,
      networkPerformance: 0 // Sera calculé avec la connexion
    };
  };

  const getConnectionInfo = () => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      return {
        connectionEffectiveType: connection.effectiveType || 'unknown',
        connectionDownlink: connection.downlink || 0,
        connectionRtt: connection.rtt || 0,
        connectionSaveData: connection.saveData || false
      };
    }
    
    // Simulation basée sur la performance
    const start = performance.now();
    const end = performance.now();
    const latency = end - start;
    
    let effectiveType = 'unknown';
    if (latency < 50) effectiveType = '4g';
    else if (latency < 150) effectiveType = '3g';
    else if (latency < 300) effectiveType = '2g';
    else effectiveType = 'slow-2g';
    
    return {
      connectionEffectiveType: effectiveType,
      connectionDownlink: 0,
      connectionRtt: Math.round(latency),
      connectionSaveData: false
    };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      // Mettre à jour le dernier login
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { ...u, lastLogin: new Date().toISOString() }
          : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('secretDashboard_users', JSON.stringify(updatedUsers));
    } else {
      setError('Identifiants incorrects');
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (users.some(u => u.username === newUsername)) {
      setError('Ce nom d\'utilisateur existe déjà');
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: newUsername,
      password: newPassword,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isAdmin: false
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('secretDashboard_users', JSON.stringify(updatedUsers));
    
    // Se connecter automatiquement
    setUsername(newUsername);
    setPassword(newPassword);
    setIsAuthenticated(true);
    setShowCreateAccount(false);
    setNewUsername('');
    setNewPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const clearAllData = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les données ?')) {
      linkTracker.clearAllData();
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = linkTracker.exportData();
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `owotomomo-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayClicks = clicks.filter(c => c.timestamp.startsWith(today));
    const uniqueUsers = new Set(clicks.map(c => c.userAgent)).size;
    
    return {
      totalClicks: clicks.length,
      todayClicks: todayClicks.length,
      uniqueUsers,
      totalUsers: users.length
    };
  };

  const stats = getStats();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-orange-600">
              Accès Sécurisé
            </CardTitle>
            <p className="text-gray-600">
              Espace d'administration OwoTọ́ọ̀mọ̀
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {!showCreateAccount ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom d'utilisateur
                  </label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </form>
            ) : (
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nouveau nom d'utilisateur
                  </label>
                  <Input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Choisissez un nom d'utilisateur"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Choisissez un mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                  <Users className="w-4 h-4 mr-2" />
                  Créer le compte
                </Button>
              </form>
            )}
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowCreateAccount(!showCreateAccount);
                  setError('');
                  setUsername('');
                  setPassword('');
                  setNewUsername('');
                  setNewPassword('');
                }}
                className="text-orange-600 hover:text-orange-700 text-sm"
              >
                {showCreateAccount 
                  ? "Déjà un compte ? Se connecter" 
                  : "Pas de compte ? Créer un compte"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Tableau de Bord Administratif
            </h1>
            <p className="text-gray-600 mt-2">
              Suivi des visites et analytics d'OwoTọ́ọ̀mọ̀
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Navigation par onglets */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'visits'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Visites</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'notifications'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'overview' && (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Visites</p>
                      <p className="text-2xl font-bold text-gray-800">{clicks.length}</p>
                        <div className="flex items-center space-x-1">
                          {click.device === 'Mobile' && <Smartphone className="w-3 h-3" />}
                          {click.device === 'Tablet' && <Tablet className="w-3 h-3" />}
                          {click.device === 'Desktop' && <Monitor className="w-3 h-3" />}
                          <Badge variant={click.device === 'Mobile' ? 'default' : 'secondary'}>
                            {click.device}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {click.viewport}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium">{click.browser}</div>
                        <div className="text-xs text-gray-500">
                          {click.pixelRatio}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium">{click.os}</div>
                        <div className="text-xs text-gray-500">
                          {click.platform}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-1">
                          <Wifi className="w-3 h-3" />
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {click.connectionType}
                            </Badge>
                            <div className="text-xs text-gray-500 mt-1">
                              {click.isOnline ? '🟢' : '🔴'} {click.timezone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Cpu className="w-3 h-3" />
                            <span className="text-xs">{click.cpuCores} cores</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HardDrive className="w-3 h-3" />
                            <span className="text-xs">{click.memory}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {click.colorDepth}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="space-y-1">
                          <div className="text-xs font-mono bg-gray-100 px-1 rounded">
                            {click.sessionId.slice(-8)}
                          </div>
                          <div className="text-xs">
                            {click.cookiesEnabled ? '🍪' : '❌'} 
                            {click.doNotTrack ? '🛡️' : ''}
                          </div>
                          <div className="text-xs text-gray-500">
                            {click.referrer === 'direct' ? 'Direct' : 'Référent'}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Plugins et Technologies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Plugins et Technologies Détectées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clicks.slice(-5).reverse().map((click) => (
                <div key={click.id} className="border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">Session {click.sessionId.slice(-6)}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>PDF:</span>
                      <span>{click.pdfViewerEnabled ? '✅' : '❌'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Java:</span>
                      <span>{click.javaEnabled ? '✅' : '❌'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Flash:</span>
                      <span>{click.flashEnabled ? '✅' : '❌'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Silverlight:</span>
                      <span>{click.silverlightEnabled ? '✅' : '❌'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>QuickTime:</span>
                      <span>{click.quickTimeEnabled ? '✅' : '❌'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Utilisateurs Inscrits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nom d'utilisateur</th>
                    <th className="text-left p-2">Rôle</th>
                    <th className="text-left p-2">Créé le</th>
                    <th className="text-left p-2">Dernière connexion</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2 font-medium">{user.username}</td>
                      <td className="p-2">
                        <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-2">
                        {new Date(user.lastLogin).toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecretDashboard;
