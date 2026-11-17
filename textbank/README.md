# SPIKEN / TEXTBANK

Här kan du lägga många dikter på en gång. **Inga texter publiceras automatiskt.**

## Enkel inmatning

1. Spara varje dikt som en separat UTF-8-fil i `textbank/inkorg/`. Använd `.txt` eller `.md`.
2. Skriv **dikttiteln på första raden**, lämna gärna en tom rad, skriv sedan dikten exakt som den ska bevaras.

Exempel (filen `min-dikt.txt`):

```text
Min dikt

Första raden
Andra raden

Nästa strof
```

3. Kör `npm run dikter:kontrollera` för att förhandsgranska importen.
4. Kör `npm run dikter:importera` för att föra in nya texter i `src/data/publiceringsregister.json`.
5. Granska varje ny post, komplettera **kategori, taggar, SEO-beskrivning och bild** och ändra önskad språkversion till `published` först när du godkänt dikten. Lägg till `published_at` i formatet `ÅÅÅÅ-MM-DD`.

**Viktigt:** Om du bara laddar upp textfiler till GitHub utan att köra importkommandot sker ännu ingen automatisk import. Detta är en medveten första version för att undvika misstag. Verktyget skriver aldrig över befintliga dikter. Om rubrik/slug eller originaltext redan finns hoppar det över filen och förklarar varför.

Filen ligger kvar i inkorgen efter import som en orörd kopia. Vid nästa körning ignoreras samma text. Utkast visas inte i den offentliga diktlistan.

Svenska är originalspro̊k som standard. Engelska får en separat, tom utkastpost – aldrig en påhittad översättning. Se även `DIKTARKIV.md` för bildpaket, kategorier och publiceringsflöde.
