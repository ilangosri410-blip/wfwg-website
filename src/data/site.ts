// =============================================================================
// PIEC — the whole site's content, in one place.
//
// Every user-facing string lives here as a bilingual pair: { en, ta }.
// Components read it through `tx()` / `px()` below, so switching language
// switches the entire site, not just the hero. Scientific names stay in Latin;
// source titles keep their original publication language.
// =============================================================================

// TAMIL EDITORIAL STANDARD (for all future content):
// Write Tamil as a natural, complete paragraph based on the meaning of the English,
// not as a word-for-word translation. Prefer clear, accessible Tamil suitable for
// an environmental conservation organisation. Preserve scientific meaning, names,
// figures, units, uncertainty, and source qualifications. Never invent facts.
// Before adding/changing English copy, review its Tamil pair in the same edit.
// For long paragraphs, use natural sentence breaks; do not force English line breaks.
// If a scientific/common Tamil name is uncertain, retain the established English name
// with the Latin scientific name rather than inventing a Tamil name.
// The language toggle uses authored `en` / `ta` pairs; it does NOT auto-translate.
// 
export type Lang = 'en' | 'ta';
/** A bilingual string. */
export type L = { en: string; ta: string };
const L = (en: string, ta: string): L => ({ en, ta });

/** Required bilingual field → string. */
export const tx = (v: L, lang: Lang) => (lang === 'ta' && v.ta ? v.ta : v.en);
/** Optional bilingual field → string | undefined. */
export const px = (v: L | undefined, lang: Lang) => (v ? tx(v, lang) : undefined);
/** True when the rendered value is actually Tamil (for the lang attribute). */
export const isTa = (v: L | undefined, lang: Lang) => lang === 'ta' && !!v?.ta;

export const site = {
  name: 'People’s Initiative for Environmental Conservation',
  nameL: L('People’s Initiative for Environmental Conservation', 'சுற்றுச்சூழல் பாதுகாப்புக்கான மக்கள் முன்னெடுப்பு'),
  shortName: 'PIEC',
  tagline: 'CONSERVE | TOGETHER | POSTERITY',
  taglineL: L('CONSERVE | TOGETHER | POSTERITY', 'இயற்கையைக் காப்போம் | ஒன்றிணைந்து செயல்படுவோம் | எதிர்காலத்தைப் பாதுகாப்போம்'),
  email: 'wfwgorg@gmail.com',
  address: L(
    '3-4, Thanthai Periyar Nagar, Palaniyappa Layout, Industrial Estate PO, Coimbatore 641021',
    '3-4, தந்தை பெரியார் நகர், பழனியப்பா லேஅவுட், தொழிற்பேட்டை அஞ்சல், கோயம்புத்தூர் 641021'),
  city: L('Coimbatore, Tamil Nadu', 'கோயம்புத்தூர், தமிழ்நாடு'),
};

// -----------------------------------------------------------------------------
// Navigation. Homepage anchors are root-relative (/#about) so every link also
// works from the story routes, where a bare #about would stay on that page.
// -----------------------------------------------------------------------------
export type NavChild = { label: L; href: string };
export type NavItem = { label: L; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  { label: L('About', 'எங்களைப் பற்றி'), href: '/#about', children: [
    { label: L('Our Story', 'எங்கள் பயணம்'), href: '/#about' },
    { label: L('Why Western Ghats', 'மேற்குத் தொடர்ச்சி மலைகள் ஏன் முக்கியம்?'), href: '/stories/western-ghats' },
    { label: L('Our Approach', 'எங்கள் செயல்முறை'), href: '/#work' },
  ]},
  { label: L('Our Work', 'எங்கள் பணிகள்'), href: '/#work', children: [
    { label: L('Habitat Conservation', 'உயிரினங்களின் வாழிடங்களைப் பாதுகாத்தல்'), href: '/#work-habitat' },
    { label: L('Wildlife Research', 'வன உயிரினங்கள் குறித்த ஆய்வு'), href: '/#work-research' },
    { label: L('People & Coexistence', 'மக்களும் வன உயிரினங்களும் இணைந்து வாழ்தல்'), href: '/#work-people' },
  ]},
  { label: L('Wildlife', 'வன உயிரினங்கள்'), href: '/#wildlife', children: [
    { label: L('Rare Animals', 'அரிய விலங்குகள்'), href: '/#wildlife-animals' },
    { label: L('Rare Birds', 'அரிய பறவைகள்'), href: '/#wildlife-birds' },
    { label: L('Rare Plants', 'அரிய தாவரங்கள்'), href: '/#wildlife-plants' },
    { label: L('Species Index', 'உயிரினப் பட்டியல்'), href: '/#wildlife' },
    { label: L('Research & Sources', 'ஆய்வுத் தகவல்களும் ஆதாரங்களும்'), href: '/#wildlife-sources' },
  ]},
  { label: L('Stories', 'கட்டுரைகள்'), href: '/#stories', children: [
    { label: L('Western Ghats Story', 'மேற்குத் தொடர்ச்சி மலைகளின் கதை'), href: '/stories/western-ghats' },
    { label: L('Logo Story', 'அமைப்பின் சின்னம்'), href: '/stories/logo' },
    { label: L('Field Notes', 'களப்பணிக் குறிப்புகள்'), href: '/#stories' },
  ]},
  { label: L('Get Involved', 'எங்களுடன் இணையுங்கள்'), href: '/#involved', children: [
    { label: L('Donate', 'நன்கொடை'), href: '/#donate' },
    { label: L('Volunteer', 'தன்னார்வப் பணி'), href: '/#involved' },
    { label: L('Partner / CSR', 'கூட்டாண்மை / நிறுவன சமூகப் பொறுப்பு (CSR)'), href: '/#involved' },
  ]},
  { label: L('Contact', 'தொடர்புக்கு'), href: '/#contact', children: [
    { label: L('Contact PIEC', 'PIEC-ஐத் தொடர்புகொள்ள'), href: '/#contact' },
    { label: L('Office', 'அலுவலகம்'), href: '/#contact' },
  ]},
];

// -----------------------------------------------------------------------------
// Interface strings.
// -----------------------------------------------------------------------------
export const ui = {
  donate: L('DONATE', 'நன்கொடை'),
  menuOpen: L('Open menu', 'பட்டியலைத் திற'),
  menuClose: L('Close menu', 'பட்டியலை மூடு'),
  switchLanguage: L('Switch language', 'மொழியை மாற்றவும்'),
  home: L('home', 'முகப்புப் பக்கம்'),

  heroEyebrow: L('PEOPLE’S INITIATIVE FOR ENVIRONMENTAL CONSERVATION', 'சுற்றுச்சூழல் பாதுகாப்புக்கான மக்கள் முன்னெடுப்பு'),
  heroH1: L('For the wild places that shape our future.',
    'நம் எதிர்காலத்தை வடிவமைக்கும் இயற்கைப் பகுதிகளைப் பாதுகாப்போம்.'),
  heroLead: L('Protecting landscapes, wildlife and the living systems of the Western Ghats — with a long view towards the generations that follow.',
    'மேற்குத் தொடர்ச்சி மலைகளின் இயற்கைச் சூழலையும் வன உயிரினங்களையும் பாதுகாத்து, இந்தச் செல்வத்தை வருங்காலத் தலைமுறைகளுக்கும் விட்டுச் செல்லப் பாடுபடுகிறோம்.'),
  exploreWork: L('EXPLORE OUR WORK', 'எங்கள் பணிகளைப் பாருங்கள்'),
  supportConservation: L('SUPPORT CONSERVATION', 'இயற்கைப் பாதுகாப்புக்கு ஆதரவளியுங்கள்'),
  heroPlace: L('COIMBATORE · INDIA', 'கோயம்புத்தூர் · இந்தியா'),

  aboutNumber: L('01 — ABOUT PIEC', '01 — PIEC பற்றி'),
  aboutStatement: L('Conservation is not about saving the past. It is about giving a future.',
    'இயற்கையைப் பாதுகாப்பது என்பது கடந்த காலத்தை மட்டும் காப்பது அல்ல; எதிர்காலத் தலைமுறைகளும் இயற்கையுடன் வாழ வழி செய்வதாகும்.'),
  aboutCopy: L('PIEC works in the Western Ghats to keep habitat connected rather than fragmented, to record species properly rather than assume them, and to treat the communities who share this landscape as part of the work.',
    'மேற்குத் தொடர்ச்சி மலைகளில் காடுகளும் பிற வாழிடங்களும் துண்டுதுண்டாகப் பிரியாமல் இருப்பதற்குப் பாடுபடுகிறோம். உயிரினங்கள் குறித்து ஊகிப்பதற்குப் பதிலாகத் துல்லியமாகப் பதிவு செய்கிறோம். இந்தப் பகுதிகளில் வாழும் மக்களையும் எங்கள் பணியின் முக்கியக் கூட்டாளிகளாகக் கருதுகிறோம்.'),
  aboutCta: L('WHY THE WESTERN GHATS', 'மேற்குத் தொடர்ச்சி மலைகள் ஏன் முக்கியம்?'),
  aboutFigCaption: L('A LIVING SYSTEM OF FOREST, RIVER AND RAIN', 'காடு, ஆறு, மழை — ஒன்றோடொன்று தொடர்புடைய இயற்கை அமைப்பு'),

  wildlifeNumber: L('02 — WILDLIFE', '02 — வன உயிரினங்கள்'),
  wildlifeTitle: L('Ten species that could only be here.', 'மேற்குத் தொடர்ச்சி மலைகளின் பத்து முக்கிய உயிரினங்கள்.'),
  wildlifeLead: L('Five animals, two birds and three plants of the Western Ghats, each checked against current research. Choose a category, then any species, then open its full record.',
    'இங்கே மேற்குத் தொடர்ச்சி மலைகளைச் சேர்ந்த ஐந்து விலங்குகள், இரண்டு பறவைகள், மூன்று தாவரங்கள் அறிமுகப்படுத்தப்பட்டுள்ளன. அவற்றைப் பற்றிய தகவல்கள் ஆய்வுகளுடன் ஒப்பிட்டுச் சரிபார்க்கப்பட்டவை. முதலில் ஒரு வகையைத் தேர்ந்தெடுத்து, பிறகு ஒவ்வொரு உயிரினத்தைப் பற்றியும் விரிவாகப் படிக்கலாம்.'),
  // the phone drops the second sentence: it explains a control the
  // interface already makes obvious, and costs four lines on a 390px screen
  wildlifeLeadShort: L('Five animals, two birds and three plants of the Western Ghats, each checked against current research.',
    'மேற்குத் தொடர்ச்சி மலைகளைச் சேர்ந்த ஐந்து விலங்குகள், இரண்டு பறவைகள், மூன்று தாவரங்கள். அவற்றைப் பற்றிய தகவல்கள் ஆய்வுகளுடன் ஒப்பிட்டுச் சரிபார்க்கப்பட்டுள்ளன.'),
  catAnimals: L('ANIMALS', 'விலங்குகள்'),
  catBirds: L('BIRDS', 'பறவைகள்'),
  catPlants: L('PLANTS', 'தாவரங்கள்'),
  catAnimalsAria: L('Species categories', 'உயிரின வகைகள்'),
  oneAnimal: L('ANIMAL', 'விலங்கு'),
  oneBird: L('BIRD', 'பறவை'),
  onePlant: L('PLANT', 'தாவரம்'),
  openRecord: L('THE FULL RECORD', 'விரிவான தகவல்கள்'),
  closeRecord: L('CLOSE THE RECORD', 'விவரங்களை மூடு'),
  closeRecordShort: L('CLOSE RECORD', 'மூடு'),
  pillEndemic: L('ENDEMIC', 'இந்தப் பகுதியில் மட்டுமே இயற்கையாகக் காணப்படும் இனம்'),
  specimenNote: L('MUSEUM SPECIMEN — NOT A LIVING ANIMAL', 'அருங்காட்சியகத்தில் பாதுகாக்கப்பட்ட மாதிரி; உயிருள்ள விலங்கு அல்ல'),
  sourcesNote: L('Every record is checked against IUCN Red List species accounts, Journal of Threatened Taxa and other peer-reviewed literature, with Wikipedia used only as a cross-reference. Figures are quoted, not estimated; where reliable data does not exist, the record says so.',
    'ஒவ்வொரு உயிரினத்தின் தகவல்களும் IUCN சிவப்புப் பட்டியல், Journal of Threatened Taxa மற்றும் பிற ஆய்வுக் கட்டுரைகளுடன் ஒப்பிட்டுச் சரிபார்க்கப்படுகின்றன. Wikipedia துணை ஆதாரமாக மட்டுமே பயன்படுத்தப்படுகிறது. எண்ணிக்கை போன்ற தகவல்கள் ஆதாரங்களில் உள்ளபடியே தரப்படுகின்றன; நம்பகமான தகவல் கிடைக்காத இடங்களில் அது தெளிவாகக் குறிப்பிடப்பட்டுள்ளது.'),
  // the phone shows the sourcing claim only; the specifics are in each
  // full record, which is where a reader checking them would look
  sourcesNoteShort: L('Every record is checked against IUCN Red List species accounts, Journal of Threatened Taxa and other peer-reviewed literature, with Wikipedia used only as a cross-reference.',
    'ஒவ்வொரு உயிரினத்தின் தகவல்களும் IUCN சிவப்புப் பட்டியல், Journal of Threatened Taxa உள்ளிட்ட ஆய்வுகளுடன் ஒப்பிட்டுச் சரிபார்க்கப்படுகின்றன. Wikipedia துணை ஆதாரமாக மட்டுமே பயன்படுத்தப்படுகிறது.'),
  whySpecies: L('WHY THESE SPECIES MATTER', 'இந்த உயிரினங்களை ஏன் பாதுகாக்க வேண்டும்?'),

  fHabitat: L('HABITAT', 'வாழ்விடம்'),
  fRange: L('RANGE', 'பரவல்'),
  fElevation: L('ELEVATION', 'உயரம்'),
  fSize: L('SIZE', 'அளவு'),
  fDiet: L('DIET', 'உணவு'),
  fLifespan: L('LIFESPAN', 'ஆயுட்காலம்'),
  fPopulation: L('POPULATION', 'எண்ணிக்கை'),
  fTrend: L('TREND', 'போக்கு'),
  fStatus: L('STATUS', 'நிலை'),
  pBehaviour: L('Behaviour', 'நடத்தை'),
  pBreeding: L('Breeding', 'இனப்பெருக்கம்'),
  pThreats: L('Threats', 'அச்சுறுத்தல்கள்'),
  pSignificance: L('Why it matters', 'ஏன் முக்கியம்?'),
  pWgConnection: L('Western Ghats connection', 'மேற்குத் தொடர்ச்சி மலைகளுடனான தொடர்பு'),
  pInteresting: L('Worth knowing', 'கூடுதல் தகவல்'),
  photograph: L('PHOTOGRAPH', 'புகைப்படம்'),
  researchSource: L('RESEARCH SOURCE', 'ஆய்வுத் தகவலின் மூலம்'),

  workNumber: L('03 — OUR WORK', '03 — எங்கள் பணிகள்'),
  workTitle: L('People. Wildlife. Habitats.', 'மக்கள். வன உயிரினங்கள். வாழ்விடங்கள்.'),
  workLead: L('Three pillars of one mission — what we do, why it matters, how it works, and the impact it has.',
    'ஒரே நோக்கத்தை முன்னெடுக்கும் மூன்று முக்கியப் பணிகள் — என்ன செய்கிறோம், ஏன் செய்கிறோம், எப்படிச் செய்கிறோம், என்ன மாற்றத்தை உருவாக்குகிறோம்.'),
  workBandCaption: L('THE LANDSCAPE WE WORK IN — AND THE PEOPLE WHO SHARE IT',
    'நாங்கள் செயல்படும் இயற்கைப் பகுதியும், அதனுடன் வாழும் மக்களும்'),
  wWhat: L('WHAT', 'என்ன'),
  wWhy: L('WHY', 'ஏன்'),
  wHow: L('HOW', 'எப்படி'),
  wImpact: L('IMPACT', 'விளைவு'),

  storiesNumber: L('04 — STORIES', '04 — கட்டுரைகள்'),
  storiesTitle: L('Let the field speak.', 'கள அனுபவங்களே பேசட்டும்.'),
  storiesLead: L('Long-form pieces on the landscape, the mark we work under, and the field itself.',
    'இயற்கைப் பகுதி, எங்கள் சின்னம், களப்பணிகள் ஆகியவற்றைப் பற்றிய விரிவான கட்டுரைகள்.'),
  readStory: L('READ THE STORY', 'கட்டுரையைப் படிக்க'),
  comingSoon: L('COMING SOON', 'விரைவில்'),

  ctaNumber: L('05 — GET INVOLVED', '05 — எங்களுடன் இணையுங்கள்'),
  ctaTitle: L('Change begins with people like you.', 'உங்களைப் போன்றவர்கள் முன்வரும்போதுதான் மாற்றம் தொடங்குகிறது.'),
  ctaLead: L('Volunteer, collaborate, support a project or explore a CSR partnership.',
    'தன்னார்வமாகப் பங்கேற்கலாம், இணைந்து செயல்படலாம், திட்டங்களுக்கு ஆதரவளிக்கலாம் அல்லது நிறுவன சமூகப் பொறுப்பு (CSR) கூட்டாண்மையில் இணையலாம்.'),
  getInTouch: L('GET IN TOUCH', 'தொடர்புகொள்ள'),
  contact: L('CONTACT', 'தொடர்புக்கு'),
  sendEnquiry: L('SEND AN ENQUIRY', 'செய்தி அனுப்ப'),

  navigate: L('NAVIGATE', 'பக்கங்களுக்குச் செல்ல'),
  footerLine: L('For the wild places that shape our future.', 'நம் எதிர்காலத்தை வடிவமைக்கும் இயற்கைப் பகுதிகளைப் பாதுகாப்போம்.'),
  skipToContent: L('Skip to content', 'முக்கிய உள்ளடக்கத்திற்குச் செல்ல'),
};

