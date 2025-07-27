import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Audio system imports removed to fix build errors

// Audio system initialization removed to fix build errors

// Service worker configuration based on environment
const isDevelopment = import.meta.env.DEV;

// Disable service worker in development to prevent errors
if ('serviceWorker' in navigator && !isDevelopment) {
  window.addEventListener('load', async () => {
    try {
      console.log('🔧 SamLang Niger: Starting service worker registration...');
      
      // Clear any existing service workers first
      const existingRegistrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of existingRegistrations) {
        await registration.unregister();
        console.log('🔧 Cleared old service worker');
      }
      
      // Register the complete offline service worker for production
      const registration = await navigator.serviceWorker.register('/sw-offline-complete.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('✅ SamLang Niger: Offline service worker registered successfully');
      
      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;
      console.log('✅ Service worker is ready');
      
      // Cache all modules for offline use
      if (registration.active) {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            console.log('✅ All modules cached - App ready for offline use');
            localStorage.setItem('samlang_offline_ready', 'true');
          } else {
            console.warn('⚠️ Module caching failed:', event.data.error);
          }
        };
        
        registration.active.postMessage(
          { type: 'CACHE_ALL_MODULES' },
          [messageChannel.port2]
        );
      }
      
    } catch (error) {
      console.error('❌ Service worker registration failed:', error);
      console.log('📱 App will work but offline functionality is limited');
      // Don't let service worker errors block the app
    }
  });
} else {
  console.log('📱 Service Worker skipped in development mode or not supported');
}

// FIXED React mounting with proper DOM ready check
function mountReactApp() {
  console.log('🔍 Starting React app mounting process');
  
  const rootElement = document.getElementById("root");
  console.log('🔍 Root element found:', rootElement);

  if (rootElement) {
    console.log('🔍 Creating React root');
    const root = createRoot(rootElement);
    console.log('🔍 Rendering App component');
    root.render(<App />);
    console.log('✅ React app successfully mounted');
  } else {
    console.error('❌ Root element not found - React cannot mount');
    // Try again in a moment
    setTimeout(mountReactApp, 100);
  }
}

// Ensure DOM is ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountReactApp);
} else {
  mountReactApp();
}
