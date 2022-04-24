/*eslint no-restricted-globals: ["error"]*/

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.loadModule("workbox-background-sync");
workbox.precaching.precacheAndRoute([{"revision":"fa7d34e04d1e2bcad7aa1664ff54a725","url":"asset-manifest.json"},{"revision":"c92b85a5b907c70211f4ec25e29a8c4a","url":"favicon.ico"},{"revision":"9c0e95b986b7b768f35ebae7135a506a","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"411c8e11d6e9908093be0e1930683d60","url":"manifest.json"},{"revision":"fa1ded1ed7c11438a9b0385b1e112850","url":"robots.txt"},{"revision":"11c90f9bca85571bb51e5edc1bdb0daa","url":"static/css/main.ef460c74.css"},{"revision":"1eae23abeeef4d964a3c314a33215885","url":"static/js/main.542bd8fb.js"},{"revision":"acc395ed6b85b9232ed2fc42c65d7291","url":"static/js/main.542bd8fb.js.LICENSE.txt"}]);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheNetworkFirst = ["/api/auth/renew", "/api/events"];
registerRoute(({ request, url }) => {
  // console.log({ request, url });
  if (cacheNetworkFirst.includes(url.pathname)) return true;
  return false;
}, new NetworkFirst());

// REFERENCIA:
// registerRoute(
//   new RegExp("https://mern-calendar-jdpv.herokuapp.com/api/auth/renew"),
//   new NetworkFirst()
// );

// registerRoute(
//   new RegExp("https://mern-calendar-jdpv.herokuapp.com/api/events"),
//   new NetworkFirst()
// );

const cacheFirstNetwork = [
  "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
];

registerRoute(({ request, url }) => {
  // console.log({url});
  if (cacheFirstNetwork.includes(url.href)) return true;
  return false;
}, new CacheFirst());

// Posteos Offline
const bgSyncPlugin = new BackgroundSyncPlugin("posteos-offline", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});
registerRoute(
  new RegExp("https://mern-calendar-jdpv.herokuapp.com/api/events"),
  new NetworkOnly({ plugins: [bgSyncPlugin] }),
  "POST"
);
registerRoute(
  new RegExp("https://mern-calendar-jdpv.herokuapp.com/api/events/"),
  new NetworkOnly({ plugins: [bgSyncPlugin] }),
  "DELETE"
);
registerRoute(
  new RegExp("https://mern-calendar-jdpv.herokuapp.com/api/events/"),
  new NetworkOnly({ plugins: [bgSyncPlugin] }),
  "PUT"
);