// -----------------------------------------------------------------------------
// Our Work
// -----------------------------------------------------------------------------
export type WorkPillar = {
  no: string; eyebrow: L; title: L; id: string;
  what: L; why: L; how: L; impact: L;
  img: string; alt: L; credit: string; focus?: string;
};

export const work: WorkPillar[] = [
  { no: '01', id: 'work-habitat',
    eyebrow: L('HABITAT', 'வாழ்விடம்'),
    title: L('Habitat Conservation', 'உயிரினங்களின் வாழிடங்களைப் பாதுகாத்தல்'),
    what: L('Protecting and restoring forest, stream and grassland habitat across the Western Ghats.',
      'மேற்குத் தொடர்ச்சி மலைகளில் உள்ள காடுகள், நீரோடைகள், புல்வெளிகள் போன்ற இயற்கை வாழிடங்களைப் பாதுகாத்து மீட்டெடுப்பது.'),
    why: L('The Western Ghats are one of the world’s biodiversity hotspots — when habitat fragments, species that exist nowhere else lose the only ground they have left.',
      'மேற்குத் தொடர்ச்சி மலைகள் உலகின் உயிரினப் பன்மை மையங்களில் ஒன்று — வாழிடங்கள் துண்டுதுண்டாகப் பிரிந்தால், அந்தப் பகுதியில் மட்டுமே வாழும் உயிரினங்கள் தங்குவதற்கான இடங்களை இழக்கின்றன.'),
    how: L('Field surveys, restoration planting and working alongside forest departments and local landholders to keep habitat connected rather than isolated.',
      'கள ஆய்வுகள், மீட்பு நடவுப் பணிகள், வனத்துறை மற்றும் உள்ளூர் நிலவுரிமையாளர்களுடன் இணைந்து வாழ்விடங்களைத் தனிமைப்படாமல் இணைந்திருக்கச் செய்தல்.'),
    impact: L('Every hectare kept intact or replanted is a hectare a rare, range-restricted species can still use.',
      'பாதுகாக்கப்படும் அல்லது மீண்டும் நடப்படும் ஒவ்வொரு ஹெக்டேரும், குறுகிய பரவலுள்ள அரிய உயிரினம் பயன்படுத்தக்கூடிய ஒரு ஹெக்டேர்.'),
    img: '/assets/work/habitat.jpg',
    alt: L('A "Protect Our Forests, Our Future" sign on a mossy tree beside a forest stream in the Western Ghats',
      'மேற்குத் தொடர்ச்சி மலை வனநீரோடை அருகே பாசி படர்ந்த மரத்தில் "Protect Our Forests, Our Future" பலகை'),
    credit: 'Image prepared for PIEC', focus: '30% 46%' },
  { no: '02', id: 'work-research',
    eyebrow: L('RESEARCH', 'ஆய்வு'),
    title: L('Wildlife Research', 'வன உயிரினங்கள் குறித்த ஆய்வு'),
    what: L('Supporting the fieldwork that tells us what is actually happening to Western Ghats wildlife.',
      'மேற்குத் தொடர்ச்சி மலை வன உயிரினங்களுக்கு உண்மையில் என்ன நடக்கிறது என்பதைக் காட்டும் களப் பணிகளுக்கு ஆதரவு.'),
    why: L('Good conservation decisions need real data — population trends, habitat use and threats are often poorly documented for the species that need help most.',
      'சரியான பாதுகாப்பு முடிவுகளுக்கு உண்மையான தரவு தேவை — எண்ணிக்கைப் போக்கு, வாழ்விடப் பயன்பாடு, அச்சுறுத்தல்கள் ஆகியவை மிகவும் உதவி தேவைப்படும் உயிரினங்களுக்கே பெரும்பாலும் பதிவு செய்யப்படாமல் உள்ளன.'),
    how: L('Backing surveys, monitoring and documentation of rare and poorly-known species, and keeping their record straight rather than assumed.',
      'அரிய மற்றும் குறைவாக அறியப்பட்ட உயிரினங்களின் ஆய்வுகள், கண்காணிப்பு, ஆவணப்படுத்தலுக்கு ஆதரவு; ஊகத்தை விடுத்து துல்லியமான பதிவைப் பேணுதல்.'),
    impact: L('Better evidence means conservation effort goes where it is actually needed, not where it is easiest to see.',
      'சிறந்த ஆதாரம் என்பது, பாதுகாப்பு முயற்சி எளிதில் தெரியும் இடத்திற்கு அல்ல, உண்மையில் தேவைப்படும் இடத்திற்குச் செல்வது.'),
    img: '/assets/work/research.jpg',
    alt: L('Misty rainforest canopy and a distant waterfall in the Western Ghats at first light',
      'விடியற்காலையில் மேற்குத் தொடர்ச்சி மலையின் பனிமூட்ட மழைக்காட்டு மேல்விதானமும் தொலைவில் ஓர் அருவியும்'),
    credit: 'Image prepared for PIEC', focus: '50% 42%' },
  { no: '03', id: 'work-people',
    eyebrow: L('PEOPLE', 'மக்கள்'),
    title: L('People & Coexistence / Partnerships', 'மக்களும் வன உயிரினங்களும் இணைந்து வாழ்தல் / கூட்டாண்மை'),
    what: L('Working with the communities who share this landscape, and the institutions that can scale that work.',
      'இந்த நிலப்பரப்பைப் பகிர்ந்து கொள்ளும் சமூகங்களுடனும், அப்பணியை விரிவாக்கக்கூடிய நிறுவனங்களுடனும் இணைந்து செயல்படுதல்.'),
    why: L('The Western Ghats are not empty wilderness — people, farms and plantations sit inside and beside the same forests wildlife depends on.',
      'மேற்குத் தொடர்ச்சி மலைகள் மனிதர்கள் இல்லாத காடுகள் மட்டுமல்ல. வன உயிரினங்கள் வாழும் காடுகளுக்குள்ளும் அவற்றைச் சுற்றியும் கிராமங்கள், விவசாய நிலங்கள், தோட்டங்கள் உள்ளன.'),
    how: L('Community restoration work, education, and a clear route for research and CSR partners to contribute to work already underway.',
      'சமூக மீட்புப் பணிகள், கல்வி, மற்றும் ஏற்கெனவே நடந்து வரும் பணிகளுக்கு ஆய்வு மற்றும் CSR கூட்டாளிகள் பங்களிக்கத் தெளிவான வழி.'),
    impact: L('Conservation that includes the people living in the landscape is conservation that actually lasts.',
      'நிலப்பரப்பில் வாழும் மக்களை உள்ளடக்கிய பாதுகாப்பே உண்மையில் நீடிக்கும் பாதுகாப்பு.'),
    img: '/assets/work/people.jpg',
    alt: L('Community members planting saplings on a misty Western Ghats hillside',
      'பனிமூட்டமான மேற்குத் தொடர்ச்சி மலைச் சரிவில் சமூக மக்கள் கன்றுகளை நடுகின்றனர்'),
    credit: 'Image prepared for PIEC', focus: '68% 52%' },
];

// -----------------------------------------------------------------------------
// Get involved
// -----------------------------------------------------------------------------
export type InvolveItem = { no: string; title: L; body: L; href: string; id?: string };

export const involve: InvolveItem[] = [
  { no: '01', id: 'donate', href: '/#contact',
    title: L('Donate', 'நன்கொடை'),
    body: L('Support field conservation, research and community work directly.',
      'களப் பாதுகாப்பு, ஆய்வு மற்றும் சமூகப் பணிகளுக்கு நேரடியாக ஆதரவளியுங்கள்.') },
  { no: '02', href: '/#contact',
    title: L('Volunteer with us', 'எங்களுடன் தன்னார்வப் பணி'),
    body: L('Give time to field work, education and events.',
      'களப் பணி, கல்வி, நிகழ்வுகளுக்கு உங்கள் நேரத்தைத் தாருங்கள்.') },
  { no: '03', href: '/#contact',
    title: L('Partner / CSR', 'கூட்டாண்மை / நிறுவன சமூகப் பொறுப்பு (CSR)'),
    body: L('Institutional collaboration, research partnership or CSR support.',
      'நிறுவனக் கூட்டுப் பணி, ஆய்வுக் கூட்டாண்மை அல்லது CSR ஆதரவு.') },
];

// -----------------------------------------------------------------------------
// Stories
// -----------------------------------------------------------------------------
export type StoryCard = {
  slug: string; title: L; blurb: L; img: string; alt: L;
  href: string; ready: boolean; credit?: string; focus?: string;
  kicker: L; mark?: boolean;
};

export const stories: StoryCard[] = [
  { slug: 'western-ghats', ready: true, href: '/stories/western-ghats', focus: '50% 42%',
    kicker: L('THE LANDSCAPE', 'நிலப்பரப்பு'),
    title: L('The Western Ghats Story', 'மேற்குத் தொடர்ச்சி மலைகளின் கதை'),
    blurb: L('A mountain chain older than the Himalaya, and one of the world’s eight "hottest" biodiversity hotspots — what it is, why it rains the way it does, and why it matters to people as much as wildlife.',
      'இமயத்தை விடப் பழமையான மலைத்தொடர்; உலகின் எட்டு "மிகச் செறிவான" உயிர்ப் பன்மை மையங்களில் ஒன்று — அது என்ன, ஏன் அப்படி மழை பெய்கிறது, வன உயிரினங்களுக்கு இணையாக மக்களுக்கும் ஏன் முக்கியம்?.'),
    img: '/assets/story/wg-geography.jpg',
    alt: L('Layered basalt escarpment cliffs of the Western Ghats under a hazy sky',
      'மங்கலான வானின் கீழ் மேற்குத் தொடர்ச்சி மலையின் அடுக்கடுக்கான பாறைச் செங்குத்துச் சரிவுகள்') },
  { slug: 'logo', ready: true, href: '/stories/logo', mark: true,
    kicker: L('THE MARK', 'சின்னம்'),
    title: L('The Logo Story', 'அமைப்பின் சின்னம்'),
    blurb: L('Why the PIEC crest carries a tahr, a tiger and an elephant — and what mountain, forest and ecosystem have to do with each other.',
      'PIEC சின்னத்தில் வரையாடு, புலி, யானை ஏன் இடம்பெறுகின்றன? மலை, காடு, இயற்கைச் சூழல் ஆகியவற்றுடன் இவற்றுக்கு என்ன தொடர்பு?'),
    img: '/assets/piec-logo.png', alt: L('The PIEC crest', 'PIEC சின்னம்') },
  { slug: 'field-notes', ready: false, href: '/#contact', focus: '50% 58%',
    kicker: L('FROM THE FIELD', 'களத்திலிருந்து'),
    title: L('Field Notes', 'களப்பணிக் குறிப்புகள்'),
    blurb: L('Updates from the field, as they happen. This section is not live yet — we’d rather leave it empty than fill it with content that isn’t real.',
      'களப்பணியிலிருந்து செய்திகள் மற்றும் குறிப்புகள். இந்தப் பகுதி இன்னும் தொடங்கவில்லை — உண்மையற்ற தகவலால் நிரப்புவதை விட வெறுமையாக விடுவதே சரி என்று கருதுகிறோம்.'),
    img: '/assets/landscapes/valley-morning.jpg',
    alt: L('Morning haze over a settled valley in the Western Ghats',
      'மேற்குத் தொடர்ச்சி மலையின் குடியிருப்புப் பள்ளத்தாக்கின் மேல் காலைப் பனிமூட்டம்') },
];

