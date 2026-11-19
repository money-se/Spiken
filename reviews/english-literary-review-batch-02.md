# Spiken – English Literary Review
## Grupp 2 av 5 · Dikter 006–010 · 19 november 2026

**Status:** Endast granskning i `review/english-poems-batch-02`. Ingen publicering från denna gren. Grupp 1–5 godkänd och sammanslagen med `main` i PR #31.

**Underlag:** Hela svenska originalen och engelska versionerna i `src/data/publiceringsregister.json` samt lässidorna och språkparningen i `src/lib/poetry.js`, `src/components/PoemReader.astro`, `src/pages/en/poems/[slug].astro` och `Layout.astro`. Resultat är redaktionella kvalitetsbedömningar, inte mätningar av faktiskt läsarbeteende.

### Bedömning före och efter bearbetning

NE = naturlig engelska, OT = originaltrohet, KE = känslomässig effekt, RF = rytm/flyt, SI = Spikens identitet, LK = litterär kvalitet. Total = medelvärdet av sex omdömen.

| Dikt | Version | NE | OT | KE | RF | SI | LK | Totalt |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 006 Smärtan växer | Före | 6 | 8 | 8 | 6 | 8 | 6 | 7,0 |
| 006 The Pain Keeps Growing | Föreslagen | 8 | 9 | 8 | 8 | 9 | 8 | 8,3 |
| 007 Kampen Emot Tiden | Före | 7 | 7 | 8 | 7 | 7 | 7 | 7,2 |
| 007 A Race Against Time | Föreslagen | 9 | 9 | 8 | 8 | 9 | 8 | 8,5 |
| 008 I skogens hjärta | Före | 8 | 8 | 8 | 8 | 8 | 8 | 8,0 |
| 008 In the Heart of the Forest | Föreslagen | 8 | 9 | 8 | 8 | 9 | 8 | 8,3 |
| 009 Min lilla flicka – mitt hjärta | Före | 7 | 7 | 8 | 6 | 7 | 6 | 6,8 |
| 009 My Little Girl, My Heart | Föreslagen | 8 | 8 | 9 | 8 | 8 | 8 | 8,2 |
| 010 Bakom mitt leende | Före | 8 | 9 | 9 | 8 | 9 | 8 | 8,5 |
| 010 Behind My Smile | Föreslagen | 9 | 9 | 9 | 9 | 9 | 9 | 9,0 |

**Gruppsnitt:** 7,5 före → 8,5 efter, avrundat. Inga höga poäng ska tolkas som garantier för läsarrespons.

## 006 · Smärtan växer / The Pain Keeps Growing

**Problem:** “I'm exhausted by this discomfort” gör det pågående och plågsamma till en klinisk formulering. “To dare. To manage. To endure this endless time” går att förstå men är stel engelsk syntax. “My body is falling to pieces and I'm frantically taping it together” har bättre slagkraft om den sista åtgärden får stå på egna ord.

**Förbättring:** “I'm tired of this constant unease”, “To dare. To manage. To endure this endless time” (medvetet bevarad fragmentering), “My body is falling apart, and I'm taping it back together. Frantically”. Bevarar “Ow...” som svenskans “Aj...” och “naked skin” som “bare skin”, en mer naturlig kroppslig bild.

**Rekommendation:** Godkänn efter genomläsning; var uppmärksam på skillnaden mellan “somnar snart in” och “shut down” – den senare är idiomatisk men starkare.

## 007 · Kampen Emot Tiden / A Race Against Time

**Problem:** “I'm going to wear what's inside me on the outside” fungerar inte riktigt som kroppsmålning. “Give myself everything I've got” förvrider “satsa hundra på mig”. “I'm fighting like hell” tillför kraftord som saknas i svenska dikten.

**Förbättring:** “Cover my body in art. Nerves / The first time. It feels right”, “Bet everything on myself”, “It's hard. I'm fighting”. Behåller avsiktligt den kraftiga bildväxlingen mellan kroppen som en målad tavla, mörkret och två steg fram/ett tillbaka.

**Titelval:** Publicerad `A Race Against Time` är idiomatisk; direktöversättningen `The Fight Against Time` ligger närmare “Kampen”, men den etablerade titeln bör inte ändras utan särskilt godkännande.

**Rekommendation:** Godkänn.

## 008 · I skogens hjärta / In the Heart of the Forest

**Problem:** Den tidigare omskrivna engelska texten hör redan till de starkare. “In the dark mystery of the forest, I find traces” är mindre tydlig än svenskans spår som faktiskt leder någonstans. “A silence that won't end” neutraliserar den märkliga “omättlig tystnad”. “What is this mystery the forest keeps hidden?” låter som generisk fantasyprosa.

