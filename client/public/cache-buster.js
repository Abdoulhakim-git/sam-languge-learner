/**
 * Cache Buster - Ensures fresh content delivery
 */

// Add timestamp to all requests to bypass cache
const timestamp = Date.now();

// Override fetch to add cache busting
const originalFetch = window.fetch;
window.fetch = function(url, options = {}) {
  if (typeof url === 'string') {
    const separator = url.includes('?') ? '&' : '?';
    url = url + separator + 'v=' + timestamp;
  }
  
  return originalFetch(url, {
    ...options,
    cache: 'no-cache',
    headers: {
      ...options.headers,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    }
  });
};

// Clear local storage version info
localStorage.removeItem('teacher-sam-version');
localStorage.setItem('force-update', 'true');

console.log('🧹 Cache buster active - forcing fresh content');