// -----------------------------------------------------------------------------
// Species — the research index.
//
// Verified against IUCN Red List species accounts, Journal of Threatened Taxa
// and other peer-reviewed literature; Wikipedia used only as a cross-reference.
// Figures are quoted, not estimated. Where reliable data does not exist, the
// record says so rather than approximating.
// -----------------------------------------------------------------------------
export type Species = {
  slug: string;
  group: 'animal' | 'bird' | 'plant';
  name: L;
  // nameTamil is a DOCUMENTED Tamil common name only. Where no established
  // Tamil name could be verified, it is omitted rather than coined, and the
  // Tamil UI falls back to the English common name beside the Latin binomial.
  nameTamil?: string; nameTamilAlt?: string; nameTamilSource?: string;
  sci: string;
  status: string; statusLabel: L;
  statusNote?: L;
  endemic?: boolean; rare?: boolean;
  featured?: boolean; flag?: L;
  range?: L; habitat: L; elevation?: L;
  size?: L; diet?: L; behaviour?: L; breeding?: L; lifespan?: L;
  population?: L; populationTrend?: L;
  threats?: L; significance?: L; wgConnection?: L; interesting?: L;
  intro: L; fact: L;
  // The photograph is used as shot. `frame: 'tall'` mounts a portrait whole on
  // a dark plate instead of cropping it; `focus` is a CSS object-position set
  // per photo after checking where the subject actually sits in the frame.
  img: string; altImg?: string; focus?: string; frame?: 'wide' | 'tall';
  lead?: boolean;
  // A photograph of a museum mount rather than a living animal — labelled as
  // such wherever it appears at scale.
  specimen?: boolean;
  credit: string; license: string; source: string; sourceLabel: L;
  imageNote?: L;
};

