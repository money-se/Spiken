# Spikens textbank – hundratals dikter i en TXT-fil

Textbanken kan nu läsa **en enda stor TXT-fil med många dikter**, eller flera små TXT-/Markdownfiler. Varje identifierad dikt registreras separat i `src/data/publiceringsregister.json` som **utkast**.

## En samlingsfil med många dikter

Spara allt som `samling.txt` med UTF-8 och en avgränsningsrad mellan varje dikt:

```text
=== DIKT ===
Första diktens titel

Första raden i dikten
Andra raden i dikten

Andra strofen börjar här.

=== DIKT ===
En annan titel

Här kommer nästa dikt.

=== DIKT ===
Tredje titeln

Och så vidare.
```

En avgränsningsrad måste stå på **egen rad** och skrivas `=== DIKT ===`. Det är avsiktligt: tomrader mellan strofer får inte misstolkas som diktgränser. Även en avgränsningsrad *enbart mellan* dikterna fungerar. Om du har en befintlig samling utan sådana markörer kan du ladda upp den i ChatGPT så får vi först granska var dikterna börjar och slutar. **Vi gissar inte när gränserna är oklara.**

Filen kan också innehålla **bara en dikt**; då behövs ingen avgränsare. Första innehållsraden blir titel och följande rader dikttext. En Markdown-rubrik som `# Diktens titel` accepteras som titel.

## Importera automatiskt via GitHub

1. Lägg `samling.txt` i repositoryts mapp `textbank/inkorg/` (via GitHubs *Add file → Upload files*). Låt filen ligga kvar som ursprungskopia.
2. GitHub Actions kör automatiskt `Importera Spikens textbank som utkast` när en fil laddas upp i inkorgen på `main`.
3. Workflow testar importverktyget och gör förhandskontroll. Sedan förs nya dikter in i registret och sparas i GitHub.
4. Endast **utkast** skapas. Inga dikter publiceras på hemsidan av importen.

Du kan också köra kommandona lokalt: `npm run dikter:kontrollera` (endast förhandsgranskning), `npm run dikter:importera` (registrera som utkast) och `npm run test:import` (testfall).

## Granskning före publicering

- Originaltextens ord och strofer bevaras. Verktyget ändrar inte innehåll, hittar inte på en engelsk översättning och skapar inga bilder.
- Varje språkversion måste godkännas separat. Redaktören fyller i kategori, taggar, SEO-beskrivning, eventuell bild och publiceringsdatum.
- Ändra `translations.sv.status` till `published` först när diktens innehåll, titel och metadata har granskats. GitHub Pages skapar då dess egen sida vid nästa lyckade bygge.
- Dubbletter upptäcks genom originaltext eller redan använd URL/slug. Ett fel i någon dikt gör att **hela den importkörningen avbryts utan att skriva till registret**.
- Engelska språkversioner lämnas som tomma utkast tills en riktig översättning är klar.
- Inga nya bilder skapas eller läggs ut utan ditt godkännande.

**Viktigt:** Automatiken kan dela filer som följer formatet ovan. En otydligt formaterad samling kräver manuell granskning innan import. Att skicka en fil *här i chatten* laddar inte automatiskt upp den till GitHub; då granskar och överför vi den genom samtalet och de tillgängliga verktygen.

Se även `DIKTARKIV.md` för SEO, bildpaket och hur sidorna byggs.
