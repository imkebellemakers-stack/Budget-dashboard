# Duinvakantie Bloemendaal — 28 juli t/m 6 augustus 2026

Vakantieplanner voor De Lakens (Bloemendaal aan Zee), als installeerbare PWA.
Tabs: Activiteiten, Eten, Koffie & Lunch, Voordelig, Inpakken.

## Bestandsstructuur

```
index.html   de hele app (opmaak, data en logica in één bestand)
manifest.json PWA-manifest (naam, iconen, kleuren)
sw.js         service worker — cachet alles bij het eerste bezoek
icons/        app-iconen (192/512/maskable/apple-touch), duin-motief
images/       kennemerduinen-wandelfietskaart.jpg (officiële PWN-kaart, gecomprimeerd)
vendor/leaflet/ lokaal gebundelde Leaflet-kaartlibrary (geen CDN nodig)
```

Geen backend, geen build-stap — alles werkt door de map gewoon te hosten of
`index.html` lokaal te openen (voor installeerbaarheid/offline moet het wel
gehost worden, zie punt 1).

## 1. Installeren als app (PWA)

**Belangrijk:** "Voeg toe aan beginscherm" met écht offline-gebruik werkt
alleen als de site over **HTTPS** wordt gehost (of via `http://localhost`).
Het los openen van `index.html` vanaf je telefoon toont de pagina prima,
maar dan slaat de browser geen service worker op en mist dus de
installeerbaarheid en offline-werking.

Gratis en simpel hosten via GitHub Pages: **Settings → Pages** → branch
kiezen, map `/ (root)` → de gegenereerde `https://…github.io/…`-URL openen
op je telefoon.

**Android (Chrome):** open de link → menu (⋮) → "App installeren".
**iOS (Safari):** open de link → deelknop (□↑) → "Zet op beginscherm".
Moet in Safari zelf, niet vanuit een in-app browser (WhatsApp/Instagram).

Na de eerste keer openen (met internet) werkt de hele planner ook zonder
wifi. **Bij elke inhoudelijke aanpassing wordt het versienummer in `sw.js`
verhoogd** — anders merkt een al-geïnstalleerd toestel de update niet en
blijft de oude inhoud getoond worden.

## 2. Kaart met wandel- en fietsroutes

De Activiteiten-tab toont de officiële PWN-kaart ("Wandel- en fietskaart
Nationaal Park Zuid-Kennemerland", schaal 1:20.000) als afbeelding — tik
erop om 'm groot en scherp te openen. De routelinks (AllTrails, Wikiloc,
Wandelnetwerk Noord-Holland) staan gewoon bij de betreffende wandel- of
fietsroute in de lijst eronder, niet los op de kaart.

## 3. Markten &amp; supermarkten

In de Eten-tab: een interactieve Leaflet-kaart (OpenStreetMap-tegels) met
de weekmarkten in Zandvoort en Haarlem plus een paar budgetsupermarkten,
met eronder de dagen/tijden. Werkt offline voor tegels die al eerder met
internet zijn geopend.

## 4. Foto's

Bewust beperkt: alleen de Kennemerduinen-illustratie (eigen SVG) bovenaan
Activiteiten. Geen losse fotostrip met stadstegels.

## 5. Live weer

Bovenaan de Activiteiten-tab, per dag van de vakantie: temperatuur,
neerslagkans en windkracht (Beaufort), via Open-Meteo (geen API-key nodig).
Zonder internet toont het blokje de laatst opgehaalde stand uit
`localStorage` met tijdsindicatie, of een duidelijke "geen verbinding"-
melding — nooit een kapot of leeg blokje.

## 6. Zon op/onder

Volledig offline berekend (NOAA-zonformule), per dag van de vakantie voor
de coördinaten van De Lakens. Getij is op verzoek niet in de app opgenomen
— check de actuele getijtafel bij Rijkswaterstaat Waterinfo of de
reddingsbrigade op het strand.

## 7. Vooraf boodschappen meenemen

Ook in de Eten-tab: een compacte lijst met houdbare basisboodschappen
(sauzen, kruiden, koffie, beleg) die handig zijn om al thuis in te pakken,
zodat je ter plekke alleen nog verse dingen hoeft te halen.

## Een technische kanttekening

Deze planner is gebouwd in een omgeving zonder algemene internettoegang
(alleen package-registries zijn bereikbaar) — kaarttegels, weer-API en
toekomstige aanpassingen zijn dus nooit hier getest met een live verbinding,
maar werken gewoon zodra jij de app met je eigen internet opent, in jouw
browser.
