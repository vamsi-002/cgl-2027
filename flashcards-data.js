// Exhaustive High-Yield Pocket Revision Codex & Flashcards
// Tailored for Vamsi: Blackbook (Vocab/Idioms/OWS), Maths King (Formulas), Parmar GK (Polity, History, Static GK, Science)

const DEFAULT_FLASHCARDS = [
  {
    "id": "ows-1",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who hates mankind",
    "back": "Misanthrope (मानवद्वेषी)\n• Root: 'Misein' (to hate) + 'Anthropos' (human).\n• Opposite: Philanthropist (one who loves mankind).\n• Repeated 12+ times in SSC CGL.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-2",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who knows or speaks many languages",
    "back": "Polyglot / Multilingual (बहुभाषाविद्)\n• Root: 'Poly' (many) + 'Glotta' (tongue/language).\n• Related: Linguist (study of languages).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-3",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "That which cannot be corrected or reformed",
    "back": "Incorrigible (असंशोधनीय, जिसे सुधारा न जा सके)\n• Example: An incorrigible habitual gambler.\n• Opposite: Corrigible.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-4",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who walks in sleep",
    "back": "Somnambulist (नींद में चलने वाला)\n• Root: 'Somnus' (sleep) + 'Ambulare' (to walk).\n• One who talks in sleep: Somniloquist.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-5",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who is very particular and hard to please",
    "back": "Fastidious / Meticulous (तुनकमिज़ाज, जिसे खुश करना कठिन हो)\n• Synonyms: Dainty, Fussy, Finicky, Demanding.\n• Repeated 15+ times in SSC CGL Tier 1 & 2.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-6",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who is incapable of making mistakes or being wrong",
    "back": "Infallible (अचूक, जो कभी गलती न करे)\n• Root: 'In-' (not) + 'Fallible' (liable to err).\n• Example: Even seasoned scientists are not infallible.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-7",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "An extreme or irrational fear of confined or small spaces",
    "back": "Claustrophobia (संकुचित स्थान से भय)\n• Fear of open spaces: Agoraphobia.\n• Fear of heights: Acrophobia.\n• Fear of water: Hydrophobia.\n• Fear of spiders: Arachnophobia.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-8",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who believes in the abolition of all government and law",
    "back": "Anarchist (अराजकतावादी)\n• Anarchy = Total absence of government or political authority.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-9",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A person who does not believe in the existence of God",
    "back": "Atheist (नास्तिक)\n• Believes in God: Theist (आस्तिक).\n• Doubts existence of God: Agnostic (अज्ञेयवादी).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-10",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A universal remedy for all diseases or problems",
    "back": "Panacea (रामबाण औषधि)\n• Root: 'Pan' (all) + 'Akos' (cure).\n• Synonyms: Elixir, Cure-all, Nostrum.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-11",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who eats human flesh",
    "back": "Cannibal (नरभक्षी)\n• Plant eater: Herbivore.\n• Meat eater: Carnivore.\n• Both plants & meat: Omnivore.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-12",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A speech or performance delivered without prior preparation",
    "back": "Extempore / Impromptu (बिना पूर्व तैयारी के दिया गया भाषण)\n• Synonyms: Unrehearsed, Offhand, Spontaneous.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-13",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "Lasting for a very short or transient period of time",
    "back": "Ephemeral / Transient / Fleeting (क्षणिक, अल्पकालिक)\n• Root: 'Ephemeros' (daily, lasting only a day).\n• Opposite: Eternal, Perpetual, Permanent.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-14",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who selflessly cares for and helps others",
    "back": "Altruist (परोपकारी)\n• Root: 'Alter' (other).\n• Opposite: Egoist (self-centered person).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-15",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "Animals or people that fond of company; sociable / living in flocks",
    "back": "Gregarious (झुंड में रहने वाला / मिलनसार)\n• Root: 'Grex' (flock or herd).\n• Opposite: Reclusive, Solitary, Introverted.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-16",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "One who knows everything / present everywhere / all-powerful",
    "back": "Omni Triad:\n• Omniscient = All-knowing (सर्वज्ञ)\n• Omnipresent / Ubiquitous = Everywhere (सर्वव्यापी)\n• Omnipotent = All-powerful (सर्वशक्तिमान)",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-17",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A person who endures pain or hardship without showing feelings or complaining",
    "back": "Stoic (उदासीन / सुख-दुःख में एक समान रहने वाला)\n• Philosophy: Stoicism.\n• Adjective: Stoical (resigned, uncomplaining).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-18",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A person who dabbles in an art or field without serious commitment",
    "back": "Dilettante / Amateur (शौकीन, जो किसी कला को ऊपरी तौर पर अपनाए)\n• Opposite: Professional, Connoisseur, Virtuoso.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-19",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "An expert judge in matters of taste, art, food, or wine",
    "back": "Connoisseur (पारखी / कला मर्मज्ञ)\n• French origin: 'Connaître' (to know).\n• Spelling frequently asked in SSC CGL Error Detection!",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-20",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A recurrent urge to steal without financial need",
    "back": "Kleptomania (चोरी करने की अदम्य बीमारी)\n• Person: Kleptomaniac.\n• Root: 'Klepto' (thief) + 'Mania' (compulsion/madness).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-21",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A place where weapons and ammunition are stored",
    "back": "Arsenal (शस्त्रागार)\n• Place where dead bodies are kept before autopsy: Mortuary / Morgue.\n• Place where beehives are kept: Apiary.\n• Place where birds are kept: Aviary.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "ows-22",
    "deck": "blackbook_ows",
    "category": "One Word Substitution",
    "front": "A child born after father's death / book published after author's death / award given after death",
    "back": "Posthumous (मरणोपरांत)\n• Root: Latin 'Postumus' (coming after).\n• Example: Lal Bahadur Shastri received Bharat Ratna posthumously in 1966.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-1",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Once in a blue moon",
    "back": "Meaning: Very rarely; almost never (कभी-कभार, ईद का चाँद).\n• Example: He visits his native village once in a blue moon.\n• Repeated 18+ times in SSC exams.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-2",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Burn the midnight oil",
    "back": "Meaning: To work or study late into the night (देर रात तक कड़ी मेहनत करना).\n• Origin: Using oil lamps to read after sunset.\n• Perfect for CGL working aspirants!",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-3",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Bite the bullet",
    "back": "Meaning: To face a difficult or unpleasant situation with courage (कठिन परिस्थिति का साहसपूर्वक सामना करना).\n• Origin: Soldiers biting bullets during surgery without anesthesia.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-4",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Apple of discord / Bone of contention",
    "back": "Meaning: A cause of quarrel or dispute (झगड़े की जड़ / फसाद का कारण).\n• Example: Ancestral property was the apple of discord between the two brothers.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-5",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "At the eleventh hour",
    "back": "Meaning: At the very last moment just before a deadline (अंतिम क्षण में).\n• Example: He submitted his SSC application form at the eleventh hour.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-6",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Break the ice",
    "back": "Meaning: To initiate conversation in an awkward or silent atmosphere (बातचीत शुरू करना / चुप्पी तोड़ना).\n• Example: The manager cracked a joke to break the ice during the meeting.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-7",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Beat around the bush",
    "back": "Meaning: To avoid the main point and talk vaguely (घुमा-फिराकर बात करना).\n• Opposite: Come straight to the point / Call a spade a spade.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-8",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "At daggers drawn",
    "back": "Meaning: In a state of intense hostility or enmity (कट्टर दुश्मनी होना).\n• Example: The two political factions have been at daggers drawn for decades.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-9",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "A bolt from the blue",
    "back": "Meaning: A sudden, unexpected disaster or shock (अचानक आई मुसीबत / वज्रपात).\n• Example: The news of the factory shutdown came as a bolt from the blue.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-10",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Cry over spilt milk",
    "back": "Meaning: To complain or regret about something in the past that cannot be changed (बीती बात पर पछताना).\n• Proverb: It is no use crying over spilt milk.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-11",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Spill the beans",
    "back": "Meaning: To disclose a secret prematurely or indiscreetly (रहस्य उजागर करना / भेद खोलना).\n• Similar: Let the cat out of the bag.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-12",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Through thick and thin",
    "back": "Meaning: Under all circumstances, no matter how difficult (हर सुख-दुःख में / हर परिस्थिति में).\n• Example: A true friend stays by your side through thick and thin.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-13",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Turn a deaf ear to",
    "back": "Meaning: To deliberately ignore or refuse to listen (अनसुना कर देना / ध्यान न देना).\n• Example: The corrupt officer turned a deaf ear to their complaints.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-14",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Leave no stone unturned",
    "back": "Meaning: To make every possible effort to achieve a goal (कोई कसर न छोड़ना / हर संभव प्रयास करना).\n• Perfect motto for SSC CGL 2027 preparation!",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-15",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Gift of the gab",
    "back": "Meaning: Talent for speaking fluently and persuasively (भाषण कला में निपुणता / वाकपटुता).\n• Example: Top lawyers always possess the gift of the gab.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-16",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "A snake in the grass",
    "back": "Meaning: A treacherous, hidden enemy who pretends to be a friend (आस्तीन का सांप / कपटी मित्र).\n• Example: Don't share sensitive office gossip with him; he is a snake in the grass.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-17",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Cost an arm and a leg",
    "back": "Meaning: Very expensive / exorbitant (बहुत अधिक महंगा होना).\n• Example: Buying a flat in Mumbai costs an arm and a leg.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-18",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Feather one's own nest",
    "back": "Meaning: To make money improperly using one's position (अपने स्वार्थ के लिए पद का दुरुपयोग करना / अपना घर भरना).\n• High frequency in Tier 2 comprehension passages.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-19",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "By fits and starts",
    "back": "Meaning: Irregularly; spasmodically (रुक-रुक कर / अनियमित रूप से).\n• Example: If you prepare for CGL by fits and starts, you will lose consistency.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "idm-20",
    "deck": "blackbook_idioms",
    "category": "Idioms & Phrases",
    "front": "Read between the lines",
    "back": "Meaning: To understand the hidden or implicit meaning behind words (छिपा हुआ अर्थ समझना).\n• Example: Reading between the lines of the notification revealed new exam rules.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-1",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "DILIGENT / ASSIDUOUS",
    "back": "Meaning: Hardworking, showing care and effort (मेहनती, परिश्रमी).\n• Synonyms: Sedulous, Industrious, Meticulous, Untiring.\n• Antonyms: Indolent, Lethargic, Lazy, Slothful.\n• Memory trick: A diligent agent never yields.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-2",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "CANDID / FRANK",
    "back": "Meaning: Truthful, straightforward, outspoken (स्पष्टवादी, निष्कपट).\n• Synonyms: Forthright, Sincere, Unreserved, Honest.\n• Antonyms: Deceitful, Evasive, Disingenuous, Artful.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-3",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "MITIGATE / ALLEVIATE",
    "back": "Meaning: To make something less severe, painful, or serious (कम करना, शांत करना).\n• Synonyms: Assuage, Palliate, Moderate, Mollify, Lessen.\n• Antonyms: Aggravate, Exacerbate, Intensify, Worsen.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-4",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "OPULENT / AFFLUENT",
    "back": "Meaning: Extremely wealthy, lavish, luxurious (धनी, समृद्ध, आलीशान).\n• Synonyms: Prosperous, Sumptuous, Luxurious, Well-heeled.\n• Antonyms: Destitute, Impoverished, Indigent, Penurious.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-5",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "PRAGMATIC / PRUDENT",
    "back": "Meaning: Dealing with things sensibly and realistically (व्यवहारिक, यथार्थवादी).\n• Synonyms: Realistic, Practical, Rational, Hardheaded.\n• Antonyms: Quixotic, Idealistic, Impractical, Visionary.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-6",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "ZENITH / APEX",
    "back": "Meaning: The highest point or culmination (शीर्ष बिंदु, पराकाष्ठा).\n• Synonyms: Pinnacle, Summit, Acme, Vertex, Crest.\n• Antonyms: Nadir (पाताल / निम्नतम बिंदु), Base, Bottom.\n• SSC favourite: Zenith vs Nadir.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-7",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "SUPERFLUOUS / REDUNDANT",
    "back": "Meaning: Unnecessary, more than what is needed (अनावश्यक, ज़रूरत से ज़्यादा).\n• Synonyms: Surplus, Excess, Gratuitous, Non-essential.\n• Antonyms: Indispensable, Essential, Vital, Requisite.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-8",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "VORACIOUS / RAVENOUS",
    "back": "Meaning: Having an insatiable appetite for food or knowledge (भूखा, लालची, पेटू).\n• Synonyms: Gluttonous, Insatiable, Greedy, Rapacious.\n• Antonyms: Satiated, Full, Quenched, Moderate.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-9",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "LUCID / ARTICULATE",
    "back": "Meaning: Clearly expressed and easy to understand (स्पष्ट, बोधगम्य).\n• Synonyms: Cogent, Intelligible, Transparent, Coherent.\n• Antonyms: Ambiguous, Obscure, Vague, Convoluted.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-10",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "BENEVOLENT / MAGNANIMOUS",
    "back": "Meaning: Well-meaning, kind, charitable, generous (दयालु, परोपकारी).\n• Synonyms: Altruistic, Munificent, Generous, Humane.\n• Antonyms: Malevolent, Spiteful, Malicious, Vindictive.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-11",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "RETICENT / TACITURN",
    "back": "Meaning: Not revealing one's thoughts readily; quiet (अल्पभाषी, कम बोलने वाला).\n• Synonyms: Reserved, Introverted, Silent, Uncommunicative.\n• Antonyms: Garrulous, Loquacious, Talkative, Voluble.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-12",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "PLACATE / APPEASE",
    "back": "Meaning: To pacify or calm someone's anger (शांत करना, मनाना).\n• Synonyms: Conciliate, Mollify, Propitiate, Soothe.\n• Antonyms: Enrage, Provoke, Incense, Agitate.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-13",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "PERILOUS / HAZARDOUS",
    "back": "Meaning: Full of danger or risk (खतरनाक, जोखिम भरा).\n• Synonyms: Precarious, Dangerous, Risky, Treacherous.\n• Antonyms: Secure, Safe, Harmless, Protected.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "voc-14",
    "deck": "blackbook_vocab",
    "category": "Synonyms & Antonyms",
    "front": "TENACIOUS / RESILIENT",
    "back": "Meaning: Holding firmly to purpose; not giving up easily (दृढ़, अडिग).\n• Synonyms: Persistent, Determined, Dogged, Steadfast.\n• Antonyms: Irresolute, Vacillating, Yielding, Weak.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-1",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "5 Constitutional Writs & Article 32 vs Article 226",
    "back": "Supreme Court: Art 32 (Fundamental Right itself - Basic Structure).\nHigh Court: Art 226 (Wider jurisdiction: FR + other legal rights).\n\n1. Habeas Corpus: 'To have the body of' (Unlawful detention).\n2. Mandamus: 'We Command' (Public official non-performance).\n3. Prohibition: 'To forbid' (Lower court exceeding jurisdiction - preventive).\n4. Certiorari: 'To be certified' (Quashing lower court orders - curative).\n5. Quo-Warranto: 'By what authority' (Illegal usurpation of public office).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-2",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "12 Schedules of Indian Constitution (Mnemonic)",
    "back": "Mnemonic: 'TEARS OF OLD PM'\n• T - Territories & States (Sch 1)\n• E - Emoluments / Salaries (Sch 2)\n• A - Affirmations / Oaths (Sch 3)\n• R - Rajya Sabha Seat Allocation (Sch 4)\n• S - Scheduled Areas (Sch 5)\n• O - Other Tribal Areas (Assam, Meghalaya, Tripura, Mizoram) (Sch 6)\n• F - Federal Lists (Union 100, State 61, Concurrent 52) (Sch 7)\n• O - Official Languages (22 languages) (Sch 8)\n• L - Land Reforms (1st Amendment 1951) (Sch 9)\n• D - Defection Anti-Defection Law (52nd Amend 1985) (Sch 10)\n• P - Panchayats (73rd Amend, 29 matters) (Sch 11)\n• M - Municipalities (74th Amend, 18 matters) (Sch 12)",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-3",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "42nd Constitutional Amendment Act 1976 ('Mini Constitution')",
    "back": "Key Changes:\n1. Preamble: Added 3 words: 'Socialist', 'Secular', 'Integrity'.\n2. Fundamental Duties: Added Part IV-A & Article 51A (Swaran Singh Committee - 10 duties originally, 11th added by 86th Amend).\n3. DPSP: Added Art 39A (Free Legal Aid), Art 43A (Workers' participation in management), Art 48A (Protection of environment).\n4. Shifted 5 subjects from State List to Concurrent List: Education, Forests, Weights & Measures, Protection of wild animals/birds, Administration of justice.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-4",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "Fundamental Rights Breakdown (Articles 14 to 32)",
    "back": "Part III (Articles 12-35) - 'Magna Carta of India':\n• Right to Equality: Articles 14–18 (14: Equality before law; 15: No discrimination; 16: Public employment; 17: Abolition of Untouchability; 18: Abolition of Titles).\n• Right to Freedom: Articles 19–22 (19: 6 freedoms; 20: Protection in conviction; 21: Life & Personal Liberty; 21A: Free education 6-14 yrs).\n• Right against Exploitation: Articles 23–24 (23: Human trafficking; 24: Child labour under 14).\n• Freedom of Religion: Articles 25–28.\n• Cultural & Educational: Articles 29–30.\n• Constitutional Remedies: Article 32.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-5",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "High-Yield DPSP Articles (Part IV: Articles 36–51)",
    "back": "• Art 39A: Equal justice and free legal aid.\n• Art 40: Organization of Village Panchayats (Gandhian).\n• Art 44: Uniform Civil Code (UCC) for citizens.\n• Art 45: Early childhood care and education below age 6.\n• Art 48: Agriculture & animal husbandry / ban on cow slaughter.\n• Art 48A: Protection of environment, forests, wildlife.\n• Art 50: Separation of Judiciary from Executive.\n• Art 51: Promotion of international peace and security.\n• Note: DPSPs are non-justiciable (Article 37).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-6",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "President of India: Core Constitutional Articles",
    "back": "• Art 52: There shall be a President of India.\n• Art 54: Electoral College (Elected MPs + Elected MLAs + Delhi/Puducherry MLAs).\n• Art 61: Impeachment procedure (Quorum: 2/3rd majority of total membership; initiated in either house).\n• Art 72: Pardoning power (Pardon, Commutation, Remission, Respite, Reprieve; includes court-martial & death sentences).\n• Art 123: Power to promulgate Ordinances during parliamentary recess.\n• Art 143: Advisory jurisdiction of Supreme Court.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-7",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "Parliamentary Procedures & Key Articles (108, 110, 112)",
    "back": "• Art 108: Joint Sitting of both Houses (Summoned by President, Presided over by Lok Sabha Speaker).\n• Art 110: Money Bill (Speaker decides; Rajya Sabha can delay max 14 days; no joint sitting allowed).\n• Art 112: Annual Financial Statement ('Budget' word NOT in Constitution).\n• Quorum: 1/10th of total strength of the House.\n• Sessions: Gap cannot exceed 6 months (Min 2 sessions per year).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-8",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "Emergency Provisions (Articles 352, 356, 360)",
    "back": "Part XVIII (borrowed from Weimar Germany / 1935 Act):\n• Art 352: National Emergency (War, External Aggression, Armed Rebellion; Fundamental Rights suspended EXCEPT Art 20 & 21).\n• Art 356: President's Rule / State Emergency (Breakdown of constitutional machinery in State; max 3 years).\n• Art 360: Financial Emergency (Never declared so far in India!).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-9",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "Major Constitutional Bodies & Their Articles",
    "back": "• Attorney General of India: Article 76 (Highest law officer; right to speak in Parliament without voting right).\n• Comptroller & Auditor General (CAG): Article 148 (Guardian of public purse).\n• Finance Commission: Article 280 (Appointed by President every 5 years).\n• Election Commission of India: Article 324.\n• Union Public Service Commission (UPSC): Article 315.\n• Special Officer for Linguistic Minorities: Article 350B.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-10",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "Sources of the Indian Constitution",
    "back": "• UK: Parliamentary government, Rule of law, Single citizenship, Writs.\n• USA: Fundamental Rights, Judicial Review, Preamble, Impeachment of President.\n• Ireland: Directive Principles (DPSP), Nomination of members to Rajya Sabha.\n• Australia: Concurrent list, Joint sitting (Art 108), Freedom of trade/commerce.\n• Germany (Weimar): Suspension of Fundamental Rights during Emergency.\n• South Africa: Amendment procedure (Art 368), Election of Rajya Sabha members.\n• USSR (Russia): Fundamental Duties (Art 51A), Ideals of Justice in Preamble.\n• Canada: Federation with strong Centre, Residuary powers to Centre.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "pol-11",
    "deck": "parmar_polity",
    "category": "Indian Polity",
    "front": "Important Constitutional Amendments (Quick Checklist)",
    "back": "• 1st (1951): Added 9th Schedule (Land reforms).\n• 7th (1956): Reorganization of States on linguistic basis (Fazal Ali Commission).\n• 44th (1978): Removed Right to Property from FR, made it legal right under Art 300A; Art 20 & 21 cannot be suspended during emergency.\n• 61st (1989): Reduced voting age from 21 to 18 years.\n• 73rd & 74th (1992): Constitutional status to Panchayats & Municipalities.\n• 86th (2002): Added Art 21A (Right to Education) & 11th Fundamental Duty.\n• 101st (2016): Introduced GST.\n• 103rd (2019): 10% EWS reservation.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "his-1",
    "deck": "parmar_history",
    "category": "Modern History",
    "front": "Revolt of 1857: Major Centers & Leaders",
    "back": "• Delhi: General Bakht Khan (nominal leader: Bahadur Shah Zafar)\n• Kanpur: Nana Saheb (Dhondu Pant) & Tatya Tope (Ramchandra Pandurang)\n• Lucknow: Begum Hazrat Mahal (son: Birjis Qadir)\n• Jhansi: Rani Lakshmibai (died at Gwalior)\n• Bihar (Jagdishpur): Kunwar Singh & Amar Singh\n• Faizabad: Maulvi Ahmadullah (British placed ₹50,000 bounty)\n• Bareilly: Khan Bahadur Khan\n• Allahabad: Liyaqat Ali\n• Viceroy during revolt: Lord Canning.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "his-2",
    "deck": "parmar_history",
    "category": "Modern History",
    "front": "10 Crucial Indian National Congress (INC) Sessions",
    "back": "• 1885 Bombay: W.C. Bonnerjee (1st session, 72 delegates, Gokuldas Tejpal College)\n• 1896 Calcutta: Rahimtullah Sayani ('Vande Mataram' sung for 1st time)\n• 1906 Calcutta: Dadabhai Naoroji (Declared 'Swaraj' as goal)\n• 1907 Surat: Rash Behari Ghosh (Surat Split: Moderates vs Extremists)\n• 1911 Calcutta: Bishan Narayan Dhar ('Jana Gana Mana' sung for 1st time)\n• 1916 Lucknow: A.C. Majumdar (Lucknow Pact: INC & Muslim League united; Moderates & Extremists reunited)\n• 1917 Calcutta: Annie Besant (1st woman President)\n• 1924 Belgaum: Mahatma Gandhi (ONLY session Gandhi presided over)\n• 1925 Kanpur: Sarojini Naidu (1st Indian woman President)\n• 1929 Lahore: Jawaharlal Nehru ('Purna Swaraj' resolution; Tricolour hoisted on Ravi bank)",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "his-3",
    "deck": "parmar_history",
    "category": "Modern History",
    "front": "Gandhian Movements Timeline (1915 to 1942)",
    "back": "• Return from South Africa: 9 Jan 1915 (Pravasi Bharatiya Divas).\n• Champaran Satyagraha (1917): Bihar (Tinkathia 3/20 system of Indigo - 1st Civil Disobedience).\n• Ahmedabad Mill Strike (1918): 1st Hunger strike (Plague bonus 35%).\n• Kheda Satyagraha (1918): 1st Non-Cooperation.\n• Rowlatt Satyagraha & Jallianwala Bagh: 13 April 1919 (General Dyer).\n• Non-Cooperation Movement (1920-22): Called off after Chauri Chaura incident (4 Feb 1922).\n• Dandi March / Civil Disobedience (1930): 12 March to 6 April (Sabarmati to Dandi, 240 miles, 78 followers).\n• Gandhi-Irwin Pact (March 1931) & 2nd Round Table Conference.\n• Poona Pact (1932): Gandhi & B.R. Ambedkar (Depressed class seats in general electorate).\n• Quit India Movement (8 Aug 1942): 'Do or Die' slogan at Gowalia Tank, Bombay.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "his-4",
    "deck": "parmar_history",
    "category": "Modern History",
    "front": "Socio-Religious Reform Movements & Founders",
    "back": "• Brahmo Samaj (1828): Raja Ram Mohan Roy (Father of Indian Renaissance; Atmiya Sabha 1814; Abolition of Sati 1829 with Bentinck).\n• Arya Samaj (1875): Swami Dayanand Saraswati (Slogan: 'Go Back to Vedas'; Book: 'Satyarth Prakash').\n• Ramakrishna Mission (1897): Swami Vivekananda (Chicago Parliament of Religions 1893).\n• Satyashodhak Samaj (1873): Jyotirao Phule (Book: 'Gulamgiri'; upliftment of lower castes & women).\n• Prarthana Samaj (1867): Atmaram Pandurang & M.G. Ranade (Bombay).\n• Theosophical Society: H.P. Blavatsky & H.S. Olcott (Adyar HQ, Annie Besant joined 1893).\n• Young Bengal Movement: Henry Louis Vivian Derozio.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "his-5",
    "deck": "parmar_history",
    "category": "Modern History",
    "front": "Key British Governor-Generals & Viceroys",
    "back": "• Warren Hastings (1773-85): 1st Governor-General of Bengal; Regulating Act 1773; Asiatic Society with William Jones (1784).\n• Lord Cornwallis (1786-93): Permanent Settlement (Zamindari) in Bengal 1793; Father of Civil Services in India.\n• Lord Wellesley (1798-1805): Subsidiary Alliance (1st state: Hyderabad 1798).\n• Lord William Bentinck (1828-35): 1st Governor-General of India; Sati abolished (Regulation XVII, 1829); English Education Act 1835 (Macaulay Minute).\n• Lord Dalhousie (1848-56): Doctrine of Lapse (Satara 1st in 1848, Jhansi 1853, Awadh on maladministration 1856); 1st Railway line 1853 (Bombay to Thane); Telegraph; Wood's Despatch (1854).\n• Lord Canning (1856-62): Last Governor-General & 1st Viceroy of India; Revolt of 1857; GOI Act 1858.\n• Lord Ripon (1880-84): Father of Local Self-Government; 1st regular Census (1881); Repealed Vernacular Press Act; Ilbert Bill controversy.\n• Lord Curzon (1899-1905): Partition of Bengal (1905).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "his-6",
    "deck": "parmar_history",
    "category": "Modern History",
    "front": "Revolutionary Organizations & Milestones",
    "back": "• Ghadar Party (1913): San Francisco, USA (Lala Har Dayal, Sohan Singh Bhakna).\n• Hindustan Republican Association (HRA, 1924): Kanpur (Ram Prasad Bismil, Sachindra Sanyal, Ashfaqulla Khan).\n• Kakori Train Action (9 Aug 1925): Bismil, Ashfaqulla, Roshan Singh, Rajendra Lahiri hanged.\n• HSRA (Hindustan Socialist Republican Association, 1928): Feroz Shah Kotla, Delhi (Bhagat Singh, Chandrashekhar Azad).\n• Saunders Assassination (1928): Revenge for Lala Lajpat Rai's death during Simon Commission protest.\n• Central Assembly Bombing (8 April 1929): Bhagat Singh & Batukeshwar Dutt ('To make the deaf hear').\n• Chittagong Armoury Raid (1930): Surya Sen ('Masterda').",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "stk-1",
    "deck": "parmar_static",
    "category": "Static GK & Culture",
    "front": "8 Classical Dances of India & States (Sangeet Natak Akademi)",
    "back": "1. Bharatnatyam: Tamil Nadu (Oldest; E. Krishna Iyer, Rukmini Devi Arundale).\n2. Kathak: Uttar Pradesh / North India (Birju Maharaj, Sitara Devi, Lachhu Maharaj).\n3. Kathakali: Kerala (Masked facial expressions, green/red makeup).\n4. Mohiniyattam: Kerala (Solo female dance, white & gold Kasavu saree, Sunanda Nair).\n5. Odissi: Odisha (Tribhanga posture, Kelucharan Mohapatra, Sonal Mansingh).\n6. Kuchipudi: Andhra Pradesh (Brass plate / Tarangam dance, Yamini Krishnamurthy, Raja-Radha Reddy).\n7. Manipuri: Manipur (Raasleela, Jagoi, Guru Bipin Singh, Jhaveri Sisters).\n8. Sattriya: Assam (Founded by Bhakti saint Srimanta Sankaradeva in 15th century).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "stk-2",
    "deck": "parmar_static",
    "category": "Static GK & Culture",
    "front": "Famous Musical Instruments & Their Virtuosos",
    "back": "• Shehnai: Ustad Bismillah Khan (Bharat Ratna 2001).\n• Bansuri (Flute): Pandit Hariprasad Chaurasia, Ronu Majumdar.\n• Santoor: Pandit Shivkumar Sharma, Bhajan Sopori (100-string instrument, Kashmir).\n• Tabla: Ustad Zakir Hussain, Ustad Allah Rakha, Pandit Kishan Maharaj.\n• Sitar: Pandit Ravi Shankar (Bharat Ratna 1999), Vilayat Khan, Nikhil Banerjee.\n• Sarod: Ustad Amjad Ali Khan, Ali Akbar Khan.\n• Veena: S. Balachander, Asad Ali Khan (Rudra Veena).\n• Violin: L. Subramaniam, M.S. Gopalakrishnan.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "stk-3",
    "deck": "parmar_static",
    "category": "Static GK & Culture",
    "front": "Must-Know North-East & State Cultural Festivals",
    "back": "• Hornbill Festival: Nagaland (1-10 Dec, 'Festival of Festivals' at Kisama village).\n• Losar Festival: Ladakh / Arunachal Pradesh (Tibetan New Year).\n• Chapchar Kut: Mizoram (Spring festival after Jhum clearance).\n• Bihu: Assam (Rongali/Bohag in April, Kongali/Kati in Oct, Bhogali/Magh in Jan).\n• Wangala: Meghalaya (100 Drums harvest festival of Garo tribe).\n• Hemis Festival: Ladakh (Celebrates Guru Padmasambhava at Hemis Monastery).\n• Bathukamma: Telangana (Floral festival of goddess Gauri).\n• Ambubachi Mela: Assam (Kamakhya Temple, Guwahati).\n• Pushkar Camel Fair: Rajasthan (Kartik Purnima).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "stk-4",
    "deck": "parmar_static",
    "category": "Static GK & Culture",
    "front": "Census 2011 Essential Statistical Facts",
    "back": "• Total Literacy Rate: 74.04% (Male: 82.14%, Female: 65.46% -> Gap: 16.68%).\n• Highest Literacy: Kerala (94.0%) | Lowest: Bihar (61.8%).\n• Sex Ratio (Females per 1000 males): 943 (Child Sex Ratio 0-6 yrs: 919).\n• Highest Sex Ratio: Kerala (1084) | Lowest: Haryana (879).\n• Population Density: 382 per sq km.\n• Highest Density State: Bihar (1106) | Lowest Density State: Arunachal Pradesh (17).\n• Most Populated State: Uttar Pradesh (~20 crore) | Least Populated: Sikkim (~6.1 lakh).\n• Highest Decadal Growth: Meghalaya (27.95%) | Negative Growth: Nagaland (-0.58%).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "stk-5",
    "deck": "parmar_static",
    "category": "Static GK & Culture",
    "front": "Major Himalayan Mountain Passes",
    "back": "• Ladakh / J&K:\n  - Zoji La: Connects Srinagar with Kargil & Leh.\n  - Banihal Pass: Jawahar Tunnel (connects Jammu & Srinagar).\n  - Khardung La: Gateway to Shyok and Nubra valleys.\n• Himachal Pradesh:\n  - Rohtang Pass: Connects Kullu with Lahaul & Spiti (Atal Tunnel).\n  - Shipki La: Sutlej river enters India through Shipki La from Tibet.\n  - Bara Lacha La: Connects Mandi with Leh.\n• Uttarakhand:\n  - Lipulekh, Mana Pass, Niti Pass: Pilgrimage route to Kailash Mansarovar.\n• Sikkim:\n  - Nathu La: Ancient Silk Route connecting Sikkim with Tibet/China.\n  - Jelep La: Connects Sikkim with Lhasa.\n• Arunachal Pradesh:\n  - Bomdi La: Connects Arunachal with Lhasa.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "stk-6",
    "deck": "parmar_static",
    "category": "Static GK & Culture",
    "front": "Major Indian River Systems & Peninsular Rivers",
    "back": "• West-Flowing Rivers (Drain into Arabian Sea, form Estuaries):\n  - Narmada: Originates at Amarkantak (MP), flows in rift valley between Vindhyas & Satpuras, Dhuandhar falls.\n  - Tapti (Tapi): Originates at Multai (Betul, MP).\n  - Sabarmati & Mahi (Mahi crosses Tropic of Cancer TWICE).\n• East-Flowing Peninsular Rivers (Drain into Bay of Bengal, form Deltas):\n  - Godavari: 'Dakshin Ganga' / 'Vridha Ganga', Longest peninsular river (1465 km), origin at Trimbakeshwar (Nashik).\n  - Krishna: Origin at Mahabaleshwar (Maharashtra), tributaries: Tungabhadra, Koyna, Bhima.\n  - Kaveri: Origin at Talakaveri (Brahmagiri hills, Karnataka), Shivanasamudra falls.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-1",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Vitamins: Chemical Names & Deficiency Diseases",
    "back": "Fat-Soluble (A, D, E, K) | Water-Soluble (B-complex, C):\n• Vitamin A (Retinol): Night Blindness (Nyctalopia), Xerophthalmia.\n• Vitamin B1 (Thiamine): Beriberi (affects nervous/cardio system).\n• Vitamin B2 (Riboflavin): Cheilosis (cracking of lips/mouth corners).\n• Vitamin B3 (Niacin): Pellagra (4D symptoms: Dermatitis, Diarrhea, Dementia, Death).\n• Vitamin B12 (Cyanocobalamin): Pernicious Anemia (contains Cobalt metal!).\n• Vitamin C (Ascorbic Acid): Scurvy (bleeding gums; destroyed on heating).\n• Vitamin D (Calciferol): Rickets in children, Osteomalacia in adults.\n• Vitamin E (Tocopherol): Infertility, muscular weakness (Beauty vitamin).\n• Vitamin K (Phylloquinone): Defective blood clotting (excessive bleeding).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-2",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Cell Organelles & Biological Nicknames",
    "back": "• Mitochondria: 'Powerhouse of the Cell' (Produces ATP via cellular respiration; has own circular DNA & ribosomes).\n• Lysosomes: 'Suicidal Bags' of the cell (Contain hydrolytic digestive enzymes; autolysis).\n• Ribosomes: 'Protein Factories' of the cell (Discovered by George Palade; smallest organelle; no membrane).\n• Endoplasmic Reticulum (ER): RER has ribosomes (protein synthesis), SER synthesizes lipids & detoxifies drugs.\n• Golgi Apparatus: 'Traffic Police' / packaging & dispatching unit (Camillo Golgi).\n• Chloroplast: 'Kitchen of the cell' (contains chlorophyll & thylakoids).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-3",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Human Blood System: Groups, Rh Factor & Values",
    "back": "• Discovered by: Karl Landsteiner (1900).\n• Universal Recipient: AB+ (has both A & B antigens, no antibodies).\n• Universal Donor: O- (has neither A nor B antigens, no Rh factor).\n• Normal Blood Pressure: 120/80 mmHg (measured by Sphygmomanometer).\n• Normal pH of Human Blood: 7.35 to 7.45 (slightly alkaline/basic).\n• RBC Lifespan: 120 days (graveyard of RBC: Spleen).\n• White Blood Cells (WBC): Leucocytes (defense/immunity).\n• Platelets (Thrombocytes): Blood clotting (helped by Vitamin K and Calcium).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-4",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Common Chemicals & Daily Chemical Formulas",
    "back": "• Baking Soda: Sodium Hydrogen Carbonate / Bicarbonate (NaHCO₃).\n• Washing Soda: Sodium Carbonate Decahydrate (Na₂CO₃·10H₂O).\n• Bleaching Powder: Calcium Oxychloride (CaOCl₂).\n• Plaster of Paris (POP): Calcium Sulphate Hemihydrate (CaSO₄·½H₂O).\n• Gypsum: Calcium Sulphate Dihydrate (CaSO₄·2H₂O) (POP forms Gypsum with water).\n• Quick Lime: Calcium Oxide (CaO).\n• Slaked Lime / Lime Water: Calcium Hydroxide [Ca(OH)₂].\n• Laughing Gas: Nitrous Oxide (N₂O).\n• Heavy Water: Deuterium Oxide (D₂O) (used as moderator in nuclear reactors).\n• Marble / Chalk: Calcium Carbonate (CaCO₃).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-5",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Important Metallic Ores for SSC CGL",
    "back": "• Aluminium: Bauxite [Al₂O₃·2H₂O], Cryolite [Na₃AlF₆].\n• Iron: Haematite [Fe₂O₃], Magnetite [Fe₃O₄] (highest iron content), Siderite.\n• Mercury: Cinnabar [HgS].\n• Lead: Galena [PbS].\n• Copper: Copper Pyrites [CuFeS₂], Malachite [CuCO₃·Cu(OH)₂].\n• Zinc: Zinc Blende / Sphalerite [ZnS], Calamine [ZnCO₃].\n• Uranium: Pitchblende [U₃O₈].\n• Thorium: Monazite sand (abundant in Kerala coast).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-6",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Physics: Optics & Total Internal Reflection (TIR)",
    "back": "Conditions for Total Internal Reflection (TIR):\n1. Light must travel from Denser medium to Rarer medium.\n2. Angle of incidence must exceed Critical Angle (i > c).\n\nApplications & Phenomena of TIR:\n• Sparkling of diamond.\n• Mirage in hot deserts.\n• Optical Fiber communication cables.\n• Endoscopy in medicine.\n• Shining of air bubbles in water.\n\nRainbow Formation: Dispersion + Refraction + Internal Reflection.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "sci-7",
    "deck": "parmar_science",
    "category": "General Science",
    "front": "Physics: SI Units & Gravitation Essentials",
    "back": "• Power of Lens: Dioptre (D = 1/f in meters).\n• Magnetic Flux: Weber (Wb) | Magnetic Field: Tesla (T).\n• Electric Resistance: Ohm (Ω) | Resistivity: Ohm-meter (Ω·m).\n• Luminous Intensity: Candela (cd).\n• Atmospheric Pressure: Pascal (Pa) or Bar.\n\nGravitation:\n• Acceleration due to gravity (g): 9.8 m/s².\n• 'g' is MAXIMUM at the Poles and MINIMUM at the Equator.\n• 'g' becomes ZERO at the Center of the Earth.\n• Escape Velocity of Earth: 11.2 km/s (Moon: 2.4 km/s - hence no atmosphere on Moon).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-1",
    "deck": "maths_king",
    "category": "Geometry",
    "front": "Geometry: Incenter, Orthocenter, Circumcenter Angles",
    "back": "In Triangle ABC:\n1. Incenter (I) [Angle Bisectors]:\n   ∠BIC = 90° + ∠A / 2\n\n2. Orthocenter (H) [Altitudes]:\n   ∠BHC = 180° - ∠A\n\n3. Circumcenter (O) [Perpendicular Bisectors]:\n   ∠BOC = 2 × ∠A\n\n4. Centroid (G) divides each median in ratio 2 : 1 (from vertex to base).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-2",
    "deck": "maths_king",
    "category": "Geometry",
    "front": "Geometry: Circle Chords, Tangents & Intersections",
    "back": "1. Two chords AB and CD intersect at P (inside or outside):\n   PA × PB = PC × PD\n\n2. Tangent PT and Secant PAB from external point P:\n   PT² = PA × PB\n\n3. Direct Common Tangent (DCT):\n   DCT = √(d² - (R - r)²)\n\n4. Transverse Common Tangent (TCT):\n   TCT = √(d² - (R + r)²)\n   (d = distance between centers).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-3",
    "deck": "maths_king",
    "category": "Mensuration",
    "front": "Mensuration 3D: Prism, Pyramid & Frustum",
    "back": "1. Right Prism:\n   • LSA = Perimeter of base × Height\n   • TSA = LSA + 2 × (Base Area)\n   • Volume = Base Area × Height\n\n2. Right Pyramid:\n   • LSA = ½ × Perimeter of base × Slant height (l)\n   • TSA = LSA + Base Area\n   • Volume = ⅓ × Base Area × Height (h)\n   • Relation: l² = h² + r² (r = inradius of base)\n\n3. Frustum of Cone:\n   • Volume = ⅓ π h (R² + r² + Rr)\n   • CSA = π (R + r) l  [l = √(h² + (R - r)²)]\n   • TSA = CSA + π(R² + r²)",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-4",
    "deck": "maths_king",
    "category": "Algebra",
    "front": "Algebra: Reciprocal Powers (x + 1/x = k)",
    "back": "Given x + 1/x = k:\n• x² + 1/x² = k² - 2\n• x³ + 1/x³ = k³ - 3k\n• x⁴ + 1/x⁴ = (k² - 2)² - 2\n• x⁵ + 1/x⁵ = (x² + 1/x²)(x³ + 1/x³) - (x + 1/x)\n• x⁶ + 1/x⁶ = (x³ + 1/x³)² - 2\n• x - 1/x = √(k² - 4)\n\nGiven x - 1/x = m:\n• x² + 1/x² = m² + 2\n• x³ - 1/x³ = m³ + 3m",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-5",
    "deck": "maths_king",
    "category": "Trigonometry",
    "front": "Trigonometry: Standard Triplets & Max/Min Formulas",
    "back": "1. a sinθ ± b cosθ:\n   • Max = +√(a² + b²)\n   • Min = -√(a² + b²)\n\n2. a sin²θ + b cosec²θ  (a ≥ b):\n   • Min = 2√(ab)\n\n3. a tan²θ + b cot²θ:\n   • Min = 2√(ab)\n\n4. sin^(2m)θ + cos^(2n)θ:\n   • Max = 1  |  Min = Put θ = 45°\n\nPythagorean Triplets:\n(3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17), (9, 40, 41), (11, 60, 61), (12, 35, 37), (20, 21, 29).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-6",
    "deck": "maths_king",
    "category": "Arithmetic",
    "front": "Time, Speed, Distance: Meeting Point & Stoppage",
    "back": "1. Two bodies start towards each other, meet, and reach their destinations in T₁ and T₂ hours:\n   Speed₁ / Speed₂ = √(T₂ / T₁)\n\n2. Train stoppage time per hour:\n   Minutes = [(Speed without stoppage - Speed with stoppage) / Speed without stoppage] × 60\n\n3. Average Speed for equal distance covered at x and y km/h:\n   Avg Speed = (2xy) / (x + y)",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-7",
    "deck": "maths_king",
    "category": "Arithmetic",
    "front": "Compound Interest: 2 & 3 Year Differences & Installments",
    "back": "1. Difference between CI and SI on Principal P at R%:\n   • For 2 Years: Diff₂ = P × (R / 100)²\n   • For 3 Years: Diff₃ = P × (R / 100)² × (3 + R / 100)\n   • Ratio: Diff₃ / Diff₂ = (300 + R) / 100\n\n2. Annual Installment in CI for 2 years:\n   P = x / (1 + R/100) + x / (1 + R/100)²\n   (Maths King Ratio method: Year 1 = 10➔11, Year 2 = 100➔121).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-8",
    "deck": "maths_king",
    "category": "Arithmetic",
    "front": "Time & Work: MDH Rule & Special (a+b) Shortcut",
    "back": "1. If A takes (x + a) days and B takes (x + b) days more than (A + B) working together:\n   Time taken by (A + B) together = x = √(a × b)\n\n2. MDH Formula:\n   (M₁ × D₁ × H₁ × E₁) / W₁ = (M₂ × D₂ × H₂ × E₂) / W₂\n\n3. Efficiency is inversely proportional to time taken (when work is constant).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-9",
    "deck": "maths_king",
    "category": "Arithmetic",
    "front": "Profit & Loss: Dishonest Dealer & MP/CP Ratio Shortcut",
    "back": "1. Relation between MP, CP, Profit% and Discount%:\n   MP / CP = (100 + Profit%) / (100 - Discount%)\n   (Direct shortcut used in 80% of CGL discount problems!)\n\n2. Dishonest Dealer using false weight:\n   Gain % = [(Error) / (True Value - Error)] × 100\n   Or: Gain % = [(Goods claimed - Goods actually given) / (Goods actually given)] × 100\n   Example: Sells at CP but gives 900g instead of 1000g:\n   Gain % = (100 / 900) × 100 = 11 1/9%.",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-10",
    "deck": "maths_king",
    "category": "Arithmetic",
    "front": "Mixture & Alligation: Repeated Removal & Replacement",
    "back": "If a vessel contains C units of pure liquid (e.g. Milk), and x units are drawn off and replaced with water n times:\n\nRemaining Pure Liquid = Initial Pure Liquid × [1 - (x / C)]ⁿ\n\nAlligation Rule for mixing two varieties at price C₁ and C₂ to get mean price Cₘ:\nQuantity₁ / Quantity₂ = (C₂ - Cₘ) / (Cₘ - C₁).",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-11",
    "deck": "maths_king",
    "category": "Number System",
    "front": "Number System: Divisibility Rules (7, 11, 13, 72, 88)",
    "back": "• 7 & 13: Group digits in sets of 3 from right to left. Alternate difference must be divisible by 7 or 13.\n• 11: (Sum of digits at odd places) - (Sum of digits at even places) = 0 or multiple of 11.\n• 72: Number must be divisible by both 8 (last 3 digits) and 9 (sum of digits).\n• 88: Number must be divisible by both 8 (last 3 digits) and 11.\n\n• Unit Digit Cyclicity of 4 for {2, 3, 7, 8}: Divide exponent by 4 and take remainder.\n• Trailing Zeroes in N!: Count factor 5:\n  Total Zeroes = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋ + ...",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  },
  {
    "id": "mth-12",
    "deck": "maths_king",
    "category": "Coordinate Geometry",
    "front": "Coordinate Geometry: Lines, Slopes & Perpendiculars",
    "back": "1. Distance between (x₁, y₁) and (x₂, y₂): d = √[(x₂ - x₁)² + (y₂ - y₁)²]\n2. Section Formula (Internal ratio m:n):\n   P = [(mx₂ + nx₁) / (m + n), (my₂ + ny₁) / (m + n)]\n3. Slope of line ax + by + c = 0: m = -a / b\n4. Two lines are Parallel if: m₁ = m₂\n5. Two lines are Perpendicular if: m₁ × m₂ = -1\n6. Perpendicular distance of (x₁, y₁) from line ax + by + c = 0:\n   d = |a x₁ + b y₁ + c| / √(a² + b²)",
    "interval": 1,
    "repetition": 0,
    "easeFactor": 2.5,
    "dueDate": "2026-10-09"
  }
];

