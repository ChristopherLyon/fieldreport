if (!self.define) {
	let e,
		s = {};
	const n = (n, a) => (
		(n = new URL(n + ".js", a).href),
		s[n] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = n), (e.onload = s), document.head.appendChild(e);
				} else (e = n), importScripts(n), s();
			}).then(() => {
				const e = s[n];
				if (!e) throw new Error(`Module ${n} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, i) => {
		const t =
			e ||
			("document" in self ? document.currentScript.src : "") ||
			location.href;
		if (s[t]) return;
		const c = {};
		const u = (e) => n(e, t),
			r = { module: { uri: t }, exports: c, require: u };
		s[t] = Promise.all(a.map((e) => r[e] || u(e))).then((e) => (i(...e), c));
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
					revision: "51bf7e890b94304e60ccc13f5f78e132",
				},
				{
					url: "/_next/static/8GKjBVKm3PsuMn8FnLHQv/_buildManifest.js",
					revision: "3f902539756e4c0a032f85813ea13d90",
				},
				{
					url: "/_next/static/8GKjBVKm3PsuMn8FnLHQv/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{
					url: "/_next/static/chunks/132-4163504278049e26.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/143-4d6e0cd5dbea4d15.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/240-dce3b8705868253f.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/281-933b95825531d72b.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/294-168c2caebbe1ad61.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/30-68e9a48b103bbaeb.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/333-25fdd1b5deb78688.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/388-c4d17a022d091c9c.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/450-8dba444d20f25e7a.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/485-dad7d7626b718992.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/839-0fc30ea305a2afe7.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/84-630d2f0e73d7e8f3.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/840-f3023e98091b3cf1.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/854-bd62d6ce646a6c98.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/864-082d3db977b9b162.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/9104b399-0f6e0139bdf9b7a9.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/973-e0d56caa07d5aa24.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/@modal/%5B...catchAll%5D/page-cc42df85b281d696.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/@modal/(.)reports/%5Bid%5D/page-21288d105f59635a.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/@modal/(.)streams/%5Bid%5D/page-bda3cb696bf9ef4e.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/@modal/default-d05918f530fd0958.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/globe/page-2660e8a801228401.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/layout-09b2beef94e09d7b.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/page-a953b72359577b39.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/reports/%5Bid%5D/page-b9457602d95909aa.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/reports/page-c235d0c7f965a85f.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/streams/%5Bid%5D/page-f84f93a0bae08228.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/streams/page-0ed849d280a39cf0.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(app)/tasks/page-cb2ad5b7aeabd201.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(auth)/layout-e665bc6ffbff269d.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-6333e7bb08e16f82.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-b335ff1b10a0539a.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/_not-found/page-48c9a0569e6ed283.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/auth/signin/page-14bec160521883ca.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/app/layout-9c1b98ab0327062a.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/b3390574.d64659cac16e2bb8.js",
					revision: "d64659cac16e2bb8",
				},
				{
					url: "/_next/static/chunks/framework-b33dfcc5f8dccae0.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/main-31fe29873b24c17e.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/main-app-f092db4237a4a871.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/pages/_app-904ef1bf83de3e49.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/pages/_error-976406c0971025cc.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
					revision: "79330112775102f91e1010318bae2bd3",
				},
				{
					url: "/_next/static/chunks/webpack-5f315496d4db3c57.js",
					revision: "8GKjBVKm3PsuMn8FnLHQv",
				},
				{
					url: "/_next/static/css/a2791eba79817457.css",
					revision: "a2791eba79817457",
				},
				{
					url: "/_next/static/css/ec8039b1ecbdac58.css",
					revision: "ec8039b1ecbdac58",
				},
				{
					url: "/_next/static/media/56d4c7a1c09c3371-s.woff2",
					revision: "43b1d1276722d640d51608db4600bb69",
				},
				{
					url: "/_next/static/media/7e6a2e30184bb114-s.p.woff2",
					revision: "bca21fe1983e7d9137ef6e68e05f3aee",
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
				{ url: "/manifest.json", revision: "5cbf95f6610be7d5b28d14a5cc1f8898" },
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
							event: n,
							state: a,
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
