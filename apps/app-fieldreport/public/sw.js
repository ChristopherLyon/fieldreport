if (!self.define) {
	let e,
		s = {};
	const t = (t, n) => (
		(t = new URL(t + ".js", n).href),
		s[t] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = t), (e.onload = s), document.head.appendChild(e);
				} else (e = t), importScripts(t), s();
			}).then(() => {
				const e = s[t];
				if (!e) throw new Error(`Module ${t} didn’t register its module`);
				return e;
			})
	);
	self.define = (n, a) => {
		const i =
			e ||
			("document" in self ? document.currentScript.src : "") ||
			location.href;
		if (s[i]) return;
		const c = {};
		const d = (e) => t(e, i),
			r = { module: { uri: i }, exports: c, require: d };
		s[i] = Promise.all(n.map((e) => r[e] || d(e))).then((e) => (a(...e), c));
	};
}
define(["./workbox-01fd22c6"], (e) => {
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: "/_next/app-build-manifest.json",
					revision: "e448d3f5a1a775c01087f41ea4b3f5b5",
				},
				{
					url: "/_next/static/KNvISLlqtSEtn_Gsdg6da/_buildManifest.js",
					revision: "41f914c7c038bdf8872d2aa1d997c163",
				},
				{
					url: "/_next/static/KNvISLlqtSEtn_Gsdg6da/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{
					url: "/_next/static/chunks/163-86a42ca46763d649.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/202-226a0ad6fbb3316f.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/250-25a8b015f2de5f31.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/355-e11875a340e875a4.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/368-fc75747c23dcf4cb.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/448-3d6fe0418214c40c.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/514-d8963bcc435a9e39.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/61-6f2302c5593fec64.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/620-2f528d501e5d9b5e.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/713-dc18917847c1f3f3.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/819-b3f50be79b922d80.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/859-3f2549096959f7b8.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/998-259bf0f73a14815a.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/(app)/globe/page-8680cc6a352c3081.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/(app)/layout-5bd9393b64bedffe.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/(app)/page-ea4c2dbe355cd9e2.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/(app)/reports/page-62bb9b5b29382b29.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/(app)/tasks/page-607fd142066ceefa.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/_not-found/page-461bd2ee903598c8.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/auth/signin/page-7551322e94f1ecc7.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/app/layout-9641375a3dbe4f8a.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/b3390574.7ffd93e7be7078ae.js",
					revision: "7ffd93e7be7078ae",
				},
				{
					url: "/_next/static/chunks/ca100a65-a93c7792c675b02f.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/framework-bef83a85c94ff7de.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/main-app-6b5f06ba5acbeaa0.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/main-fdc19212f47dd19c.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/pages/_app-c91cdf62e75686b4.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/pages/_error-47ec5ce2f85ac6dc.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
					revision: "79330112775102f91e1010318bae2bd3",
				},
				{
					url: "/_next/static/chunks/webpack-1e8f24970a34f355.js",
					revision: "KNvISLlqtSEtn_Gsdg6da",
				},
				{
					url: "/_next/static/css/6df8f63ab46f2026.css",
					revision: "6df8f63ab46f2026",
				},
				{
					url: "/_next/static/css/ec8039b1ecbdac58.css",
					revision: "ec8039b1ecbdac58",
				},
				{
					url: "/_next/static/media/05a31a2ca4975f99-s.woff2",
					revision: "f1b44860c66554b91f3b1c81556f73ca",
				},
				{
					url: "/_next/static/media/513657b02c5c193f-s.woff2",
					revision: "c4eb7f37bc4206c901ab08601f21f0f2",
				},
				{
					url: "/_next/static/media/51ed15f9841b9f9d-s.woff2",
					revision: "bb9d99fb9bbc695be80777ca2c1c2bee",
				},
				{
					url: "/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",
					revision: "74c3556b9dad12fb76f84af53ba69410",
				},
				{
					url: "/_next/static/media/d6b16ce4a6175f26-s.woff2",
					revision: "dd930bafc6297347be3213f22cc53d3e",
				},
				{
					url: "/_next/static/media/ec159349637c90ad-s.woff2",
					revision: "0e89df9522084290e01e4127495fae99",
				},
				{
					url: "/_next/static/media/fd4db3eb5472fc27-s.woff2",
					revision: "71f3fcaf22131c3368d9ec28ef839831",
				},
				{
					url: "/_next/static/media/google-logo.36256ecd.webp",
					revision: "a743629d143c34f39498a34cc348e936",
				},
				{
					url: "/_next/static/media/signin-page.b3ee6108.png",
					revision: "60e6b713e0f7099c7247420e01589ba2",
				},
				{ url: "/icon.ico", revision: "02e895c9ae00d7947329db7a367699dd" },
				{
					url: "/icons/icon-192x192.png",
					revision: "2c84ed07d6b3f198b5e6b15668ef6e54",
				},
				{
					url: "/icons/icon-512x512.png",
					revision: "8c9a1991be01dcb348cb974e9df9a874",
				},
				{
					url: "/images/icon.ico",
					revision: "02e895c9ae00d7947329db7a367699dd",
				},
				{
					url: "/images/logos/field-report-logo.png",
					revision: "684af0934fceada9ac9bd5fe30f7fd13",
				},
				{
					url: "/images/logos/github-logo.png",
					revision: "ec3a60c8c6539a07eb70b52f6737ea6e",
				},
				{
					url: "/images/logos/google-logo.webp",
					revision: "a743629d143c34f39498a34cc348e936",
				},
				{
					url: "/images/signin-page.png",
					revision: "60e6b713e0f7099c7247420e01589ba2",
				},
				{ url: "/manifest.json", revision: "33132b8c55ed9255fe403408786b154c" },
				{ url: "/robots.txt", revision: "88a611fabaf2e3a356e572abba3fd7bd" },
			],
			{ ignoreURLParametersMatching: [] },
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: s,
							event: t,
							state: n,
						}) =>
							s && "opaqueredirect" === s.type
								? new Response(s.body, {
										status: 200,
										statusText: "OK",
										headers: s.headers,
									})
								: s,
					},
				],
			}),
			"GET",
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts-webfonts",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: "google-fonts-stylesheets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-image",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: "static-audio-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: "static-video-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-data",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET",
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: "cross-origin",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
				],
			}),
			"GET",
		);
});
