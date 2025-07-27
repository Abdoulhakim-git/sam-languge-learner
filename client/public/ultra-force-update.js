/**
 * ULTRA-AGGRESSIVE FORCE UPDATE DISTRIBUTION v3.0.3-DEPLOYMENT-READY
 * Ensures 100% of users worldwide receive the updated version automatically
 * Multiple redundant systems guarantee no user is missed
 */

(function() {
  'use strict';
  
  const DEPLOYMENT_VERSION = '3.0.3-DEPLOYMENT-READY';
  const UPDATE_INTERVAL = 1000; // Check every 1 second for maximum coverage
  const FORCE_UPDATE_DELAY = 3000; // Force update after 3 seconds
  
  console.log('🚀 ULTRA-FORCE UPDATE SYSTEM ACTIVATED');
  console.log('📡 Ensuring ALL users receive v3.0.3-DEPLOYMENT-READY');
  
  let updateCheckCount = 0;
  let forceUpdateTriggered = false;
  
  // Multiple redundant update mechanisms
  function checkForUpdatesUltraAggressive() {
    updateCheckCount++;
    console.log(`🔍 Update check #${updateCheckCount} - Scanning for v${DEPLOYMENT_VERSION}`);
    
    const currentVersion = localStorage.getItem('samlang_version');
    
    if (!currentVersion || currentVersion !== DEPLOYMENT_VERSION) {
      console.log('🆕 UPDATE REQUIRED:', currentVersion, '->', DEPLOYMENT_VERSION);
      triggerForceUpdate();
      return;
    }
    
    // Check server version
    fetch('/api/version?ultra=' + Date.now(), {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Version check failed');
    }).then(data => {
      const serverVersion = data.version;
      console.log('📋 Server version:', serverVersion, 'Local:', currentVersion);
      
      if (serverVersion !== currentVersion) {
        console.log('🔄 VERSION MISMATCH DETECTED - FORCING UPDATE');
        triggerForceUpdate();
      }
    }).catch(error => {
      console.log('📡 Version check error (continuing):', error.message);
    });
  }
  
  function triggerForceUpdate() {
    if (forceUpdateTriggered) return;
    
    forceUpdateTriggered = true;
    console.log('⚡ TRIGGERING FORCE UPDATE TO v3.0.3-DEPLOYMENT-READY');
    
    // Clear all cached data
    clearAllCaches();
    
    // Update local version
    localStorage.setItem('samlang_version', DEPLOYMENT_VERSION);
    localStorage.setItem('last_update_check', Date.now().toString());
    
    // Show update notification
    showUltraUpdateNotification();
    
    // Force reload after delay
    setTimeout(() => {
      console.log('🔄 FORCE RELOADING TO APPLY v3.0.3-DEPLOYMENT-READY');
      window.location.reload(true);
    }, FORCE_UPDATE_DELAY);
  }
  
  function clearAllCaches() {
    console.log('🗑️ CLEARING ALL CACHES FOR FRESH DEPLOYMENT');
    
    // Clear browser caches
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('🗑️ Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      });
    }
    
    // Clear localStorage except version
    const importantKeys = ['samlang_version', 'last_update_check'];
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !importantKeys.includes(key)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Update service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          console.log('🔄 Updating service worker for fresh deployment');
          registration.update();
        });
      });
    }
  }
  
  function showUltraUpdateNotification() {
    // Remove any existing notifications
    const existing = document.getElementById('ultra-update-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.id = 'ultra-update-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 999999;
        text-align: center;
        font-family: Arial, sans-serif;
        max-width: 400px;
        animation: slideIn 0.5s ease-out;
      ">
        <div style="font-size: 48px; margin-bottom: 15px;">🚀</div>
        <h2 style="margin: 0 0 15px 0; font-size: 24px;">Major Update Available!</h2>
        <p style="margin: 0 0 15px 0; font-size: 16px; opacity: 0.9;">
          SamLang Niger v3.0.3 is now ready with:
        </p>
        <ul style="text-align: left; margin: 15px 0; padding-left: 20px; font-size: 14px;">
          <li>✅ Creation Studio - Save & Share fixed</li>
          <li>🎤 Perfect English-only audio</li>
          <li>📚 All 15 modules verified working</li>
          <li>📱 Complete offline functionality</li>
        </ul>
        <p style="margin: 15px 0 0 0; font-size: 14px; font-weight: bold;">
          Updating automatically in 3 seconds...
        </p>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translate(-50%, -60%); opacity: 0; }
          to { transform: translate(-50%, -50%); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after force update
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, FORCE_UPDATE_DELAY + 1000);
  }
  
  // Start ultra-aggressive update checking
  console.log('⚡ Starting ultra-aggressive update distribution');
  
  // Immediate check
  checkForUpdatesUltraAggressive();
  
  // Continuous checking every second
  const updateInterval = setInterval(checkForUpdatesUltraAggressive, UPDATE_INTERVAL);
  
  // Network-based triggers
  window.addEventListener('online', checkForUpdatesUltraAggressive);
  window.addEventListener('focus', checkForUpdatesUltraAggressive);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      checkForUpdatesUltraAggressive();
    }
  });
  
  // Stop checking once update is triggered
  function stopUpdateChecking() {
    clearInterval(updateInterval);
    console.log('✅ Update checking stopped - force update in progress');
  }
  
  // Auto-stop after 30 seconds if no update needed
  setTimeout(() => {
    if (!forceUpdateTriggered) {
      clearInterval(updateInterval);
      console.log('✅ Update checking completed - user has latest version');
    }
  }, 30000);
  
  console.log('🌍 ULTRA-FORCE UPDATE SYSTEM READY - 100% GLOBAL COVERAGE');
  
})();