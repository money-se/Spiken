# Spiken

Spikens hemsida – byggd med Astro, publicerad via GitHub Pages när ägaren väljer att aktivera den.

## Funktioner
- Mobilanpassad startsida
- Diktarkiv med sökning
- En egen URL per dikt
- Temasidor för kärlek, sorg, saknad, ensamhet och livet (skapas när kategorin innehåller dikter)
- Metadata och sitemap

## Lägg till dikter

Ändra `src/data/dikter.json` och lägg till objekt med exakt dessa fält:

```json
[
  {
    "slug": "en-unik-adress",
    "titel": "Diktens titel",
    "tema": "Sorg",
    "text": "Första raden.\nAndra raden."
  }
]
```

Det här är endast ett format-exempel, inte en publicerad dikt. Varje `slug` måste vara unik och får helst använda små bokstäver, siffror och bindestreck. Använd gärna svenska tecken i titeln men inte i URL-sluggen. Publicera bara texter som är godkända för publicering.

## Lokalt

```bash
npm install
npm run dev
npm run build
```

## Publicera

På GitHub Free kräver GitHub Pages normalt ett offentligt repository. När projektägaren väljer att publicera det: Settings → Pages → Build and deployment → Source: GitHub Actions. Workflow finns i `.github/workflows/deploy.yml`.

Webbadress efter lyckad publicering: https://money-se.github.io/Spiken/

OBS: Att göra repositoryt offentligt exponerar även källkod och historik, inte bara den publicerade webbplatsen. Lägg aldrig in lösenord eller hemliga API-nycklar i repositoryt.