export const wildlife: Species[] = [
  {
    slug: 'nilgiri-tahr', group: 'animal', featured: true,
    flag: L('ENDEMIC TO THE WESTERN GHATS', 'மேற்குத் தொடர்ச்சி மலைகளில் மட்டுமே இயற்கையாகக் காணப்படும்'),
    name: L('Nilgiri Tahr', 'வரையாடு'), nameTamil: 'வரையாடு (Varaiyaadu)',
    sci: 'Nilgiritragus hylocrius', status: 'EN',
    statusLabel: L('Endangered', 'அழியும் அபாயத்தில்'), endemic: true, rare: true,
    range: L('Nilgiris and southern Western Ghats (Tamil Nadu, Kerala)',
      'நீலகிரி மற்றும் தென் மேற்குத் தொடர்ச்சி மலைகள் (தமிழ்நாடு, கேரளா)'),
    habitat: L('Montane grassland on steep, open cliffs', 'செங்குத்தான பாறைச் சரிவுகளில் உள்ள மலைப் புல்வெளிகள்'),
    elevation: L('1,200–2,600 m', '1,200–2,600 மீ'),
    size: L('Shoulder height ~100 cm; males up to ~100 kg, notably heavier than females',
      'தோள் உயரம் ~100 செ.மீ; ஆண் ~100 கி.கி வரை, பெண்ணை விடக் கணிசமாகக் கனமானது'),
    diet: L('Grasses and montane grassland herbs', 'புற்களும் மலைப்பகுதிகளில் வளரும் சிறிய தாவரங்களும்'),
    behaviour: L('Lives in herds on steep, open grassland cliffs where predators struggle to follow; older males develop a pale grey "saddle" on the back.',
      'வேட்டையாடிகள் பின்தொடர முடியாத செங்குத்தான திறந்த புல்வெளிப் பாறைகளில் கூட்டமாக வாழ்கிறது; வயதான ஆண்களின் முதுகில் வெளிர் சாம்பல் நிற "சேணம்" உருவாகிறது.'),
    breeding: L('Single calf after roughly 180–242 days’ gestation; births are not tightly seasonal.',
      'கர்ப்பகாலம் சுமார் 180–242 நாட்கள். பொதுவாக ஒரு குட்டி ஈனும்; குட்டி பிறக்கும் காலம் ஒரு குறிப்பிட்ட பருவத்துக்கு மட்டும் வரையறுக்கப்படவில்லை.'),
    lifespan: L('Around 9 years in the wild.', 'காடுகளில் சுமார் 9 ஆண்டுகள் வாழும்.'),
    population: L('Estimated at roughly 2,655 individuals (April 2025 census), down from about 3,122 in 2015.',
      'ஏப்ரல் 2025 கணக்கெடுப்பின்படி, வரையாடுகளின் எண்ணிக்கை சுமார் 2,655 என மதிப்பிடப்பட்டது. 2015-ஆம் ஆண்டில் இந்த எண்ணிக்கை சுமார் 3,122 ஆக இருந்தது.'),
    populationTrend: L('Declining after a mid-20th-century collapse and partial recovery under protection.',
      '20-ஆம் நூற்றாண்டின் நடுவில் ஏற்பட்ட வீழ்ச்சிக்குப் பின் பாதுகாப்பால் ஓரளவு மீண்டாலும், தற்போது குறைந்து வருகிறது.'),
    threats: L('Habitat loss to non-native plantation, invasive plant species on grasslands, and past hunting.',
      'வெளிநாட்டுத் தாவரங்கள் பரவுவதால் வாழிடங்கள் மாறுதல், புல்வெளிகளில் ஊடுருவித் தாய்த் தாவரங்களைப் பாதிக்கும் இனங்கள் பரவுதல், முன்பு நடந்த வேட்டை ஆகியவை இதன் வாழ்வுக்கு அச்சுறுத்தலாக உள்ளன.'),
    significance: L('Tamil Nadu’s state animal, and the only living species in its genus — found nowhere outside the southern Western Ghats.',
      'இது தமிழ்நாட்டின் மாநில விலங்கு. இதன் இனக்குழுவில் தற்போது வாழும் ஒரே உயிரினம் இதுவே; தென் மேற்குத் தொடர்ச்சி மலைகளுக்கு வெளியே இயற்கையாகக் காணப்படுவதில்லை.'),
    wgConnection: L('A true Western Ghats endemic: it exists only on the high grassland cliffs of this one mountain chain.',
      'உண்மையான மேற்குத் தொடர்ச்சி மலைத் தனி இனம்: இந்த ஒரே மலைத்தொடரின் உயர் புல்வெளிப் பாறைகளில் மட்டுமே வாழ்கிறது.'),
    interesting: L('Was reduced to only a few hundred individuals by the mid-1900s before recovering under sustained protection — one of the Ghats’ clearer conservation successes, though still Endangered.',
      '20-ஆம் நூற்றாண்டின் நடுப்பகுதியில் இதன் எண்ணிக்கை சில நூறாகக் குறைந்தது. தொடர்ந்து மேற்கொள்ளப்பட்ட பாதுகாப்பு நடவடிக்கைகளால் எண்ணிக்கை ஓரளவு உயர்ந்தது. இது பாதுகாப்பு முயற்சியின் முக்கிய வெற்றியாக இருந்தாலும், வரையாடு இன்னும் அழியும் அபாயத்தில் உள்ளது.'),
    intro: L('A sure-footed mountain goat found only on the high grassland cliffs of the southern Western Ghats — nowhere else on Earth.',
      'தென் மேற்குத் தொடர்ச்சி மலைகளின் உயரமான புல்வெளி மற்றும் பாறைச் சரிவுகளில் மட்டுமே இயற்கையாக வாழும் வரையாடு, பாறைகளில் திறமையாக நடமாடும். உலகின் வேறு எந்தப் பகுதியிலும் இது இயற்கையாகக் காணப்படுவதில்லை.'),
    fact: L('Tamil Nadu’s state animal and the only species in its genus — a sure-footed cliff-dweller found nowhere outside the southern Western Ghats.',
      'தமிழ்நாட்டின் மாநில விலங்கு; இதன் இனக்குழுவில் உள்ள ஒரே உயிரினமும் இதுவே.'),
    img: '/assets/species/nilgiri-tahr.jpg', frame: 'wide', focus: '63% 46%',
    credit: 'Image prepared for PIEC', license: 'Prepared asset',
    source: 'https://www.iucnredlist.org/search?query=Nilgiritragus%20hylocrius&searchType=species',
    sourceLabel: L('IUCN RED LIST', 'IUCN சிவப்புப் பட்டியல்'),
  },
  {
    slug: 'malabar-civet', group: 'animal',
    name: L('Malabar Large-spotted Civet', 'மலபார் புனுகுப்பூனை'), nameTamil: 'மலபார் புனுகுப்பூனை',
    sci: 'Viverra civettina', status: 'CR',
    statusLabel: L('Critically Endangered', 'மிகவும் அழியும் அபாயத்தில்'), endemic: true, rare: true,
    range: L('Historically Honnavar (Karnataka) to Kanyakumari, Western Ghats lowlands',
      'வரலாற்று ரீதியாக ஹொன்னாவர் (கர்நாடகா) முதல் கன்னியாகுமரி வரை, மேற்குத் தொடர்ச்சி மலைத் தாழ்நிலங்கள்'),
    habitat: L('Lowland forest and plantation remnants (cashew, rubber)',
      'தாழ்நிலக் காடுகளும் எஞ்சிய தோட்டப் பகுதிகளும் (முந்திரி, ரப்பர்)'),
    size: L('Head-body length roughly 85–91 cm plus a long, ringed tail; among the larger civets.',
      'தலை முதல் உடல் வரையிலான நீளம் சுமார் 85–91 செ.மீ, அத்துடன் வளையங்கள் கொண்ட நீண்ட வால்; பெரிய புனுகுப்பூனைகளில் ஒன்று.'),
    diet: L('Not well documented in the wild; related civets are omnivorous (small vertebrates, invertebrates, fruit).',
      'காட்டில் சரியாகப் பதிவு செய்யப்படவில்லை; இதனுடன் தொடர்புடைய புனுகுப்பூனை இனங்கள் அனைத்துண்ணிகள் (சிறு முதுகெலும்பிகள், முதுகெலும்பற்றவை, பழங்கள்).'),
    behaviour: L('Nocturnal and little-studied; almost never recorded on camera.',
      'இரவில் செயல்படும் இந்த உயிரினம் குறித்த ஆய்வுகள் மிகக் குறைவு; கேமராவிலும் அரிதாகவே பதிவாகியுள்ளது.'),
    population: L('Fewer than 250 mature individuals estimated.',
      'முதிர்ந்த உயிரினங்கள் 250-க்கும் குறைவு என மதிப்பிடப்பட்டுள்ளது.'),
    populationTrend: L('Not well documented — absent from 1,084 camera-trap nights (2006–07) and unrecorded in field surveys between 1990 and 2014.',
      'சரியாகப் பதிவு செய்யப்படவில்லை — 1,084 கேமரா-பொறி இரவுகளில் (2006–07) தென்படவில்லை; 1990 முதல் 2014 வரையிலான கள ஆய்வுகளிலும் பதிவாகவில்லை.'),
    threats: L('Loss of lowland forest to agriculture and plantation, and fragmentation of the remaining habitat.',
      'விவசாயம் மற்றும் தோட்டப் பயிர்களால் தாழ்நிலக் காடுகளின் இழப்பு; எஞ்சிய வாழ்விடத்தின் துண்டாடல்.'),
    significance: L('Possibly India’s rarest carnivore, and a Western Ghats endemic found nowhere else.',
      'இந்தியாவின் மிக அரிதான மாமிச உண்ணியாக இருக்கக்கூடும்; மேற்குத் தொடர்ச்சி மலைகளுக்கே உரிய, வேறெங்கும் இல்லாத இனம்.'),
    wgConnection: L('Confined entirely to the Western Ghats lowlands — one of the least-seen mammals anywhere in the range.',
      'முழுக்க முழுக்க மேற்குத் தொடர்ச்சி மலைத் தாழ்நிலங்களுக்கே உரியது — இம்மலைத்தொடரில் மிகக் குறைவாகக் காணப்படும் பாலூட்டிகளில் ஒன்று.'),
    interesting: L('So rarely recorded that some biologists spent decades unsure whether it still survived in the wild at all.',
      'பதிவுகள் மிக அரிதாக இருந்ததால், இது இன்னும் காட்டில் உயிருடன் உள்ளதா என்பதே பல உயிரியலாளர்களுக்குப் பல பத்தாண்டுகளாக ஐயமாகவே இருந்தது.'),
    intro: L('Possibly India’s rarest carnivore — so seldom recorded that its continued survival was in doubt for years.',
      'இந்தியாவின் மிக அரிதான மாமிச உண்ணியாக இருக்கக்கூடும் — பதிவுகள் மிகக் குறைவாக இருந்ததால் அதன் உயிர்வாழ்வே பல ஆண்டுகளாக ஐயத்தில் இருந்தது.'),
    fact: L('Possibly India’s rarest carnivore — absent from 1,084 camera-trap nights and unrecorded in field surveys for over two decades. Fewer than 250 mature individuals are thought to remain.',
      '1,084 கேமரா-பொறி இரவுகளில் தென்படவில்லை; இரு பத்தாண்டுகளுக்கும் மேலாகக் கள ஆய்வுகளில் பதிவாகவில்லை. முதிர்ந்தவை 250-க்கும் குறைவே எஞ்சியிருக்கலாம்.'),
    img: '/assets/species/malabar-civet.jpg', frame: 'wide', focus: '46% 46%', lead: true, specimen: true,
    credit: 'PJeganathan (museum specimen)', license: 'CC BY-SA 4.0',
    source: 'https://www.iucnredlist.org/search?query=Viverra%20civettina&searchType=species',
    sourceLabel: L('IUCN RED LIST', 'IUCN சிவப்புப் பட்டியல்'),
    imageNote: L('No live photograph of this species is known to exist; this is a preserved museum specimen, shown here in full with its own display label rather than a tight crop, since the label is part of what makes the specimen legible. The Tamil name above is transcribed directly from that label, not independently verified as a widely-used common term.',
      'இந்த இனத்தின் உயிருள்ள புகைப்படம் எதுவும் அறியப்படவில்லை; இது பாதுகாக்கப்பட்ட அருங்காட்சியக மாதிரி. மாதிரியை விளக்கும் பலகையும் படத்தின் பகுதியாக இருப்பதால், இறுக்கமாக வெட்டாமல் முழுமையாகக் காட்டப்படுகிறது. மேலுள்ள தமிழ்ப் பெயர் அப்பலகையிலிருந்து நேரடியாக எடுக்கப்பட்டது; பரவலான வழக்குச் சொல்லா என்பது தனியாகச் சரிபார்க்கப்படவில்லை.'),
  },
  {
    slug: 'nilgiri-marten', group: 'animal',
    name: L('Nilgiri Marten', 'கரும்வெருகு'), nameTamil: 'கரும்வெருகு',
    sci: 'Martes gwatkinsii', status: 'VU',
    statusLabel: L('Vulnerable', 'அழியும் அபாயத்தை எதிர்கொள்ளக்கூடியது'), endemic: true,
    range: L('Western Ghats / Nilgiris (Karnataka, Kerala, Tamil Nadu)',
      'மேற்குத் தொடர்ச்சி மலைகள் / நீலகிரி (கர்நாடகா, கேரளா, தமிழ்நாடு)'),
    habitat: L('Shola–grassland mosaic and montane forest', 'சோலைக் காடுகள், மலைப் புல்வெளிகள் இணைந்த பகுதிகள்'),
    size: L('Head-body length roughly 55–65 cm plus a bushy ~40 cm tail.',
      'தலை முதல் உடல் வரையிலான நீளம் சுமார் 55–65 செ.மீ, அத்துடன் அடர்த்தியான ~40 செ.மீ வால்.'),
    diet: L('Birds, small mammals (including Malabar giant squirrels), insects and fruit.',
      'பறவைகள், சிறு பாலூட்டிகள் (மலபார் ராட்சத அணில் உட்பட), பூச்சிகள், பழங்கள்.'),
    behaviour: L('Southern India’s only marten, and unusually for the family, active by day rather than at night; arboreal and agile in the canopy.',
      'தென்னிந்தியாவின் ஒரே மார்டன் இனம்; இக்குடும்பத்திற்கு அரிதாக, இரவில் அல்லாமல் பகலில் இயங்குகிறது; மரங்களில் வாழும், மேல்விதானத்தில் விரைவானது.'),
    population: L('Estimated at roughly 1,000 individuals.', 'சுமார் 1,000 எண்ணிக்கை என மதிப்பிடப்பட்டுள்ளது.'),
    populationTrend: L('Considered to be declining with habitat loss.',
      'வாழ்விட இழப்புடன் எண்ணிக்கை குறைந்து வருவதாகக் கருதப்படுகிறது.'),
    threats: L('Shola-forest fragmentation and conversion to tea, coffee and other plantation.',
      'சோலைக் காடுகளின் துண்டாடலும், தேயிலை, காபி மற்றும் பிற தோட்டங்களாக மாற்றமும்.'),
    significance: L('The only marten species in southern India.', 'தென்னிந்தியாவில் இயல்பாகக் காணப்படும் ஒரே மார்டன் இனம்.'),
    wgConnection: L('Endemic to the Western Ghats/Nilgiris shola-grassland ecosystem.',
      'மேற்குத் தொடர்ச்சி மலை / நீலகிரி சோலை–புல்வெளிச் சூழலுக்கே உரியது.'),
    interesting: L('Its yellow-to-orange throat patch is the easiest way to tell it apart from every other Western Ghats carnivore at a glance.',
      'மஞ்சள்–ஆரஞ்சு நிறக் கழுத்துப் பகுதியே, மேற்குத் தொடர்ச்சி மலையின் பிற மாமிச உண்ணிகளிடமிருந்து இதை ஒரே பார்வையில் வேறுபடுத்தும் எளிய அடையாளம்.'),
    intro: L('Southern India’s only marten — and, unusually for the family, one that hunts by day.',
      'தென்னிந்தியாவின் ஒரே மார்டன் இனம் — இக்குடும்பத்திற்கு அரிதாக, பகலில் வேட்டையாடுவது.'),
    fact: L('Southern India’s only marten — and unusually for the family, active by day, ranging the canopy for birds, squirrels and fruit.',
      'தென்னிந்தியாவின் ஒரே மார்டன்; பகலில் இயங்கி, மேல்விதானத்தில் பறவைகள், அணில்கள், பழங்களைத் தேடுகிறது.'),
    img: '/assets/species/nilgiri-marten.jpg', frame: 'wide', focus: '82% 34%',
    credit: 'Image prepared for PIEC', license: 'Prepared asset',
    source: 'https://www.iucnredlist.org/search?query=Martes%20gwatkinsii&searchType=species',
    sourceLabel: L('IUCN RED LIST', 'IUCN சிவப்புப் பட்டியல்'),
  },
  {
    slug: 'purple-frog', group: 'animal',
    name: L('Purple Frog', 'கேழல்மூக்கன்'), nameTamil: 'கேழல்மூக்கன்',
    sci: 'Nasikabatrachus sahyadrensis', status: 'NT',
    statusLabel: L('Near Threatened', 'அச்சுறுத்தலுக்கு அருகிலுள்ள நிலையில்'), endemic: true, rare: true,
    statusNote: L('Assessed as Near Threatened by the IUCN SSC Amphibian Specialist Group (2022); earlier assessments listed the species as Endangered, and some conservation sites still quote that older category.',
      'IUCN SSC நீர்நில வாழ்வின இடர் குழுவால் (2022) "அச்சுறுத்தலுக்கு அருகிலுள்ள நிலையில்" எனத் தரப்படுத்தப்பட்டது; முந்தைய மதிப்பீடுகள் இதை "அழியும் அபாயத்தில்" எனப் பட்டியலிட்டன, சில பாதுகாப்பு இணையதளங்கள் இன்னும் அப்பழைய நிலையையே காட்டுகின்றன.'),
    range: L('Western Ghats, from the Camel’s Hump Hills to the Agasthyamalai Hills (Kerala, Tamil Nadu)',
      'மேற்குத் தொடர்ச்சி மலைகள் — கேமல்ஸ் ஹம்ப் மலைகள் முதல் அகத்தியமலை வரை (கேரளா, தமிழ்நாடு)'),
    habitat: L('Moist forest soil, underground for almost its entire life',
      'ஈரமான வனமண்; கிட்டத்தட்ட ஆயுட்காலம் முழுவதும் நிலத்தடியில்'),
    diet: L('Termites, taken underground through a specialised pointed snout and tongue.',
      'கறையான்கள் — சிறப்பான கூரிய மூக்கு மற்றும் நாக்கின் மூலம் நிலத்தடியிலேயே உண்ணப்படுகின்றன.'),
    behaviour: L('Fossorial — it lives almost entirely underground, surfacing for only about two weeks a year, during the monsoon, to breed.',
      'நிலத்தடியில் வாழும் உயிரினம் — கிட்டத்தட்ட முழுவதுமாக நிலத்தடியில் வாழ்ந்து, பருவமழைக் காலத்தில் ஆண்டுக்கு சுமார் இரு வாரங்கள் மட்டுமே இனப்பெருக்கத்திற்காக மேலெழுகிறது.'),
    breeding: L('Breeds explosively in fast-flowing forest streams during a brief monsoon window, then returns underground.',
      'குறுகிய பருவமழைக் காலத்தில் வேகமாக ஓடும் வன நீரோடைகளில் ஒரே சமயத்தில் பெருமளவில் இனப்பெருக்கம் செய்து, பின் நிலத்தடிக்குத் திரும்புகிறது.'),
    population: L('Not well documented — no reliable population estimate exists.',
      'சரியாகப் பதிவு செய்யப்படவில்லை — நம்பகமான எண்ணிக்கை மதிப்பீடு எதுவும் இல்லை.'),
    populationTrend: L('Reported as decreasing.', 'எண்ணிக்கை குறைந்து வருவதாகப் பதிவுகள் தெரிவிக்கின்றன.'),
    threats: L('Loss and degradation of the moist forest soil it depends on, expanding cultivation, and damage to breeding streams by check dams.',
      'அது சார்ந்திருக்கும் ஈர வனமண்ணின் இழப்பும் சீரழிவும், விரிவடையும் பயிரிடுதல், தடுப்பணைகளால் இனப்பெருக்க நீரோடைகளுக்கு ஏற்படும் பாதிப்பு.'),
    significance: L('An amphibian "living fossil" whose closest living relatives are the Sooglossidae frogs of the Seychelles — evidence of an ancient land connection across the Indian Ocean, long before the two landmasses drifted apart.',
      'பழமையான பரிணாம வரலாற்றைக் காட்டும் தனித்துவமான தவளை; இதன் நெருங்கிய உறவினர்கள் சீஷெல்ஸ் தீவுகளின் Sooglossidae தவளைகள் — இரு நிலப்பரப்புகளும் பிரிவதற்கு நெடுங்காலம் முன்பு இந்தியப் பெருங்கடலைக் கடந்திருந்த நிலத்தொடர்பின் சான்று.'),
    wgConnection: L('Endemic to the Western Ghats and found nowhere else on Earth.',
      'மேற்குத் தொடர்ச்சி மலைகளில் மட்டுமே இயற்கையாகக் காணப்படும்; உலகில் வேறெங்கும் இல்லை.'),
    interesting: L('Adults were entirely unknown to science until 2003, even though tadpoles matching the species had been collected as early as 1917 — it took nearly a century to connect the two.',
      '1917-லேயே இவ்வினத்துக்கு ஒத்த தலைப்பிரட்டைகள் சேகரிக்கப்பட்டிருந்தும், முதிர்ந்த தவளை 2003 வரை அறிவியலுக்குத் தெரியவே இல்லை — இரண்டையும் இணைக்க கிட்டத்தட்ட ஒரு நூற்றாண்டு ஆனது.'),
    intro: L('A burrowing amphibian that spends almost its whole life underground, surfacing for barely two weeks a year to breed.',
      'ஆயுட்காலம் முழுவதையும் கிட்டத்தட்ட நிலத்தடியில் கழித்து, ஆண்டுக்கு இரு வாரங்களே இனப்பெருக்கத்திற்காக மேலெழும் நிலத்தடியில் வாழும் தவளை.'),
    fact: L('Unknown to science as an adult until 2003 — its closest relatives live in the Seychelles, evidence of a land connection to India that broke apart tens of millions of years ago.',
      'முதிர்ந்த நிலையில் 2003 வரை அறிவியலுக்குத் தெரியாதது — இதன் நெருங்கிய உறவினர்கள் சீஷெல்ஸில் வாழ்கின்றனர்; கோடிக்கணக்கான ஆண்டுகளுக்கு முன் உடைந்த நிலத்தொடர்பின் சான்று.'),
    img: '/assets/species/purple-frog.jpg', focus: '44% 52%',
    credit: 'Image prepared for PIEC', license: 'Prepared asset',
    source: 'https://www.iucnredlist.org/species/58051/166098621',
    sourceLabel: L('IUCN RED LIST — SPECIES ACCOUNT', 'IUCN சிவப்புப் பட்டியல் — உயிரினப் பதிவு'),
    imageNote: L('This species has very distinctive, unusual anatomy. The image is a prepared representative asset rather than a verified photograph of a wild individual — recommend confirming against a photographic reference before public launch.',
      'இவ்வினத்தின் உடலமைப்பு மிகவும் தனித்துவமானது. இப்படம் காட்டில் எடுக்கப்பட்ட சரிபார்க்கப்பட்ட புகைப்படம் அல்ல; தயாரிக்கப்பட்ட பிரதிநிதிப் படமே. பொது வெளியீட்டுக்கு முன் உண்மைப் புகைப்படத்துடன் உறுதி செய்வது நல்லது.'),
  },
  {
    slug: 'lion-tailed-macaque', group: 'animal',
    name: L('Lion-tailed Macaque', 'சோலைமந்தி'), nameTamil: 'சோலைமந்தி',
    sci: 'Macaca silenus', status: 'EN',
    statusLabel: L('Endangered', 'அழியும் அபாயத்தில்'), endemic: true, rare: true,
    range: L('Western Ghats of Karnataka, Kerala and Tamil Nadu',
      'கர்நாடகா, கேரளா, தமிழ்நாட்டின் மேற்குத் தொடர்ச்சி மலைகள்'),
    habitat: L('Tropical wet evergreen rainforest canopy', 'வெப்பமண்டல ஈரப் பசுமைமாறாக் காடுகளின் மேலடுக்குப் பகுதி'),
    elevation: undefined,
    size: L('Head-body length 42–61 cm; weight 2–10 kg.', 'தலை முதல் உடல் வரை நீளம் 42–61 செ.மீ; எடை 2–10 கிலோ.'),
    diet: L('Fruit, seeds, flowers, insects, snails and small vertebrates; native fig species are especially important.',
      'பழங்கள், விதைகள், பூக்கள், பூச்சிகள், நத்தைகள், சிறு முதுகெலும்பிகள்; உள்ளூர் அத்தி வகைகள் குறிப்பாக முக்கியம்.'),
    behaviour: L('Diurnal and arboreal, living in troops of roughly 10–20 with 1–3 adult males; defends territory with loud calls and displays rather than constant fighting.',
      'பகலாடி, மரவாசி; 1–3 முதிர்ந்த ஆண்களுடன் சுமார் 10–20 கொண்ட கூட்டமாக வாழ்கிறது; தொடர்ச்சியான சண்டைக்குப் பதிலாக உரத்த ஒலிகளாலும் அசைவுகளாலும் எல்லையைக் காக்கிறது.'),
    breeding: L('No fixed breeding season, though births concentrate in the wet season; gestation about 6 months; young nurse for roughly a year; females mature around 4 years, males around 6.',
      'நிலையான இனப்பெருக்கப் பருவம் இல்லை; பிறப்புகள் ஈரப் பருவத்தில் அதிகம். கருவுறுதல் சுமார் 6 மாதங்கள்; குட்டி சுமார் ஓராண்டு பால் குடிக்கும்; பெண் ~4 ஆண்டுகளிலும் ஆண் ~6 ஆண்டுகளிலும் முதிர்கின்றன.'),
    lifespan: L('Around 20 years in the wild; up to 30 in captivity.',
      'காட்டில் சுமார் 20 ஆண்டுகள்; அடைப்பில் 30 ஆண்டுகள் வரை.'),
    population: L('Roughly 3,000–3,500 individuals estimated (2003 assessment), in scattered forest fragments.',
      'சிதறிய வனத் துண்டுகளில் சுமார் 3,000–3,500 எண்ணிக்கை (2003 மதிப்பீடு).'),
    populationTrend: L('Considered to be declining through habitat fragmentation, though once-severe hunting pressure has eased under protection.',
      'வாழ்விடத் துண்டாடலால் குறைந்து வருவதாகக் கருதப்படுகிறது; ஒரு காலத்தில் கடுமையாக இருந்த வேட்டை அழுத்தம் பாதுகாப்பால் தணிந்துள்ளது.'),
    threats: L('Fragmentation of rainforest by logging, tea and coffee plantation, and past hunting; small isolated populations also face inbreeding risk.',
      'மரம் வெட்டுதல், தேயிலை–காபித் தோட்டங்களால் மழைக்காட்டின் துண்டாடல், கடந்தகால வேட்டை; தனிமைப்பட்ட சிறு கூட்டங்களுக்கு உள்ளின இனச்சேர்க்கை அபாயமும் உண்டு.'),
    significance: L('One of the Western Ghats’ most recognisable endemic primates, and an important seed disperser for rainforest trees.',
      'மேற்குத் தொடர்ச்சி மலைகளின் எளிதில் அடையாளம் காணக்கூடிய தனித்துவ குரங்கினங்களில் ஒன்று; மழைக்காட்டு மரங்களின் முக்கிய விதைப் பரப்பி.'),
    wgConnection: L('Restricted entirely to Western Ghats rainforest canopy — it occurs nowhere else in the world.',
      'முழுக்க முழுக்க மேற்குத் தொடர்ச்சி மலை மழைக்காட்டு மேல்விதானத்திற்கே உரியது — உலகில் வேறெங்கும் இல்லை.'),
    interesting: L('Was once listed among the "25 Most Endangered Primates" worldwide; sustained local protection has since eased that immediate crisis, though the species remains Endangered.',
      'ஒரு காலத்தில் உலகின் "மிக அதிக அழிவு அபாயத்தில் உள்ள 25 குரங்கினங்கள்" பட்டியலில் இடம்பெற்றது; தொடர் உள்ளூர்ப் பாதுகாப்பால் அந்த உடனடி நெருக்கடி தணிந்தாலும், இன்னும் அழிவு அபாயத்திலேயே உள்ளது.'),
    intro: L('A silver-maned rainforest monkey found only in the canopy of the Western Ghats, instantly recognisable and nowhere near common.',
      'மேற்குத் தொடர்ச்சி மலை மழைக்காட்டு மேல்விதானத்தில் மட்டுமே காணப்படும், வெள்ளிச் சடையுடைய குரங்கு — உடனே அடையாளம் காணக்கூடியது, ஆனால் அரிதானது.'),
    fact: L('One of the Ghats’ most recognisable primates — and an important disperser of rainforest tree seeds across long distances in a forest that badly needs its fragments reconnected.',
      'மழைக்காட்டு மரங்களின் விதைகளைத் தொலைவுக்குப் பரப்புவதில் முக்கியப் பங்கு வகிக்கிறது.'),
    img: '/assets/species/lion-tailed-macaque-alt.jpg', altImg: '/assets/species/lion-tailed-macaque.jpg',
    frame: 'wide', focus: '40% 40%', lead: true,
    credit: 'Image prepared for PIEC', license: 'Prepared asset',
    source: 'https://www.iucnredlist.org/search?query=Macaca%20silenus&searchType=species',
    sourceLabel: L('IUCN RED LIST', 'IUCN சிவப்புப் பட்டியல்'),
  },
  {
    slug: 'malabar-grey-hornbill', group: 'bird',
    name: L('Malabar Grey Hornbill', 'மலபார் சாம்பல் இருவாச்சி'), nameTamil: 'மலபார் சாம்பல் இருவாச்சி',
    sci: 'Ocyceros griseus', status: 'VU',
    statusLabel: L('Vulnerable', 'அழியும் அபாயத்தை எதிர்கொள்ளக்கூடியது'), endemic: true,
    range: L('Western Ghats, Nashik south to the southern hills',
      'மேற்குத் தொடர்ச்சி மலைகள் — நாசிக் முதல் தென் மலைகள் வரை'),
    habitat: L('Evergreen forest and shaded plantation', 'பசுமைமாறாக் காடுகளும் நிழல் தோட்டங்களும்'),
    elevation: L('50–1,500 m', '50–1,500 மீ'),
    diet: L('Fruit (especially figs), supplemented by insects and small vertebrates.',
      'பழங்கள் (குறிப்பாக அத்திப் பழங்கள்); அத்துடன் பூச்சிகளும் சிறு முதுகெலும்பிகளும்.'),
    behaviour: L('The smallest Asian hornbill, and the only one without a prominent casque on the bill.',
      'ஆசியாவின் மிகச் சிறிய இருவாச்சி; அலகின் மேல் தனித்துத் தெரியும் கொம்பு இல்லாத ஒரே இனமும் இதுவே.'),
    breeding: L('Females seal themselves into a nest cavity with a cement of droppings and mud for the entire breeding season, fed by the male through a narrow slit until the chicks fledge.',
      'பெண் பறவை இனப்பெருக்கப் பருவம் முழுவதும் மரப்பொந்துக்குள் தன்னை எச்சமும் சேறும் கொண்டு அடைத்துக்கொள்கிறது; குஞ்சுகள் பறக்கும் வரை ஆண் ஒரு சிறு பிளவின் வழியே உணவூட்டுகிறது.'),
    significance: L('A critical seed-disperser for Western Ghats forest trees, and endemic to the range.',
      'மேற்குத் தொடர்ச்சி மலைக் காட்டு மரங்களின் முக்கிய விதைப் பரப்பி; இம்மலைத்தொடருக்கே உரியது.'),
    wgConnection: L('Found only in the Western Ghats — nowhere else in the world.',
      'மேற்குத் தொடர்ச்சி மலைகளில் மட்டுமே காணப்படுகிறது — உலகில் வேறெங்கும் இல்லை.'),
    interesting: L('The sealed-nest strategy protects the female and chicks from predators for months, at the cost of total dependence on one male’s feeding.',
      'அடைக்கப்பட்ட கூடு என்ற உத்தி, பெண் பறவையையும் குஞ்சுகளையும் மாதக்கணக்கில் வேட்டையாடிகளிடமிருந்து காக்கிறது — ஆனால் ஒரே ஆணின் உணவூட்டலையே முற்றிலும் நம்பியிருக்க வேண்டியிருக்கிறது.'),
    intro: L('The smallest hornbill in Asia, and the only one without a casque — found only in the Western Ghats.',
      'ஆசியாவின் மிகச் சிறிய இருவாச்சி; அலகின் மேல் கொம்பு இல்லாத ஒரே இனம் — மேற்குத் தொடர்ச்சி மலைகளில் மட்டுமே.'),
    fact: L('The smallest Asian hornbill. Females wall themselves into a nest cavity for the whole breeding season, fed by the male through a narrow slit.',
      'ஆசியாவின் மிகச் சிறிய இருவாச்சி. பெண் பறவை இனப்பெருக்கப் பருவம் முழுவதும் பொந்துக்குள் அடைத்துக்கொள்ள, ஆண் சிறு பிளவின் வழியே உணவூட்டுகிறது.'),
    img: '/assets/species/malabar-hornbill.jpg', focus: '60% 32%', frame: 'tall', lead: true,
    credit: 'Image prepared for PIEC', license: 'Prepared asset',
    source: 'https://www.iucnredlist.org/species/22682421/182384253',
    sourceLabel: L('IUCN RED LIST — SPECIES ACCOUNT', 'IUCN சிவப்புப் பட்டியல் — உயிரினப் பதிவு'),
  },
  {
    slug: 'broad-tailed-grassbird', group: 'bird',
    name: L('Broad-tailed Grassbird', 'அகன்றவால் புல் கதிர்க்குருவி'), nameTamil: 'அகன்றவால் புல் கதிர்க்குருவி',
    sci: 'Schoenicola platyurus', status: 'NT',
    statusLabel: L('Near Threatened', 'அச்சுறுத்தலுக்கு அருகிலுள்ள நிலையில்'),
    range: L('Western Ghats, mainly south of Nashik (Maharashtra, Karnataka, Kerala, Tamil Nadu); possible, unconfirmed Sri Lanka records',
      'மேற்குத் தொடர்ச்சி மலைகள், பெரும்பாலும் நாசிக்குக்குத் தெற்கே (மகாராஷ்டிரா, கர்நாடகா, கேரளா, தமிழ்நாடு); இலங்கையில் உறுதிப்படுத்தப்படாத பதிவுகள் உண்டு'),
    habitat: L('Restricted to grassy, moist high-altitude hills', 'ஈரப்பதமுள்ள உயரமான மலைப் புல்வெளிகளில் மட்டுமே காணப்படுகிறது'),
    behaviour: L('Skulks in tall grass and reeds outside the breeding season, rarely showing itself; males give a lark-like trill and fan their broad tail in display.',
      'இனப்பெருக்கக் காலம் அல்லாத நேரங்களில் உயர்ந்த புல்லிலும் நாணலிலும் ஒளிந்திருக்கும், அரிதாகவே வெளிப்படும்; ஆண் பறவை வானம்பாடி போன்ற ஒலியெழுப்பி, அகன்ற வாலை விரித்துக் காட்டுகிறது.'),
    significance: L('One of the least-seen birds in the Western Ghats — known mainly by voice, not by sight.',
      'மேற்குத் தொடர்ச்சி மலைகளில் மிகக் குறைவாகக் காணப்படும் பறவைகளில் ஒன்று — பார்வையை விடக் குரலாலேயே அறியப்படுகிறது.'),
    wgConnection: L('Largely restricted to Western Ghats high-altitude grassland.',
      'பெரும்பாலும் மேற்குத் தொடர்ச்சி மலையின் உயர் புல்வெளிகளுக்கே உரியது.'),
    interesting: L('Its own conservation literature admits the species is genuinely poorly recorded — rarity here is a fact, not a marketing line.',
      'இவ்வினம் உண்மையிலேயே குறைவாகவே பதிவாகியுள்ளது என்பதை அதன் பாதுகாப்பு ஆய்வுக் கட்டுரைகளே ஒப்புக்கொள்கின்றன — இங்கு அரிதாக இருப்பது உண்மை, விளம்பரச் சொல் அல்ல.'),
    intro: L('A small, secretive grassland bird that spends most of its life hidden in tall wet grass, known mainly by its trilling call.',
      'ஈரமான உயர் புல்லுக்குள் ஒளிந்து வாழும் சிறிய, மறைவான புல்வெளிப் பறவை; அதன் ஒலியாலேயே பெரிதும் அறியப்படுகிறது.'),
    fact: L('Stays hidden in tall grass most of the year and is known mainly by its lark-like trill rather than by sight — restricted to high-altitude Western Ghats grassland and genuinely poorly recorded.',
      'ஆண்டின் பெரும்பகுதி உயர்ந்த புல்லில் ஒளிந்திருந்து, பார்வையை விட வானம்பாடி போன்ற ஒலியாலேயே அறியப்படுகிறது — உயர் மலைப் புல்வெளிகளுக்கே உரியது, பதிவுகளும் மிகக் குறைவு.'),
    img: '/assets/species/broad-tailed-grassbird.jpg', focus: '56% 40%', frame: 'wide',
    credit: 'AI-generated representative image', license: 'Original artwork prepared for PIEC',
    source: 'https://www.iucnredlist.org/species/22715577/251479099',
    sourceLabel: L('IUCN RED LIST — SPECIES ACCOUNT', 'IUCN சிவப்புப் பட்டியல் — உயிரினப் பதிவு'),
    imageNote: L('This species is elusive and rarely photographed; the image is an AI-generated representative illustration, not a verified photograph of a specific individual, and should be treated as such.',
      'இவ்வினம் மறைவானது, அரிதாகவே புகைப்படம் எடுக்கப்பட்டுள்ளது; இப்படம் செயற்கை நுண்ணறிவால் உருவாக்கப்பட்ட பிரதிநிதி ஓவியம், குறிப்பிட்ட ஒரு பறவையின் சரிபார்க்கப்பட்ட புகைப்படம் அல்ல.'),
  },
  {
    slug: 'neelakurinji', group: 'plant',
    name: L('Neelakurinji', 'நீலக்குறிஞ்சி'), nameTamil: 'குறிஞ்சி (Kurinji)',
    sci: 'Strobilanthes kunthiana', status: 'VU',
    statusLabel: L('Vulnerable', 'அழியும் அபாயத்தை எதிர்கொள்ளக்கூடியது'), endemic: true,
    range: L('Nilgiri, Palani, Anamalai and Cardamom Hills', 'நீலகிரி, பழனி, ஆனைமலை மற்றும் ஏலக்காய் மலைகள்'),
    habitat: L('Shola-grassland shrub', 'சோலைக் காடுகளும் புல்வெளிகளும் கலந்த புதர்ப்பகுதி'),
    elevation: L('1,300–2,400 m', '1,300–2,400 மீ'),
    behaviour: L('Semelparous — flowers gregariously once every twelve years across whole hillsides, then dies.',
      'ஒரே முறை மலரும் இயல்பு — பன்னிரண்டு ஆண்டுகளுக்கு ஒரு முறை மலைச் சரிவுகள் முழுவதும் ஒருங்கே பூத்து, பின் இறந்துவிடுகிறது.'),
    significance: L('Gives the Nilgiris (literally "blue mountains") their name, from the blue haze it casts over hillsides in bloom; also a Sangam-era Tamil landscape term (kuṞiñci) for the hill-country thinai itself.',
      'பூக்கும்போது மலைச் சரிவுகளில் படரும் நீல ஒளியிலிருந்தே "நீலகிரி" (நீல மலைகள்) என்ற பெயர் வந்தது; சங்க இலக்கியத்தில் "குறிஞ்சி" என்பது மலைநிலத் திணையின் பெயருமாகும்.'),
    wgConnection: L('Endemic to Western Ghats shola-grassland systems.',
      'மேற்குத் தொடர்ச்சி மலையின் சோலை–புல்வெளிச் சூழலுக்கே உரியது.'),
    statusNote: L('Assessed as Vulnerable on the IUCN Red List in 2024 (Bachan & Devika).',
      '2024-இல் IUCN சிவப்புப் பட்டியலில் (Bachan & Devika) "அழியும் அபாயத்தை எதிர்கொள்ளக்கூடியது" எனத் தரப்படுத்தப்பட்டது.'),
    interesting: L('The last mass bloom was 2018; the next is expected around 2030 — a flowering cycle long enough that few people see it more than a handful of times in a lifetime.',
      'கடைசிப் பேரரும்பு 2018-இல்; அடுத்தது 2030-ஐ ஒட்டி எதிர்பார்க்கப்படுகிறது — ஒரு வாழ்நாளில் சிலமுறையே காணக்கூடிய நீண்ட மலர்ச்சி சுழற்சி.'),
    intro: L('A shrub that flowers gregariously once every twelve years, then dies — the source of the Nilgiris’ name.',
      'பன்னிரண்டு ஆண்டுகளுக்கு ஒரு முறை ஒருங்கே பூத்து, பின் இறந்துவிடும் புதர் — நீலகிரி மலைகளின் பெயருக்கு மூலம்.'),
    fact: L('Flowers once every twelve years, then dies. The last mass bloom was 2018 — the word "Nilgiri" (blue mountains) comes from its haze of colour.',
      'கடைசி மலர்ச்சி 2018-ல் நடந்தது; அடுத்தது 2030-ல் எதிர்பார்க்கப்படுகிறது.'),
    img: '/assets/species/neelakurinji.jpg', frame: 'wide', focus: '40% 46%', lead: true,
    credit: 'Image prepared for PIEC', license: 'Prepared asset',
    source: 'https://powo.science.kew.org/results?q=Strobilanthes%20kunthiana',
    sourceLabel: L('PLANTS OF THE WORLD ONLINE (KEW)', 'PLANTS OF THE WORLD ONLINE (KEW)'),
  },
  {
    slug: 'ceropegia-anjanerica', group: 'plant',
    name: L('Ceropegia anjanerica', 'அஞ்சனேரி மெழுகூற்றுப் பூ'), nameTamil: 'அஞ்சனேரி மெழுகூற்றுப் பூ',
    sci: 'Ceropegia anjanerica', status: 'EN',
    statusLabel: L('Endangered', 'அழியும் அபாயத்தில்'), endemic: true, rare: true,
    statusNote: L('Assessed as Endangered for the IUCN Red List by Pethe & Watve (2021). Some earlier and later regional literature describes the species as Critically Endangered; the Endangered assessment is the one cited here.',
      'Pethe & Watve (2021) ஆல் IUCN சிவப்புப் பட்டியலுக்காக "அழியும் அபாயத்தில்" எனத் தரப்படுத்தப்பட்டது. முந்தைய மற்றும் பிந்தைய சில பிராந்திய ஆய்வுக் கட்டுரைகள் இதை "மிகவும் அழியும் அபாயத்தில்" எனக் குறிப்பிடுகின்றன; இங்கு மேற்கோள் காட்டப்படுவது "அழியும் அபாயத்தில்" என்ற மதிப்பீடே.'),
    range: L('Anjaneri Hills, Nashik district — a single hill range in the northern Western Ghats',
      'அஞ்சனேரி மலைகள், நாசிக் மாவட்டம் — வட மேற்குத் தொடர்ச்சி மலையின் ஒரே மலைத்தொடர்'),
    habitat: L('Rocky hill slopes, climbing among scrub vegetation', 'பாறை நிறைந்த மலைச் சரிவுகள்; புதர்த் தாவரங்களுக்கு இடையே படரும்'),
    behaviour: L('A "lantern flower" — its fused, cage-like petals temporarily trap visiting flies during pollination before releasing them.',
      '"விளக்கு மலர்" — கூண்டு போல இணைந்த இதழ்கள், மகரந்தச் சேர்க்கையின்போது வரும் ஈக்களைத் தற்காலிகமாகச் சிறைப்படுத்தி, பின் விடுவிக்கின்றன.'),
    significance: L('One of the most narrowly endemic plants described from the Western Ghats — known from essentially one hill range.',
      'மேற்குத் தொடர்ச்சி மலைகளில் விவரிக்கப்பட்ட மிகக் குறுகிய பரவலுள்ள தாவரங்களில் ஒன்று — அடிப்படையில் ஒரே மலைத்தொடரிலிருந்தே அறியப்படுகிறது.'),
    wgConnection: L('Endemic to a single northern Western Ghats hill range.',
      'வட மேற்குத் தொடர்ச்சி மலையின் ஒரே மலைத்தொடருக்கே உரியது.'),
    interesting: L('Described relatively recently in the botanical literature, and still known from so few locations that its threat status has been debated between Endangered and Critically Endangered.',
      'தாவரவியல் ஆய்வுக் கட்டுரைகளில் ஒப்பீட்டளவில் சமீபத்தில் விவரிக்கப்பட்டது; இன்னும் மிகச் சில இடங்களிலிருந்தே அறியப்படுவதால், அதன் அபாய நிலை "அழியும் அபாயத்தில்" / "மிகக் கடுமையான அழிவு அபாயம்" என விவாதத்தில் உள்ளது.'),
    intro: L('A "lantern flower" that traps its own pollinators — known from essentially one hill range in the entire world.',
      'தன் மகரந்தச் சேர்க்கைப் பூச்சிகளையே சிறைப்படுத்தும் "விளக்கு மலர்" — உலகிலேயே அடிப்படையில் ஒரே மலைத்தொடரில் மட்டுமே அறியப்படுகிறது.'),
    fact: L('A fly-trap flower known only from the Anjaneri Hills near Nashik — about as narrow-endemic as Western Ghats plants get.',
      'நாசிக் அருகிலுள்ள அஞ்சனேரி மலைகளில் மட்டுமே அறியப்படும் ஈப்பொறி மலர் — மேற்குத் தொடர்ச்சி மலைத் தாவரங்களில் மிகக் குறுகிய பரவல் கொண்டது.'),
    img: '/assets/species/ceropegia-anjanerica.jpg', focus: '36% 42%',
    credit: 'AI-generated representative image', license: 'Original artwork prepared for PIEC',
    source: 'https://threatenedtaxa.org/index.php/JoTT/article/view/6879',
    sourceLabel: L('JOURNAL OF THREATENED TAXA', 'JOURNAL OF THREATENED TAXA'),
    imageNote: L('This is a very narrow endemic with few published photographs; the image is an AI-generated genus-representative illustration and has not been verified against a confirmed specimen photograph of this exact species.',
      'இது மிகக் குறுகிய பரவல் கொண்ட இனம்; வெளியிடப்பட்ட புகைப்படங்கள் மிகக் குறைவு. இப்படம் செயற்கை நுண்ணறிவால் உருவாக்கப்பட்ட இனக்குலப் பிரதிநிதி ஓவியம்; இவ்வினத்தின் உறுதிசெய்யப்பட்ட மாதிரிப் புகைப்படத்துடன் சரிபார்க்கப்படவில்லை.'),
  },
  {
    slug: 'vateria-indica', group: 'plant',
    name: L('White Dammar', 'தூப மரம்'), nameTamil: 'தூப மரம்',
    sci: 'Vateria indica', status: 'VU',
    statusLabel: L('Vulnerable', 'அழியும் அபாயத்தை எதிர்கொள்ளக்கூடியது'), endemic: true, rare: true,
    statusNote: L('Assessed as Vulnerable in the 2020 IUCN Red List assessment (Dhyani & Barstow), which downlisted the species from its earlier Critically Endangered listing. Older sources still quote Critically Endangered.',
      '2020 IUCN சிவப்புப் பட்டியல் மதிப்பீட்டில் (Dhyani & Barstow) "அழியும் அபாயத்தை எதிர்கொள்ளக்கூடியது" எனத் தரப்படுத்தப்பட்டது; இது முந்தைய "மிகக் கடுமையான அழிவு அபாயம்" நிலையிலிருந்து தரமிறக்கம். பழைய மூலங்கள் இன்னும் அப்பழைய நிலையையே காட்டுகின்றன.'),
    range: L('Agasthyamalai Hills to southern Maharashtra', 'அகத்தியமலைப் பகுதியிலிருந்து தெற்கு மகாராஷ்டிரா வரை'),
    habitat: L('Wet evergreen and Myristica swamp forest', 'ஈரப் பசுமைமாறாக் காடுகளிலும் மிரிஸ்டிகா மரங்கள் வளரும் சதுப்புக் காடுகளிலும்'),
    elevation: L('Below roughly 800–1,200 m', 'பொதுவாகக் கடல் மட்டத்திலிருந்து சுமார் 800–1,200 மீட்டருக்குக் கீழான பகுதிகளில்'),
    size: L('A canopy-emergent forest giant reaching 40–60 m.',
      'மேல்விதானத்தையும் தாண்டி 40–60 மீட்டர் வரை வளரும் காட்டு ராட்சத மரம்.'),
    significance: L('A keystone canopy species of Western Ghats wet evergreen forest, and the source of "white dammar" resin, harvested for incense and varnish for centuries.',
      'மேற்குத் தொடர்ச்சி மலையின் ஈர பசுமைமாறாக் காட்டின் முக்கிய மேல்விதான மரம்; நூற்றாண்டுகளாக ஊதுபத்திக்கும் வார்னிஷுக்கும் எடுக்கப்படும் "வெள்ளைக் குங்கிலியம்" பிசினின் மூலம்.'),
    threats: L('Over-harvesting of both timber and seed, plus weevil and beetle seed predation, threaten natural regeneration.',
      'மரமும் விதையும் அளவுக்கு மீறி அறுவடை செய்யப்படுவதும், வண்டுகளால் விதை அழிக்கப்படுவதும் இயற்கையான மீளுருவாக்கத்தை அச்சுறுத்துகின்றன.'),
    wgConnection: L('Endemic to the Western Ghats.', 'மேற்குத் தொடர்ச்சி மலைகளில் மட்டுமே இயற்கையாகக் காணப்படும்.'),
    interesting: L('Its resin has been traded for centuries under the Tamil name Vellai Kungiliyam, still sold today for incense and traditional use.',
      'இதன் பிசின் "வெள்ளைக் குங்கிலியம்" என்ற தமிழ்ப் பெயரில் நூற்றாண்டுகளாக வர்த்தகம் செய்யப்பட்டு, இன்றும் ஊதுபத்திக்கும் பாரம்பரியப் பயன்பாட்டுக்கும் விற்கப்படுகிறது.'),
    intro: L('A rainforest giant reaching 40–60 metres, tapped for centuries for the pale resin that gives it its English name.',
      '40–60 மீட்டர் உயரம் வரை வளரும் மழைக்காட்டு ராட்சத மரம்; அதன் வெளிர் பிசினுக்காக நூற்றாண்டுகளாகத் தட்டி எடுக்கப்பட்டு வருகிறது.'),
    fact: L('A rainforest giant to 40–60m, tapped for centuries for its resin — over-harvest of timber and seed now threatens its regeneration.',
      'வெள்ளைக் குங்கிலியம் என்ற பெயரில் நூற்றாண்டுகளாக வர்த்தகம் செய்யப்பட்ட மரம்.'),
    img: '/assets/species/vateria-indica.jpg', focus: '50% 58%', frame: 'tall',
    credit: 'Photograph supplied for this project',
    license: 'Source and licence not independently verified — confirm before public use',
    source: 'https://www.iucnredlist.org/species/33029/115932674',
    sourceLabel: L('IUCN RED LIST — SPECIES ACCOUNT', 'IUCN சிவப்புப் பட்டியல் — உயிரினப் பதிவு'),
    imageNote: L('This photograph was supplied as a prepared asset; its original photographer and licence could not be independently confirmed in this pass. Please confirm the source before treating it as cleared for public use.',
      'இப்புகைப்படம் தயாரிக்கப்பட்ட சொத்தாக வழங்கப்பட்டது; அதன் மூல புகைப்படக் கலைஞரும் உரிமமும் இந்தச் சுற்றில் தனியாக உறுதிசெய்யப்படவில்லை. பொதுப் பயன்பாட்டுக்கு முன் மூலத்தை உறுதி செய்யவும்.'),
  },
];

