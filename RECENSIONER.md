# Spikens recensioner

## Syfte

Recensionerna ska vara **Spikens egna, personliga läsupplevelser och omdömen**. De behöver inte imitera professionell kulturjournalistik. Här kan upplevelsen, känslan och frågorna efteråt vara lika viktiga som analysen. Recensioner är en annan innehållstyp än noveller och reflektioner.

## Struktur

- Register: `src/data/recensioner.json`.
- Svenska: `/varldar/recensioner/` och `/varldar/recensioner/<slug>/`.
- Engelska: `/en/worlds/recensioner/` och `/en/worlds/recensioner/<slug>/`.
- Enhetlig lässida med ämnesinformation, personlig slutsats, bedömning, för- och nackdelar om författaren faktiskt har angett dem, och huvudtext.
- Möjligt helhetsbetyg **1–5**, men betyg är frivilligt och får inte antas.
- Varje verk har omslagsfil (helst ett originalmotiv eller en bild som får användas); använd annars Spikens godkända temabild.
- Genrefiltrering visas bara om två eller fler faktiskt publicerade typer finns.
- Korta recensioner och essäliknande långa omdömen stöds.

## Exempel på ett UTKAST (visas aldrig publikt)

```json
{
  "id": "recension-000001",
  "type": "recension",
  "subject": {"title":"Bokens titel","creator":"Författarens namn","type":"bok"},
  "genre": "Roman",
  "rating": 4,
  "image": {"path":"recension-unik-bild.webp"},
  "translations": {
    "sv": {
      "status":"draft",
      "title":"Min upplevelse av boken",
      "slug":"min-upplevelse-av-boken",
      "subject_type":"Bok",
      "genre":"Roman",
      "summary":"Kort ingress med ett eget perspektiv.",
      "verdict":"En kort personlig slutsats.",
      "strengths":["En styrka enligt mig"],
      "weaknesses":["En svaghet enligt mig"],
      "text":"Författarens verkliga recension.",
      "meta_title":"Min upplevelse av boken – Spiken",
      "meta_description":"Unik SEO-beskrivning för den faktiska recensionen.",
      "image_alt":"Bildbeskrivning.",
      "published_at":null
    }
  }
}
```

Ovanstående är en teknisk illustration, inte en publicerad text eller ett verkligt betyg. Utkast och ej godkända översättningar genererar inga URL:er.

## Villkor

För publicering krävs status `published`, titel, giltig slug, originaltext, publikationsdatum, SEO-beskrivning, och en identifierbar recenserad titel. Betyg är frivilligt men måste ligga inom 1–5 om det anges. Om `strengths`, `weaknesses` eller `verdict` saknas visas inte motsvarande block. Språkversionerna publiceras separat. Kontroll: `npm run recensioner:validera`.

Vi återanvänder inte bokomslag som vi saknar rätt till och skriver inte påhittade recensioner för att fylla arkivet.
