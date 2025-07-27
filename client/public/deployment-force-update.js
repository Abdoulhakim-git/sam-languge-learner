/**
 * SamLang Niger - DEPLOYMENT FORCE UPDATE SYSTEM
 * Ensures 100% user coverage when new version is deployed
 * Zero-tolerance policy for users missing updates
 */

const DEPLOYMENT_VERSION = "3.0.2-AUDIO-COMPLETE";
const AGGRESSIVE_CHECK_INTERVAL = 30000; // Check every 30 seconds for stable operation
const INSTANT_UPDATE_DELAY = 1000; // Force update after 1 second
const MAX_CHECK_ATTEMPTS = 1000; // Keep checking for extended period

console.log('🚀 DEPLOYMENT FORCE UPDATE: Ensuring ALL users receive v3.0.2-AUDIO-COMPLETE');

class DeploymentForceUpdate {
    constructor() {
        this.checkCount = 0;
        this.lastServerVersion = null;
        this.deploymentInProgress = false;
        this.initialize();
    }

    initialize() {
        console.log('🎯 Initializing aggressive deployment update system');
        
        // Immediate first check
        this.aggressiveVersionCheck();
        
        // Ultra-aggressive checking every 5 seconds
        this.checkInterval = setInterval(() => {
            this.aggressiveVersionCheck();
        }, AGGRESSIVE_CHECK_INTERVAL);

        // Monitor all possible user interactions
        this.setupUserInteractionMonitoring();
        
        // Network status monitoring
        this.setupNetworkMonitoring();
        
        // Page lifecycle monitoring
        this.setupPageLifecycleMonitoring();
    }

    async aggressiveVersionCheck() {
        this.checkCount++;
        
        try {
            const response = await fetch('/api/version?' + Date.now(), {
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });

            if (response.ok) {
                const versionData = await response.json();
                const serverVersion = versionData.version;
                const localVersion = localStorage.getItem('samlang_version') || 'unknown';

                console.log(`🔍 Deployment Check #${this.checkCount} - Server: ${serverVersion}, Local: ${localVersion}`);

                // Detect version change (deployment occurred)
                if (this.lastServerVersion && this.lastServerVersion !== serverVersion) {
                    console.log('🚨 NEW DEPLOYMENT DETECTED! Server version changed!');
                    this.triggerImmediateUpdate('DEPLOYMENT_DETECTED');
                    return;
                }

                this.lastServerVersion = serverVersion;

                // Force update if versions don't match
                if (localVersion !== serverVersion) {
                    console.log('⚡ VERSION MISMATCH - Triggering immediate deployment update');
                    this.triggerImmediateUpdate('VERSION_MISMATCH');
                    return;
                }

                // Force update if this is the deployment version and user doesn't have it
                if (serverVersion === DEPLOYMENT_VERSION && localVersion !== DEPLOYMENT_VERSION) {
                    console.log('🎯 DEPLOYMENT VERSION AVAILABLE - Force updating user');
                    this.triggerImmediateUpdate('DEPLOYMENT_VERSION_AVAILABLE');
                    return;
                }
            }
        } catch (error) {
            console.log('📡 Network check failed, will retry aggressively');
        }

        // Stop checking after reasonable time if everything is up to date
        if (this.checkCount > MAX_CHECK_ATTEMPTS) {
            console.log('✅ Deployment monitoring complete - User has latest version');
            clearInterval(this.checkInterval);
        }
    }

    triggerImmediateUpdate(reason) {
        console.log(`🔄 TRIGGERING IMMEDIATE UPDATE - Reason: ${reason}`);
        
        // Clear all caches aggressively
        this.clearAllCaches();
        
        // Update local version
        localStorage.setItem('samlang_version', DEPLOYMENT_VERSION);
        localStorage.setItem('samlang_last_deployment_update', Date.now().toString());
        localStorage.setItem('samlang_update_reason', reason);
        
        // Force hard refresh after brief delay
        setTimeout(() => {
            console.log('🚀 EXECUTING HARD REFRESH FOR DEPLOYMENT UPDATE');
            window.location.reload(true);
        }, INSTANT_UPDATE_DELAY);
    }

    clearAllCaches() {
        console.log('🧹 Clearing all caches for deployment update');
        
        // Clear localStorage selectively (keep user progress)
        const keysToRemove = ['samlang_cached_modules', 'samlang_audio_cache', 'samlang_component_cache'];
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Clear sessionStorage
        sessionStorage.clear();
        
        // Clear service worker caches
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    if (cacheName.includes('samlang')) {
                        console.log(`🗑️ Clearing cache: ${cacheName}`);
                        caches.delete(cacheName);
                    }
                });
            });
        }
    }

    setupUserInteractionMonitoring() {
        // Monitor clicks, touches, keyboard input
        ['click', 'touchstart', 'keydown', 'scroll'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                this.aggressiveVersionCheck();
            }, { passive: true });
        });
    }

    setupNetworkMonitoring() {
        // Monitor network changes
        window.addEventListener('online', () => {
            console.log('📶 Network online - Checking for deployment updates');
            this.aggressiveVersionCheck();
        });

        window.addEventListener('offline', () => {
            console.log('📵 Network offline - Will resume deployment checks when online');
        });
    }

    setupPageLifecycleMonitoring() {
        // Monitor page focus/visibility changes
        window.addEventListener('focus', () => {
            console.log('👁️ Page focused - Checking for deployment updates');
            this.aggressiveVersionCheck();
        });

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('👁️ Page visible - Checking for deployment updates');
                this.aggressiveVersionCheck();
            }
        });

        // Monitor page load/unload
        window.addEventListener('beforeunload', () => {
            console.log('🔄 Page unloading - Final deployment check');
            this.aggressiveVersionCheck();
        });
    }
}

// Initialize deployment force update system
const deploymentUpdater = new DeploymentForceUpdate();

// Export for external access
window.deploymentForceUpdate = deploymentUpdater;