// -----------------------------------------------------------------------------
// The Logo Story — the crest read as three animals, each with its own section.
// The photographs show the habitat each animal stands for and are captioned as
// such; none of them is presented as a photograph of the animal itself, and no
// part of the crest artwork is cropped or reused as wildlife photography.
// -----------------------------------------------------------------------------
export type LogoAnimal = {
  no: string; name: L; heading: L; body: L; wg: L;
  // img is a photograph OF THIS ANIMAL — never a landscape stand-in, and never
  // artwork cropped out of the crest.
  img: string; alt: L; caption: L; focus?: string;
};

export const logoAnimals: LogoAnimal[] = [
  { no: '01',
    name: L('NILGIRI TAHR', 'வரையாடு'),
    heading: L('The mountain.', 'மலை.'),
    body: L('Found only on the high montane grasslands of the southern Western Ghats, the tahr stands for the range’s most fragile habitat: exposed, high-elevation cliff grassland that survives in isolated pockets and cannot simply regrow elsewhere once lost. It represents the Western Ghats’ endemic identity in its purest form — a species, and a habitat, found nowhere else on Earth.',
      'தென் மேற்குத் தொடர்ச்சி மலைகளின் உயர் மலைப் புல்வெளிகளில் மட்டுமே காணப்படும் வரையாடு, இம்மலைத்தொடரின் மிக மென்மையான வாழ்விடத்தைக் குறிக்கிறது: தனிமைப்பட்ட சிறு பகுதிகளில் மட்டுமே எஞ்சியிருக்கும், ஒருமுறை அழிந்தால் வேறெங்கும் மீண்டும் வளராத உயர்நிலைப் பாறைப் புல்வெளி. உலகில் வேறெங்கும் இல்லாத ஓர் உயிரினமும் ஒரு வாழ்விடமும் — மேற்குத் தொடர்ச்சி மலையின் தனித்தன்மையை இதுவே தூய வடிவில் பிரதிபலிக்கிறது.'),
    wg: L('Endemic to the southern Western Ghats: it exists on these grassland cliffs and nowhere else on Earth.',
      'தென் மேற்குத் தொடர்ச்சி மலைகளில் மட்டுமே இயற்கையாகக் காணப்படும்: இந்தப் புல்வெளிப் பாறைகளில் மட்டுமே வாழ்கிறது, உலகில் வேறெங்கும் இல்லை.'),
    img: '/assets/species/nilgiri-tahr.jpg', focus: '60% 44%',
    alt: L('A Nilgiri tahr standing on a rocky Western Ghats ridge',
      'மேற்குத் தொடர்ச்சி மலையின் பாறை முகட்டில் நிற்கும் வரையாடு'),
    caption: L('NILGIRI TAHR · WESTERN GHATS', 'வரையாடு · மேற்குத் தொடர்ச்சி மலைகள்') },
  { no: '02',
    name: L('INDIAN ELEPHANT', 'இந்திய யானை'),
    heading: L('The forest.', 'காடு.'),
    body: L('Elephants move across enormous ranges, through forest that has to stay connected for them to survive at all — they cannot persist in small, isolated fragments the way some smaller species can. Their presence in the crest stands for landscape-scale connectivity, and for coexistence: elephant range overlaps constantly with farmland and settlement across the Western Ghats, making them a working symbol of conservation that has to serve people and wildlife together.',
      'யானைகள் மிகப் பரந்த பகுதிகளில் நடமாடுகின்றன; அவை உயிர்வாழவே காடு தொடர்ச்சியாக இணைந்திருக்க வேண்டும் — சில சிறிய உயிரினங்களைப் போல தனிமைப்பட்ட சிறு துண்டுகளில் அவற்றால் நீடிக்க முடியாது. சின்னத்தில் அவற்றின் இடம், நிலப்பரப்பு அளவிலான இணைப்பையும் இணைவாழ்வையும் குறிக்கிறது: மேற்குத் தொடர்ச்சி மலைகள் முழுவதும் யானைகளின் நடமாட்டப் பகுதி விவசாய நிலங்களுடனும் குடியிருப்புகளுடனும் தொடர்ந்து மேற்பொருந்துகிறது. எனவே, மக்களுக்கும் வன உயிரினங்களுக்கும் ஒருசேரப் பயன்படும் பாதுகாப்பின் நடைமுறைச் சின்னமாக அவை உள்ளன.'),
    wg: L('Western Ghats elephant range crosses reserve forest, plantation and farmland alike, which is why corridors between forest blocks matter more here than fences around them.',
      'மேற்குத் தொடர்ச்சி மலைகளில் யானைகளின் நடமாட்டப் பகுதி காப்புக்காடு, தோட்டம், விவசாய நிலம் ஆகியவற்றைக் கடக்கிறது; எனவே காடுகளைச் சுற்றி வேலி போடுவதை விட, வனத் தொகுதிகளுக்கு இடையே வழித்தடங்கள் இருப்பதே இங்கு முக்கியம்.'),
    img: '/assets/story/indian-elephant.jpg', focus: '42% 46%',
    alt: L('An Indian elephant walking a forest riverbank in the Western Ghats',
      'மேற்குத் தொடர்ச்சி மலையின் வன ஆற்றங்கரையில் நடந்து செல்லும் இந்திய யானை'),
    caption: L('INDIAN ELEPHANT · WESTERN GHATS', 'இந்திய யானை · மேற்குத் தொடர்ச்சி மலைகள்') },
  { no: '03',
    name: L('BENGAL TIGER', 'வங்காளப் புலி'),
    heading: L('The ecosystem.', 'சூழல்தொகுதி.'),
    body: L('As an apex predator, the tiger needs a functioning food chain beneath it to survive — healthy prey populations, which need healthy habitat, which needs the forest to stay intact. Its presence signals that an entire ecosystem beneath it is still working. It represents landscape-level conservation: protecting not one species in isolation, but the web of relationships that keeps a forest alive.',
      'உச்ச வேட்டையாடியாக, புலி உயிர்வாழத் தனக்குக் கீழே இயங்கும் உணவுச் சங்கிலி தேவை — ஆரோக்கியமான இரை எண்ணிக்கை, அதற்கு ஆரோக்கியமான வாழ்விடம், அதற்குக் காடு சிதையாமல் இருக்க வேண்டும். அதன் இருப்பே, அதற்குக் கீழுள்ள முழுச் சூழல்தொகுதியும் இன்னும் இயங்குகிறது என்பதைக் காட்டுகிறது. இது நிலப்பரப்பு அளவிலான பாதுகாப்பைக் குறிக்கிறது: ஒரே உயிரினத்தைத் தனியாகக் காப்பதல்ல, ஒரு காட்டை உயிர்ப்புடன் வைத்திருக்கும் உறவுகளின் வலையையே காப்பது.'),
    wg: L('The Western Ghats hold several of India’s tiger reserves; a tiger population persisting here is the clearest single signal that the forest below it is still whole.',
      'இந்தியாவின் பல புலிகள் காப்பகங்கள் மேற்குத் தொடர்ச்சி மலைகளில் உள்ளன; இங்கு புலிகள் நீடிப்பது, அவற்றுக்குக் கீழுள்ள காடு இன்னும் முழுமையாக உள்ளது என்பதற்கான தெளிவான ஒற்றைச் சான்று.'),
    img: '/assets/story/bengal-tiger.jpg', focus: '44% 44%',
    alt: L('A Bengal tiger walking through dense Western Ghats forest',
      'அடர்ந்த மேற்குத் தொடர்ச்சி மலைக் காட்டில் நடந்து வரும் வங்காளப் புலி'),
    caption: L('BENGAL TIGER · WESTERN GHATS', 'வங்காளப் புலி · மேற்குத் தொடர்ச்சி மலைகள்') },
];

