// Pre-populated High-Frequency Flashcards & Maths King Formula Codex
// Tailored for Vamsi: Blackbook, Parmar GK, and Maths King (Nikhil Pratap Singh)

const DEFAULT_FLASHCARDS = [
  // --- BLACKBOOK HIGH-FREQUENCY VOCAB ---
  {
    id: "fc-v1",
    deck: "blackbook",
    front: "Panacea",
    back: "A remedy for all diseases or problems; a cure-all.\n(Hindi: रामबाण इलाज)\n• Root: 'Pan' (all) + 'Akos' (cure).\n• Example: There is no panacea for the country's economic troubles.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-v2",
    deck: "blackbook",
    front: "Altruist",
    back: "One who puts the needs of others before their own; unselfishly generous.\n(Hindi: परोपकारी)\n• Antonym: Egoist / Selfish.\n• Blackbook Frequency: Repeated 14+ times in SSC CGL.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-v3",
    deck: "blackbook",
    front: "Ephemeral",
    back: "Lasting for a very short time; transient, fleeting.\n(Hindi: क्षणिक, अल्पकालिक)\n• Synonyms: Evanescent, Fugacious, Transitory.\n• Mnemonic: Sounds like 'E-Funeral' (funeral of short life).",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-v4",
    deck: "blackbook",
    front: "Ubiquitous",
    back: "Present, appearing, or found everywhere at the same time.\n(Hindi: सर्वव्यापी, हर जगह मौजूद)\n• Synonym: Omnipresent.\n• Example: Mobile phones are ubiquitous nowadays.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-v5",
    deck: "blackbook",
    front: "Cacophony",
    back: "A harsh, discordant mixture of sounds.\n(Hindi: कर्णकटु ध्वनि, कर्कश आवाज)\n• Root: 'Caco' (bad/harsh) + 'Phone' (sound).\n• Antonym: Euphony (pleasant sound).",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-v6",
    deck: "blackbook",
    front: "To burn the midnight oil (Idiom)",
    back: "To work or study late into the night.\n(Hindi: देर रात तक मेहनत करना)\n• Example: Vamsi is burning the midnight oil to crack SSC CGL 2027.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-v7",
    deck: "blackbook",
    front: "At the eleventh hour (Idiom)",
    back: "At the last possible moment before it is too late.\n(Hindi: अंतिम समय पर)\n• Example: He submitted his office report at the eleventh hour.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },

  // --- PARMAR GK STATIC & POLITY PUNCHCARDS ---
  {
    id: "fc-gk1",
    deck: "parmar_gk",
    front: "Who presided over the 1916 Lucknow Session of INC?",
    back: "Ambica Charan Majumdar.\n• Significance: Historic Lucknow Pact was signed between Congress & Muslim League; reunited Moderates & Extremists.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-gk2",
    deck: "parmar_gk",
    front: "Sattriya Classical Dance belongs to which state and who founded it?",
    back: "Assam.\n• Founded by: Great Vaishnavite saint & reformer Srimanta Sankardev in the 15th Century AD.\n• Recognized as Classical Dance by Sangeet Natak Akademi in 2000.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-gk3",
    deck: "parmar_gk",
    front: "Which Constitutional Amendment added Bodo, Dogri, Maithili & Santhali to 8th Schedule?",
    back: "92nd Constitutional Amendment Act, 2003.\n• Remember Parmar Sir's Mnemonic: B-D-M-S.\n• Total languages in 8th Schedule: 22 (originally 14).",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-gk4",
    deck: "parmar_gk",
    front: "Article 32 vs Article 226 (Writ Jurisdiction Scope)",
    back: "• Article 32: Supreme Court (Only for Fundamental Rights; Article 32 itself is a Fundamental Right).\n• Article 226: High Court (Wider scope: Fundamental Rights + Ordinary legal rights).",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-gk5",
    deck: "parmar_gk",
    front: "Ustad Bismillah Khan played which instrument and in which year did he receive Bharat Ratna?",
    back: "Instrument: Shehnai (Benares Gharana).\n• Awarded Bharat Ratna: 2001 (shared with Lata Mangeshkar).\n• SSC Repeat: Asked 6+ times in Tier 1 & Tier 2.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },

  // --- MATHS KING SHORTCUTS & TEMPLATES ---
  {
    id: "fc-m1",
    deck: "maths_king",
    front: "Apollonius Theorem (Median of Triangle)",
    back: "In triangle ABC with median AD to side BC:\nAB² + AC² = 2 × (AD² + BD²)\n\n• Maths King Shortcut: Used directly to find the length of median without coordinates or trigonometry.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-m2",
    deck: "maths_king",
    front: "Compound Interest: 2 Equal Annual Installments Formula",
    back: "If Principal is P, annual installment is x, rate is R%:\nP = x / (1 + R/100) + x / (1 + R/100)²\n\n• Maths King Ratio Method: If R = 10% (1/10), ratio goes 10:11 (year 1) and 100:121 (year 2). Multiply year 1 by 11 to equalize installment!",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-m3",
    deck: "maths_king",
    front: "Intersecting Chords Theorem (Circle)",
    back: "1. Internal intersection at P: PA × PB = PC × PD\n2. External intersection at P: PA × PB = PC × PD\n3. Tangent PT and Secant PAB: PT² = PA × PB\n(Always measured from point of intersection P!)",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  },
  {
    id: "fc-m4",
    deck: "maths_king",
    front: "Difference between CI and SI for 2 years & 3 years",
    back: "• For 2 Years: Diff = P × (R / 100)²\n• For 3 Years: Diff = P × (R / 100)² × (3 + R / 100)\n\n• Maths King Quick Ratio: For 3 years, Diff(3 yrs) / Diff(2 yrs) = 3 + R/100 = (300 + R) / 100.",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  }
];

// Searchable Maths King Formula Codex Data
const FORMULA_CODEX = [
  {
    category: "Geometry",
    title: "Apollonius Theorem (Median Calculation)",
    keywords: "apollonius median triangle length sides",
    formula: "AB² + AC² = 2(AD² + BD²)",
    notes: "Applies to any triangle where AD is median to side BC. BC is bisected into BD = DC = BC/2."
  },
  {
    category: "Geometry",
    title: "Inradius & Circumradius Formulas",
    keywords: "inradius circumradius incircle circumcircle triangle right angle equilateral",
    formula: "• Any Triangle: r = Δ / s (where s = (a+b+c)/2, Δ = Area)\n• Circumradius: R = (a × b × c) / (4Δ)\n• Right Triangle: r = (P + B - H) / 2  |  R = H / 2\n• Equilateral: r = a / (2√3)  |  R = a / √3  (Ratio R : r = 2 : 1)",
    notes: "High frequency in SSC CGL Tier 1 & 2."
  },
  {
    category: "Geometry",
    title: "Circles: Tangent-Secant & Chord Properties",
    keywords: "tangent secant chord circle pt pa pb",
    formula: "• Secants intersecting at P: PA × PB = PC × PD\n• Tangent PT from P: PT² = PA × PB\n• Direct Common Tangent (DCT) = √(d² - (R - r)²)\n• Transverse Common Tangent (TCT) = √(d² - (R + r)²)",
    notes: "d is the distance between the centres of the two circles."
  },
  {
    category: "Mensuration",
    title: "Prism & Pyramid Fundamental Rules",
    keywords: "prism pyramid volume tsa lsa slant height perimeter",
    formula: "• Prism (Flat top & bottom):\n  - LSA = Perimeter of Base × Height\n  - TSA = LSA + 2 × (Area of Base)\n  - Volume = Area of Base × Height\n\n• Pyramid (Pointed top):\n  - LSA = 1/2 × Perimeter of Base × Slant Height (l)\n  - TSA = LSA + Area of Base\n  - Volume = 1/3 × Area of Base × Height (h)\n  - Relation: l² = h² + r² (r = inradius of base)",
    notes: "Direct formula questions in SSC Tier 2."
  },
  {
    category: "Arithmetic",
    title: "Compound Interest: 2-Year & 3-Year Installments",
    keywords: "compound interest ci installments loan borrowed annual",
    formula: "P = x / (1 + R/100) + x / (1 + R/100)²\n\nRatio Method:\nIf R = 12.5% (1/8):\nYear 1: 8 : 9  (×9)\nYear 2: 64 : 81\nEqual installment = 81 units, Total Principal = 72 + 64 = 136 units.",
    notes: "From Maths King by Nikhil Pratap Singh (Chapter 6)."
  },
  {
    category: "Arithmetic",
    title: "Time & Work: Efficiency, Pipes & Cistern Alternate Hours",
    keywords: "time work pipes cistern efficiency alternate wage m1 d1 h1",
    formula: "• MDH Rule: (M₁ × D₁ × H₁ × E₁) / W₁ = (M₂ × D₂ × H₂ × E₂) / W₂\n• If A takes (x + a) days and B takes (x + b) days more than (A+B) together:\n  x = √(a × b)\n• Work done = Efficiency × Time",
    notes: "x = √(a × b) shortcut saves 2 minutes in exam!"
  },
  {
    category: "Arithmetic",
    title: "Time, Speed & Distance: Meeting Point & Stoppage",
    keywords: "speed distance time trains meeting point stoppage average speed",
    formula: "• Two persons meet and reach destinations in T₁ and T₂ hours:\n  S₁ / S₂ = √(T₂ / T₁)\n• Stoppage Time per hour = (Speed without stoppage - Speed with stoppage) / Speed without stoppage × 60 mins\n• Average Speed (Equal Distance): (2 × S₁ × S₂) / (S₁ + S₂)",
    notes: "S₁/S₂ = √(T₂/T₁) is asked in almost every shift of SSC CGL."
  },
  {
    category: "Algebra",
    title: "Algebra Symmetric Identities & Cubes",
    keywords: "algebra x + 1/x a3 b3 c3 3abc identity",
    formula: "• If x + 1/x = k:\n  - x² + 1/x² = k² - 2\n  - x³ + 1/x³ = k³ - 3k\n  - x⁵ + 1/x⁵ = (x² + 1/x²)(x³ + 1/x³) - (x + 1/x)\n• If a + b + c = 0:\n  a³ + b³ + c³ = 3abc\n• a³ + b³ + c³ - 3abc = 1/2(a + b + c)[(a - b)² + (b - c)² + (c - a)²]",
    notes: "Maths King Page 89. Guaranteed 2-3 questions in Tier 1."
  },
  {
    category: "Trigonometry",
    title: "Trigonometry Standard Triplet & Max/Min Values",
    keywords: "trigonometry max min maximum minimum sin cos tan triplet",
    formula: "• a sinθ + b cosθ:\n  - Max Value = +√(a² + b²)\n  - Min Value = -√(a² + b²)\n• a sin²θ + b cosec²θ  (a > b): Min Value = 2√(ab)\n• a tan²θ + b cot²θ: Min Value = 2√(ab)\n• Common Triplets: (3,4,5), (5,12,13), (7,24,25), (8,15,17), (9,40,41), (11,60,61), (12,35,37), (20,21,29)",
    notes: "Memorize all triplets for instant 5-second answers."
  }
];
