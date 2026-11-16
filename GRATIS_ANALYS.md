# Spiken: gratis och integritetsmedveten besöksanalys

## Vald lösning
- GitHub Pages är fortsatt hosting.
- Cloudflare Web Analytics har en gratis grundtjänst som fungerar utan att webbplatsen flyttas till Cloudflare.
- **Ingen mätning är påslagen ännu.** `src/data/analytics.json` har `enabled: false` och tom `site_token`.
- Vi använder frivilligt samtycke i Spikens eget gränssnitt innan Cloudflare-skriptet laddas.
- `/integritet/` redovisar aktuell status och hur statistiken fungerar.

## Enda manuella kontosteget
1. Skapa gratis konto på Cloudflare, om det saknas.
2. Öppna Cloudflare > Web Analytics > Add a site.
3. Lägg till `money-se.github.io` som hostname och kopiera beacon-token från Cloudflare.
4. Lämna token till ChatGPT, som kan sätta `enabled: true` och `site_token` via GitHub.
5. Kontrollera hur mätningen ser ut i Cloudflare och att både godkännande och avböjande fungerar.

OBS: Detta är en webbanalystoken avsedd för publik JS-kod, inte en privat Cloudflare API-nyckel. Dela aldrig konto-lösenord eller hemliga API-tokens i chatten.

## Vad Cloudflare ger
- Sidvisningar, trafikkällor, länder, hastighet/prestanda och uppdelning per URL.
- Inte anpassade klickhändelser, textläsningsgrad, individuellt kön eller säkra återbesöksprofiler. Skapa inte sådana uppgifter från gissningar.
- Beakta Cloudflares begränsningar för lagringstid, sampling och eventuella produktändringar.

## Integritet
- Vid nytt besök utan ett tidigare val visas ja/nej med lika tillgängliga val.
- Vid ja laddas mätningen; vid nej laddas inte analys-skriptet.
- Valet sparas lokalt för att slippa fråga igen; en länk längst ner låter besökaren ändra det.
- Ingen övervakning utan information; lämna känsliga uppgifter, exakta positioner och identifierande profiler utanför.
- Kontrollera aktuell svensk rättslig vägledning innan produktionsaktivering.

## Nästa steg
När det finns riktiga dikter och översättningar kan URL:er grupperas efter språk/tema via publiceringsregistret och resultatet granskas på aggregerad nivå. För mer detaljerade egna event krävs senare ett separat beslut om event-mätning och integritet; sådana event är inte inkluderade eller aktiverade.
