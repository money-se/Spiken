/**
 * Spikens världar: en redaktionell struktur, inte ett register över publicerat innehåll.
 * Lägg bara in publika verk från publiceringsregistret efter separat godkännande.
 */
export const worldSections = [
  {
    slug:'noveller',image:'spiken-varld-noveller-20261119',
    sv:{title:'Noveller',kicker:'BERÄTTELSER · MÄNNISKOR',intro:'Berättelser om människor och de gränser som ibland suddas ut mellan trygghet, längtan och mörker.',lead:'Här får berättelserna ta den tid de behöver. Det kan börja i något vardagligt och sluta på en plats ingen hade väntat sig.',expect:'Längre berättelser, psykologisk spänning och närgångna människoskildringar.'},
    en:{title:'Stories',kicker:'STORIES · PEOPLE',intro:'Stories about people and the blurred lines between comfort, longing and darkness.',lead:'Here, stories have room to unfold. Some may begin with something ordinary and lead somewhere unexpected.',expect:'Longer fiction, psychological tension and intimate portraits of people.'}
  },
  {
    slug:'reflektioner',image:'spiken-varld-reflektioner-20261119',
    sv:{title:'Reflektioner',kicker:'TANKAR · MÄNNISKAN',intro:'Frågor om livet, relationer, känslor och allt det vi sällan hittar enkla svar på.',lead:'Ibland är en tanke bara början på en ny fråga. Här finns utrymme för tvivel, motsägelser och försök att förstå oss själva.',expect:'Personliga resonemang om livet, medvetandet och människan.'},
    en:{title:'Reflections',kicker:'THOUGHTS · HUMAN NATURE',intro:'Questions about life, relationships, feelings and everything without easy answers.',lead:'Sometimes a thought only leads to another question. This is a place for uncertainty, contradiction and self-understanding.',expect:'Personal reflections on life, consciousness and what makes us human.'}
  },
  {
    slug:'min-bibel',public:false,image:'spiken-varld-min-bibel-20261119',
    sv:{title:'Min Bibel',kicker:'MYTOLOGI · SKÖNLITTERATUR',intro:'En egen fiktiv mytologi om skapelse, tro, makt och människans behov av att förstå det oförklarliga.',lead:'En värld där legender, föreställningar och motsägelsefulla berättelser kan mötas. Det här är skönlitterärt världsbygge, inte religiös vägledning.',expect:'Berättelser, tidslinjer, gestalter och olika tolkningar inom en fiktiv urtro.'},
    en:{title:'My Bible',kicker:'MYTHOLOGY · FICTION',intro:'An original fictional mythology exploring creation, belief, power and the human search for meaning.',lead:'A world where legends and conflicting accounts may exist side by side. This is fictional world-building, not religious instruction.',expect:'Stories, timelines, characters and different interpretations of an imagined ancient faith.'}
  },
  {
    slug:'recensioner',image:'spiken-varld-recensioner-20261119',
    sv:{title:'Recensioner',kicker:'LÄSUPPLEVELSER · INTRYCK',intro:'Tankar om böcker, berättelser och upplevelser som fortsätter leva kvar efteråt.',lead:'Inte bara ett betyg eller en sammanfattning. Här handlar det om varför en berättelse berör – eller varför den inte gör det.',expect:'Personliga läsupplevelser, reflektioner och kritik.'},
    en:{title:'Reviews',kicker:'READING · IMPRESSIONS',intro:'Thoughts on books, stories and experiences that stay with us after they end.',lead:'More than a rating or a summary. This is about why a story moves us – or why it does not.',expect:'Personal reading experiences, reflections and criticism.'}
  },
  {
    slug:'mork-poesi',public:false,image:'spiken-varld-mork-poesi-20261119',
    sv:{title:'Mörk poesi',kicker:'SKUGGOR · ORD',intro:'Där orden får röra sig mot det obekväma, det gåtfulla och det som inte alltid låter sig förklaras.',lead:'Poesi kan också vara ett sätt att se in i mörkret utan att försköna det. Den här delen ger plats för en annan sorts uttryck.',expect:'Mörkare lyrik och litterära experiment, när de är färdiga för publicering.'},
    en:{title:'Dark poetry',kicker:'SHADOWS · WORDS',intro:'A place for words that move towards the uncomfortable, the mysterious and the difficult to explain.',lead:'Poetry can look into darkness without making it beautiful. This space is reserved for a different kind of expression.',expect:'Darker verse and literary experiments when ready for publication.'}
  }
];
export const worldSection = slug => worldSections.find(section=>section.slug===slug);
