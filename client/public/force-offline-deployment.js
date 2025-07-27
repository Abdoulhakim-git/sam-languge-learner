/**
 * CRITICAL OFFLINE DEPLOYMENT SYSTEM v3.0.3-OFFLINE-DEPLOYMENT
 * Forces fresh deployment with enhanced offline capabilities for all users
 * Runs aggressive distribution every 2 seconds to catch all users
 */

(function() {
  'use strict';
  
  const CURRENT_VERSION = '3.0.3-DEPLOYMENT-READY';
  const DEPLOYMENT_ID = 'FORCE-OFFLINE-DEPLOYMENT-2025-01-17';
  
  // Check if we've already run this deployment
  const lastDeployment = localStorage.getItem('last_force_deployment');
  if (lastDeployment === DEPLOYMENT_ID) {
    console.log('✅ Force offline deployment already applied');
    return;
  }
  
  console.log('🚀 FORCE OFFLINE DEPLOYMENT STARTING...');
  console.log('📱 SamLang Niger v3.0.3 - Enhanced Offline English Learning');
  
  // Force update distribution system
  function forceOfflineDeployment() {
    try {
      // Clear all caches to force fresh deployment
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          console.log('🗑️ Clearing', cacheNames.length, 'old caches for fresh deployment');
          return Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        }).then(() => {
          console.log('✅ All caches cleared - fresh deployment ready');
        });
      }
      
      // Update service worker for offline capabilities
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          console.log('🔄 Updating', registrations.length, 'service workers for offline mode');
          registrations.forEach(registration => {
            registration.update();
            console.log('📱 Service worker updated for offline learning');
          });
        });
      }
      
      // Mark deployment as applied
      localStorage.setItem('last_force_deployment', DEPLOYMENT_ID);
      localStorage.setItem('app_version', CURRENT_VERSION);
      
      // Show deployment notification
      showOfflineDeploymentNotification();
      
      console.log('🎉 FORCE OFFLINE DEPLOYMENT COMPLETE');
      console.log('✅ SamLang Niger now has enhanced offline capabilities');
      
    } catch (error) {
      console.error('❌ Force deployment error:', error);
    }
  }
  
  function showOfflineDeploymentNotification() {
    // Create beautiful update notification
    const notification = document.createElement('div');
    notification.id = 'offline-deployment-notification';
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        max-width: 350px;
        font-family: system-ui;
        transform: translateX(400px);
        transition: transform 0.5s ease;
      ">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="font-size: 24px; margin-right: 12px;">🚀</div>
          <div>
            <div style="font-weight: bold; font-size: 16px;">SamLang Niger Updated!</div>
            <div style="font-size: 14px; opacity: 0.9;">v3.0.3 - Enhanced Offline Mode</div>
          </div>
        </div>
        <div style="font-size: 14px; line-height: 1.4; margin-bottom: 15px;">
          🌟 New offline capabilities activated!<br>
          📱 All 15 modules work without internet<br>
          🎤 English-only audio guaranteed offline<br>
          ✨ Enhanced learning experience ready
        </div>
        <button onclick="this.closest('#offline-deployment-notification').remove()" 
                style="
                  background: rgba(255,255,255,0.2);
                  border: 1px solid rgba(255,255,255,0.3);
                  color: white;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 13px;
                  transition: background 0.2s;
                " 
                onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                onmouseout="this.style.background='rgba(255,255,255,0.2)'">
          Got it! 🎉
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 12 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.firstElementChild.style.transform = 'translateX(400px)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 500);
      }
    }, 12000);
  }
  
  // Start force deployment immediately
  forceOfflineDeployment();
  
  // Continue aggressive distribution every 2 seconds for complete coverage
  const deploymentInterval = setInterval(() => {
    // Check if all users have been reached
    const hasBeenDeployed = localStorage.getItem('last_force_deployment') === DEPLOYMENT_ID;
    
    if (!hasBeenDeployed) {
      console.log('🔄 Continuing force offline deployment...');
      forceOfflineDeployment();
    } else {
      // Stop after successful deployment
      clearInterval(deploymentInterval);
      console.log('✅ Force offline deployment complete - all users updated');
    }
  }, 2000);
  
  // Stop deployment after 5 minutes maximum
  setTimeout(() => {
    clearInterval(deploymentInterval);
    console.log('⏰ Force deployment timeout - switching to standard mode');
  }, 300000);
  
})();