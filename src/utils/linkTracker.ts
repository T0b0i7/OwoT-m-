// Utilitaire de tracking pour OwoTọ́ọ̀mọ̀
export interface LinkClickData {
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
  // Nouvelles informations détaillées
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

class LinkTracker {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.trackPageView();
  }

  private generateSessionId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  }

  private getBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getOS(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private getClickData(linkUrl: string, linkType: LinkClickData['linkType']): LinkClickData {
    const deviceInfo = this.getAdvancedDeviceInfo();
    const browserInfo = this.getAdvancedBrowserInfo();
    const osInfo = this.getAdvancedOSInfo();
    const capabilities = this.getAdvancedCapabilities();
    const performance = this.getPerformanceMetrics();
    const connection = this.getConnectionInfo();
    
    return {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      linkUrl,
      linkType,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      device: deviceInfo.deviceType,
      browser: browserInfo.browserName,
      os: osInfo.osName,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      sessionId: this.sessionId,
      // Informations détaillées existantes
      ipAddress: this.generateSimulatedIP(),
      country: this.getCountryFromLanguage(),
      city: this.getCityFromLanguage(),
      region: this.getRegionFromLanguage(),
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
      javaEnabled: this.checkJavaEnabled(),
      pdfViewerEnabled: this.checkPDFViewer(),
      flashEnabled: this.checkFlashEnabled(),
      silverlightEnabled: this.checkSilverlightEnabled(),
      quickTimeEnabled: this.checkQuickTimeEnabled(),
      realPlayerEnabled: this.checkRealPlayerEnabled(),
      vlcEnabled: this.checkVLCEnabled(),
      wmpEnabled: this.checkWMPEnabled(),
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
  }

  private saveClickData(clickData: LinkClickData): void {
    try {
      const existingClicks = JSON.parse(localStorage.getItem('linkClicks') || '[]');
      existingClicks.push(clickData);
      
      // Garder seulement les 1000 derniers clics pour éviter la surcharge
      if (existingClicks.length > 1000) {
        existingClicks.splice(0, existingClicks.length - 1000);
      }
      
      localStorage.setItem('linkClicks', JSON.stringify(existingClicks));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des clics:', error);
    }
  }

  public trackLinkClick(linkUrl: string, linkType: LinkClickData['linkType'] = 'external'): void {
    const clickData = this.getClickData(linkUrl, linkType);
    this.saveClickData(clickData);
    console.log('🔗 Lien cliqué:', clickData);
  }

  public trackPageView(): void {
    const pageData = this.getClickData(window.location.href, 'internal');
    this.saveClickData(pageData);
  }

  public getClickStats(): any {
    try {
      const clicks = JSON.parse(localStorage.getItem('linkClicks') || '[]');
      const today = new Date().toISOString().split('T')[0];
      const todayClicks = clicks.filter((c: LinkClickData) => c.timestamp.startsWith(today));
      
      return {
        totalClicks: clicks.length,
        todayClicks: todayClicks.length,
        uniqueSessions: new Set(clicks.map((c: LinkClickData) => c.sessionId)).size,
        topLinks: this.getTopLinks(clicks),
        deviceStats: this.getDeviceStats(clicks),
        browserStats: this.getBrowserStats(clicks)
      };
    } catch (error) {
      return {
        totalClicks: 0,
        todayClicks: 0,
        uniqueSessions: 0,
        topLinks: [],
        deviceStats: {},
        browserStats: {}
      };
    }
  }

  private getTopLinks(clicks: LinkClickData[]): Array<{url: string, count: number}> {
    const linkCounts: {[key: string]: number} = {};
    
    clicks.forEach(click => {
      linkCounts[click.linkUrl] = (linkCounts[click.linkUrl] || 0) + 1;
    });
    
    return Object.entries(linkCounts)
      .map(([url, count]) => ({url, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getDeviceStats(clicks: LinkClickData[]): {[key: string]: number} {
    const stats: {[key: string]: number} = {};
    
    clicks.forEach(click => {
      stats[click.device] = (stats[click.device] || 0) + 1;
    });
    
    return stats;
  }

  private getBrowserStats(clicks: LinkClickData[]): {[key: string]: number} {
    const stats: {[key: string]: number} = {};
    
    clicks.forEach(click => {
      stats[click.browser] = (stats[click.browser] || 0) + 1;
    });
    
    return stats;
  }

  // Nouvelles méthodes pour collecter des informations détaillées
  private generateSimulatedIP(): string {
    // Génère une IP simulée basée sur le timestamp et session
    const session = this.sessionId;
    const hash = session.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const ip1 = Math.abs(hash % 256);
    const ip2 = Math.abs((hash >> 8) % 256);
    const ip3 = Math.abs((hash >> 16) % 256);
    const ip4 = Math.abs((hash >> 24) % 256);
    
    return `${ip1}.${ip2}.${ip3}.${ip4}`;
  }

  private getCountryFromLanguage(): string {
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
  }

  private getCityFromLanguage(): string {
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
  }

  private getRegionFromLanguage(): string {
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
  }

  private getConnectionType(): string {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      return connection.effectiveType || connection.type || 'Unknown';
    }
    
    // Simulation basée sur la performance
    const start = performance.now();
    const end = performance.now();
    const latency = end - start;
    
    if (latency < 50) return '4g';
    if (latency < 150) return '3g';
    if (latency < 300) return '2g';
    return 'slow-2g';
  }

  private getMemoryInfo(): string {
    if ('deviceMemory' in navigator) {
      return `${(navigator as any).deviceMemory}GB`;
    }
    return 'Unknown';
  }

  private checkJavaEnabled(): boolean {
    try {
      return !!(navigator as any).javaEnabled();
    } catch {
      return false;
    }
  }

  private checkPDFViewer(): boolean {
    return navigator.mimeTypes['application/pdf'] !== undefined;
  }

  private checkFlashEnabled(): boolean {
    return navigator.mimeTypes['application/x-shockwave-flash'] !== undefined;
  }

  private checkSilverlightEnabled(): boolean {
    return navigator.mimeTypes['application/x-silverlight'] !== undefined;
  }

  private checkQuickTimeEnabled(): boolean {
    return navigator.mimeTypes['video/quicktime'] !== undefined;
  }

  private checkRealPlayerEnabled(): boolean {
    return navigator.mimeTypes['audio/x-pn-realaudio'] !== undefined;
  }

  private checkVLCEnabled(): boolean {
    return navigator.mimeTypes['application/x-vlc-plugin'] !== undefined;
  }

  private checkWMPEnabled(): boolean {
    return navigator.mimeTypes['application/x-mplayer2'] !== undefined;
  }

  // Méthode pour obtenir le niveau de batterie si disponible
  private async getBatteryLevel(): Promise<number | undefined> {
    try {
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        return battery.level * 100;
      }
    } catch {
      // Ignorer les erreurs
    }
    return undefined;
  }

  // MÉTHODES AVANCÉES POUR LA DÉTECTION ULTRA-PRÉCISE

  private getAdvancedDeviceInfo() {
    const ua = navigator.userAgent;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    
    // Détection précise du type d'appareil
    let deviceType: LinkClickData['deviceType'] = 'unknown';
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
  }

  private getAdvancedBrowserInfo() {
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
  }

  private getAdvancedOSInfo() {
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
  }

  private getAdvancedCapabilities() {
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
  }

  private getPerformanceMetrics() {
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
  }

  private getConnectionInfo() {
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
  }

  public exportData(): string {
    const data = {
      clicks: JSON.parse(localStorage.getItem('linkClicks') || '[]'),
      users: JSON.parse(localStorage.getItem('secretDashboard_users') || '[]'),
      pageViews: JSON.parse(localStorage.getItem('secretDashboard_clicks') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  public clearAllData(): void {
    localStorage.removeItem('linkClicks');
    localStorage.removeItem('secretDashboard_users');
    localStorage.removeItem('secretDashboard_clicks');
  }
}

export const linkTracker = new LinkTracker();

// Fonction utilitaire pour les liens trackés
import React from 'react';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  linkType?: LinkClickData['linkType'];
  className?: string;
  onClick?: () => void;
}

export const TrackedLink: React.FC<TrackedLinkProps> = ({ 
  href, 
  children, 
  linkType = 'external', 
  className, 
  onClick 
}) => {
  const handleClick = () => {
    linkTracker.trackLinkClick(href, linkType);
    if (onClick) onClick();
  };

  const isExternal = linkType === 'external';

  return React.createElement(
    'a',
    {
      href,
      className,
      onClick: handleClick,
      target: isExternal ? '_blank' : '_self',
      rel: isExternal ? 'noopener noreferrer' : undefined
    },
    children
  );
};
