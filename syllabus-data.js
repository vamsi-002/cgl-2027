// Complete Pre-loaded SSC CGL Syllabus Data tailored for Vamsi
// Resources: Sreedhar's CCE, Kiran Maths PYQ, Maths King (Nikhil Pratap Singh), Parmar GK (Notes + Fatman), Lucent GK, Blackbook, Testbook

const DEFAULT_SYLLABUS = {
  quant: [
    {
      id: "q-pct",
      name: "Percentage",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 80,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-pl",
      name: "Profit, Loss & Discount",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 90,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-si-ci",
      name: "Simple & Compound Interest",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 70,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-ratio",
      name: "Ratio, Proportion & Partnership",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 60,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-mix",
      name: "Mixture & Alligation",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 50,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-avg",
      name: "Average",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 60,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-tw",
      name: "Time & Work, Pipes & Cisterns",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 80,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-tsd",
      name: "Time, Speed, Distance & Trains",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 80,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-boat",
      name: "Boats & Streams, Races",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 40,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-num",
      name: "Number System, Divisibility & Remainder",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 90,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-lcm",
      name: "LCM & HCF",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 40,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-simp",
      name: "Simplification, Surds & Indices",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 60,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-alg",
      name: "Algebra (Linear, Quadratic, Algebraic Identities)",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 100,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-trig",
      name: "Trigonometry & Circular Measure",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 100,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-hd",
      name: "Heights & Distances",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 40,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-geom",
      name: "Geometry (Lines, Angles, Triangles, Circles, Quadrilaterals)",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 120,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-mens2d",
      name: "Mensuration 2D (Perimeter & Area)",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 60,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-mens3d",
      name: "Mensuration 3D (Surface Area & Volume)",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 80,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-coord",
      name: "Coordinate Geometry",
      category: "Advance",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 40,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    },
    {
      id: "q-di",
      name: "Data Interpretation (Tables, Bar, Pie, Line)",
      category: "Arithmetic",
      sreedharConcept: false,
      mathsKingFormula: false,
      kiranPyqSolved: false,
      testbookDrill: false,
      pyqTarget: 60,
      pyqDone: 0,
      lastRevised: null,
      notes: ""
    }
  ],

  gk: [
    // POLITY (Parmar Class Notes & Fatman + Lucent)
    {
      id: "gk-pol-1",
      name: "Constitutional Framework, Preamble & Sources",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-pol-2",
      name: "Articles, Parts & Schedules (Key Memorization)",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-pol-3",
      name: "Fundamental Rights, DPSP & Fundamental Duties",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-pol-4",
      name: "President, Vice President, Prime Minister & Council",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-pol-5",
      name: "Parliament (Lok Sabha, Rajya Sabha, Bills, Parliamentary Terms)",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-pol-6",
      name: "Judiciary (Supreme Court & High Courts, Writs)",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-pol-7",
      name: "Constitutional Bodies & Key Amendments (42nd, 44th, 73rd, 86th, etc.)",
      category: "Polity",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },

    // MODERN HISTORY
    {
      id: "gk-hist-1",
      name: "Revolt of 1857 & Early Resistance",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-hist-2",
      name: "Socio-Religious Reform Movements (Brahmo, Arya Samaj, etc.)",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-hist-3",
      name: "INC Sessions & Partition of Bengal (1885 - 1915)",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-hist-4",
      name: "Gandhian Era & Mass Movements (Non-Cooperation, CDM, Quit India)",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-hist-5",
      name: "Governor-Generals, Viceroys & Major Acts",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-hist-6",
      name: "Ancient India: Indus Valley, Vedic Period, Buddhism & Jainism",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-hist-7",
      name: "Medieval India: Delhi Sultanate & Mughal Architecture/Dynasty",
      category: "History",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },

    // GEOGRAPHY
    {
      id: "gk-geo-1",
      name: "River Systems & Drainage (Himalayan & Peninsular Rivers, Tributaries)",
      category: "Geography",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-geo-2",
      name: "Physiography: Himalayas, Northern Plains, Western/Eastern Ghats & Passes",
      category: "Geography",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-geo-3",
      name: "National Parks, Biosphere Reserves, Ramsar Sites & Wildlife Sanctuaries",
      category: "Geography",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-geo-4",
      name: "Soils, Monsoons, Agriculture & Major Minerals in India",
      category: "Geography",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },

    // STATIC GK (High-Yield Parmar Fatman)
    {
      id: "gk-stat-1",
      name: "Classical & Folk Dances of India (State-wise + Exponents)",
      category: "Static GK",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-stat-2",
      name: "Musical Instruments & Legendary Players (Gharanas)",
      category: "Static GK",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-stat-3",
      name: "Festivals, Fairs & State Celebrations",
      category: "Static GK",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-stat-4",
      name: "Books & Authors (Historical, Autobiographies, Recent Awards)",
      category: "Static GK",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-stat-5",
      name: "Census 2011 (Literacy, Sex Ratio, Density, Urban/Rural)",
      category: "Static GK",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-stat-6",
      name: "Sports: Terminology, Cups & Trophies, Olympics & Asian Games",
      category: "Static GK",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },

    // SCIENCE
    {
      id: "gk-sci-1",
      name: "Biology: Human Digestive, Circulatory & Nervous Systems",
      category: "Science",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-sci-2",
      name: "Biology: Vitamins, Deficiency Diseases & Plant Kingdom",
      category: "Science",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-sci-3",
      name: "Chemistry: Periodic Table, Common Chemicals, Ores & Alloys",
      category: "Science",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    },
    {
      id: "gk-sci-4",
      name: "Physics: Units & Dimensions, Optics, Waves, Work & Energy",
      category: "Science",
      parmarVideo: false,
      parmarNotes: false,
      parmarFatman: false,
      testbookQuiz: false,
      lastRevised: null,
      notes: ""
    }
  ],

  english: [
    // GRAMMAR (Sreedhar's CCE Rules)
    {
      id: "eng-g-1",
      name: "Subject-Verb Agreement",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-g-2",
      name: "Tenses & Conditional Sentences",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-g-3",
      name: "Prepositions & Phrasal Verbs",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-g-4",
      name: "Nouns & Pronouns",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-g-5",
      name: "Adjectives, Adverbs & Inversion",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-g-6",
      name: "Active & Passive Voice (Tier 2 High-Yield)",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-g-7",
      name: "Direct & Indirect Speech / Narration (Tier 2)",
      category: "Grammar",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },

    // VOCABULARY (Blackbook by Nikhil Gupta)
    {
      id: "eng-v-1",
      name: "Blackbook: One Word Substitutions (Set 1 - 500)",
      category: "Blackbook Vocab",
      wordsTarget: 500,
      wordsDone: 0,
      reviewCycle: 1,
      lastRevised: null
    },
    {
      id: "eng-v-2",
      name: "Blackbook: One Word Substitutions (Set 501 - 1000+)",
      category: "Blackbook Vocab",
      wordsTarget: 500,
      wordsDone: 0,
      reviewCycle: 1,
      lastRevised: null
    },
    {
      id: "eng-v-3",
      name: "Blackbook: Idioms & Phrases (Set 1 - 500)",
      category: "Blackbook Vocab",
      wordsTarget: 500,
      wordsDone: 0,
      reviewCycle: 1,
      lastRevised: null
    },
    {
      id: "eng-v-4",
      name: "Blackbook: Idioms & Phrases (Set 501 - 1000+)",
      category: "Blackbook Vocab",
      wordsTarget: 500,
      wordsDone: 0,
      reviewCycle: 1,
      lastRevised: null
    },
    {
      id: "eng-v-5",
      name: "Blackbook: Repeated Synonyms & Antonyms (Top 500)",
      category: "Blackbook Vocab",
      wordsTarget: 500,
      wordsDone: 0,
      reviewCycle: 1,
      lastRevised: null
    },
    {
      id: "eng-v-6",
      name: "Blackbook: Common Spelling Errors & Confusing Words",
      category: "Blackbook Vocab",
      wordsTarget: 300,
      wordsDone: 0,
      reviewCycle: 1,
      lastRevised: null
    },

    // COMPREHENSION
    {
      id: "eng-c-1",
      name: "Cloze Test Practice (Daily 2 Passages)",
      category: "Comprehension",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-c-2",
      name: "Para-Jumbles / Sentence Rearrangement (PQRS)",
      category: "Comprehension",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    },
    {
      id: "eng-c-3",
      name: "Reading Comprehension (Passages)",
      category: "Comprehension",
      sreedharRules: false,
      exerciseSolved: false,
      testbookSectional: false,
      lastRevised: null
    }
  ],

  reasoning: [
    { id: "reas-1", name: "Number Series & Letter Series (Tricky Patterns)", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-2", name: "Coding-Decoding & Substitution", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-3", name: "Analogy & Classification (Odd One Out)", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-4", name: "Blood Relations (Coded & Direct)", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-5", name: "Direction Sense & Distance", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-6", name: "Syllogisms & Logical Deduction", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-7", name: "Venn Diagrams", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-8", name: "Missing Number in Matrix / Figures", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-9", name: "Dice, Cubes & Paper Folding/Cutting", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-10", name: "Mirror & Water Images, Embedded Figures", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-11", name: "Order, Ranking & Seating Arrangement (Linear/Circular)", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-12", name: "Mathematical Operators & Symbol Interchange", sreedharConcept: false, pyqDone: false, lastRevised: null },
    { id: "reas-13", name: "Statement & Assumption / Conclusion (Tier 2 Critical Reasoning)", sreedharConcept: false, pyqDone: false, lastRevised: null }
  ],

  computer: [
    { id: "comp-1", name: "Computer Basics, CPU, RAM/ROM & Cache Memory", done: false, lastRevised: null },
    { id: "comp-2", name: "Input & Output Devices, Ports & Buses", done: false, lastRevised: null },
    { id: "comp-3", name: "Windows OS, Shortcuts & File Systems", done: false, lastRevised: null },
    { id: "comp-4", name: "MS Word: Shortcuts, Ribbons, Formatting", done: false, lastRevised: null },
    { id: "comp-5", name: "MS Excel: Formulas, Cell References, Shortcuts", done: false, lastRevised: null },
    { id: "comp-6", name: "Internet, Protocols (HTTP, FTP, TCP/IP, DNS) & Networking", done: false, lastRevised: null },
    { id: "comp-7", name: "Cyber Security: Malware, Phishing, Firewalls, Antivirus", done: false, lastRevised: null }
  ]
};
