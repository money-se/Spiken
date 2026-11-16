# Spikens diktarkiv

Det nya diktarkivet använder samma filmiska tema som startsidan och två språk.

## Publicerade texter

**Primär källa:** `src/data/publiceringsregister.json`. Alla verk med `type: "dikt"` kan visas. Varje språk publiceras separat: bara en översättning med `status: "published"`, titel, slug och text får en offentlig sida.

- Svenska: `/Spiken/dikter/<svensk-slug>/`
- Engelska: `/Spiken/en/poems/<english-slug>/`
- Svenska arkivet: `/Spiken/dikter/`
- Engelska arkivet: `/Spiken/en/poems/`

En publicerad översättning behöver inte ha en publicerad motsvarighet på andra språket. Därför visas språkväxlingen bara för ett diktpar när båda är publicerade.

**Äldre kompatibilitet:** Befintliga dikter i `src/data/dikter.json` (titel som `titel`, text som `text`, `tema` och `slug`) syns fortfarande i svenska arkivet. Modern post med samma svenska slug har företräde. Det går att migrera äldre dikter i lugn takt.

## Publicera en dikt

Öppna `src/data/publiceringsregister.json` och lägg till ett verk under `works`. Ange ett unikt `id`, `type: "dikt"`, `category`, `channel: "under-huden"`, `original_language`, `original_text` och ett `translations`-objekt med `sv` och, om den finns, `en`. Varje språkversion måste ha unik `slug`, `title`, `text`, `status` och gärna `meta_description`. Använd `status: "draft"` tills den är klar. Ändra till `published` när den får visas offentligt.

Publiceringsregistret har fortfarande ett `work_schema_example`; den posten är **en mall och inte publicerad**. Ingen exempeltext används i arkivet.

När ändringen sparas i GitHub bygger GitHub Pages om sidorna automatiskt. Om GitHub-bygget misslyckas måste felet åtgärdas innan ändringen blir synlig.

## Besökarfunktioner

- Sökning i titel, innehåll, kategori och taggar fungerar direkt i webbläsaren.
- Känsloknappar och länkar med `?tema=Kärlek` filtrerar diktlistan.
- Varje publicerad dikt får en mobilanpassad lässida med delningslänk, kopiera-länk och relaterade dikter.
- Delning på Facebook öppnar Facebooks vanliga delningssida; ingenting publiceras automatiskt på besökarens konto.
- Engelsk kategoriöversättning styrs av `category`-ID, inte maskinöversättning av dikttext.

**Viktigt:** Arkivet är tomt tills riktiga dikter har förts in. Det är medvetet så; vi publicerar inga påhittade dikter eller ofärdiga översättningar.

## Spiken 3.3 – bild och söksynlighet för varje dikt

Varje publicerad svensk dikt får automatiskt en egen statisk HTML-sida med unik kanonisk URL, titel, beskrivning, språk, datum och strukturerad data av typen `CreativeWork`. Diktens bild används i sidans hero, arkivkort och Open Graph/Twitter-delning.

Bildfilen anges i `works[].image.path`, exempelvis `dikt-mannen-bakom-masken.webp`. Lägg bildfilen i ett ZIP-arkiv med namn `Spiken_Diktbilder_001.zip` och ladda upp ZIP-filen till repositoryts rot. Byggflödet packar automatiskt upp alla `Spiken_Diktbilder_*.zip` till `public/images` före Astro-bygget. Samma bild återanvänds i olika format via CSS, så nya texter kräver inga ändringar i sidmallen.

Kategorier med minst en publicerad dikt får egna statiska indexerbara landningssidor under `/dikter/kategori/<tema>/`, exempelvis `/dikter/kategori/existens/`. Tomma kategorier genererar ingen indexeringssida. Nya dikter i samma kategori listas automatiskt där.

För större Google-synlighet: lägg bara ut verkliga originaltexter och genuina översättningar. En separat URL är möjlig att indexera, men inte en garanti för indexering eller trafik. GitHub Pages-sajtkartan kan hjälpa sökmotorer att hitta sidorna. Kontrollera senare status via Google Search Console.

**Viktigt:** Den nya omslagsbilden blir synlig först efter att motsvarande ZIP-paket har laddats upp till GitHub. Fram till dess finns en reservbild.