export const logoStory = {
  eyebrow: L('STORIES / THE MARK', 'கட்டுரைகள் / அமைப்பின் சின்னம்'),
  h1: L('Mountain. Forest. Ecosystem.', 'மலை, காடு, இயற்கைச் சூழல்.'),
  lead: L('Three animals, one crest — a way of reading what the PIEC mark depicts, species by species.',
    'ஒரே சின்னத்தில் மூன்று விலங்குகள் — வரையாடு, புலி, யானை ஆகியவற்றை PIEC சின்னம் ஏன் ஒன்றாகக் காட்டுகிறது என்பதைப் புரிந்துகொள்ளும் ஒரு பார்வை.'),
  openA: L('The PIEC crest carries three animals inside one circle — a Nilgiri tahr, a Bengal tiger and an Indian elephant — beneath the motto Conserve · Together · For Posterity.',
    'PIEC சின்னம் ஒரே வட்டத்திற்குள் மூன்று விலங்குகளைத் தாங்குகிறது — வரையாடு, வங்காளப் புலி, இந்திய யானை — "பாதுகாப்போம் · ஒன்றிணைவோம் · வருங்காலத்திற்காக" என்ற முழக்கத்தின் கீழ்.'),
  openB: L('Each occupies a different part of the Western Ghats’ ecology, and read together they trace the whole landscape the federation works in, from mountaintop to forest floor.',
    'இந்த மூன்று விலங்குகளும் மேற்குத் தொடர்ச்சி மலைகளின் வெவ்வேறு வாழிடங்களுடன் தொடர்புடையவை. அவற்றை ஒன்றாகப் பார்க்கும்போது, மலை உச்சி முதல் காட்டுத் தரை வரை உள்ள இயற்கைச் சூழலின் பல்வகைத் தன்மையைப் புரிந்துகொள்ளலாம்.'),
  crestAlt: L('The official PIEC crest, showing a Nilgiri tahr, a Bengal tiger and an Indian elephant with the motto Conserve, Together, For Posterity',
    'அதிகாரப்பூர்வ PIEC சின்னம் — வரையாடு, வங்காளப் புலி, இந்திய யானை, மற்றும் "Conserve, Together, For Posterity" முழக்கத்துடன்'),
  ctaIndex: L('EXPLORE THE SPECIES INDEX', 'உயிரினப் பட்டியலைப் பாருங்கள்'),
  ctaWg: L('THE WESTERN GHATS STORY', 'மேற்குத் தொடர்ச்சி மலைகளின் கதை'),
  note: L('Read together: mountain, forest and ecosystem span the Western Ghats from its highest, most exposed grassland to its most connected lowland forest to the web of relationships that holds a functioning ecosystem together. This is one reading of what the crest depicts, grounded in each species’ real ecology — it is symbolism and interpretation, not an account of the Federation’s own reasons for choosing them, which this page does not claim to know. Each section carries a photograph of that animal.',
    'மலை, காடு, இயற்கைச் சூழல் ஆகியவை ஒன்றோடொன்று இணைந்தவை. உயரமான மலைப் புல்வெளியிலிருந்து தாழ்நிலக் காடுகள் வரை, ஒவ்வொரு வாழிடமும் மற்றவற்றுடன் தொடர்புடையது. இந்த விளக்கம் ஒவ்வொரு விலங்கின் உண்மையான சூழலியல் பண்புகளை அடிப்படையாகக் கொண்டு PIEC சின்னத்தைப் புரிந்துகொள்ளும் ஒரு வழியாகும். இந்த விலங்குகளைத் தேர்ந்தெடுத்ததற்கான அமைப்பின் வரலாற்றுக் காரணங்கள் இப்பக்கத்தில் கூறப்படவில்லை. ஒவ்வொரு படமும் அந்த விலங்கையும் அதனுடன் தொடர்புடைய வாழிடத்தையும் காட்டுகிறது.'),
};

