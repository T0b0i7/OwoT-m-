import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.43833b5e71194b79ac92e23fea538caf',
  appName: 'OwoTọ́ọ̀mọ̀',
  webDir: 'dist',
  server: {
    url: 'https://43833b5e-7119-4b79-ac92-e23fea538caf.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#F97316',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#F97316',
    },
  },
};

export default config;
