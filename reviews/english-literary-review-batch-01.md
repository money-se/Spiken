# Spiken – English Literary Review
## Grupp 1 av 5 · Dikter 001–005 · 2026-11-19

**Status:** Redigerade engelska versioner i `review/english-poems-batch-01`. **Inte publicerade**. Kräver författarens godkännande innan PR slås ihop. De svenska originalen, titlarna, nuvarande slugs och publiceringsdatum är oförändrade.

**Metod:** Läsning av båda hela språkversionerna i `src/data/publiceringsregister.json`, granskning av översättningsbeslut rad för rad, och kontroll av Astro-komponenterna `src/lib/poetry.js`, `src/components/PoemReader.astro`, språkversionernas `[slug].astro` och `Layout.astro`. Litterära poäng är subjektiva redaktionella bedömningar, inte empirisk läsarrespons.

### Betyg före/efter (1–10)

Förkortningar: NE = naturlig engelska, OT = originaltrohet, KE = känslomässig effekt, RF = rytm och flyt, SI = Spikens identitet, LK = litterär kvalitet. Total = enkelt medelvärde.

| Dikt | NE | OT | KE | RF | SI | LK | Total | Rekommendation |
|---|---|---|---|---|---|---|---|---|
| 001 Mannen bakom masken, före | 6 | 6 | 8 | 7 | 7 | 7 | 6,8 | Justera |
| 001 föreslagen | 8 | 8 | 8 | 8 | 8 | 8 | 8,0 | Godkänn efter upphovspersonens kontroll av perspektiv |
| 002 I Din Sötma, före | 5 | 7 | 7 | 5 | 7 | 5 | 6,0 | Omarbeta |
| 002 föreslagen | 8 | 8 | 8 | 7 | 8 | 7 | 7,7 | Godkänn efter kontroll av tvetydiga bilder |
| 003 I kraften av det lilla, före | 6 | 8 | 8 | 6 | 8 | 6 | 7,0 | Justera |
| 003 föreslagen | 8 | 8 | 8 | 8 | 8 | 8 | 8,0 | Godkänn efter kontroll av ordet "sista" |
| 004 Djävulens Symfoni, före | 8 | 8 | 7 | 8 | 8 | 7 | 7,7 | Lätt språkjustering |
| 004 föreslagen | 9 | 9 | 8 | 9 | 9 | 8 | 8,7 | Godkänn |
| 005 Under Ditt Sken, före | 7 | 8 | 9 | 7 | 8 | 7 | 7,7 | Justera |
| 005 föreslagen | 8 | 9 | 9 | 8 | 9 | 8 | 8,5 | Godkänn |

**Genomsnitt för denna grupp (avrundat):** 7,0 före, 8,2 i förslaget. Siffrorna är jämförande redaktörsomdömen, inte objektiv statistik.

## 001 · Mannen bakom masken / The Man Behind the Mask

**Problem i tidigare översättning:** “Now I can look back” tillför ett explicit tillbakablickande som svenska “När jag kan börja reflektera” inte kräver. “played on feelings, played the victim, all of it” har idiomatiska skarvar och förlorar viss hårdhet. “Your hold on me is blowing away” är inte en naturlig engelsk bild. “To defy what has fed the sorrow” har svagare konkret riktning än ursprunget. Röstens skifte mellan *du*, *hon* och ett uppmuntrande *du* finns i originalet: det är avsiktligt inte jämnat ut.

**Val:** “But enough. I'm choosing to walk away”, “Your grip on me is blowing away”, “Finding the words. Finding the courage.” Behåller “she” i slutet, eftersom svenska originalet faktiskt byter till tredje person.

**Tvetydighet att stämma av:** “Och ej längre skall den eld som bundit dig / Nu längre kunna kontrollera det liv du lever” talar till ett *du* snarare än explicit berättarjaget. Vi har bevarat pronomenet men inte uppfunnit förklaring. **SEO:** titeln och slugen behålls. Ny metabeskrivning specificerar handlingen utan överdrivna påståenden. Ny alt-text följer motivbeskrivningen från det svenska registret.

## 002 · I Din Sötma / In Your Sweetness

**Problem i tidigare översättning:** “In the sweetness of your tender soul” ändrade *mjuka inre* till “soul” och fyllde i en tolkning. “dance a tango” är idiomatiskt svagare än “dance the tango”; “Its flavours, its scent” hade oklart antecedent; “I just want to dive in” tappade lusten i “hugga in”. “Tender... Tender words” blev för prydligt och rundade av hårdare begär.

**Val:** “There's sweetness in the softest part of you”, “I want to eat you up” och “keep the evil in check”. Dessa är avsiktligt direkta. De ursprungliga upprepningarna och kroppsligheten bevaras.

