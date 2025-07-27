/**
 * SamLang Niger - Fallback Service Worker
 * Minimal service worker that doesn't interfere with development
 */

console.log('🤖 SamLang Niger Fallback Service Worker - Development Mode');

// Simple install handler
self.addEventListener('install', (event) => {
  console.log('🔧 Fallback service worker installing...');
  self.skipWaiting();
});

// Simple activate handler
self.addEventListener('activate', (event) => {
  console.log('🚀 Fallback service worker activated');
  event.waitUntil(self.clients.claim());
});

// Minimal fetch handler - just pass through to network
self.addEventListener('fetch', (event) => {
  // In development, just fetch normally
  event.respondWith(fetch(event.request));
});