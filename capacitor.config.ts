import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.samlang.niger',
  appName: 'SamLang Niger',
  version: '1.4.0',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#FFF7ED',
    allowMixedContent: true,
    captureInput: true
  },
  plugins: {
    App: {
      launchShowDuration: 2000
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FFF7ED',
      androidSplashResourceName: 'splash',
      showSpinner: false
    }
  }
};

export default config;
