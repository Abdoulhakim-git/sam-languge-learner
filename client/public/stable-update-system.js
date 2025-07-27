/**
 * SamLang Niger - Stable Update System
 * Reasonable update checking without aggressive loops
 */

const STABLE_VERSION = "3.0.2-AUDIO-COMPLETE";
const CHECK_INTERVAL = 300000; // Check every 5 minutes

console.log('✅ SamLang Niger Stable Update System - Monitoring for genuine updates only');

class StableUpdateSystem {
    constructor() {
        this.lastKnownVersion = STABLE_VERSION;
        this.initialize();
    }

    initialize() {
        // Set the current version immediately
        localStorage.setItem('samlang_version', STABLE_VERSION);
        
        // Check periodically for genuine updates only
        setInterval(() => {
            this.checkForGenuineUpdates();
        }, CHECK_INTERVAL);

        // Check on page focus (but not aggressively)
        window.addEventListener('focus', () => {
            setTimeout(() => this.checkForGenuineUpdates(), 2000);
        });
    }

    async checkForGenuineUpdates() {
        try {
            const response = await fetch('/api/version?' + Date.now(), {
                cache: 'no-cache'
            });

            if (response.ok) {
                const versionData = await response.json();
                const serverVersion = versionData.version;
                const localVersion = localStorage.getItem('samlang_version');

                // Only update if there's a genuine new version (not just a mismatch)
                if (serverVersion !== STABLE_VERSION && serverVersion !== localVersion) {
                    console.log(`📢 Genuine update available: ${serverVersion}`);
                    this.showUpdateNotification(serverVersion);
                }
            }
        } catch (error) {
            // Fail silently - no need to spam console
        }
    }

    showUpdateNotification(newVersion) {
        // Show a non-intrusive notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            cursor: pointer;
        `;
        notification.innerHTML = `
            <div>New version available: ${newVersion}</div>
            <div style="font-size: 12px; margin-top: 4px; opacity: 0.8;">Click to update</div>
        `;
        
        notification.onclick = () => {
            localStorage.setItem('samlang_version', newVersion);
            window.location.reload();
        };

        document.body.appendChild(notification);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }
}

// Only initialize if versions are stable
const currentLocal = localStorage.getItem('samlang_version');
if (!currentLocal || currentLocal === STABLE_VERSION) {
    new StableUpdateSystem();
}