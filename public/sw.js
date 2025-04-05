importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

// Custom precaching list
workbox.precaching.precacheAndRoute([
	{ url: '/', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/icons/manifest-icon-192.maskable.png', revision: '1' },
	{ url: '/icons/manifest-icon-512.maskable.png', revision: '1' }
]);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
workbox.routing.registerRoute(
	/\.(?:js|css)$/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'static-resources',
	})
);

// Cache images with a Cache First strategy
workbox.routing.registerRoute(
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			}),
		],
	})
);

// Update your catchHandler to better handle offline navigation
workbox.routing.registerRoute(
	({ request }) => request.mode === 'navigate',
	new workbox.strategies.NetworkFirst({
		cacheName: 'pages',
		plugins: [
			new workbox.cacheableResponse.CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 30,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	})
);

// Ensure the root page is cached properly (the most important part for hash-based navigation)
workbox.routing.registerRoute(
	'/',
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'pages',
	})
);