// Searchable Maths King Formula Codex Data
const FORMULA_CODEX = [
  {
    "category": "Geometry",
    "title": "Apollonius Theorem (Median Calculation)",
    "keywords": "apollonius median triangle length sides",
    "formula": "AB² + AC² = 2(AD² + BD²)",
    "notes": "Applies to any triangle where AD is median to side BC. Bisects BC into BD = DC = BC/2."
  },
  {
    "category": "Geometry",
    "title": "Triangle Centers & Radii Formulas",
    "keywords": "inradius circumradius incircle circumcircle triangle right angle equilateral orthocenter incenter",
    "formula": "• Any Triangle: Inradius r = Δ / s (s = semiperimeter, Δ = Area)\n• Circumradius: R = (abc) / (4Δ)\n• Right Triangle: r = (P + B - H) / 2  |  R = H / 2\n• Equilateral: r = a / (2√3)  |  R = a / √3  (Ratio R : r = 2 : 1)\n• Angles: Incenter = 90° + A/2  |  Orthocenter = 180° - A  |  Circumcenter = 2A",
    "notes": "Repeated every year in SSC CGL Tier 1 & Tier 2."
  },
  {
    "category": "Geometry",
    "title": "Circles: Tangents, Chords & Secant Theorems",
    "keywords": "tangent secant chord circle pt pa pb direct common transverse",
    "formula": "• Secants intersecting at P: PA × PB = PC × PD\n• Tangent PT from exterior P: PT² = PA × PB\n• Direct Common Tangent (DCT) = √(d² - (R - r)²)\n• Transverse Common Tangent (TCT) = √(d² - (R + r)²)\n• Angle in semicircle = 90°\n• Opposite angles in cyclic quadrilateral sum to 180°.",
    "notes": "d is distance between circle centers."
  },
  {
    "category": "Geometry",
    "title": "Right Angled Triangle Projections (Altitude to Hypotenuse)",
    "keywords": "right triangle altitude hypotenuse projection p b h",
    "formula": "In ΔABC with ∠B = 90° and BD ⊥ AC (hypotenuse AC = b):\n1. BD = (AB × BC) / AC = (p × b) / h\n2. BD² = AD × DC\n3. AB² = AD × AC\n4. BC² = CD × AC\n5. 1/BD² = 1/AB² + 1/BC²",
    "notes": "Saves 2 minutes of trigonometric substitutions."
  },
  {
    "category": "Mensuration",
    "title": "Prism & Pyramid Fundamental Rules",
    "keywords": "prism pyramid volume tsa lsa slant height perimeter",
    "formula": "• Prism:\n  - LSA = Perimeter of Base × Height\n  - TSA = LSA + 2 × (Area of Base)\n  - Volume = Area of Base × Height\n\n• Pyramid:\n  - LSA = 1/2 × Perimeter of Base × Slant Height (l)\n  - TSA = LSA + Area of Base\n  - Volume = 1/3 × Area of Base × Height (h)\n  - Relation: l² = h² + r² (r = inradius of base)",
    "notes": "From Maths King by Nikhil Pratap Singh. Direct formula application in Tier 2."
  },
  {
    "category": "Mensuration",
    "title": "Cone, Frustum & Sphere Essentials",
    "keywords": "cone frustum sphere cylinder hemisphere volume area",
    "formula": "• Cone: LSA = πrl  |  TSA = πr(l + r)  |  Vol = 1/3 πr²h  (l² = r² + h²)\n• Frustum of Cone: Vol = 1/3 πh (R² + r² + Rr)  |  LSA = π(R + r)l\n• Sphere: Surface Area = 4πr²  |  Vol = 4/3 πr³\n• Hemisphere: CSA = 2πr²  |  TSA = 3πr²  |  Vol = 2/3 πr³",
    "notes": "Always check for divisibility by 11 in multiple choice options!"
  },
  {
    "category": "Mensuration",
    "title": "Quadrilaterals: Rhombus, Trapezium & Path Formulas",
    "keywords": "rhombus trapezium parallelogram path field area diagonals",
    "formula": "• Rhombus: Area = 1/2 (d₁ × d₂)  |  Side relation: 4a² = d₁² + d₂²\n• Trapezium: Area = 1/2 (Sum of parallel sides) × Height\n• Parallelogram: Area = Base × Height\n• Rectangular field of length L and breadth B with path of width x:\n  - Outer Path Area: 2x(L + B + 2x)\n  - Inner Path Area: 2x(L + B - 2x)\n  - Cross Path (Central) Area: x(L + B - x)",
    "notes": "Commonly asked in Tier 1 Mensuration."
  },
  {
    "category": "Algebra",
    "title": "Algebraic Symmetric Identities & Cubes",
    "keywords": "algebra x + 1/x a3 b3 c3 3abc identity reciprocal",
    "formula": "• If x + 1/x = k:\n  - x² + 1/x² = k² - 2\n  - x³ + 1/x³ = k³ - 3k\n  - x⁵ + 1/x⁵ = (x² + 1/x²)(x³ + 1/x³) - (x + 1/x)\n• If a + b + c = 0:\n  a³ + b³ + c³ = 3abc\n• a³ + b³ + c³ - 3abc = 1/2(a + b + c)[(a - b)² + (b - c)² + (c - a)²]\n• (a + b + c)² = a² + b² + c² + 2(ab + bc + ca)",
    "notes": "Maths King Page 89. High probability of 2-3 questions in Tier 1."
  },
  {
    "category": "Algebra",
    "title": "Quadratic Equations: Max/Min & Roots",
    "keywords": "quadratic equation roots alpha beta maximum minimum parabola",
    "formula": "For ax² + bx + c = 0:\n• Sum of roots: α + β = -b / a  |  Product of roots: α · β = c / a\n• Discriminant D = b² - 4ac (Real & distinct if D > 0, Equal if D = 0)\n• If a > 0: Minimum value occurs at x = -b / (2a) and is (4ac - b²) / (4a)\n• If a < 0: Maximum value occurs at x = -b / (2a) and is (4ac - b²) / (4a)",
    "notes": "Instant mental solution for Max/Min quadratic questions."
  },
  {
    "category": "Trigonometry",
    "title": "Standard Triplets & Max/Min Trigonometry",
    "keywords": "trigonometry max min maximum minimum sin cos tan triplet",
    "formula": "• a sinθ ± b cosθ: Max = +√(a² + b²)  |  Min = -√(a² + b²)\n• a sin²θ + b cosec²θ (a ≥ b): Min = 2√(ab)\n• a tan²θ + b cot²θ: Min = 2√(ab)\n• Common Pythagorean Triplets:\n  (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17), (9, 40, 41),\n  (11, 60, 61), (12, 35, 37), (16, 63, 65), (20, 21, 29), (28, 45, 53)",
    "notes": "Use triplets for 5-second mental solving without pencil!"
  },
  {
    "category": "Trigonometry",
    "title": "Height & Distance Standard Angle Ratios",
    "keywords": "height distance angle elevation depression 30 45 60 ladder tower",
    "formula": "In right-angled triangle with base and height:\n• 30° - 60° - 90° Triangle: Sides are in ratio 1 : √3 : 2\n  (Opposite to 30° is 1, opposite to 60° is √3, hypotenuse is 2)\n• 45° - 45° - 90° Triangle: Sides are in ratio 1 : 1 : √2\n• If angle of elevation changes from 30° to 60° while moving distance d:\n  Height H = d / (cot 30° - cot 60°) = d / (√3 - 1/√3) = (d√3) / 2",
    "notes": "Solves almost all tower/balloon distance problems without tan formulas."
  },
  {
    "category": "Arithmetic",
    "title": "Marked Price, Cost Price & Dishonest Dealer Shortcuts",
    "keywords": "profit loss marked price cost price discount dishonest dealer mp cp",
    "formula": "• Relation: MP / CP = (100 + P%) / (100 - D%)\n• Successive Discounts d₁ and d₂: Net Discount = d₁ + d₂ - (d₁ × d₂) / 100\n• If dealer claims to sell at Cost Price but uses false weight:\n  Gain % = [(True Weight - False Weight) / False Weight] × 100\n• If dealer marks up by x% and also gives y% less weight:\n  Net Multiplier = (1 + x/100) × (True Wt / False Wt)",
    "notes": "From Maths King Chapter 4 (Profit & Loss)."
  },
  {
    "category": "Arithmetic",
    "title": "Compound Interest: 2-Year & 3-Year Installments & Differences",
    "keywords": "compound interest ci installments loan borrowed annual difference",
    "formula": "• P = x / (1 + R/100) + x / (1 + R/100)²\n• Difference between CI and SI:\n  - 2 Years: Diff = P × (R / 100)²\n  - 3 Years: Diff = P × (R / 100)² × (3 + R / 100)\n  - Ratio: Diff(3 yrs) / Diff(2 yrs) = (300 + R) / 100",
    "notes": "Maths King Chapter 6. Direct shortcut for SSC exams."
  },
  {
    "category": "Arithmetic",
    "title": "Time & Work: MDH Rule & Special Shortcuts",
    "keywords": "time work pipes cistern efficiency alternate wage m1 d1 h1",
    "formula": "• MDH Rule: (M₁ × D₁ × H₁ × E₁) / W₁ = (M₂ × D₂ × H₂ × E₂) / W₂\n• If A takes (x + a) days and B takes (x + b) days more than (A+B) together:\n  x = √(a × b)\n• Work done = Efficiency × Time\n• Pipes: If Inlet fills in x hrs and Outlet empties in y hrs: Net in 1 hr = (1/x - 1/y)",
    "notes": "x = √(a × b) saves 2 minutes in exam hall."
  },
  {
    "category": "Arithmetic",
    "title": "Time, Speed & Distance: Meeting Point & Stoppage",
    "keywords": "speed distance time trains meeting point stoppage average speed",
    "formula": "• After meeting, reaching destinations in T₁ and T₂ hours:\n  S₁ / S₂ = √(T₂ / T₁)\n• Stoppage Time per hour = (Speed without stoppage - Speed with stoppage) / Speed without stoppage × 60 mins\n• Average Speed (Equal Distance): (2 × S₁ × S₂) / (S₁ + S₂)\n• Relative Speed: Same Direction = (S₁ - S₂)  |  Opposite Direction = (S₁ + S₂)\n• Boats & Streams: Boat in still water u = (D + U)/2  |  Current speed v = (D - U)/2",
    "notes": "Frequently asked across almost every shift of SSC CGL."
  },
  {
    "category": "Number System",
    "title": "Divisibility Rules & Remainder Theorems",
    "keywords": "number system divisibility 7 11 13 72 88 remainder unit digit",
    "formula": "• Divisible by 7: Subtract twice the last digit from remaining number.\n• Divisible by 11: (Sum of digits at odd places) - (Sum of digits at even places) = 0 or multiple of 11.\n• Divisible by 72: Must be divisible by both 8 (last 3 digits) and 9 (sum of digits).\n• Divisible by 88: Must be divisible by both 8 and 11.\n• Total factors of N = pᵃ qᵇ rᶜ: (a + 1)(b + 1)(c + 1)\n• (aⁿ + bⁿ) is divisible by (a + b) when n is ODD.\n• (aⁿ - bⁿ) is always divisible by (a - b); and by (a + b) if n is EVEN.",
    "notes": "High frequency: 'Find x and y if 9-digit number is divisible by 72 or 88'."
  },
  {
    "category": "Coordinate Geometry",
    "title": "Coordinate Geometry: Line Equations, Slopes & Perpendiculars",
    "keywords": "coordinate distance slope section parallel perpendicular line triangle area",
    "formula": "• Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]\n• Section (Internal m:n): [(mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)]\n• Slope of ax + by + c = 0: m = -a/b\n• Parallel lines: m₁ = m₂  |  Perpendicular lines: m₁ × m₂ = -1\n• Distance between parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0:\n  d = |c₁ - c₂| / √(a² + b²)\n• Triangle Area with vertices (x₁,y₁), (x₂,y₂), (x₃,y₃):\n  Δ = 1/2 | x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂) |",
    "notes": "Essential 2-mark formula in CGL Tier 1."
  }
];