**Tvetydighet att stämma av:** “Vill jag bygga ett liv med dig i mig” har en ovanlig och möjlig kroppslig underton. “I want to build a life with you inside me” är fortfarande märklig engelska, men märkligheten kommer här från **originalet** och ska inte städas bort utan samtal. **SEO:** behåll titel/slug, precisera begär och närhet; alt-text beskriver kvinnan vid det regniga fönstret, inte ett generiskt “artwork”.

## 003 · I kraften av det lilla / With What Little Strength I Have Left

**Problem i tidigare översättning:** “I want to make it clear” är tungt och administrativt vid “tårar av blod”; “melancholy life turns to turbulence” lät översatt och abstrakt; “his magic words will stay carved” ligger längre från “etsade” än “etched”. “The strength, it's fading” bröt syntaktiskt på ett oavsiktligt engelskt sätt.

**Val:** “I need you to know”, “Reality slipping out of balance”, “etched into the sky”, och kortare kollapsande rader i slutet. Behåller “my naked life”, den fallande pojken och den paradoxala växlingen mellan att aldrig dö och att förlora kraften.

**Tvetydighet att stämma av:** “mina sista ord” är i svenska originalet “my last words”, men betyder inte nödvändigtvis en bokstavlig avsikt att dö. Texten ska läsas som poesi, inte tillskrivas ett biografiskt påstående. **SEO:** befintligt namn/slug behålls; mer specifik beskrivning; konkret alt-text.

## 004 · Djävulens Symfoni / The Devil's Symphony

**Problem i tidigare översättning:** “A few seconds and everything breaks apart” är mindre kraftfullt än ”få sekunder och allt splittras”. “Night stretches into eternity” är grammatisk men plattare än “natten blir oändlighet”. “The end of the world is on its way” och “agonising pain” låter som allmänna fantasyfraser.

**Val:** “Seconds, and everything shatters”, “As night becomes eternity”, “The end of the world is coming”, “We all scream... Scream in torment.” Behåller den märkliga motsägelsen *devil's heavenly symphony* – den är bildens kärna.

**SEO:** ingen ändring av titel/slug; uppdaterad beskrivning och konkret alt-text för stad och flygel.

## 005 · Under Ditt Sken / Beneath Your Light

**Problem i tidigare översättning:** “Carrying everything in the background” upplevs stelt, men originalet har också en avsiktligt kantig formulering; ny version tar ned det lite utan att försköna. “You never gave me understanding” är en svensk konstruktion. “If I had said no... You always said I was cold” förlorade det upprepade villkoret: *om jag sa nej, sa du att jag var kall*. “And turned my silence into consent” är korrekt, men mer kroppslig engelsk prosa blir “made my silence mean yes.”

**Val:** “You never tried to understand me”, “If I dared to say no... / You'd always tell me I was cold”, och “We were never equals.” Behåller den kraftiga hjärtmetaforen och de avbrutna slutraderna.

**SEO:** ingen ändring av titel/slug; mer precis metabeskrivning; alt-text om det faktiskt beskrivna sovrummet.

## Teknisk SEO-/presentationsgranskning

- Alla fem svenska original är `published`, och varje engelsk version har samma status på `main`.
- `getPoems('en')` bygger från publiceringsregistrets publicerade poster; `translatedSlug` länkar till `sv` när originalet är publicerat.
- `PoemReader.astro` visar strofer uppdelade på tomrader och behåller radbrytningar; svensk länk ligger i slutet av engelska lässidan.
- `src/pages/en/poems/[slug].astro` använder diktens slug, metatitel, beskrivning, bild och `hreflang`-par via `Layout.astro`.
- Titlar, slugs och `published_at` är oförändrade. Ändringar gäller **endast engelska `text`, `meta_description` och `image_alt`** i de fem utvalda posterna.
- Webbplatsens befintliga bildvägar/temakategorier påverkas inte. Den publika live-webbplatsen ändras inte förrän PR slås ihop.
- Detta är en **källkodsgranskning**, inte en visuell webbläsargranskning i desktop/mobil. Inga påståenden görs om hur bilderna faktiskt renderas i en webbläsare.

## Riktlinjer till grupp 2–5

1. Bevara märkliga bilder som finns i originalet; rätta bara oavsiktligt dålig engelska.
2. Håll kvar upprepningar och avbrott när de bär röst, men rensa kalkerade fraser.
3. Undvik att lägga till kön, skuld, motiv, drömmar eller biografiska slutsatser som originalet inte nämner.
4. Byt inte perspektiv tyst när svenska pronomen skiftar; notera tvetydigheten.
5. Använd konkret och naturlig SEO-engelska utan att skriva om själva poesin för sökmotorer.

**Fullständig reviderad dikttext för varje dikt finns i samma gren, i `src/data/publiceringsregister.json` under motsvarande `translations.en.text`.** Detta dokument tillsammans med kodändringen är granskningsunderlaget; ingen publicering är gjord.
