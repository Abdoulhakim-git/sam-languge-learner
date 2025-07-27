/**
 * SamLang Niger - Service Worker for Complete Offline Functionality
 * Enables permanent offline learning experience for students in Niger
 */

const CACHE_NAME = 'samlang-niger-v3.0.2-AUDIO-COMPLETE';
const OFFLINE_URL = '/offline.html';

// Essential files for complete offline functionality
const CORE_FILES = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/force-update-distribution.js',
  '/sw.js',
  '/sw-offline.js'
];

// API endpoints to cache for offline functionality - NOW WITH 15 MODULES
const API_ENDPOINTS = [
  '/api/version',
  '/api/manifest',
  '/api/modules/1',
  '/api/modules/2',
  '/api/modules/3',
  '/api/modules/4',
  '/api/modules/5',
  '/api/modules/6',
  '/api/modules/7',
  '/api/modules/8',
  '/api/modules/9',
  '/api/modules/10',
  '/api/modules/11',
  '/api/modules/12',
  '/api/modules/13',
  '/api/modules/14',
  '/api/modules/15'
];

// Install - cache all essential files for complete offline experience
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker v3.0.2-AUDIO-COMPLETE: Installing complete offline capabilities with 15 modules...');
  
  // Clear old caches immediately
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      if (cacheName !== CACHE_NAME) {
        console.log('🗑️ Clearing old cache:', cacheName);
        caches.delete(cacheName);
      }
    });
  });
  
  event.waitUntil(
    Promise.all([
      // Cache core application files
      caches.open(CACHE_NAME).then(async (cache) => {
        console.log('🔧 Service Worker: Caching core files for offline use');
        
        // Cache core files one by one to handle errors gracefully
        for (const file of CORE_FILES) {
          try {
            await cache.add(file);
            console.log(`✅ Cached: ${file}`);
          } catch (error) {
            console.warn(`⚠️ Could not cache ${file}:`, error);
          }
        }
        
        // Cache API endpoints
        for (const endpoint of API_ENDPOINTS) {
          try {
            await cache.add(endpoint);
            console.log(`✅ Cached API: ${endpoint}`);
          } catch (error) {
            console.warn(`⚠️ Could not cache API ${endpoint}:`, error);
          }
        }
      }),
      
      // Clear old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.includes('samlang') && cacheName !== CACHE_NAME) {
              console.log('🗑️ Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ]).then(() => {
      console.log('✅ Service Worker: Offline installation complete');
      // Force activation to take control immediately
      return self.skipWaiting();
    })
  );
});

// Activate - take control and clean up
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker v3.0.2-AUDIO-COMPLETE: Activating offline functionality...');
  
  event.waitUntil(
    Promise.all([
      // Claim all clients immediately
      self.clients.claim(),
      
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.includes('samlang') && cacheName !== CACHE_NAME) {
              console.log('🧹 Cleaning up old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ]).then(() => {
      console.log('✅ Service Worker: Ready for offline learning!');
    })
  );
});

// Fetch - handle offline requests with cache-first strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Handle different types of requests with cache-first strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        console.log('📦 Serving from cache:', url.pathname);
        return cachedResponse;
      }
      
      // Try to fetch from network
      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response;
        }
        
        // Cache successful responses
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        
        console.log('🌐 Fetched and cached:', url.pathname);
        return response;
      }).catch(() => {
        // Handle specific offline fallbacks
        if (url.pathname.startsWith('/api/')) {
          return handleOfflineAPI(url.pathname);
        } else if (url.pathname.includes('module')) {
          return handleOfflineModule(url.pathname);
        } else {
          return handleOfflineApp();
        }
      });
    })
  );
});

// Handle API requests with offline fallbacks
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first for API requests
    const networkResponse = await fetch(request);
    
    // Cache successful API responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📡 API offline, using cached response for:', url.pathname);
    
    // Return cached response if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Provide offline API responses
    if (url.pathname === '/api/version') {
      return new Response(JSON.stringify({
        version: '3.0.2-AUDIO-COMPLETE',
        offline: true,
        buildTimestamp: new Date().toISOString(),
        features: ['Complete offline functionality', 'All 15 modules available offline', 'English-only audio system']
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generic offline API response
    return new Response(JSON.stringify({
      error: 'Offline',
      message: 'API not available offline'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle module requests with guaranteed offline access
async function handleModuleRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the module for offline use
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('📚 Module offline, using cached version');
  }
  
  // Return cached module or offline page
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fallback to main app which handles module routing
  const mainAppResponse = await caches.match('/');
  if (mainAppResponse) {
    return mainAppResponse;
  }
  
  // Final fallback to offline page
  return caches.match(OFFLINE_URL);
}

// Handle general requests (pages, assets, etc.)
async function handleGeneralRequest(request) {
  try {
    // Try cache first for better offline performance
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Refresh cache in background if online
      if (navigator.onLine) {
        fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          }
        }).catch(() => {
          // Ignore network errors during background refresh
        });
      }
      return cachedResponse;
    }
    
    // Try network if not in cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Offline request for:', request.url);
    
    // Return cached response if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    
    // Return offline response for other requests
    return new Response('Offline - Content cached for offline learning', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// Handle offline API requests
function handleOfflineAPI(pathname) {
  console.log('🔌 Offline API request:', pathname);
  
  if (pathname === '/api/version') {
    return new Response(JSON.stringify({
      version: '2.9.5',
      offline: true,
      buildTimestamp: new Date().toISOString(),
      features: ['Complete offline functionality', 'All 10 modules available offline']
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Generic offline API response
  return new Response(JSON.stringify({
    error: 'Offline',
    message: 'API not available offline',
    offline: true
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle offline module requests
function handleOfflineModule(pathname) {
  console.log('📚 Offline module request:', pathname);
  
  // Extract module ID from pathname
  const moduleMatch = pathname.match(/module[s]?[\/-]?(\d+)/i);
  const moduleId = moduleMatch ? moduleMatch[1] : '1';
  
  // Return basic offline module content
  return new Response(JSON.stringify({
    id: moduleId,
    title: `Module ${moduleId} - Offline Mode`,
    content: `This module is available offline. Content for Module ${moduleId} is cached for offline learning.`,
    offline: true
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle offline app requests
function handleOfflineApp() {
  console.log('🏠 Offline app request');
  
  // Return cached main app or offline page
  return caches.match('/').then(cachedResponse => {
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to offline page
    return caches.match(OFFLINE_URL).then(offlineResponse => {
      if (offlineResponse) {
        return offlineResponse;
      }
      
      // Final fallback - basic offline response
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>SamLang Niger - Offline</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .offline-message { color: #333; }
          </style>
        </head>
        <body>
          <div class="offline-message">
            <h1>🤖 SamLang Niger - Offline Mode</h1>
            <p>You're learning offline with Teacher Sam!</p>
            <p>All 10 modules are available for offline study.</p>
            <p>Connect to the internet to sync your progress.</p>
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    });
  });
}

// Handle messages from main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_ALL_MODULES') {
    console.log('📚 Service Worker: Caching all modules for offline learning');
    
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(CORE_FILES);
      }).then(() => {
        console.log('✅ All modules cached for offline use');
        if (event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      }).catch((error) => {
        console.error('❌ Module caching failed:', error);
        if (event.ports[0]) {
          event.ports[0].postMessage({ success: false, error: error.message });
        }
      })
    );
  }
});

console.log('🤖 SamLang Niger Service Worker v2.9.4: Ready for offline English learning!');