// -----------------------------------------------------------------------------
// The Western Ghats Story
// -----------------------------------------------------------------------------
export type WgBlock =
  | { kind: 'prose'; heading?: L; body: L[] }
  | { kind: 'figure'; img: string; alt: L; caption: L; bleed?: boolean; w: number; h: number }
  | { kind: 'pull'; body: L };

export const wgStory = {
  eyebrow: L('STORIES / THE LANDSCAPE', 'கட்டுரைகள் / நிலப்பரப்பு'),
  h1: L('A mountain chain older than the story it protects.',
    'தான் காக்கும் கதையை விடப் பழமையான மலைத்தொடர்.'),
  lead: L('Six states, one continuous chain, and one of the world’s eight "hottest" hotspots of biological diversity.',
    'ஆறு மாநிலங்கள், ஒரே தொடர்ச்சியான மலைத்தொடர், உலகின் எட்டு "மிகச் செறிவான" உயிர்ப் பன்மை மையங்களில் ஒன்று.'),
  heroAlt: L('Layered basalt escarpment cliffs of the Western Ghats under a hazy sky',
    'மங்கலான வானின் கீழ் மேற்குத் தொடர்ச்சி மலையின் அடுக்கடுக்கான பாறைச் செங்குத்துச் சரிவுகள்'),
  openA: L('The Western Ghats run for roughly 1,600 kilometres down India’s western edge, from the Tapti river near the Gujarat–Maharashtra border to Kanyakumari at the southern tip — a near-continuous mountain wall across six states.',
    'மேற்குத் தொடர்ச்சி மலைகள் இந்தியாவின் மேற்கு விளிம்பில், குஜராத்–மகாராஷ்டிரா எல்லைக்கு அருகிலுள்ள தபதி ஆற்றிலிருந்து தென் முனையிலுள்ள கன்னியாகுமரி வரை சுமார் 1,600 கிலோமீட்டர் நீளத்திற்கு நீள்கின்றன — ஆறு மாநிலங்களைக் கடக்கும், கிட்டத்தட்ட தொடர்ச்சியான மலைச் சுவர்.'),
  openB: L('Gujarat, Maharashtra, Goa, Karnataka, Kerala and Tamil Nadu — though exact state counts vary slightly by source, depending on where the chain is considered to formally begin. UNESCO inscribed the range as a World Heritage Site in 2012, recognising it as one of the world’s eight "hottest hotspots" of biological diversity.',
    'குஜராத், மகாராஷ்டிரா, கோவா, கர்நாடகா, கேரளா, தமிழ்நாடு — மலைத்தொடர் எங்கே முறையாகத் தொடங்குகிறது எனக் கருதப்படுகிறதோ அதைப் பொறுத்து, மாநிலங்களின் எண்ணிக்கை மூலத்துக்கு மூலம் சற்று மாறுபடுகிறது. 2012-இல் யுனெஸ்கோ இம்மலைத்தொடரை உலகப் பாரம்பரியத் தளமாகப் பதிவு செய்து, உலகின் எட்டு "மிகச் செறிவான" உயிர்ப் பன்மை மையங்களில் ஒன்றாக அங்கீகரித்தது.'),
  stats: [
    { dt: L('~1,600 KM', '~1,600 கி.மீ'), dd: L('North–south length', 'வடக்கிலிருந்து தெற்கு வரை உள்ள நீளம்') },
    { dt: L('6', '6'), dd: L('States crossed', 'இந்த மலைத்தொடர் கடந்து செல்லும் மாநிலங்கள்') },
    { dt: L('~150 million', 'சுமார் 15 கோடி'), dd: L('Years old, roughly', 'தோராயமான வயது') },
    { dt: L('2012', '2012'), dd: L('UNESCO World Heritage Site', 'யுனெஸ்கோவின் உலகப் பாரம்பரியத் தளம்') },
  ],
  blocks: [
    { kind: 'prose',
      heading: L('Older than the mountains that get more attention', 'பொதுவாகப் பேசப்படும் பல மலைத்தொடர்களைவிடப் பழமையானது'),
      body: [L('The Western Ghats are commonly described as considerably older than the Himalaya — geological accounts typically place their origins around 150 million years ago, tied to the break-up of Gondwana and the drifting-apart of the Indian and Madagascan landmasses, long before the Himalayan collision that began roughly 50 million years ago. That age shows: the range is a heavily eroded, deeply weathered escarpment rather than a young, jagged mountain front, its basalt and laterite cliffs shaped by monsoon after monsoon rather than recent uplift.',
        'மேற்குத் தொடர்ச்சி மலைகள் இமயத்தை விடக் கணிசமாகப் பழமையானவை எனப் பொதுவாகக் கூறப்படுகிறது — புவியியல் விளக்கங்கள் அவற்றின் தோற்றத்தைச் சுமார் 15 கோடி ஆண்டுகளுக்கு முன், கோண்ட்வானா பிரிவுடனும், இந்திய–மடகாஸ்கர் நிலப்பரப்புகள் விலகியதுடனும் இணைத்துக் கூறுகின்றன; இது சுமார் 5 கோடி ஆண்டுகளுக்கு முன் தொடங்கிய இமயத் தாக்கத்திற்கு நெடுங்காலம் முந்தையது. அப்பழமை தெரிகிறது: இது இளமையான, கூரான மலைமுகம் அல்ல; கடுமையாக அரிக்கப்பட்ட, ஆழமாகச் சிதைந்த செங்குத்துச் சரிவு. அதன் பாறைச் சுவர்கள் சமீபத்திய எழுச்சியால் அல்ல, பருவமழைக்குப் பின் பருவமழையால் வடிவமைக்கப்பட்டவை.')] },
    { kind: 'figure', img: '/assets/story/wg-monsoon.jpg', bleed: true, w: 1600, h: 1200,
      alt: L('Heavy monsoon cloud over a misty Western Ghats valley near Sakleshpur, Karnataka',
        'கர்நாடகா சக்லேஷ்பூர் அருகே பனிமூட்டமான மேற்குத் தொடர்ச்சி மலைப் பள்ளத்தாக்கின் மேல் கனத்த பருவமழை மேகம்'),
      caption: L('Monsoon cloud over the Western Ghats near Sakleshpur, Hassan district, Karnataka',
        'கர்நாடகா, ஹாசன் மாவட்டம், சக்லேஷ்பூர் அருகே மேற்குத் தொடர்ச்சி மலையின் மேல் பருவமழை மேகம்') },
    { kind: 'prose',
      heading: L('The wall that makes the monsoon', 'பருவமழையின் பாதையை மாற்றும் மலைத்தொடர்'),
      body: [L('The Ghats sit directly in the path of the southwest monsoon rolling in off the Arabian Sea, forcing moist air upward and wringing enormous rainfall out of it on the western, seaward slopes — while the eastern, leeward side falls into a pronounced rain shadow. That single geographic fact underwrites the ecology of the entire Indian peninsula: the rivers that rise here, including the Godavari, Krishna and Kaveri, go on to water a large share of southern India before reaching the Bay of Bengal, making the range a watershed for hundreds of millions of people who may never see it.',
        'அரபிக் கடலிலிருந்து வரும் தென்மேற்குப் பருவக்காற்றின் நேர்ப் பாதையில் இம்மலைத்தொடர் நிற்கிறது; ஈரக் காற்றை மேலே தள்ளி, கடலை நோக்கிய மேற்குச் சரிவுகளில் மிகப் பெரும் மழையைப் பிழிந்தெடுக்கிறது — அதே சமயம் கிழக்குப் பக்கம் தெளிவான மழை நிழலில் விழுகிறது. இந்த ஒரு புவியியல் உண்மையே இந்தியத் தீபகற்பம் முழுவதன் சூழலியலுக்கும் அடித்தளம்: இங்கே உற்பத்தியாகும் கோதாவரி, கிருஷ்ணா, காவிரி உள்ளிட்ட ஆறுகள், வங்கக் கடலை அடையும் முன் தென்னிந்தியாவின் பெரும் பகுதிக்கு நீர் பாய்ச்சுகின்றன. இம்மலையைப் பார்த்தே இராத பல கோடி மக்களுக்கு இது நீர்ப்பிடிப்பாக உள்ளது.'),
        L('At higher elevations the Ghats don’t form a single, uniform forest. They form a mosaic: dense, stunted "shola" forest filling folds and valleys where moisture collects, separated by open montane grassland on the drier, more exposed slopes between them. This shola–grassland patchwork is itself a distinct habitat type, home to species — the Nilgiri tahr among them — found in this exact combination and nowhere else.',
        'உயர்ந்த பகுதிகளில் இம்மலைகள் ஒரே சீரான காடாக இருப்பதில்லை; ஒரு கலவையாக அமைகின்றன: ஈரம் தேங்கும் மடிப்புகளிலும் பள்ளத்தாக்குகளிலும் அடர்ந்த, குள்ளமான "சோலை" காடு; அவற்றுக்கு இடையே வறண்ட, திறந்த சரிவுகளில் மலைப் புல்வெளி. இந்தச் சோலை–புல்வெளிக் கலவையே ஒரு தனி வாழ்விட வகை; வரையாடு உள்ளிட்ட உயிரினங்கள் இந்தச் சரியான சேர்க்கையில் மட்டுமே வாழ்கின்றன, வேறெங்கும் இல்லை.')] },
    { kind: 'figure', img: '/assets/story/wg-shola.jpg', w: 1500, h: 1125,
      alt: L('Shola forest and rolling grassland hills at Grass Hills, Valparai, Anamalais',
        'ஆனைமலையின் வால்பாறை, கிராஸ் ஹில்ஸில் சோலைக் காடும் புல்வெளி மலைகளும்'),
      caption: L('Shola forest and grassland at Grass Hills, Valparai, in the Anamalai Hills',
        'ஆனைமலையின் வால்பாறை, கிராஸ் ஹில்ஸில் சோலைக் காடும் புல்வெளியும்') },
    { kind: 'prose',
      heading: L('An unusually high rate of endemism', 'பல தனித்துவ உயிரினங்கள் காணப்படும் பகுதி'),
      body: [L('The Western Ghats are recognised as one of the world’s eight "hottest" biodiversity hotspots precisely because so much of what lives here lives nowhere else — a pattern of endemism among plants, amphibians, reptiles and freshwater fish that is unusually concentrated even by the standards of other tropical mountain ranges. The ten species and plants in PIEC’s own species index were chosen because they illustrate that pattern directly, not because they are the most photogenic.',
        'மேற்குத் தொடர்ச்சி மலைகளில் காணப்படும் பல தாவரங்களும் விலங்குகளும் உலகின் வேறு பகுதிகளில் இயற்கையாகக் காணப்படுவதில்லை. தாவரங்கள், நீர்நில வாழ்விகள், ஊர்வன, நன்னீர் மீன்கள் உள்ளிட்ட பல உயிரினக் குழுக்களில் இத்தகைய தனித்துவம் அதிகமாக இருப்பதால், இந்த மலைத்தொடர் உலகின் முக்கிய உயிரினப் பன்மை மையங்களில் ஒன்றாகக் கருதப்படுகிறது. PIEC-ன் உயிரினப் பட்டியலில் இடம்பெற்றுள்ள பத்து உயிரினங்களும் இந்தத் தனித்துவத்தை எடுத்துக்காட்டுகின்றன; அவை புகைப்படத்தில் அழகாகத் தெரிவதற்காக மட்டும் தேர்ந்தெடுக்கப்படவில்லை.'),
        L('The same rainfall that shapes the forest also carves the range’s waterfalls — a visible, seasonal signature of a much larger hydrological system that keeps the Ghats’ forests wet enough to hold onto species evolved to depend on that moisture, from the underground-dwelling purple frog to canopy epiphytes that never touch the ground.',
        'காட்டை வடிவமைக்கும் அதே மழையே இம்மலைத்தொடரின் அருவிகளையும் செதுக்குகிறது — இது மிகப் பெரிய நீரியல் அமைப்பின் பருவகாலத் தடயம். அந்த அமைப்பே இம்மலைக் காடுகளை, அந்த ஈரத்தைச் சார்ந்து பரிணமித்த உயிரினங்களைத் தக்கவைக்கும் அளவுக்கு ஈரமாக வைத்திருக்கிறது — நிலத்தடியில் வாழும் ஊதாத் தவளை முதல், தரையையே தொடாத மேல்விதான ஒட்டுத் தாவரங்கள் வரை.')] },
    { kind: 'figure', img: '/assets/story/wg-rivers.jpg', w: 1500, h: 1000,
      alt: L('A forest waterfall over mossy rocks in the Kumaraparvatha range of the Western Ghats, Karnataka',
        'கர்நாடகா, மேற்குத் தொடர்ச்சி மலையின் குமாரபர்வத மலைத்தொடரில் பாசிப் பாறைகள் மீது ஓர் வன அருவி'),
      caption: L('A forest waterfall in the Kumaraparvatha range, Kodagu district, Karnataka',
        'கர்நாடகா, கொடகு மாவட்டம், குமாரபர்வத மலைத்தொடரில் ஒரு வன அருவி') },
    { kind: 'prose',
      heading: L('People have always lived in this landscape', 'இந்தப் பகுதியில் மக்கள் நீண்ட காலமாக வாழ்ந்து வருகின்றனர்'),
      body: [L('The Western Ghats are not empty wilderness. Villages, tea and coffee plantations, and agricultural land sit inside and beside the same forests that hold the range’s rarest species — a working landscape, not a fenced-off reserve.',
        'மேற்குத் தொடர்ச்சி மலைகள் மனிதரற்ற வனாந்திரம் அல்ல. இம்மலைத்தொடரின் மிக அரிய உயிரினங்களைத் தாங்கும் அதே காடுகளுக்குள்ளும் அருகிலும் கிராமங்கள், தேயிலை–காபித் தோட்டங்கள், விவசாய நிலங்கள் உள்ளன — இது வேலி போட்ட காப்பகம் அல்ல, இயங்கும் நிலப்பரப்பு.')] },
    { kind: 'pull',
      body: L('Habitat fragmentation — not any single threat — is the Western Ghats’ central conservation problem: plantation, settlement and infrastructure steadily cut continuous forest into isolated islands, each too small on its own to hold a viable population.',
        'ஏதேனும் ஒரு தனி அச்சுறுத்தல் அல்ல — வாழ்விடத் துண்டாடலே மேற்குத் தொடர்ச்சி மலைகளின் மைய பாதுகாப்புச் சிக்கல்: தோட்டங்கள், குடியிருப்புகள், உள்கட்டமைப்பு ஆகியவை தொடர்ச்சியான காட்டை நிலையாகத் தனித் தீவுகளாக வெட்டுகின்றன; ஒவ்வொன்றும் தனியாக ஒரு நிலைத்த உயிரினக் கூட்டத்தைத் தாங்க முடியாத அளவுக்குச் சிறியவை.') },
    { kind: 'figure', img: '/assets/story/wg-people.jpg', bleed: true, w: 1500, h: 844,
      alt: L('A village nestled at the edge of plantation and forest in the Western Ghats',
        'மேற்குத் தொடர்ச்சி மலையில் தோட்டத்திற்கும் காட்டிற்கும் இடையே அமைந்த ஒரு கிராமம்'),
      caption: L('A village at the edge of plantation and forest, Western Ghats',
        'மேற்குத் தொடர்ச்சி மலையில் தோட்டத்தின் விளிம்பிலும் காட்டின் விளிம்பிலும் ஒரு கிராமம்') },
    { kind: 'prose',
      heading: L('Why it matters beyond the mountains', 'மலைகளுக்கு அப்பாலும் ஏன் முக்கியம்? உண்டு'),
      body: [L('Protecting the Western Ghats is not only about the species that live nowhere else. It is about the watershed that supplies a large share of peninsular India, the monsoon system the range itself helps shape, and the communities whose water, soil and livelihoods are tied to a forest staying intact. Conservation here has to work at landscape scale, and it has to work for people as well as wildlife, or it does not work at all.',
        'மேற்குத் தொடர்ச்சி மலைகளைப் பாதுகாப்பது வேறெங்கும் வாழாத உயிரினங்களுக்காக மட்டுமல்ல. தீபகற்ப இந்தியாவின் பெரும் பகுதிக்கு நீர் தரும் நீர்ப்பிடிப்பு, இம்மலைத்தொடரே வடிவமைக்க உதவும் பருவமழை அமைப்பு, மற்றும் காடு சிதையாமல் இருப்பதுடன் தம் நீர், மண், வாழ்வாதாரம் பிணைந்திருக்கும் சமூகங்கள் — இவற்றுக்காகவும் தான். இங்கு பாதுகாப்பு நிலப்பரப்பு அளவில் செயல்பட வேண்டும்; வன உயிரினங்களுக்கு மட்டுமல்லாமல் மக்களுக்கும் பயன்தர வேண்டும் — இல்லையெனில் அது செயல்படாது.')] },
  ] as WgBlock[],
  ctaWork: L('SEE OUR WORK', 'எங்கள் பணிகளைப் பாருங்கள்'),
  ctaIndex: L('EXPLORE THE SPECIES INDEX', 'உயிரினப் பட்டியலைப் பாருங்கள்'),
  note: L('Figures above are drawn from the Western Ghats’ UNESCO World Heritage Site listing and standard geological and biogeographic sources on the range; a small number of commonly-cited figures (exact length, precise age) could not be cross-checked against a primary source in this pass and are presented as widely-reported approximations rather than exact values.',
    'மேலுள்ள எண்கள், மேற்குத் தொடர்ச்சி மலைகளின் யுனெஸ்கோ உலகப் பாரம்பரியப் பட்டியலிலிருந்தும், இம்மலைத்தொடர் குறித்த தரப்படுத்தப்பட்ட புவியியல் மற்றும் உயிர்ப் புவியியல் மூலங்களிலிருந்தும் எடுக்கப்பட்டவை. பரவலாக மேற்கோள் காட்டப்படும் சில எண்கள் (சரியான நீளம், துல்லியமான வயது) இந்தச் சுற்றில் முதன்மை மூலத்துடன் சரிபார்க்கப்படவில்லை; அவை துல்லியமான மதிப்புகளாக அல்லாமல், பரவலாகப் பதிவான தோராய மதிப்புகளாகவே தரப்படுகின்றன.'),
};
