# Duinvakantie Bloemendaal — 28 juli t/m 6 augustus 2026

Vakantieplanner voor De Lakens (Bloemendaal aan Zee), nu als installeerbare PWA.
Alle bestaande inhoud, kleuren, structuur en tabs zijn ongewijzigd — dit is
een technische upgrade van hetzelfde bestand.

## Bestandsstructuur

```
index.html        de hele app (zelfde structuur/inhoud als het origineel + nieuwe widgets)
manifest.json      PWA-manifest (naam, iconen, kleuren)
sw.js              service worker — cachet alles bij het eerste bezoek
icons/             app-iconen (192/512/maskable/apple-touch), duin-motief in de bestaande stijl
vendor/leaflet/    lokaal gebundelde Leaflet-kaartlibrary (geen CDN nodig)
routes/            optioneel: zet hier zelf GPX-bestanden neer, zie routes/README.md
```

Geen backend, geen build-stap — alles werkt door de map gewoon te hosten of
`index.html` lokaal te openen.

## 1. Installeren als app (PWA)

**Belangrijk:** "Voeg toe aan beginscherm" met écht offline-gebruik werkt
alleen als de site over **HTTPS** wordt gehost (of via `http://localhost`).
Het los openen van `index.html` vanaf je telefoon (bijv. via e-mail/AirDrop)
toont de pagina prima, maar dan slaat de browser geen service worker op en
mist dus de installeerbaarheid en offline-werking.

Gratis en simpel hosten via GitHub Pages:
1. Zet deze map in een GitHub-repo (staat al klaar als je dit via de branch hebt gekregen).
2. Ga naar **Settings → Pages**, kies de branch en map `/ (root)`.
3. Open de gegenereerde `https://…github.io/…`-URL op je telefoon.

**Android (Chrome):** open de link → menu (⋮) → "App installeren" of
"Toevoegen aan startscherm".

**iOS (Safari):** open de link → deelknop (□↑) → "Zet op beginscherm".
Let op: dit moet in Safari zelf, niet vanuit een in-app browser
(WhatsApp/Instagram) — die ondersteunen geen PWA-installatie.

Na de eerste keer openen (met internet) is de hele planner — inclusief
paklijst, kaart en dagoverzicht — ook zonder wifi te gebruiken. Getest door
de service worker te installeren en de pagina daarna met de verbinding
uitgeschakeld te herladen: alle tabs, de paklijst en de kaart blijven werken.

## 2. Kaart met wandel- en fietsroutes

Een echte Leaflet-kaart met OpenStreetMap-tegels, met per route een
aan/uit-vinkje. Twee soorten weergave, altijd duidelijk gelabeld:

- **Indicatieve lijn** (oranje): een vereenvoudigde, benaderde route —
  bijvoorbeeld de kustwandeling Bloemendaal–Zandvoort of de Zeeweg naar
  Haarlem. Handig voor een globaal beeld, niet om blind op te navigeren.
- **Alleen link**: voor routes door de duinen waarvan het exacte tracé niet
  betrouwbaar te reconstrueren was (Kennemerduinen-paden, AWD, Amsterdam-
  wandelingen) toont de kaart een startmarkering; de originele
  AllTrails/Wikiloc/Wandelnetwerk-link staat er gewoon naast, precies zoals
  gevraagd — die valt nergens stilzwijgend weg.

Heb je zelf een GPX-bestand (bijv. gedownload via AllTrails/Wikiloc)? Zet
het in `/routes` onder de juiste bestandsnaam (zie `routes/README.md`) — de
app leest het dan automatisch in en tekent het échte tracé, geen
code-wijziging nodig.

Zonder internet toont de kaart een duidelijke banner ("geen internet —
alleen eerder geladen kaartgebied zichtbaar"); eerder bekeken tegels
blijven zichtbaar dankzij de service worker.

## 3. Foto's

Op verzoek weggelaten — de bestaande SVG-illustraties (hero + fotostrip)
blijven gewoon staan, precies zoals in het origineel.

## 4. Live weer

Bovenaan de Activiteiten-tab, per dag van de vakantie: temperatuur,
neerslagkans en windkracht (Beaufort), via Open-Meteo (geen API-key nodig).
Werkt alleen met internet; zonder verbinding toont het blokje netjes de
laatst opgehaalde stand uit `localStorage` met tijdsindicatie ("3 uur
geleden"), of anders een duidelijke "geen verbinding"-melding — nooit een
kapot of leeg blokje.

## 5. Zon op/onder & getij

- **Zon op/onder**: volledig offline berekend (geen API) met een compacte
  NOAA-zonformule, per dag van de vakantie voor de coördinaten van De
  Lakens. Gecontroleerd tegen bekende zonstanden voor eind juli/begin
  augustus in Nederland.
- **Getij**: er bleek geen betrouwbare, gratis en key-loze Nederlandse
  getijden-API te bestaan die ik zonder livetest kon verifiëren. In plaats
  van een ongeteste integratie te bouwen die stilletjes verkeerde tijden
  zou kunnen tonen, toont elk dagblokje daarom altijd een duidelijke
  doorverwijzing naar Rijkswaterstaat Waterinfo — exact de nette
  fallback die in de opdracht als acceptabel werd genoemd.

## Een technische kanttekening

Deze planner is gebouwd in een omgeving zonder algemene internettoegang
(alleen package-registries zijn bereikbaar). Daardoor kon ik geen foto's,
GPX-bestanden of live API's live testen/downloaden tijdens het bouwen — dat
is ook waarom foto's zijn overgeslagen en de kaart met bewuste, gelabelde
fallbacks werkt. Weer, kaarttegels en toekomstige GPX-uploads werken gewoon
zodra jij de app met je eigen internetverbinding opent — dat gebeurt dan in
jouw browser, niet in deze bouwomgeving.
