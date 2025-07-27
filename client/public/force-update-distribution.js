/**
 * SamLang Niger - Universal Update System for ALL Users
 * Ensures every user - including first-time downloaders - automatically receives latest version
 */

const APP_VERSION = "3.0.2-AUDIO-COMPLETE";
const UPDATE_CHECK_INTERVAL = 60000; // Check every 60 seconds for reasonable monitoring
const FORCE_UPDATE_DELAY = 5000; // Force update after 5 seconds if needed

console.log('🚀 SamLang Niger Universal Update System v3.0.2 Started');

function initializeForceUpdate() {
    // Detect if this is a first-time user or existing user
    const storedVersion = localStorage.getItem('samlang_version');
    const lastUpdateCheck = localStorage.getItem('samlang_last_update');
    
    if (!storedVersion || storedVersion !== APP_VERSION) {
        console.log('🔄 User needs update - Current:', storedVersion, 'Latest:', APP_VERSION);
        
        // Set current version immediately
        localStorage.setItem('samlang_version', APP_VERSION);
        localStorage.setItem('samlang_last_update', Date.now().toString());
        
        // For users with old versions, trigger immediate refresh
        if (storedVersion && storedVersion !== APP_VERSION) {
            console.log('⚡ Triggering immediate update for existing user');
            triggerForceUpdate();
            return;
        }
    }
    
    // Start continuous monitoring for all users
    startUniversalUpdateMonitoring();
}

function startUniversalUpdateMonitoring() {
    console.log('📡 Starting universal update monitoring for global distribution');
    
    // Immediate first check
    checkVersionForAllUsers();
    
    // Regular interval checking
    setInterval(checkVersionForAllUsers, UPDATE_CHECK_INTERVAL);
    
    // Network-based triggers
    window.addEventListener('online', checkVersionForAllUsers);
    window.addEventListener('focus', checkVersionForAllUsers);
    
    // Page visibility change detection
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            checkVersionForAllUsers();
        }
    });
    
    // Start continuous update checking for maximum coverage
    startContinuousUpdateChecking();
}

async function checkVersionForAllUsers() {
    try {
        const response = await fetch('/api/version?' + Date.now(), {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        
        if (response.ok) {
            const versionData = await response.json();
            const serverVersion = versionData.version;
            const localVersion = localStorage.getItem('samlang_version');
            
            console.log('📋 Version check - Server:', serverVersion, 'Local:', localVersion);
            
            if (!localVersion || localVersion !== serverVersion) {
                console.log('🔄 Update available! Triggering global update distribution');
                
                // Update local version
                localStorage.setItem('samlang_version', serverVersion);
                localStorage.setItem('samlang_last_update', Date.now().toString());
                
                // Show gentle notification first
                showGentleUpdateNotification(versionData);
                
                // Force update after delay if user doesn't respond
                setTimeout(triggerForceUpdate, FORCE_UPDATE_DELAY);
            }
        }
    } catch (error) {
        console.log('📡 Version check skipped (offline mode)');
    }
}

function startContinuousUpdateChecking() {
    // Ultra-aggressive checking for immediate worldwide distribution
    let checkCount = 0;
    const intensiveChecking = setInterval(() => {
        checkCount++;
        checkVersionForAllUsers();
        
        // After 50 checks (approximately 8 minutes), reduce frequency
        if (checkCount > 50) {
            clearInterval(intensiveChecking);
            console.log('📊 Switching to standard update monitoring');
        }
    }, UPDATE_CHECK_INTERVAL);
}

function showGentleUpdateNotification(versionData) {
    // Remove any existing notifications
    const existingNotification = document.getElementById('samlang-update-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create gentle corner notification
    const notification = document.createElement('div');
    notification.id = 'samlang-update-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        max-width: 300px;
        cursor: pointer;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    notification.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">
            🎉 SamLang Niger Updated!
        </div>
        <div style="font-size: 12px; margin-bottom: 10px;">
            New: Enhanced offline English audio fixed!
        </div>
        <div style="font-size: 12px; color: #E8F5E8;">
            Click to refresh and get latest features
        </div>
    `;
    
    notification.onclick = triggerForceUpdate;
    document.body.appendChild(notification);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

function triggerForceUpdate() {
    console.log('🔄 Triggering force update for SamLang Niger');
    
    // Clear all caches
    detectAndUpgradeLegacyUsers();
    
    // Force page refresh
    window.location.reload(true);
}

function detectAndUpgradeLegacyUsers() {
    console.log('🔍 Detecting and upgrading legacy users');
    
    // Clear all legacy caches
    clearAllLegacyCaches();
    
    // Upgrade version tracking
    localStorage.setItem('samlang_version', APP_VERSION);
    localStorage.setItem('samlang_upgraded', 'true');
    localStorage.setItem('samlang_upgrade_date', new Date().toISOString());
    
    // Force service worker update
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister().then(() => {
                    console.log('🔄 Legacy service worker unregistered');
                });
            });
        });
    }
}

async function clearAllLegacyCaches() {
    console.log('🧹 Clearing all legacy caches for update');
    
    try {
        // Clear cache storage
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => {
                    console.log('🗑️ Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }
        
        // Clear localStorage items (except version tracking)
        const keysToKeep = ['samlang_version', 'samlang_upgraded', 'samlang_upgrade_date'];
        Object.keys(localStorage).forEach(key => {
            if (!keysToKeep.includes(key) && key.startsWith('samlang')) {
                localStorage.removeItem(key);
            }
        });
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        console.log('✅ All legacy caches cleared successfully');
    } catch (error) {
        console.error('❌ Error clearing caches:', error);
    }
}

// Initialize immediately when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeForceUpdate);
} else {
    initializeForceUpdate();
}

// Export for manual testing
window.SamLangUpdater = {
    checkForUpdates: checkVersionForAllUsers,
    forceUpdate: triggerForceUpdate,
    clearCaches: clearAllLegacyCaches,
    version: APP_VERSION
};