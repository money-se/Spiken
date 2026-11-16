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
