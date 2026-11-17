# Spiken 3.0 – godkänd startsida som designsanning

Startsidan är godkänd. Den får inte ändras när undersidorna anpassas. Samma globala header, logotyp, navigation, språkval och footer ska renderas från `src/layouts/Layout.astro`; inga sidunika kopior av header-CSS får byggas. Skilj på att varje undersida behöver ett eget bildmotiv och att de ska dela samma visuella identitet.

## Gemensam typografi och komposition
- Nära svart bakgrund (`#0d0b0b`), varmt elfenbensvitt (`#eee2d8`), sparsamma blodröda accenter (`#b9232d`).
- Kursiv Georgia-typografi i rubriker och en enkel mindre font för navigation, etiketter och knappar.
- Hero med fotograferat motiv i bakgrunden och mörkt utrymme för text till vänster. Bakgrunden flyter bakom den **genomskinliga headern**.
- Samma maxbredd, knappar, horisontella rytm och mjuka nedtoning till nästa sektion.
- Bevara startsidans porträtt, texter och godkända komposition; rör den inte för att matcha en undersida.

## Bildbrief: Diktarkivet – först
**Syfte:** Att ge känslan av att besökaren går in i ett verkligt, omfattande bibliotek av känslor och skrivna berättelser.
**Motiv:** Realistisk mörk skrivmiljö i varmt naturligt ljus. Ett uppslaget häfte/anteckningsbok, äldre böcker och brev, ett fönster med regn. Mörk vänstersida reserverad för titel och ingress. Fotografi, inte bokomslag eller illustrerad affisch.
**Komposition:** 16:9 liggande, god säkerhetsmarginal för beskärning. Inga ord eller logotyper i bilden. Warm amber / muted burgundy / charcoal. Ej samma ros- och ljusmotiv som i varje tidigare kategori.
**Asset:** `spiken-arkiv-hero.webp` i `Spiken_Arkivbild_001.zip`; lägg ZIP i repo-roten. Arbetsflödet packar upp före Astro-build.
**Status:** Första riktade bildversionen skapad. Visuell kontroll krävs efter GitHub-uppladdning.

## Bildbrief: Om Spiken – separat godkännande
**Syfte:** Människan bakom orden, lågmält trovärdig snarare än modellfotografering.
**Motiv:** Naturligt porträtt i verklig skrivmiljö, helst baserat på författarens verkliga referensfoto. Mannens utseende ska vara realistiskt, utan örhängen och utan felaktigt uppfunna tatueringar; osynlig handtatuering om inte riktig referens kan återskapas.
**Komposition:** Halvfigur till höger, plats till vänster för rubriken. Mörk miljö och lågmält ljus, inget stockfoto-utseende.
**Status:** Brief – motivet ska skapas och godkännas separat.

## Bildbrief: Spikens världar – separat godkännande
**Syfte:** Visa att Spiken omfattar mer än diktning: noveller, reflektioner, mörk poesi, recensioner och den fiktiva religionsvärlden.
**Motiv:** Ett trovärdigt bibliotek/rum med en passage som antyder en större värld utanför; tillräckligt verklighetstroget för att höra hemma bredvid startsidans foto. Mörker, djup och möjligheter, inte en generisk fantasyaffisch.
**Komposition:** En sammanhållen hero med gott om textutrymme. Unika kompletterande fotografier för olika verktyper/ingångar tas fram senare med egna briefar.
**Status:** Brief – motivet ska skapas och godkännas separat.

## Diktbilder och Google
Varje dikt ska ha en egen statisk URL, unika SEO-fält och originallitterärt innehåll; kategorisidor får egna URL:er när minst ett verk finns. Unika bilder tas fram med diktens betydelse som utgångspunkt, inte genom att återanvända slumpmässiga bakgrunder. Varje undersida ska fungera på mobil med rimlig beskärning och bibehållen läsbarhet.

Att Google *kan* indexera varje URL innebär inte att alla indexeras eller rankas. SEO och användarupplevelse väger mer än antalet sidor.
