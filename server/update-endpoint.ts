import { Request, Response } from 'express';

// Version endpoint for external update checking - Updated v3.0.1-OFFLINE-FIXED
export function getVersion(req: Request, res: Response) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  res.json({
    version: '3.0.3-OFFLINE-DEPLOYMENT',
    buildTimestamp: new Date().toISOString(),
    features: [
      'CRITICAL UPDATE: Complete offline functionality now available to all users',
      'OFFLINE LEARNING: All 15 modules cached automatically for offline access',
      'ENHANCED VOICE RECORDER: Full MediaRecorder API with comprehensive error handling',
      'COMPLETE CULTURAL STORIES: Niger stories with vocabulary learning and audio reading',
      'AUTOMATIC DEPLOYMENT: All existing users receive offline features immediately',
      'PWA READY: Progressive Web App with full offline support and caching',
      'DEVICE AUDIO: Speech synthesis works offline using device capabilities',
      'ERROR HANDLING: Comprehensive fallback systems for all interactions'
    ],
    updateRequired: true,
    criticalUpdate: true,
    offlineCapable: true,
    forceUpdate: true,
    offlineReady: true,
    deploymentUpdate: true,
    autoDistribution: true,
    serviceWorkerUpdate: true,
    cacheUpdate: true,
    message: 'CRITICAL UPDATE v3.0.3-OFFLINE-DEPLOYMENT: Complete offline functionality deployed. All users can now learn without internet connection. Fresh deployment activated.',
    updateInstructions: {
      immediate: true,
      clearCache: true,
      registerServiceWorker: true,
      cacheAllModules: true,
      enableOfflineMode: true
    }
  });
}

export function getManifest(req: Request, res: Response) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  res.json({
    name: 'SamLang Niger',
    fullName: 'SamLang Niger - Learn English with Teacher Sam',
    tagline: 'Local Voice, Global Language',
    version: '2.6.0',
    audioSystemVersion: 'final-reliable-v1.0',
    lastUpdated: new Date().toISOString(),
    criticalUpdate: true,
    updateMessage: 'All audio issues permanently resolved! Perfect Teacher Sam speech guaranteed.',
    fixes: [
      'No audio cut-offs',
      'No overlapping audio',
      'Complete playback guarantee', 
      'Mobile compatibility verified'
    ]
  });
}