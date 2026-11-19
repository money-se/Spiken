# Spiken – English Literary Voice: slutgranskning, grupp 3–5

Datum: 2026-11-19. Underlag: alla 25 svenska original och motsvarande engelska texter i `src/data/publiceringsregister.json`, den befintliga lässidan samt rapporterna för grupp 1 och 2. Ändringarna i denna gren avser **endast engelska texten, metabeskrivningen och alt-texten för 011–025**. Svenska original, engelska titlar, slugs, publiceringsdatum, bilder och övriga språkversioner ändras inte.

## Redaktionell bedömning

Värdena nedan är **redaktionella uppskattningar** med fokus på idiomatisk engelska, rytm, känslomässig effekt, semantisk trohet och personlig röst – inte vetenskaplig mätning eller redovisning av verklig läsarrespons.

| Dikt | Före /10 | Efter /10 | Främsta problemet i tidigare text | Vad som har ändrats |
|---|---:|---:|---|---|
| 011 Finally Free | 6.5 | 8.2 | In a goddamn melancholy / unhinged | Behöll ilskan men tog bort osmidig anglifiering; mer precist om falskhet och smutskastning. |
| 012 The End Is Near | 7.0 | 8.1 | scraps of noise | Starkare osäkerhet, återkommande mörka tankar och växlingen mellan att känna och bedöva. |
| 013 Echoes of Autumn Rain | 6.7 | 8.1 | red bloodstream / the autumn rain's beautiful touch | Strofernas skiftning från vanmakt till dröm om återförening, utan att putsa bort avbrotten. |
| 014 Smile. We Should All Smile a Little More | 7.3 | 8.4 | I play tricks on it / Good vibrations | Återgav 'manipulerar min hjärna' explicit och behöll talrytmen och den nästan överdrivna optimismen. |
| 015 An Endless Wait | 8.0 | 8.7 | The hours keep going / this endless waiting | Korta upp upprepningar och gav skarpare desperation; barnen förblir motivet för hemlängtan. |
| 016 In the Light of the Moon's Naked Visions | 7.2 | 8.1 | black vessel / beautiful rawness | Behöll fantasifarkosten och det märkliga inre/yttre utan alltför smidig förklarande engelska. |
| 017 Drip... Drip | 8.0 | 8.4 | Kill me / but my voice couldn't carry | Bevarade skräckstämningen, den barnsliga berättarrösten och utropens fragment. |
| 018 In the Warmth of the Car | 8.4 | 8.6 | So here's to the little things | Återförde närheten till svenskans 'i kraften av det lilla', utan extra skål eller upphöjd berättarröst. |
| 019 At the Edge of Time and Space | 8.3 | 8.5 | Deeper in / That's it | Återställde originalets mer brutna, märkliga 'In. In i sig själv' och 'Ja, precis'. |
| 020 Born of Blood | 7.0 | 8.3 | Exhausted acts of brutality / quite literally | Rakare men fortsatt obehagligt fragmenterad engelska; monstret och motivet lämnades intakta. |
| 021 In a Sea of Singing Flowers | 7.5 | 8.5 | A feast for the eyes / the energy you create fills me with ease | Mindre generisk romantisk engelska; bevarar älskad persons röst, blommornas rörelse och lättjan. |
| 022 The Film Inside Me | 7.4 | 8.5 | manipulated until I barely know where I am | Återförde stark fasad, manipulativ desorientering och brutal schackmetafor utan att mildra mörkret. |
| 023 The Silver and the Crown | 7.0 | 8.5 | The silver in his appearance | Mer specifikt silver i ansikte och hår; bevarad krona, ordens magi och åldrande. |
| 024 Grounded in Reality | 7.8 | 8.6 | I've got nothing to hide / snake-like whispers | Skillnad mellan att stå på säker grund och att bara inte ha något att dölja; bibehållen ilska. |
| 025 The Voice in the Music | 7.4 | 8.5 | swallowed every last one / naked quiet | Återskapade vardagsminnen, chocken och musiken som ofrivilligt öppnar såren. |

**Snitt för de sista 15 dikterna:** 7.4/10 före, 8.4/10 efter. Resultatet får inte tolkas som ett objektivt kvalitetsmått. Även efter revidering återstår avsiktligt svåra engelska bilder och hänvisningar.

### Känsliga och mångtydiga uttryck som inte har förenklats bort

