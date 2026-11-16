# Spiken – svenska och engelska

## Princip
Varje verk får **ett beständigt work-id** men kan ha två språkversioner. Svenska originalet är auktoritativt. Engelska är en separat litterärt bearbetad version, inte en andra uppsättning verk.

## Avsedda URL:er
- Svenska: `/Spiken/dikter/<svensk-slug>/`
- Engelska: `/Spiken/en/poems/<english-slug>/`
- Startsida svenska: `/Spiken/`; engelska: `/Spiken/en/` (när engelsk startsida skapats).
- Besökaren väljer språk frivilligt i navigeringen. Ingen tvångsredirect.

## Metadata per språk
- `title`, `slug`, `text`, `meta_title`, `meta_description`, `image_alt`, `status`, `published_at`.
- En enda primärkategori per verk samt övriga taggar; översätt **etiketter**, inte kategoriernas stabila id.
- `hreflang=sv` och `hreflang=en` skapas **endast om båda språkversionerna är publicerade**. Båda versionerna länkar till varandra och sig själva.
- Varje språkversion har en **självrefererande canonical**, inte canonical till originalet.
- Översätt även navigering och sidornas huvudinnehåll. Engelska sidor får inte vara skal med mest svensk text.
- Generera sitemap för alla publicerade språkversioner.

## Publiceringsgång
1. Kontrollera originaltexten, likhet med tidigare publicering och verkets id.
2. Strukturera utan att slipa bort den råa Spiken-rösten; behåll oförändrat original i registret.
3. Skriv en självständig engelsk dikt som motsvarar originalets betydelse och ton. Ord-för-ord-översättning räcker inte vid poesi.
4. Skapa två olika SEO-titlar/beskrivningar, unika slugs och vid behov separata bildtexter/alt-texter.
5. Publicera båda versionerna via en och samma registerpost; hantera status separat per språk.
6. Bekräfta att GitHub-commit och webbbygget lyckats innan publika URL:er markeras publicerade.

## Status vid förberedelse
Detta är en beslutad data- och URL-konvention, **inte färdig tvåspråkig routing**. Den nuvarande svenska webbplatsen fortsätter fungera tills Astro-mallarna har migrerats till det centrala registret och översättningsrutterna implementerats.
