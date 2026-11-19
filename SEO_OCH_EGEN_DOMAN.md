# Spiken – SEO och framtida egen domän

## Nuvarande drift
- GitHub Pages: https://money-se.github.io/Spiken/
- Projektet byggs med Astro och publiceras via .github/workflows/deploy.yml.
- Utan extra variabler använder byggprocessen automatiskt `site=https://money-se.github.io` och `base=/Spiken`.
- Ingen egen domän är aktiverad. Köp eller DNS-ändra ingenting i detta steg.

## När en egen domän har valts
1. Verifiera att domänen ägs av dig via GitHub (GitHub Settings -> Pages, samt kontots/organisationens domänverifiering om tillämpligt). Välj gärna en huvudversion: `www` eller utan `www`.
2. I repo `money-se/Spiken` -> **Settings -> Secrets and variables -> Actions -> Variables**, lägg till `SPIKEN_SITE_URL`, exempelvis `https://www.din-doman.se` (utan extra sökväg eller avslutande snedstreck). Sätt `SPIKEN_BASE_PATH` till `/` för en domän som ligger på webbplatsens rot. Observera att dessa variabler används vid **nästa GitHub Actions-build**.
3. Lägg till den valda domänen under **Settings -> Pages -> Custom domain**. Konfigurera DNS enligt GitHubs aktuella instruktioner, till exempel CNAME för en `www`-underdomän. Vänta på verifiering och slå på **Enforce HTTPS** när GitHub tillåter det.
4. Kör en ny publicering från `main` först när DNS/GitHub Pages är klart. Kontrollera att `/dikter/`, enskilda dikter, bilder, interna länkar, `/sitemap-index.xml`, `/robots.txt`, canonical, delningsbilder och språklänkar pekar mot den egna domänen.
5. Lägg till den nya domänen i Google Search Console och skicka in `https://www.din-doman.se/sitemap-index.xml`. Om den gamla projektadressen indexerats, kontrollera dess beteende efter domänbytet och planera eventuella permanenta omdirigeringar där de är tekniskt möjliga.

## Viktiga tekniska detaljer
- Astro skapar automatiskt sitemap via `@astrojs/sitemap`, och `src/pages/robots.txt.ts` hämtar domän och basväg från samma Astro-konfiguration.
- Dikttexter, sociala bilder, kanoniska URL:er och delningslänkar bygger på webbplatsens konfigurerade adress.
- Den nuvarande GitHub Pages-projektsidan ligger under `/Spiken/`. Dess `/Spiken/robots.txt` är **inte** serverns root-robotsfil på `money-se.github.io`; därför behöver sökmotorer främst hitta nuvarande sitemap genom att den skickas in i Search Console. Med en egen domän på roten blir `/robots.txt` korrekt placerad.
- Eftersom GitHub Pages använder en egen GitHub Actions-workflow krävs ingen `CNAME`-fil i kodrepot. Domäninställningen görs under Pages och DNS.
- Byt inte bara DNS. Först efter att `site` och `base` byggts om ska länkarna för den nya domänen användas.
- Behåll det tidigare GitHub Pages-läget genom att ta bort de två Actions-variablerna och ändra tillbaka Pages-domänen, följt av ny publicering.

## SEO-kontroll efter varje större publicering
- Varje publicerad dikt har en egen läsbar URL och unik titel/beskrivning från publiceringsregistret.
- Canonical och strukturerad data ska peka på samma färdiga diktadress.
- Endast publicerade språkversioner ska ha egna diktsidor.
- Sitemap ska omfatta publicerade sidor; utkast ska inte publiceras.
- Kontrollera bilder, bildadresser och interna länkar både på mobil och dator.

Dokumentet beskriver förberedelser – ingen egen domän har anslutits.