- **012 The End Is Near:** mörka tankar, kroppslig utmattning och ett möjligt slut. Ingen förklaring av talarens verkliga avsikter har lagts till.
- **013 Echoes of Autumn Rain:** "I wish life were over" och resan mot helvetets portar förblir del av diktjagets perspektiv; slutet växlar mot en nästan hallucinatorisk återförening.
- **015 An Endless Wait:** "I just want to die" finns i originalet som en del av en intensiv skildring av väntan; mildras inte och behandlas inte som en biografisk faktauppgift.
- **016 In the Light of the Moon's Naked Visions:** en "black vessel shimmering with gold" behåller den ursprungliga svårtolkade fantasibilden.
- **017 Drip... Drip:** brutal skräck, sönderslitna kroppar och en pojkes upplevelse. Avsiktligt obehaglig, inte en förskönad berättelse.
- **019 At the Edge of Time and Space:** "A piece of bread... Something living" är märklig engelska, men svenskans "Ett bröd... Ett levande" är också märklig och ska inte automatiskt korrigeras.
- **022 The Film Inside Me:** "drives you to take your own life" är en del av originalets dystra jagröst, inte en objektiv psykologisk slutsats.
- **025 The Voice in the Music:** slutets "I wish I'd died — but I'm still breathing" behåller ursprungets chock och motsägelse.

### SEO och tekniskt genomförande

- Alla 25 dikter har svenskt och engelskt originalpar i publiceringsregistret. Endast 15 engelska utgåvor ändras i denna gren.
- Engelska **titlar, slugs och publiceringsdatum** behålls för att undvika brutna länkar.
- Engelska **metabeskrivningar** är justerade för att beskriva de faktiska dikterna utan att överdriva.
- Engelska **alt-texter** är nu konkreta, baserade på de motivbeskrivningar som redan finns i det svenska registret. Bildernas visuella pixelinnehåll har inte granskats individuellt i denna rapport.
- `src/lib/poetry.js` länkar engelska dikter till det publicerade svenska originalet via `translatedSlug`.
- `src/components/PoemReader.astro` delar upp strofer vid tomrader och använder befintliga lässidesmallar. Detta är en källkodskontroll, inte en manuell webbläsartestning.

## Fem engelska dikter som fungerar starkast, preliminär redaktionell bedömning

1. **Behind My Smile** – direkt, rå, avskalad.
2. **The Devil's Symphony** – kraftiga visuella slag, stark apokalyptisk rytm.
3. **Beneath Your Light** – konkret relationell maktobalans.
4. **An Endless Wait** – avbrotten motsvarar desperationen.
5. **The Silver and the Crown** – behåller en egen lågmäld, mänsklig ton.

Detta är en redaktionell bedömning, inte en rangordning från läsarstatistik.

## Fem svårast att översätta utan betydelseförlust

1. **My Little Girl, My Heart** – "little girl" kan uppfattas som ett barn på engelska trots relationsmotivet. Titeln har behållits i avsaknad av alternativt godkännande.
2. **In Your Sweetness** – kroppslig sötma och "with you inside me" rymmer tvetydig sensualitet.
3. **With What Little Strength I Have Left** – ovanliga kosmiska bilder och tvära röstbyten.
4. **At the Edge of Time and Space** – surrealistiska fragment; särskilt bilden av bröd och det levande.
5. **Echoes of Autumn Rain** – längre känslomässiga skiften, starka kontraster och ibland motsägelsefull tidsupplevelse.

## Spiken – English Literary Voice (stilguide)

**Ton:** Mänsklig, ofiltrerad, ibland obekväm. Ett engelskspråkigt diktjag som känns nära och instabilt snarare än polerat.

**Rytm:** Behåll tre punkter, upprepningar och medvetet abrupta rader när de är aktiva delar av dramatiken. Rätta kalkerad syntax, men sudda inte ut rösten.

**Ordförråd:** Välj konkret, enkel engelska före svulstig poetisk engelska. Undvik tillagda abstraktioner som "soul", "divine essence" och generiska "healing" när originalet inte stöder dem.

**Bildspråk:** Bevara den svenska metaforens funktion och gärna dess konstighet. Om direkt översättning skapar oavsiktlig komik, ändra konstruktionen, inte diktens känslomässiga mål.

**Närhet och svärta:** Kärlek får vara besatt, motstridig eller destruktiv där originalet är det. Ångest, vrede, rädsla och sorg får inte mildras av redaktionellt bekvämlighetsskäl.

**Svordomar:** Bevara motiv, intensitet och frekvens. Lägg inte till svordomar enbart för att göra dikten "rå".

**Relationer:** Byt inte mottagare, kön, föräldrarelation eller berättarjag efter eget huvud. Markera ord med annorlunda engelska konnotationer.

**Metadata:** En konsekvent engelsk titel, unik URL, konkret metabeskrivning och faktisk bildbeskrivning. SEO får inte styra dikttextens skapande.

**Arbetssätt:** Läs båda originalversionerna helt; jämför rad för rad; identifiera semantiska avvikelser; omarbeta endast det som behöver det; och kontrollera publik titel, originalpar och läsbara strofer.

## Publiceringsstatus

Grupp 1 (001–005) och grupp 2 (006–010) har separata granskningsrapporter. Grupp 3–5 (011–025) är samlad här, med alla färdiga engelska revideringar i `src/data/publiceringsregister.json` på samma gren.

**Viktigt:** Om detta dokument läses i en pull request är grenens ändringar ännu inte publicerade. Först när pull requesten sammanfogas med `main` och GitHub Pages-bygget gått igenom visas ändringarna live.
