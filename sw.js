/* Duinvakantie Bloemendaal — service worker
   Precacht de hele app bij het eerste bezoek zodat alles offline werkt.
   Runtime data (weer, getij, kaarttegels, fonts) wordt cache-first bewaard
   zodra ze één keer zijn opgehaald, met network-first verversing als er
   verbinding is. */

const APP_CACHE = "duinvakantie-app-v1";
const RUNTIME_CACHE = "duinvakantie-runtime-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/leaflet.js",
  "./vendor/leaflet/images/marker-icon.png",
  "./vendor/leaflet/images/marker-icon-2x.png",
  "./vendor/leaflet/images/marker-shadow.png",
  "./vendor/leaflet/images/layers.png",
  "./vendor/leaflet/images/layers-2x.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

function isRuntimeCacheable(url) {
  // Google Fonts, OSM-tegels, Open-Meteo en RWS mogen als runtime-cache
  // bewaard worden zodat een tweede bezoek zonder wifi ook werkt.
  return (
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com") ||
    url.hostname.includes("tile.openstreetmap.org") ||
    url.hostname.includes("api.open-meteo.com") ||
    url.hostname.includes("waterwebservices.rijkswaterstaat.nl")
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App-shell: cache-first, zodat de planner altijd meteen opent.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(req, copy));
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Externe, offline-relevante bronnen: network-first met cache-fallback,
  // zodat je altijd de laatst gelukte ophaal-actie terugkrijgt zonder wifi.
  if (isRuntimeCacheable(url)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
