# Reflektioner – publicering och läsdesign

Reflektioner har en egen arkiv- och läsmall med stöd för ämnesfilter, uppskattad lästid, omslagsbild, relaterade texter, svensk och engelsk version och egna SEO-adresser. Dikterna och novellerna påverkas inte.

- Register: `src/data/reflektioner.json`
- Arkiv: `/varldar/reflektioner/` och `/en/worlds/reflektioner/`
- Publicerade texter: `/varldar/reflektioner/<slug>/` respektive `/en/worlds/reflektioner/<slug>/`.
- Inga reflektioner är publicerade förrän författaren godkänt dem. Utkast får aldrig egen statisk sida.

## Format för ett nytt utkast (endast dokumentation)

```json
{
  "id": "reflektion-000001",
  "type": "reflektion",
  "topic": "Psykologi",
  "tags": ["mänskliga relationer"],
  "image": {"path": "reflektion-unik-bild.webp"},
  "translations": {
    "sv": {
      "status": "draft",
      "title": "Exempeltitel",
      "slug": "exempeltitel",
      "topic": "Psykologi",
      "text": "Författarens originaltext.",
      "summary": "Kort sammanfattning.",
      "meta_title": "Exempeltitel – Spiken",
      "meta_description": "Unik sökbeskrivning.",
      "image_alt": "Beskrivning av omslaget.",
      "published_at": null
    }
  }
}
```

Båda språkversionerna kan redigeras oberoende. Endast en version med `status: "published"`, giltig titel, slug och text får offentlig URL. Riktiga texter behöver dessutom ämne, SEO-beskrivning och publiceringsdatum enligt byggkontrollen. Om en översättning saknas visas ingen felaktig språkparning på artikeln.

När fler texter finns kategoriseras de i naturliga ämnen utifrån innehållet – t.ex. psykologi, relationer, existens, självbild – utan att vi skapar tomma ämnessidor. Knappar visas endast för ämnen som faktiskt har publicerade texter.

Kontrollera med `npm run reflektioner:validera`. GitHub Pages-bygget testar också alla förväntade reflektionssidor och omslagsbilder.
