import { Workbox } from 'workbox-window';

export function register() {
	if (
		typeof window !== 'undefined' &&
		'serviceWorker' in navigator
	) {
		const wb = new Workbox('/sw.js');

		wb.addEventListener('installed', event => {
			if (event.isUpdate) {
				// New content is available, show refresh prompt
				if (confirm('New app update is available! Reload to update?')) {
					window.location.reload();
				}
			}
		});

		wb.addEventListener('activated', () => {
			console.log('Service worker activated');
		});

		wb.addEventListener('waiting', () => {
			console.log('Service worker waiting');
		});

		// Register the service worker after event listeners are added
		wb.register()
			.then(registration => {
				console.log('Service Worker registered', registration);
			})
			.catch(error => {
				console.error('Service Worker registration failed:', error);
			});
	}
}