# Spikens novellarkiv – publiceringsflöde

Noveller är en separat, statiskt byggd innehållstyp. Alla tidigare dikter ligger kvar i det befintliga diktregistret.

## Förberett
- Register: `src/data/noveller.json`.
- Svenska arkivet: `/varldar/noveller/`, engelska: `/en/worlds/noveller/`.
- Varje publicerad novell får en egen samlingssida samt en lässida per publicerat kapitel.
- Omslagsbilder anges med ett WebP-filnamn i `image.path` och läggs i `public/images` eller installerat bildpaket.
- Genre, uppskattad lästid (190 ord/min), kapitel, SEO-titel och beskrivning stödjs.
- Innehållet är **tomt** tills faktiska, godkända originaltexter läggs in. Inga påhittade verk används som demonstrationsmaterial.

## Exempel på struktur – INTE ett publicerat verk

```json
{
  "id": "novell-000001",
  "type": "novell",
  "genre": "Psykologisk spänning",
  "image": {"path": "novell-unik-bild.webp"},
  "translations": {
    "sv": {
      "status": "draft",
      "title": "Exempeltitel",
      "slug": "exempeltitel",
      "genre": "Psykologisk spänning",
      "summary": "Egen redaktionell sammanfattning",
      "meta_title": "Exempeltitel – Spiken",
      "meta_description": "En sökbeskrivning för den faktiska novellen.",
      "image_alt": "Beskrivning av omslaget",
      "published_at": null,
      "chapters": [
        {"slug": "kapitel-1", "title": "Kapitel 1", "status": "draft", "text": "Författarens originaltext."}
      ]
    }
  }
}
```

## Publiceringsvillkor

Publicera först när författaren godkänt novellen och kapiteltexten. Både språkversionen och minst ett kapitel behöver `status: "published"`, och kapitel måste ha giltiga slugs, titlar och text. Utkast och ofärdiga översättningar genererar inga offentliga URLs. När ett kapitel senare publiceras kommer dess lässida till vid nästa bygge.

Låt originaltexten behålla sina styckebrytningar. För större mängder noveller kan en importfunktion byggas som gör utkast, utan att publicera innehåll automatiskt.

## Min Bibel

Den opublicerade avdelningen `min-bibel` finns kvar i `src/lib/worlds.js` med `public: false`. Den tas inte med i översikten, andra världars navigation eller de statiskt genererade svenska/engelska sidorna. Bilden och textunderlaget bevaras för senare lansering. Befintliga äldre URL:er kan fortfarande finnas i sökmotorers cache; en riktig 404 från den nya publiceringen ersätter inte historiska sökresultat omedelbart.