**Förbättring:** “I find a trail”, “An insatiable silence”, “What is this mystery hiding here?” Återger den svenska diktens något oroande ofärdighet. Här är det just orden som skaver som kan bära diktens identitet.

**Rekommendation:** Godkänn med notering: “insatiable silence” är avsiktligt ovanligt, inte idiomatisk vardagsengelska. Läsaren kan uppfatta det som ett medvetet surrealistiskt uttryck.

## 009 · Min lilla flicka – mitt hjärta / My Little Girl, My Heart

**Problem:** En lång, upprepad relationsdikt med stark och ofta motsägelsefull jagröst. “Through thick and thin, we fought” kan på engelska främst uppfattas som att paret bråkade, trots att originalet “I vått och torrt kämpade vi” först talar om att kämpa **för relationen**. “The one you love most has grown away from you” är onaturligt. Flera rader har tidigare allmän AI-romantisk klang.

**Förbättring:** “Through thick and thin, we kept fighting for us”, “the person you love most has outgrown you”, “I hate knowing how I must have made you feel”. Vissa upprepningar har bevarats, andra har fått tydligare mänsklig talrytm.

**Viktig redaktionell risk:** Den bokstavliga titeln `My Little Girl, My Heart`, “my little girl has grown up” och “she doesn't need me anymore” kan för en engelskspråkig läsare **inledningsvis låta som en dikt från en far till ett barn**, trots att fulltexten tydligt handlar om en vuxen romantisk separation. Svenska originalet uttrycker samma ord, men konnotationerna skiljer sig. Jag har **inte ändrat titel eller slagit om berättelsen** utan ditt godkännande. En framtida separat titel-/tondiskussion kan vara klok. Möjligt alternativ: `My Girl, My Heart` (behåll då nuvarande slug med omdirigering eller oförändrad slug).

**Rekommendation:** Justera efter författarkontroll av titeln och uttrycket “my little girl”. Ingen automatisk omskrivning av den avsedda relationen.

## 010 · Bakom mitt leende / Behind My Smile

**Problem:** Ursprungsversionen fungerar förhållandevis bra och kräver ingen fullständig omskrivning. “I don't want to weigh you down with my shit” har stöd i originalet, men “don't take it personally” tolkar “hoppas du inte tar åt dig” något för snävt. “I feel so fucking awful” och “a fucking fake world” används som svordomar för två olika svenska uttryck, vilket blir mer upprepat än nödvändigt.

**Förbättring:** “I don't want to burden you with my shit”, “I hope you don't think it's about you”, “I feel like absolute shit”, “a world that's fake as hell”. Bevarar råheten; fördelar kraften i dikten mer naturligt. “Because I'm not okay / And I never have been...” är kort, hård och bör inte förskönas.

**Rekommendation:** Godkänn. Denna översättning har potential att fungera särskilt väl som engelskspråkig dikt.

## SEO, bild, läsning och språkpar

- Kontroll mot register: endast `translations.en.text`, `translations.en.meta_description` och `translations.en.image_alt` ändrade i fem verk.
- Inga svenska texter ändrade. `title`, `slug`, `status` och `published_at` behållna i båda språk.
- De engelska versionerna behåller svenska original genom `translatedSlug` i `src/lib/poetry.js`. Läskomponenten använder strofindelning vid blankrader.
- Samtliga fem nya alt-texter utgår från de svenska motivbeskrivningarna. De är mer tillgängliga än generiska “Artwork accompanying…”.
- Metabeskrivningarna fokuserar på det verkliga motivet i respektive dikt. SEO har inte styrt dikttextens ordval.
- Detta är källkodsgranskning av lässidemallarna, **inte** verifiering av faktisk visuell återgivning i mobil och dator.

## Grupp 1–2: lärdomar för framtida stilguide

- Bevara korta och brutna meningar som rytm, inte som “fel” att alltid rätta.
- Korta ned engelska abstraktioner som låter översatta från svensk syntax.
- Lägg inte till svordomar där originalet inte använder dem.
- Bevara medvetna märkligheter som `An insatiable silence` men dokumentera när de riskerar att läsas som misstag.
- Var särskilt vaksam på engelska konnotationer kring familj, kön och relationer – det är lätt att byta mottagare oavsiktligt.
- Begränsa generiska formuleringar i dikttext, beskrivningar och alt-texter.

**De fem kompletta reviderade texterna finns i samma granskningsgren i `src/data/publiceringsregister.json`, bland de fem publicerade `en`-språkposterna. Ändringarna publiceras inte innan PR godkänns.**
