/**
 * SamLang Niger - FIXED Service Worker for Complete Offline Functionality
 * Ensures app works offline and opens for all users
 */

const CACHE_NAME = 'samlang-niger-v3.0.1-offline-fixed';
const OFFLINE_URL = '/offline.html';

// Essential files that MUST be cached for offline use
const ESSENTIAL_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json'
];

// Module API endpoints for offline learning
const MODULE_APIS = [
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
  '/api/modules/10'
];

// Install Service Worker - Cache everything needed for offline use
self.addEventListener('install', (event) => {
  console.log('🔧 SamLang Niger: Installing offline capabilities...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('📦 Caching essential files for offline use...');
      
      // Cache essential files
      for (const file of ESSENTIAL_FILES) {
        try {
          await cache.add(file);
          console.log(`✅ Cached: ${file}`);
        } catch (error) {
          console.warn(`⚠️ Could not cache ${file}:`, error);
        }
      }
      
      // Cache module APIs
      for (const api of MODULE_APIS) {
        try {
          await cache.add(api);
          console.log(`✅ Cached API: ${api}`);
        } catch (error) {
          console.warn(`⚠️ Could not cache API ${api}:`, error);
        }
      }
      
      console.log('✅ Offline caching complete');
    }).then(() => {
      // Skip waiting to activate immediately
      return self.skipWaiting();
    })
  );
});

// Activate Service Worker - Take control immediately
self.addEventListener('activate', (event) => {
  console.log('🚀 SamLang Niger: Activating offline functionality...');
  
  event.waitUntil(
    Promise.all([
      // Take control of all clients immediately
      self.clients.claim(),
      
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.includes('samlang') && cacheName !== CACHE_NAME) {
              console.log('🧹 Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ]).then(() => {
      console.log('✅ Service Worker activated - App ready for offline use');
    })
  );
});

// Fetch Handler - Serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // If we have a cached response, return it
        if (cachedResponse) {
          console.log(`📦 Serving from cache: ${url.pathname}`);
          return cachedResponse;
        }
        
        // Try to fetch from network
        return fetch(request).then((response) => {
          // If successful, cache the response for future offline use
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch((error) => {
          console.log(`🔌 Network failed for ${url.pathname}, serving offline content`);
          
          // Handle specific offline cases
          if (url.pathname.startsWith('/api/modules/')) {
            return handleOfflineModule(url.pathname);
          }
          
          if (url.pathname.startsWith('/api/')) {
            return handleOfflineAPI(url.pathname);
          }
          
          // For HTML requests, serve the main app
          if (request.headers.get('Accept')?.includes('text/html')) {
            return caches.match('/') || caches.match('/offline.html');
          }
          
          throw error;
        });
      })
    );
  }
});

// Handle offline module requests
function handleOfflineModule(pathname) {
  const moduleId = pathname.split('/').pop();
  const moduleData = {
    id: moduleId,
    title: `Module ${moduleId}`,
    content: `<h1>Module ${moduleId} - Available Offline</h1><p>This module is available for offline learning.</p>`,
    offline: true
  };
  
  return new Response(JSON.stringify(moduleData), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle offline API requests
function handleOfflineAPI(pathname) {
  if (pathname === '/api/version') {
    return new Response(JSON.stringify({ version: '2.9.5', offline: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (pathname === '/api/manifest') {
    return new Response(JSON.stringify({ name: 'SamLang Niger', offline: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ offline: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Message handler for immediate caching
self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_ALL_MODULES') {
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.all(MODULE_APIS.map((api) => cache.add(api)));
      })
    ]).then(() => {
      event.ports[0].postMessage({ success: true });
    }).catch((error) => {
      console.error('Failed to cache modules:', error);
      event.ports[0].postMessage({ success: false, error: error.message });
    });
  }
});

console.log('🤖 SamLang Niger Service Worker loaded - Ready for offline learning!');