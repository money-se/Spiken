# Spikens arbetsflöde: skriv en gång, publicera utan manuella moment

## Målet
Ägaren klistrar in en dikt, novell, recension eller annan text i ChatGPT. Assistenten hanterar redaktionell struktur, kategorisering, sökmetadata, bildval och GitHub-publicering, och kontrollerar därefter GitHub Pages-bygget så långt de anslutna verktygen tillåter.

## Källor och status
- `src/data/publiceringsregister.json` är **det planerade centrala registret**. Det är nu initialiserat men ännu inte kopplat till Astro-mallarna. Påstå inte att registrering och publicering är fullt automatiserade innan detta är implementerat.
- `src/data/kategorier.json` definierar föreslagen taxonomi; den kan revideras.
- `src/data/dikter.json` är **fortfarande aktuell datakälla** för befintliga diktmallar. Den är tom vid initialisering av registret. Vid migrering ska en enda huvudkälla användas, inte två manuellt synkade register.

## Arbetssteg när text lämnas in
1. Läs registret samt befintliga texter från GitHub för att undvika dubbelpublicering (kontrollera titel, slug och textlikhet).
2. Strukturera varsamt texten, bevara författarens röst och original; redaktionella ingrepp som påverkar betydelsen ska visas för författaren.
3. Välj verktyp och en primär kategori samt relevanta sekundära etiketter.
4. Välj en unik URL-slug. Skapa titel, metabeskrivning, delningsbild, alt-text och interna länkar utan överdrivna SEO-utfästelser.
5. Publicera via GitHub i anslutet repository; bekräfta faktiskt commit-resultat. Skapa eller återanvänd bild efter författarens önskemål, och optimera filen.
6. Kontrollera byggstatus och publicerad URL så långt möjligt. Rapportera vad som är bekräftat och vad som återstår.
7. Registrera publiceringsdatum och GitHub-URL i det centrala registret; aldrig markera ett verk 'published' innan publiceringen verifierats.

## Registerpost: avsedd struktur
```json
{
  "id": "spiken-000001",
  "typ": "dikt",
  "titel": "Exempeltitel",
  "slug": "exempeltitel",
  "kanal": "under-huden",
  "kategori": "langtan",
  "taggar": ["längtan", "relationer"],
  "status": "draft",
  "publicerad": null,
  "uppdaterad": null,
  "meta_title": "Exempeltitel – Spiken",
  "meta_description": "En beskrivning av originaltexten.",
  "bild": null,
  "bild_alt": null,
  "text": "Originaltexten ..."
}
```
Detta är ett format-exempel, **inte** ett faktiskt publicerat verk.

## Principer
- Samma repository och hosting används, men två redaktionella ingångar: **Under huden** (primär publik) och **Spikens världar** (annan litteratur).
- Varje verk har en egen webbadress, en kanonisk URL och internlänkar till relevanta texter.
- Skilj på användarens originaltext och assistentens formaterade version. Aldrig fabricera dikter eller tillskriva användaren text som denne inte skrivit.
- En del uppgifter kan kräva användargodkännande eller en uppladdning om ett verktyg inte kan lägga upp binära bilder direkt.
- Inga privata uppgifter, hemligheter eller opublicerade känsliga manus får läggas i detta **offentliga** repository utan uttryckligt beslut.
