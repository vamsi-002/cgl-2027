// Vamsi's CGL 2027 Command Center - Core Application Engine
// Handles: Calendar Odd/Even logic, MVD exhaustion mode, Office stealth mode, 
// Backlog rollover debt, Spaced repetition, Mistake notebook, Audio chimes, and Calendar .ics generation.

const STORAGE_KEY = "vamsi_cgl_2027_state_v1";

// Default State
function getInitialState() {
  return {
    user: {
      name: "Vamsi",
      target: "SSC CGL 2027",
      targetExamDate: "2027-09-15",
      xp: 120,
      streak: 1,
      bestStreak: 1,
      lastActiveDate: new Date().toISOString().split("T")[0]
    },
    settings: {
      energyMode: "normal", // 'normal' | 'mvd'
      soundEnabled: true,
      notificationsEnabled: false
    },
    todayTasks: [],
    backlog: [],
    officeBonusHours: 0,
    officeNotes: "",
    energyLevel: "high", // 'high' | 'medium' | 'low'
    disguiseMode: false,
    flashcards: typeof DEFAULT_FLASHCARDS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_FLASHCARDS)) : [],
    syllabus: JSON.parse(JSON.stringify(DEFAULT_SYLLABUS)),
    mocks: [
      {
        id: "mock-1",
        date: "2026-10-06",
        name: "SSC CGL 2026 Tier-1 (Actual Attempt Post-Mortem)",
        tier: "Tier 1",
        score: 118,
        maxScore: 200,
        percentile: 74.5,
        accuracy: 78,
        mathScore: 32,
        reasoningScore: 41,
        englishScore: 34,
        gkScore: 11,
        notes: "Real exam attempt. Time trap in Math calculation; GK static facts forgotten; English vocab had 3 unattempted questions."
      }
    ],
    mistakes: [
      {
        id: "m-1",
        date: "2026-10-06",
        subject: "Quant",
        topic: "Compound Interest (Installments)",
        errorType: "Formula Forgotten",
        question: "Installment scheme with 10% CI compounded annually for 2 years",
        lesson: "Memorize the direct shortcut: P = x/(1+r/100) + x/(1+r/100)^2. Check Maths King page 42.",
        resolved: false
      },
      {
        id: "m-2",
        date: "2026-10-06",
        subject: "GK",
        topic: "Articles & Schedules",
        errorType: "Confusion / Silly",
        question: "Schedule 8 languages count & recent amendment additions",
        lesson: "Remember B-D-M-S mnemonic (92nd Amendment, 2003): Bodo, Dogri, Maithili, Santhali. Review Parmar Class Notes Polity Ch 2.",
        resolved: false
      }
    ]
  };
}

// Load or Initialize State
let appState = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const init = getInitialState();
    saveState(init);
    return init;
  }
  try {
    const parsed = JSON.parse(saved);
    // Merge default syllabus items if missing
    if (!parsed.syllabus) parsed.syllabus = JSON.parse(JSON.stringify(DEFAULT_SYLLABUS));
    
    // Smart merge flashcards: Ensure newly added DEFAULT_FLASHCARDS are available
    if (typeof DEFAULT_FLASHCARDS !== 'undefined' && Array.isArray(DEFAULT_FLASHCARDS)) {
      if (!parsed.flashcards || parsed.flashcards.length === 0) {
        parsed.flashcards = JSON.parse(JSON.stringify(DEFAULT_FLASHCARDS));
      } else {
        const existingIds = new Set(parsed.flashcards.map(c => c.id));
        let addedCount = 0;
        for (const defCard of DEFAULT_FLASHCARDS) {
          if (!existingIds.has(defCard.id)) {
            parsed.flashcards.push(JSON.parse(JSON.stringify(defCard)));
            addedCount++;
          }
        }
      }
    }
    if (!parsed.energyLevel) parsed.energyLevel = "high";
    return parsed;
  } catch (e) {
    console.error("State parse error, fallback to initial", e);
    return getInitialState();
  }
}

function saveState(state = appState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Sound Synthesis via Web Audio API (Zero external assets needed)
function playChime(type = "success") {
  if (!appState.settings.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "levelUp") {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        subGain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.1);
        subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.35);
        subOsc.start(ctx.currentTime + idx * 0.1);
        subOsc.stop(ctx.currentTime + idx * 0.1 + 0.35);
      });
    }
  } catch (e) {
    console.warn("Audio context unable to play:", e);
  }
}

// XP & Officer Rank Engine
const RANKS = [
  { minXp: 0, title: "CGL Aspirant", badge: "🎯", color: "text-slate-400" },
  { minXp: 500, title: "Tax Assistant (CBDT/CBIC)", badge: "🥉", color: "text-amber-500" },
  { minXp: 1500, title: "Divisional Accountant (CAG)", badge: "🥈", color: "text-sky-400" },
  { minXp: 3000, title: "Sub-Inspector (CBI / NIA)", badge: "🥇", color: "text-indigo-400" },
  { minXp: 5000, title: "Inspector (CGST & Central Excise)", badge: "⭐", color: "text-yellow-400" },
  { minXp: 8000, title: "Assistant Section Officer (ASO - MEA)", badge: "👑", color: "text-emerald-400" }
];

function getOfficerRank(xp) {
  let currentRank = RANKS[0];
  let nextRank = RANKS[1];
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXp) {
      currentRank = RANKS[i];
      nextRank = RANKS[i + 1] || null;
    }
  }
  const progressPercent = nextRank 
    ? Math.min(100, Math.round(((xp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100))
    : 100;

  return { currentRank, nextRank, progressPercent };
}

function addXP(amount, reason = "") {
  const prevRank = getOfficerRank(appState.user.xp).currentRank;
  appState.user.xp += amount;
  const newRank = getOfficerRank(appState.user.xp).currentRank;
  
  if (newRank.title !== prevRank.title) {
    playChime("levelUp");
    showToast(`🎉 PROMOTION! You achieved rank: ${newRank.title}`, "success");
  } else {
    playChime("success");
    showToast(`+${amount} XP earned (${reason})`, "info");
  }
  saveState();
  renderApp();
}

// Calendar & Odd/Even Saturday Intelligence
function getCalendarDayInfo(date = new Date()) {
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const dayOfMonth = date.getDate();

  if (dayOfWeek === 0) {
    return {
      type: "SUNDAY_OFF",
      label: "Sunday: Full Mock & Deep Autopsy",
      isWorkingDay: false,
      hoursTarget: 8,
      badge: "Full Sprint (Off Day)"
    };
  }

  if (dayOfWeek === 6) {
    // Determine which Saturday of the month it is (1st, 2nd, 3rd, 4th, 5th)
    const saturdayIndex = Math.ceil(dayOfMonth / 7);
    const isOdd = saturdayIndex % 2 !== 0;

    if (isOdd) {
      return {
        type: "ODD_SAT_WORK",
        label: `Odd Saturday (${saturdayIndex}${getOrdinal(saturdayIndex)} Sat): Office Working Day (9am - 6pm)`,
        isWorkingDay: true,
        hoursTarget: 4,
        badge: "Office Working Day"
      };
    } else {
      return {
        type: "EVEN_SAT_OFF",
        label: `Even Saturday (${saturdayIndex}${getOrdinal(saturdayIndex)} Sat): Office OFF Day - High-Yield Sprint`,
        isWorkingDay: false,
        hoursTarget: 7.5,
        badge: "Sprint Off-Day"
      };
    }
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    type: "WEEKDAY_WORK",
    label: `${days[dayOfWeek]}: Office Working Day (9am - 6pm)`,
    isWorkingDay: true,
    hoursTarget: 4.5,
    badge: "Office Working Day"
  };
}

function getOrdinal(n) {
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}

// Generate Schedule Based on Day Info & Energy Mode
function generateDailyTasks(dayInfo, energyMode = appState.settings.energyMode) {
  const todayDate = new Date().toISOString().split("T")[0];

  // If already saved for today, reuse
  if (appState.lastGeneratedDate === todayDate && appState.todayTasks.length > 0) {
    return appState.todayTasks;
  }

  let tasks = [];

  if (energyMode === "mvd") {
    // Minimum Viable Day (Exhaustion Mode)
    tasks = [
      {
        id: "task-mvd-1",
        timeSlot: "Micro-Session (15 mins)",
        title: "Blackbook 20 Vocab Retention",
        resource: "Blackbook App / Book",
        description: "Review 20 One-Word Substitutions or Idioms on phone. Keep streak alive!",
        completed: false,
        xp: 30
      },
      {
        id: "task-mvd-2",
        timeSlot: "Micro-Session (15 mins)",
        title: "Parmar Static GK Quick Flip",
        resource: "Parmar Class Notes / Fatman",
        description: "15 mins flip through Classical Dances / Gharanas or National Parks.",
        completed: false,
        xp: 30
      }
    ];
  } else if (dayInfo.type === "WEEKDAY_WORK" || dayInfo.type === "ODD_SAT_WORK") {
    // 9-to-6 Working Day
    tasks = [
      {
        id: "task-w-1",
        timeSlot: "06:00 AM - 08:30 AM (2.5 hrs)",
        title: "Morning Deep-Work: Quant Mastery",
        resource: "Sreedhar's CCE + Maths King + Kiran PYQ",
        description: "Review chapter formulas in Maths King (10m) -> Solve 40-50 questions in Kiran PYQ with timer.",
        completed: false,
        xp: 50
      },
      {
        id: "task-w-2",
        timeSlot: "Office Hours (Lunch / Micro-break)",
        title: "Blackbook Vocab & Parmar Audio Absorption",
        resource: "Blackbook + Earphones (Stealth)",
        description: "20 new words + 20 spaced review. (Optional: 1-2h Parmar Sir lecture if work allows).",
        completed: false,
        xp: 40
      },
      {
        id: "task-w-3",
        timeSlot: "07:30 PM - 08:45 PM (1h 15m)",
        title: "Evening GK Anchor: Parmar Class Notes",
        resource: "Parmar Class Notes & Fatman Book",
        description: "Read targeted topic (Polity/History/Static). Highlight key lines; no lengthy handwriting.",
        completed: false,
        xp: 40
      },
      {
        id: "task-w-4",
        timeSlot: "08:45 PM - 09:45 PM (1 hr)",
        title: "English Grammar or Reasoning Tricky Drills",
        resource: "Sreedhar's CCE Sheets / Rules",
        description: "10-15 grammar rules drill or Tricky Number Series/Missing numbers.",
        completed: false,
        xp: 35
      },
      {
        id: "task-w-5",
        timeSlot: "09:45 PM - 10:15 PM (30 mins)",
        title: "Testbook Speed Drill & Day Close",
        resource: "Testbook App (15-min Sectional)",
        description: "Take 1 sectional test (25 Qs). Log mistakes into Mistake Notebook.",
        completed: false,
        xp: 35
      }
    ];
  } else if (dayInfo.type === "EVEN_SAT_OFF") {
    // Even Saturday Full Sprint
    tasks = [
      {
        id: "task-sat-1",
        timeSlot: "08:00 AM - 10:30 AM (2.5 hrs)",
        title: "Quant Heavy Artillery: Kiran PYQ",
        resource: "Kiran Maths PYQ",
        description: "Solve 70-80 mixed questions across 2 advance chapters (Algebra / Geometry / Trig).",
        completed: false,
        xp: 60
      },
      {
        id: "task-sat-2",
        timeSlot: "11:00 AM - 01:00 PM (2 hrs)",
        title: "Backlog Rollover Clearance Block",
        resource: "Backlog Drawer",
        description: "Attack any topics carried forward from busy weekdays. Zero-debt target!",
        completed: false,
        xp: 50
      },
      {
        id: "task-sat-3",
        timeSlot: "03:00 PM - 05:00 PM (2 hrs)",
        title: "Parmar GK & Fatman Intensive Review",
        resource: "Parmar Notes + Lucent Tables",
        description: "Static GK (Dances, Gharanas, Festivals) + 50 PYQ quiz on Testbook.",
        completed: false,
        xp: 50
      },
      {
        id: "task-sat-4",
        timeSlot: "06:00 PM - 07:30 PM (1.5 hrs)",
        title: "English Comprehension & Blackbook Marathon",
        resource: "Blackbook + Editorial Reading",
        description: "100 words spaced repetition flip + 3 Cloze tests + 5 PQRS jumbles.",
        completed: false,
        xp: 45
      },
      {
        id: "task-sat-5",
        timeSlot: "08:00 PM - 09:00 PM (1 hr)",
        title: "Touch Typing Practice & Computer Module",
        resource: "Typingclub / Monkeytype + Notes",
        description: "15 mins typing (target > 30 WPM) + 1 topic of computer hardware/shortcuts.",
        completed: false,
        xp: 35
      }
    ];
  } else {
    // Sunday Full Mock Day
    tasks = [
      {
        id: "task-sun-1",
        timeSlot: "09:00 AM - 10:00 AM (1 hr)",
        title: "Testbook Tier-1 Full Mock (Strict Exam Condition)",
        resource: "Testbook Pass",
        description: "No phone, pin-drop silence, complete 100 questions with real interface.",
        completed: false,
        xp: 75
      },
      {
        id: "task-sun-2",
        timeSlot: "10:30 AM - 12:45 PM (2 hrs 15m)",
        title: "The Deep Mock Autopsy (Crucial)",
        resource: "Mistake Notebook in App",
        description: "Categorize every single negative/unattempted question: Silly, Concept, or Time Trap.",
        completed: false,
        xp: 70
      },
      {
        id: "task-sun-3",
        timeSlot: "02:30 PM - 04:30 PM (2 hrs)",
        title: "Weakness Remediation Session",
        resource: "Maths King + Kiran + Parmar",
        description: "Immediately revise the lowest-scoring topic from the morning mock.",
        completed: false,
        xp: 55
      },
      {
        id: "task-sun-4",
        timeSlot: "05:00 PM - 07:00 PM (2 hrs)",
        title: "Formula & Vocab Cumulative Spaced Review",
        resource: "Maths King Book + Blackbook",
        description: "Flip through all formulas in Maths King; review flagged vocab stars.",
        completed: false,
        xp: 50
      },
      {
        id: "task-sun-5",
        timeSlot: "07:30 PM - 08:30 PM (1 hr)",
        title: "Weekly Planning & Backlog Audit",
        resource: "App Cockpit",
        description: "Set targets for next week; verify odd/even Saturday status; prepare video queue.",
        completed: false,
        xp: 40
      }
    ];
  }

  appState.todayTasks = tasks;
  appState.lastGeneratedDate = todayDate;
  saveState();
  return tasks;
}

// Rollover & Backlog Engine: Moves unfinished tasks to Backlog
function rolloverUnfinishedTasks() {
  const todayDate = new Date().toISOString().split("T")[0];
  if (appState.lastActiveDate && appState.lastActiveDate !== todayDate) {
    // Move incomplete tasks from previous day to backlog
    const incomplete = appState.todayTasks.filter(t => !t.completed);
    if (incomplete.length > 0) {
      incomplete.forEach(t => {
        appState.backlog.push({
          id: "backlog-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
          title: t.title,
          resource: t.resource,
          originalDate: appState.lastActiveDate,
          estimatedMins: 45
        });
      });
      showToast(`${incomplete.length} uncompleted tasks moved to Backlog Debt.`, "warning");
    }

    // Check streak
    const prevDate = new Date(appState.lastActiveDate);
    const currentDate = new Date(todayDate);
    const diffTime = Math.abs(currentDate - prevDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      // Streak broken unless MVD was logged
      appState.user.streak = 1;
    }

    appState.lastActiveDate = todayDate;
    appState.todayTasks = []; // Force regeneration
    saveState();
  }
}

// Generate .ICS Calendar File for Mobile Native Alarms
function exportCalendarICS() {
  const now = new Date();
  const year = now.getFullYear();

  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vamsi CGL 2027 Command Center//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Vamsi CGL 2027 Schedule",
    "X-WR-TIMEZONE:Asia/Kolkata"
  ];

  // Generate 30 days of dynamic study alerts matching Odd/Even Saturday rules
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);
    const dayInfo = getCalendarDayInfo(d);
    const dateStr = d.toISOString().replace(/[-:]/g, "").split("T")[0];

    if (dayInfo.type === "WEEKDAY_WORK" || dayInfo.type === "ODD_SAT_WORK") {
      // 1. Morning Math Alert: 06:00 - 08:30
      icsContent.push(createIcsEvent(
        `cgl-morning-${i}`,
        `${dateStr}T060000`,
        `${dateStr}T083000`,
        "🎯 Morning Quant: Kiran PYQ + Maths King",
        "Deep focus morning session. 40-50 problems with timer."
      ));

      // 2. Lunch Vocab Alert: 13:15 - 13:45
      icsContent.push(createIcsEvent(
        `cgl-lunch-${i}`,
        `${dateStr}T131500`,
        `${dateStr}T134500`,
        "📖 Lunch Micro-Drill: Blackbook 20 Words",
        "Mobile vocab session + Parmar static notes flip."
      ));

      // 3. Evening Power Session: 19:30 - 22:15
      icsContent.push(createIcsEvent(
        `cgl-eve-${i}`,
        `${dateStr}T193000`,
        `${dateStr}T221500`,
        "🔥 Evening Session: Parmar GK & Testbook Sectional",
        "Parmar Class notes + English rules + 15 min sectional test."
      ));
    } else if (dayInfo.type === "EVEN_SAT_OFF") {
      // Even Saturday Sprint Alert
      icsContent.push(createIcsEvent(
        `cgl-sat-sprint-${i}`,
        `${dateStr}T083000`,
        `${dateStr}T123000`,
        "⚡ Even Saturday Sprint: Backlog & Heavy Quant",
        "Clear backlog debt + 80 Kiran PYQ questions."
      ));
    } else {
      // Sunday Full Mock Alert
      icsContent.push(createIcsEvent(
        `cgl-sun-mock-${i}`,
        `${dateStr}T090000`,
        `${dateStr}T123000`,
        "🏆 Sunday Testbook Tier-1 Full Mock & Deep Autopsy",
        "Simulate actual exam hall. Enter all mistakes into Error Notebook."
      ));
    }
  }

  icsContent.push("END:VCALENDAR");
  const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vamsi_cgl_2027_schedule.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("📅 Calendar (.ics) downloaded! Open it on phone to sync ringing alarms.", "success");
}

function createIcsEvent(uid, start, end, summary, description) {
  return [
    "BEGIN:VEVENT",
    `UID:${uid}@cgl2027.vamsi`,
    `DTSTAMP:${start}Z`,
    `DTSTART;TZID=Asia/Kolkata:${start}`,
    `DTEND;TZID=Asia/Kolkata:${end}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT10M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Study Slot Starting in 10 minutes",
    "END:VALARM",
    "END:VEVENT"
  ].join("\r\n");
}

// Topic Decay Radar: checks days since last revised
function getDecayStatus(lastRevisedDate) {
  if (!lastRevisedDate) return { status: "not_started", label: "Not Started", color: "text-slate-400" };
  const last = new Date(lastRevisedDate);
  const now = new Date();
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) return { status: "fresh", label: `Fresh (${diffDays}d ago)`, color: "text-emerald-400" };
  if (diffDays <= 15) return { status: "good", label: `Moderate (${diffDays}d ago)`, color: "text-sky-400" };
  if (diffDays <= 25) return { status: "amber", label: `Decay Alert (${diffDays}d ago)`, color: "text-amber-400" };
  return { status: "critical", label: `Critical Decay (${diffDays}d ago)`, color: "text-rose-500 font-bold" };
}

// Backup & Sync Functions
function exportBackupJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = `vamsi_cgl_backup_${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("💾 Backup downloaded! Transfer this file to your mobile or laptop.", "success");
}

function importBackupJSON(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.user && parsed.syllabus) {
        appState = parsed;
        saveState();
        showToast("✅ Progress restored successfully!", "success");
        renderApp();
      } else {
        showToast("❌ Invalid backup file format.", "error");
      }
    } catch (err) {
      showToast("❌ Error reading file: " + err.message, "error");
    }
  };
  reader.readAsText(file);
}

// Lightweight Toast Notification
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-emerald-600" : type === "warning" ? "bg-amber-600" : type === "error" ? "bg-rose-600" : "bg-indigo-600";
  toast.className = `${bg} text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 transition-all duration-300 transform translate-y-2 opacity-0`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// 1. SM-2 SPACED REPETITION FLASHCARD ENGINE
// ==========================================
function gradeFlashcard(cardId, gradeQuality) {
  // gradeQuality: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
  const card = appState.flashcards.find(c => c.id === cardId);
  if (!card) return;

  if (gradeQuality < 3) {
    card.repetition = 0;
    card.interval = 1;
  } else {
    if (card.repetition === 0) {
      card.interval = 1;
    } else if (card.repetition === 1) {
      card.interval = gradeQuality === 4 ? 6 : 3;
    } else {
      card.interval = Math.round(card.interval * card.easeFactor);
    }
    card.repetition += 1;
  }

  // SM-2 Ease Factor calculation
  card.easeFactor = Math.max(1.3, card.easeFactor + (0.1 - (4 - gradeQuality) * (0.08 + (4 - gradeQuality) * 0.02)));

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + card.interval);
  card.dueDate = nextDate.toISOString().split("T")[0];

  addXP(gradeQuality >= 3 ? 15 : 5, `Flashcard Review`);
  saveState();
  if (typeof renderFlashcardDeck === 'function') renderFlashcardDeck();
}

function addNewFlashcard(deck, front, back) {
  const newCard = {
    id: "fc-user-" + Date.now(),
    deck: deck,
    front: front,
    back: back,
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString().split("T")[0]
  };
  appState.flashcards.unshift(newCard);
  addXP(20, `Created Flashcard`);
  saveState();
  showToast("✅ Flashcard added to deck!", "success");
  if (typeof renderFlashcardDeck === 'function') renderFlashcardDeck();
}

// ==========================================
// 2. COMMUTE & METRO VOICE AUDIO-POD (TTS)
// ==========================================
let commuteAudioActive = false;
let commuteCardIndex = 0;
let commuteTimeoutId = null;

function startCommuteAudio(deck = 'all') {
  if (!('speechSynthesis' in window)) {
    showToast("❌ Speech synthesis not supported in this browser.", "error");
    return;
  }
  window.speechSynthesis.cancel();
  commuteAudioActive = true;
  commuteCardIndex = 0;
  updateCommuteStatusUI(true);
  playNextCommuteCard(deck);
  showToast("🎧 Commute Voice Mode started! Put earphones in.", "success");
}

function stopCommuteAudio() {
  commuteAudioActive = false;
  if (commuteTimeoutId) clearTimeout(commuteTimeoutId);
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  updateCommuteStatusUI(false);
  showToast("⏹️ Commute Voice Mode stopped.", "info");
}

function toggleCommuteAudio() {
  if (commuteAudioActive) stopCommuteAudio();
  else startCommuteAudio();
}

function playNextCommuteCard(deck = 'all') {
  if (!commuteAudioActive) return;
  const cards = appState.flashcards.filter(c => {
    if (!deck || deck === 'all') return true;
    if (deck === 'blackbook') return c.deck.startsWith('blackbook');
    if (deck === 'parmar_gk') return c.deck.startsWith('parmar');
    return c.deck === deck;
  });
  if (cards.length === 0) {
    stopCommuteAudio();
    return;
  }

  const card = cards[commuteCardIndex % cards.length];
  commuteCardIndex++;

  const cleanFront = card.front.replace(/[\(\)\#\*\•]/g, ' ').trim();
  const cleanBack = card.back.split('\n')[0].replace(/[\(\)\#\*\•]/g, ' ').trim();

  const utteranceFront = new SpeechSynthesisUtterance("Question: " + cleanFront);
  utteranceFront.rate = 0.95;
  utteranceFront.pitch = 1.0;

  utteranceFront.onend = () => {
    if (!commuteAudioActive) return;
    commuteTimeoutId = setTimeout(() => {
      if (!commuteAudioActive) return;
      const utteranceBack = new SpeechSynthesisUtterance("Answer: " + cleanBack);
      utteranceBack.rate = 0.95;
      utteranceBack.onend = () => {
        if (!commuteAudioActive) return;
        commuteTimeoutId = setTimeout(() => {
          playNextCommuteCard(deck);
        }, 3000);
      };
      window.speechSynthesis.speak(utteranceBack);
    }, 4000); // 4-second recall pause
  };

  window.speechSynthesis.speak(utteranceFront);
}

function updateCommuteStatusUI(active) {
  const btn = document.getElementById("commute-audio-toggle-btn");
  if (btn) {
    if (active) {
      btn.innerHTML = `<span>⏹️</span><span>Stop Audio-Pod</span>`;
      btn.classList.add("bg-rose-600");
      btn.classList.remove("bg-indigo-600");
    } else {
      btn.innerHTML = `<span>🎧</span><span>Start Audio-Pod</span>`;
      btn.classList.remove("bg-rose-600");
      btn.classList.add("bg-indigo-600");
    }
  }
}

function speakSingleCard(cardId) {
  if (!('speechSynthesis' in window)) {
    showToast("❌ Speech synthesis not supported in this browser.", "error");
    return;
  }
  const card = appState.flashcards.find(c => c.id === cardId);
  if (!card) return;
  window.speechSynthesis.cancel();
  const cleanFront = card.front.replace(/[\(\)\#\*\•]/g, ' ').trim();
  const cleanBack = card.back.split('\n')[0].replace(/[\(\)\#\*\•]/g, ' ').trim();

  const uttFront = new SpeechSynthesisUtterance("Question: " + cleanFront);
  uttFront.rate = 0.95;
  uttFront.onend = () => {
    setTimeout(() => {
      const uttBack = new SpeechSynthesisUtterance("Answer: " + cleanBack);
      uttBack.rate = 0.95;
      window.speechSynthesis.speak(uttBack);
    }, 1000);
  };
  window.speechSynthesis.speak(uttFront);
  showToast("🎧 Reading aloud...", "info");
}

// ==========================================
// 3. SYNTHESIZED AMBIENT SOUND (RAIN & 40Hz)
// ==========================================
let ambientAudioCtx = null;
let rainNode = null;
let binauralOsc1 = null;
let binauralOsc2 = null;
let isRainPlaying = false;
let isBinauralPlaying = false;

function toggleRainSound() {
  if (isRainPlaying) stopRainSound();
  else startRainSound();
  updateAmbientSoundUI();
}

function startRainSound() {
  try {
    if (!ambientAudioCtx) ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (ambientAudioCtx.state === 'suspended') ambientAudioCtx.resume();

    const bufferSize = ambientAudioCtx.sampleRate * 2;
    const noiseBuffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink rain noise
      lastOut = output[i];
      output[i] *= 3.0;
    }
    const whiteNoise = ambientAudioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ambientAudioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(750, ambientAudioCtx.currentTime);

    const gain = ambientAudioCtx.createGain();
    gain.gain.setValueAtTime(0.06, ambientAudioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ambientAudioCtx.destination);
    whiteNoise.start();

    rainNode = { source: whiteNoise, gain: gain };
    isRainPlaying = true;
    showToast("🌧️ Gentle Rain ambient sound active.", "info");
  } catch (e) {
    console.error(e);
  }
}

function stopRainSound() {
  if (rainNode) {
    rainNode.source.stop();
    rainNode = null;
  }
  isRainPlaying = false;
  showToast("🌧️ Rain sound stopped.", "info");
}

function toggleBinauralSound() {
  if (isBinauralPlaying) stopBinauralSound();
  else startBinauralSound();
  updateAmbientSoundUI();
}

function startBinauralSound() {
  try {
    if (!ambientAudioCtx) ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (ambientAudioCtx.state === 'suspended') ambientAudioCtx.resume();

    binauralOsc1 = ambientAudioCtx.createOscillator();
    binauralOsc2 = ambientAudioCtx.createOscillator();
    const gain1 = ambientAudioCtx.createGain();
    const gain2 = ambientAudioCtx.createGain();

    binauralOsc1.type = "sine";
    binauralOsc1.frequency.setValueAtTime(200, ambientAudioCtx.currentTime);
    gain1.gain.setValueAtTime(0.035, ambientAudioCtx.currentTime);

    binauralOsc2.type = "sine";
    binauralOsc2.frequency.setValueAtTime(240, ambientAudioCtx.currentTime);
    gain2.gain.setValueAtTime(0.035, ambientAudioCtx.currentTime);

    binauralOsc1.connect(gain1);
    gain1.connect(ambientAudioCtx.destination);
    binauralOsc2.connect(gain2);
    gain2.connect(ambientAudioCtx.destination);

    binauralOsc1.start();
    binauralOsc2.start();
    isBinauralPlaying = true;
    showToast("🧠 40Hz Gamma Focus sound active.", "info");
  } catch (e) {
    console.error(e);
  }
}

function stopBinauralSound() {
  if (binauralOsc1) { binauralOsc1.stop(); binauralOsc1 = null; }
  if (binauralOsc2) { binauralOsc2.stop(); binauralOsc2 = null; }
  isBinauralPlaying = false;
  showToast("🧠 Focus sound stopped.", "info");
}

function updateAmbientSoundUI() {
  const rainBtn = document.getElementById("btn-ambient-rain");
  if (rainBtn) {
    if (isRainPlaying) {
      rainBtn.classList.add("bg-sky-600", "text-white");
      rainBtn.classList.remove("bg-slate-800", "text-slate-300");
    } else {
      rainBtn.classList.remove("bg-sky-600", "text-white");
      rainBtn.classList.add("bg-slate-800", "text-slate-300");
    }
  }
  const focusBtn = document.getElementById("btn-ambient-focus");
  if (focusBtn) {
    if (isBinauralPlaying) {
      focusBtn.classList.add("bg-indigo-600", "text-white");
      focusBtn.classList.remove("bg-slate-800", "text-slate-300");
    } else {
      focusBtn.classList.remove("bg-indigo-600", "text-white");
      focusBtn.classList.add("bg-slate-800", "text-slate-300");
    }
  }
}

// ==========================================
// 4. POMODORO TIMER ENGINE
// ==========================================
let pomodoroTimerId = null;
let pomodoroSecondsLeft = 25 * 60;
let pomodoroRunning = false;

function setPomodoroMinutes(mins) {
  pausePomodoro();
  pomodoroSecondsLeft = mins * 60;
  updatePomodoroDisplay();
}

function startPomodoro() {
  if (pomodoroRunning) return;
  pomodoroRunning = true;
  document.getElementById("btn-pomo-play")?.classList.add("hidden");
  document.getElementById("btn-pomo-pause")?.classList.remove("hidden");

  pomodoroTimerId = setInterval(() => {
    if (pomodoroSecondsLeft > 0) {
      pomodoroSecondsLeft--;
      updatePomodoroDisplay();
    } else {
      pausePomodoro();
      playChime("levelUp");
      addXP(50, "Deep Focus Pomodoro Sprint");
      showToast("🎉 Focus sprint completed! +50 XP", "success");
    }
  }, 1000);
}

function pausePomodoro() {
  pomodoroRunning = false;
  if (pomodoroTimerId) clearInterval(pomodoroTimerId);
  document.getElementById("btn-pomo-play")?.classList.remove("hidden");
  document.getElementById("btn-pomo-pause")?.classList.add("hidden");
}

function resetPomodoro() {
  pausePomodoro();
  pomodoroSecondsLeft = 25 * 60;
  updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
  const m = Math.floor(pomodoroSecondsLeft / 60);
  const s = pomodoroSecondsLeft % 60;
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const el = document.getElementById("pomodoro-timer-display");
  if (el) el.innerText = str;
}

// ==========================================
// 5. SCORE GAP BRIDGE (118 -> 160+)
// ==========================================
function getScoreGapBridge() {
  const latestMock = appState.mocks[0] || { mathScore: 32, reasoningScore: 41, englishScore: 34, gkScore: 11, score: 118 };
  
  const subjects = {
    math: { current: latestMock.mathScore || 32, target: 46, base: 32 },
    reasoning: { current: latestMock.reasoningScore || 41, target: 48, base: 41 },
    english: { current: latestMock.englishScore || 34, target: 44, base: 34 },
    gk: { current: latestMock.gkScore || 11, target: 30, base: 11 }
  };

  const currentTotal = latestMock.score || 118;
  const targetTotal = 168;
  const marksNeeded = Math.max(0, targetTotal - currentTotal);
  const progressPercent = Math.min(100, Math.max(0, Math.round(((currentTotal - 118) / (168 - 118)) * 100)));

  return { subjects, currentTotal, targetTotal, marksNeeded, progressPercent };
}

// ==========================================
// 6. FATIGUE-ADAPTIVE ENERGY SCHEDULER
// ==========================================
function setEnergyLevel(level) {
  appState.energyLevel = level;
  if (level === "low") {
    appState.settings.energyMode = "mvd";
  } else {
    appState.settings.energyMode = "normal";
  }
  saveState();
  appState.lastGeneratedDate = null; // force regen
  generateDailyTasks(getCalendarDayInfo(), appState.settings.energyMode);
  renderApp();
  showToast(`🔋 Energy set to ${level.toUpperCase()}. Today's tasks adapted.`, "info");
}

// ==========================================
// 7. CORPORATE DISGUISE MODE
// ==========================================
function toggleCorporateDisguise() {
  appState.disguiseMode = !appState.disguiseMode;
  const overlay = document.getElementById("corporate-disguise-overlay");
  if (overlay) {
    if (appState.disguiseMode) {
      overlay.classList.remove("hidden");
    } else {
      overlay.classList.add("hidden");
    }
  }
}

// ==========================================
// 8. FORMULA CODEX SEARCH
// ==========================================
function searchCodex(query = "") {
  if (typeof FORMULA_CODEX === 'undefined') return [];
  const q = query.toLowerCase().trim();
  if (!q) return FORMULA_CODEX;
  return FORMULA_CODEX.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.keywords.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
}

// ==========================================
// 9. CLOUD DECK STORE & MODULAR INGESTION
// ==========================================
async function openDeckStoreModal() {
  const modal = document.getElementById('modal-deck-store');
  if (modal) modal.classList.remove('hidden');
  renderDeckStore();
}

function closeDeckStoreModal() {
  const modal = document.getElementById('modal-deck-store');
  if (modal) modal.classList.add('hidden');
}

async function renderDeckStore() {
  const container = document.getElementById('deck-store-list');
  if (!container) return;

  container.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">Loading available cloud packs...</div>`;

  try {
    const res = await fetch('decks/deck-registry.json');
    if (!res.ok) throw new Error("Could not fetch registry");
    const packs = await res.json();

    if (!appState.installedPacks) appState.installedPacks = [];

    container.innerHTML = packs.map(pack => {
      const isInstalled = appState.installedPacks.includes(pack.id);
      return `
        <div class="glass-card rounded-2xl p-4 border border-slate-700/80 space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="text-sm font-bold text-white">${pack.title}</h4>
                <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30 font-semibold">${pack.badge}</span>
              </div>
              <p class="text-xs text-slate-300 mt-1 leading-relaxed">${pack.description}</p>
              <div class="flex items-center space-x-3 text-[11px] text-slate-400 mt-2">
                <span>📁 Category: <strong class="text-indigo-300">${pack.category}</strong></span>
                <span>💾 Size: ${pack.size}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end pt-1">
            <button onclick="installDeckPack('${pack.id}', '${pack.file}')" id="btn-pack-${pack.id}" class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              isInstalled 
                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 active:scale-95'
            }">
              <span>${isInstalled ? '✅' : '⬇️'}</span>
              <span>${isInstalled ? 'Installed (Tap to Re-sync)' : 'Download Pack'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error("Registry load error:", err);
    container.innerHTML = `
      <div class="glass-card rounded-2xl p-4 text-center text-rose-300 text-xs space-y-2">
        <p>⚠️ Could not connect to online registry.</p>
        <p class="text-[11px] text-slate-400">Make sure the 'decks/' folder is uploaded to your GitHub repository.</p>
      </div>
    `;
  }
}

async function installDeckPack(packId, packFile) {
  const btn = document.getElementById(`btn-pack-${packId}`);
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳</span><span>Downloading...</span>`;
  }

  try {
    const res = await fetch(packFile);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const newCards = await res.json();

    if (!Array.isArray(newCards) || newCards.length === 0) {
      throw new Error("Invalid pack format");
    }

    // Merge cards into appState.flashcards without duplicates
    const existingIds = new Set(appState.flashcards.map(c => c.id));
    let addedCount = 0;
    for (const card of newCards) {
      if (!existingIds.has(card.id)) {
        appState.flashcards.push(card);
        addedCount++;
      } else {
        const idx = appState.flashcards.findIndex(c => c.id === card.id);
        if (idx !== -1) {
          appState.flashcards[idx].front = card.front;
          appState.flashcards[idx].back = card.back;
        }
      }
    }

    if (!appState.installedPacks) appState.installedPacks = [];
    if (!appState.installedPacks.includes(packId)) {
      appState.installedPacks.push(packId);
    }

    saveState();
    addXP(50, `Installed ${packId}`);
    showToast(`🎉 Installed ${addedCount} new cards successfully! Ready offline.`, "success");

    renderDeckStore();
    if (typeof filterFlashcards === 'function') filterFlashcards('parmar_polity');
    closeDeckStoreModal();
  } catch (err) {
    console.error("Pack install failed:", err);
    showToast(`❌ Failed to download pack: ${err.message}`, "error");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>⬇️</span><span>Retry Download</span>`;
    }
  }
}

function handleCustomDeckImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const content = e.target.result;
      let importedCards = [];

      if (file.name.endsWith('.json')) {
        importedCards = JSON.parse(content);
      } else if (file.name.endsWith('.csv') || file.name.endsWith('.tsv') || file.name.endsWith('.txt')) {
        const lines = content.split('\n');
        const sep = file.name.endsWith('.tsv') ? '\t' : ',';
        importedCards = lines.filter(l => l.trim().length > 0).map((l, idx) => {
          const parts = l.split(sep);
          return {
            id: `imported-${Date.now()}-${idx}`,
            deck: "custom_import",
            category: "Imported Deck",
            front: parts[0] ? parts[0].trim().replace(/^"|"$/g, '') : 'Question',
            back: parts[1] ? parts.slice(1).join(sep).trim().replace(/^"|"$/g, '') : 'Answer',
            interval: 1, repetition: 0, easeFactor: 2.5, dueDate: new Date().toISOString().split("T")[0]
          };
        });
      }

      if (!Array.isArray(importedCards) || importedCards.length === 0) {
        showToast("❌ No valid cards found in file.", "error");
        return;
      }

      const existingIds = new Set(appState.flashcards.map(c => c.id));
      let count = 0;
      for (const card of importedCards) {
        if (!card.id) card.id = `imported-${Date.now()}-${count}`;
        if (!card.deck) card.deck = 'custom_import';
        if (!existingIds.has(card.id)) {
          appState.flashcards.push(card);
          count++;
        }
      }

      saveState();
      addXP(50, `Imported ${count} flashcards`);
      showToast(`🎉 Imported ${count} cards from file!`, "success");
      closeDeckStoreModal();
      if (typeof filterFlashcards === 'function') filterFlashcards('all');
    } catch (err) {
      showToast(`❌ Import error: ${err.message}`, "error");
    }
  };
  reader.readAsText(file);
}

// ==========================================================
// 10. MORNING QUANT SPEED DOJO & "LEARN FIRST" ACADEMY
// ==========================================================
let currentDojoMainTab = 'learn'; // 'learn' | 'drill' | 'pacer' | 'codex'
let currentLearnSubTab = 'tables'; // 'tables' | 'squares' | 'cubes' | 'fractions' | 'triplets'
let learnSelfTestMode = false;

const SSC_FRACTIONS_DATA = [
  { frac: "1/2", pct: "50%", dec: "0.50", derived: "3/2 = 150%" },
  { frac: "1/3", pct: "33.33%", dec: "33 1/3%", derived: "2/3 = 66.66%" },
  { frac: "1/4", pct: "25%", dec: "0.25", derived: "3/4 = 75%" },
  { frac: "1/5", pct: "20%", dec: "0.20", derived: "2/5 = 40%, 3/5 = 60%, 4/5 = 80%" },
  { frac: "1/6", pct: "16.66%", dec: "16 2/3%", derived: "5/6 = 83.33% (Very Frequent!)" },
  { frac: "1/7", pct: "14.28%", dec: "14 2/7%", derived: "2/7 = 28.57%, 3/7 = 42.85%, 4/7 = 57.14%, 5/7 = 71.42%" },
  { frac: "1/8", pct: "12.5%", dec: "12 1/2%", derived: "3/8 = 37.5%, 5/8 = 62.5%, 7/8 = 87.5% (Must Memorize!)" },
  { frac: "1/9", pct: "11.11%", dec: "11 1/9%", derived: "2/9 = 22.22%, 4/9 = 44.44%, 5/9 = 55.55%, 7/9 = 77.77%" },
  { frac: "1/11", pct: "9.09%", dec: "9 1/11%", derived: "2/11 = 18.18%, 3/11 = 27.27%, 4/11 = 36.36%, 5/11 = 45.45%" },
  { frac: "1/12", pct: "8.33%", dec: "8 1/3%", derived: "5/12 = 41.66%, 7/12 = 58.33%, 11/12 = 91.66%" },
  { frac: "1/13", pct: "7.69%", dec: "7 9/13%", derived: "2/13 = 15.38%" },
  { frac: "1/14", pct: "7.14%", dec: "7 1/7%", derived: "3/14 = 21.42%" },
  { frac: "1/15", pct: "6.66%", dec: "6 2/3%", derived: "2/15 = 13.33%, 4/15 = 26.66%, 7/15 = 46.66%" },
  { frac: "1/16", pct: "6.25%", dec: "6 1/4%", derived: "3/16 = 18.75%, 5/16 = 31.25%, 7/16 = 43.75%" },
  { frac: "1/17", pct: "5.88%", dec: "5 15/17%", derived: "Used in tricky Profit/Loss questions" },
  { frac: "1/18", pct: "5.55%", dec: "5 5/9%", derived: "5/18 = 27.77%" },
  { frac: "1/19", pct: "5.26%", dec: "5 5/19%", derived: "2/19 = 10.52%" },
  { frac: "1/20", pct: "5%", dec: "0.05", derived: "3/20 = 15%, 7/20 = 35%, 9/20 = 45%" },
  { frac: "1/24", pct: "4.16%", dec: "4 1/6%", derived: "5/24 = 20.83%" },
  { frac: "1/25", pct: "4%", dec: "0.04", derived: "3/25 = 12%, 7/25 = 28%" },
  { frac: "1/40", pct: "2.5%", dec: "2 1/2%", derived: "3/40 = 7.5%" }
];

const SSC_TRIPLETS_DATA = [
  { a: 3, b: 4, c: 5, note: "Multiples: (6,8,10), (9,12,15), (12,16,20), (15,20,25), (21,28,35)" },
  { a: 5, b: 12, c: 13, note: "Multiples: (10,24,26), (15,36,39), (20,48,52)" },
  { a: 7, b: 24, c: 25, note: "Multiples: (14,48,50), (21,72,75) — Huge favourite in Circle Chords & Mensuration!" },
  { a: 8, b: 15, c: 17, note: "Multiples: (16,30,34), (24,45,51)" },
  { a: 9, b: 40, c: 41, note: "Multiples: (18,80,82)" },
  { a: 11, b: 60, c: 61, note: "Odd number pattern: 11² = 121 = 60 + 61" },
  { a: 12, b: 35, c: 37, note: "Very frequent in Rhombus diagonals & Trigonometry!" },
  { a: 13, b: 84, c: 85, note: "13² = 169 = 84 + 85" },
  { a: 16, b: 63, c: 65, note: "Asked in Tier-2 Geometry & Trig" },
  { a: 20, b: 21, c: 29, note: "Classic near-isosceles right triangle!" },
  { a: 28, b: 45, c: 53, note: "Tier-2 favourite" },
  { a: 33, b: 56, c: 65, note: "Advanced Tier-2 triplet" },
  { a: 36, b: 77, c: 85, note: "Advanced Tier-2 triplet" },
  { a: 39, b: 80, c: 89, note: "Advanced Tier-2 triplet" }
];

const SSC_CI_RATES = [
  { rate: "4%", yr2: "8.16%", yr3: "12.4864%", yr4: "16.98%" },
  { rate: "5%", yr2: "10.25%", yr3: "15.7625%", yr4: "21.55%" },
  { rate: "6%", yr2: "12.36%", yr3: "19.1016%", yr4: "26.24%" },
  { rate: "8%", yr2: "16.64%", yr3: "25.9712%", yr4: "36.04%" },
  { rate: "10%", yr2: "21.00%", yr3: "33.10%", yr4: "46.41% (Golden Number!)" },
  { rate: "12%", yr2: "25.44%", yr3: "40.4928%", yr4: "57.35%" },
  { rate: "15%", yr2: "32.25%", yr3: "52.0875%", yr4: "74.90%" },
  { rate: "20%", yr2: "44.00%", yr3: "72.80%", yr4: "107.36%" }
];

function openMorningDojo(targetTab = 'learn') {
  if (typeof switchTab === 'function') switchTab('codex');
  switchDojoMainTab(targetTab);
}

function switchDojoMainTab(tab) {
  currentDojoMainTab = tab;
  ['learn', 'drill', 'pacer', 'codex'].forEach(t => {
    const view = document.getElementById(`dojo-view-${t}`);
    const btn = document.getElementById(`dojo-tab-btn-${t}`);
    if (view) {
      if (t === tab) view.classList.remove('hidden');
      else view.classList.add('hidden');
    }
    if (btn) {
      if (t === tab) {
        btn.className = "flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20";
      } else {
        btn.className = "flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 bg-slate-800 text-slate-400 hover:text-white";
      }
    }
  });
  if (tab === 'learn') renderLearnVault();
  if (tab === 'drill') updateDrillStatsUI();
  if (tab === 'codex' && typeof renderCodexList === 'function') renderCodexList();
}

function switchLearnSubTab(subTab) {
  currentLearnSubTab = subTab;
  ['tables', 'squares', 'cubes', 'fractions', 'triplets'].forEach(st => {
    const btn = document.getElementById(`learn-sub-btn-${st}`);
    if (btn) {
      if (st === subTab) {
        btn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow transition whitespace-nowrap";
      } else {
        btn.className = "px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white transition whitespace-nowrap";
      }
    }
  });
  renderLearnVault();
}

function toggleLearnSelfTest() {
  learnSelfTestMode = !learnSelfTestMode;
  const btn = document.getElementById('btn-learn-selftest');
  if (btn) {
    if (learnSelfTestMode) {
      btn.innerHTML = `<span>👁️</span><span>Show All Values</span>`;
      btn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow transition flex items-center space-x-1";
    } else {
      btn.innerHTML = `<span>🙈</span><span>Hide Answers (Self-Test)</span>`;
      btn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-slate-700 transition flex items-center space-x-1";
    }
  }
  renderLearnVault();
}

function speakTableAloud(n) {
  if (!('speechSynthesis' in window)) {
    showToast("❌ Speech synthesis not supported.", "error");
    return;
  }
  window.speechSynthesis.cancel();
  let text = `Table of ${n}. `;
  for (let i = 1; i <= 10; i++) {
    text += `${n} times ${i} is ${n * i}. `;
  }
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.92;
  window.speechSynthesis.speak(utt);
  showToast(`🔊 Reading Table of ${n} aloud...`, "info");
}

function renderLearnVault() {
  const container = document.getElementById('learn-vault-content');
  if (!container) return;

  const valSpan = (ans) => learnSelfTestMode
    ? `<span onclick="this.innerText='${ans}'; this.className='text-emerald-400 font-bold'" class="cursor-pointer px-2 py-0.5 rounded bg-slate-800 text-slate-500 hover:text-slate-300 border border-slate-700 text-[11px] select-none" title="Tap to reveal">? Tap</span>`
    : `<span class="text-amber-300 font-bold">${ans}</span>`;

  if (currentLearnSubTab === 'tables') {
    const primes = [13, 17, 19, 23, 29];
    const others = [12, 14, 15, 16, 18, 21, 22, 24, 25, 26, 27, 28, 30];

    const renderTableCard = (n, isPrime) => {
      let rows = '';
      for (let i = 2; i <= 10; i++) {
        const highlight = (i >= 6 && i <= 9) ? 'bg-slate-900/90 border-l-2 border-amber-500/60 pl-2' : '';
        rows += `
          <div class="flex items-center justify-between py-1 px-1.5 rounded ${highlight} text-xs font-mono">
            <span class="text-slate-300">${n} × ${i} =</span>
            ${valSpan(n * i)}
          </div>
        `;
      }
      return `
        <div class="glass-card rounded-2xl p-3.5 border ${isPrime ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'} space-y-2">
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <div class="flex items-center space-x-1.5">
              <span class="text-sm font-bold ${isPrime ? 'text-amber-300' : 'text-indigo-300'}">Table of ${n}</span>
              ${isPrime ? `<span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">🔥 SSC Prime</span>` : ''}
            </div>
            <button onclick="speakTableAloud(${n})" class="text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300" title="Listen to Table of ${n}">🔊</button>
          </div>
          <div class="space-y-0.5">
            ${rows}
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      <div class="space-y-4">
        <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200 space-y-1">
          <div class="font-bold text-amber-300 flex items-center gap-1.5">🎯 How to Master Tables (Focus on ×6, ×7, ×8, ×9)</div>
          <p class="text-slate-300 leading-relaxed">You already know ×2, ×5, and ×10. In SSC CGL, 90% of calculation traps happen at <strong>×6, ×7, ×8, and ×9 of Prime Numbers (13, 17, 19, 23, 29)</strong>—highlighted below. Toggle <strong>"Hide Answers"</strong> above and tap each row to test your memory!</p>
        </div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400">🔥 Priority 1: The 5 Golden Prime Tables (13, 17, 19, 23, 29)</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          ${primes.map(n => renderTableCard(n, true)).join('')}
        </div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-400 pt-2">🔢 Priority 2: Standard Tables (12 to 30)</h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          ${others.map(n => renderTableCard(n, false)).join('')}
        </div>
      </div>
    `;
  } else if (currentLearnSubTab === 'squares') {
    const renderSquareGroup = (start, end, title) => {
      let items = '';
      for (let n = start; n <= end; n++) {
        items += `
          <div class="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <span class="text-slate-300">${n}² =</span>
            ${valSpan(n * n)}
          </div>
        `;
      }
      return `
        <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-2.5">
          <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wider">${title}</h5>
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            ${items}
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      <div class="space-y-4">
        <!-- 3-Second Mental Square Tricks -->
        <div class="glass-card rounded-2xl p-4 border-l-4 border-amber-500 space-y-2.5 text-xs">
          <h4 class="font-bold text-amber-300 text-sm">⚡ 3-Second Mental Square Shortcuts (Never Multiply Manually!)</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div class="font-bold text-emerald-300">1. Numbers Ending in 5 (e.g., 35², 65²)</div>
              <p class="text-slate-300">Multiply first digit <strong>N × (N + 1)</strong> and attach <strong>25</strong> at the end.</p>
              <p class="font-mono text-amber-200 text-[11px]">• 35² ➔ (3×4) | 25 = <strong>1225</strong><br>• 75² ➔ (7×8) | 25 = <strong>5625</strong></p>
            </div>
            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div class="font-bold text-indigo-300">2. Base 50 Method (35 to 65)</div>
              <p class="text-slate-300">Find difference <strong>d</strong> from 50. Answer = <strong>(25 ± d) | d²</strong> (2 digits).</p>
              <p class="font-mono text-amber-200 text-[11px]">• 46² (d = -4) ➔ (25-4) | 4² = <strong>2116</strong><br>• 56² (d = +6) ➔ (25+6) | 6² = <strong>3136</strong></p>
            </div>
            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div class="font-bold text-purple-300">3. Base 100 Method (85 to 115)</div>
              <p class="text-slate-300">Find difference <strong>d</strong> from 100. Answer = <strong>(Number ± d) | d²</strong>.</p>
              <p class="font-mono text-amber-200 text-[11px]">• 94² (d = -6) ➔ (94-6) | 6² = <strong>8836</strong><br>• 108² (d = +8) ➔ (108+8) | 8² = <strong>11664</strong></p>
            </div>
          </div>
        </div>
        ${renderSquareGroup(1, 20, "Level 1: Squares 1² to 20² (Foundation)")}
        ${renderSquareGroup(21, 40, "Level 2: Squares 21² to 40² (High-Yield Exam Zone)")}
        ${renderSquareGroup(41, 60, "Level 3: Squares 41² to 60² (Use Base-50 Trick!)")}
      </div>
    `;
  } else if (currentLearnSubTab === 'cubes') {
    let cubeItems = '';
    for (let n = 1; n <= 30; n++) {
      cubeItems += `
        <div class="flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border ${n <= 15 ? 'border-amber-500/30' : 'border-slate-800'} text-xs font-mono">
          <span class="text-slate-300">${n}³ =</span>
          ${valSpan(n * n * n)}
        </div>
      `;
    }
    container.innerHTML = `
      <div class="space-y-4">
        <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider">³ Cubes 1³ to 30³ (Essential for CI, Mensuration & Algebra)</h4>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            ${cubeItems}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
            <h5 class="font-bold text-indigo-300 uppercase">⚡ Higher Powers of 2, 3, 5, 6, 7</h5>
            <div class="space-y-1.5 font-mono text-slate-300">
              <div class="p-2 rounded bg-slate-900"><strong>Powers of 2:</strong> 2⁵=32, 2⁶=64, 2⁷=128, 2⁸=256, 2⁹=512, 2¹⁰=<span class="text-amber-300">1024</span></div>
              <div class="p-2 rounded bg-slate-900"><strong>Powers of 3:</strong> 3⁴=81, 3⁵=<span class="text-amber-300">243</span>, 3⁶=<span class="text-amber-300">729</span>, 3⁷=2187</div>
              <div class="p-2 rounded bg-slate-900"><strong>Powers of 5:</strong> 5³=125, 5⁴=<span class="text-amber-300">625</span>, 5⁵=<span class="text-amber-300">3125</span>, 5⁶=15625</div>
              <div class="p-2 rounded bg-slate-900"><strong>Powers of 6 & 7:</strong> 6³=216, 6⁴=<span class="text-amber-300">1296</span> | 7³=343, 7⁴=<span class="text-amber-300">2401</span></div>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
            <h5 class="font-bold text-emerald-300 uppercase">√ Standard Square Roots (For Trig & Mensuration)</h5>
            <div class="grid grid-cols-2 gap-2 font-mono text-slate-300">
              <div class="p-2 rounded bg-slate-900">√2 = <strong class="text-emerald-300">1.414</strong></div>
              <div class="p-2 rounded bg-slate-900">√3 = <strong class="text-emerald-300">1.732</strong></div>
              <div class="p-2 rounded bg-slate-900">√5 = <strong class="text-emerald-300">2.236</strong></div>
              <div class="p-2 rounded bg-slate-900">√6 = <strong class="text-emerald-300">2.449</strong></div>
              <div class="p-2 rounded bg-slate-900">√7 = <strong class="text-emerald-300">2.645</strong></div>
              <div class="p-2 rounded bg-slate-900">√10 = <strong class="text-emerald-300">3.162</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (currentLearnSubTab === 'fractions') {
    container.innerHTML = `
      <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider">% Fraction ↔ Percentage Master Table (1/2 to 1/40)</h4>
          <span class="text-[11px] text-slate-400">Used in Percentage, Profit/Loss, SI/CI & DI</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr class="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                <th class="p-2">Fraction</th>
                <th class="p-2">Decimal %</th>
                <th class="p-2">Mixed Fraction %</th>
                <th class="p-2">🔥 High-Yield Derived Multiples</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/70">
              ${SSC_FRACTIONS_DATA.map(f => `
                <tr class="hover:bg-slate-900/50">
                  <td class="p-2 font-bold text-indigo-300">${f.frac}</td>
                  <td class="p-2">${valSpan(f.pct)}</td>
                  <td class="p-2 text-slate-300">${f.dec}</td>
                  <td class="p-2 text-emerald-300 text-[11px]">${f.derived}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (currentLearnSubTab === 'triplets') {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider">📐 All 14 SSC Pythagorean Triplets (a² + b² = c²)</h4>
          <p class="text-xs text-slate-400">Memorizing these saves 40 seconds in Trigonometry, Circle Chords, Mensuration (Cone slant height l² = r² + h²), and Heights & Distances.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${SSC_TRIPLETS_DATA.map(t => `
              <div class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                <div class="flex items-center justify-between font-mono text-sm">
                  <span class="text-white font-bold">(${t.a}, ${t.b}, ${valSpan(t.c)})</span>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">${t.a}² + ${t.b}² = ${t.c}²</span>
                </div>
                <div class="text-[11px] text-slate-400 mt-1">${t.note}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <h4 class="text-xs font-bold text-emerald-300 uppercase tracking-wider">💰 Compound Interest (CI) Direct Effective Rate Table</h4>
          <p class="text-xs text-slate-400">Never draw a 3-year CI tree for standard rates! Multiply Principal directly by these effective percentages:</p>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                  <th class="p-2">Rate (R%)</th>
                  <th class="p-2">2 Years (2R + R²/100)</th>
                  <th class="p-2">3 Years (3R . 3R² . R³)</th>
                  <th class="p-2">4 Years Net %</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/70">
                ${SSC_CI_RATES.map(r => `
                  <tr class="hover:bg-slate-900/50">
                    <td class="p-2 font-bold text-amber-300">${r.rate}</td>
                    <td class="p-2 text-slate-200">${valSpan(r.yr2)}</td>
                    <td class="p-2 text-emerald-300 font-bold">${valSpan(r.yr3)}</td>
                    <td class="p-2 text-indigo-300">${r.yr4}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

// ==========================================================
// 60-SECOND RAPID-FIRE SPEED DRILL ENGINE
// ==========================================================
let drillActive = false;
let drillCategory = 'primes'; // 'primes' | 'tables' | 'squares' | 'cubes' | 'fractions' | 'triplets' | 'multiply2d' | 'mixed'
let drillTimeLeft = 60;
let drillTimerId = null;
let drillCorrect = 0;
let drillTotal = 0;
let drillStreak = 0;
let drillCurrentQ = null;
let drillMistakes = [];

function setDrillCategory(cat) {
  drillCategory = cat;
  document.querySelectorAll('.drill-cat-btn').forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.className = "drill-cat-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow transition whitespace-nowrap";
    } else {
      btn.className = "drill-cat-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white transition whitespace-nowrap";
    }
  });
}

function generateDrillQuestion(cat) {
  const categories = ['primes', 'tables', 'squares', 'cubes', 'fractions', 'triplets', 'multiply2d'];
  const chosenCat = cat === 'mixed' ? categories[Math.floor(Math.random() * categories.length)] : cat;

  let prompt = "";
  let answer = "";
  let options = [];

  const makeNumericOptions = (correctNum, step = 10) => {
    const set = new Set([correctNum]);
    const offsets = [-step, step, -2 * step, 2 * step, -1, 1, -step + 1, step - 1, 10, -10, 2, -2];
    while (set.size < 4) {
      const off = offsets[Math.floor(Math.random() * offsets.length)];
      const cand = correctNum + off;
      if (cand > 0 && cand !== correctNum) set.add(cand);
    }
    return Array.from(set).sort(() => Math.random() - 0.5).map(String);
  };

  if (chosenCat === 'primes') {
    const primes = [13, 17, 19, 23, 29];
    const p = primes[Math.floor(Math.random() * primes.length)];
    const m = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const ans = p * m;
    prompt = `${p} × ${m} = ?`;
    answer = String(ans);
    options = makeNumericOptions(ans, p);
  } else if (chosenCat === 'tables') {
    const n = Math.floor(Math.random() * 19) + 12; // 12 to 30
    const m = Math.floor(Math.random() * 7) + 3; // 3 to 9
    const ans = n * m;
    prompt = `${n} × ${m} = ?`;
    answer = String(ans);
    options = makeNumericOptions(ans, n);
  } else if (chosenCat === 'squares') {
    const n = Math.floor(Math.random() * 45) + 11; // 11 to 55
    const ans = n * n;
    prompt = `${n}² = ?`;
    answer = String(ans);
    options = makeNumericOptions(ans, 100);
  } else if (chosenCat === 'cubes') {
    const n = Math.floor(Math.random() * 20) + 6; // 6 to 25
    const ans = n * n * n;
    prompt = `${n}³ = ?`;
    answer = String(ans);
    options = makeNumericOptions(ans, 100);
  } else if (chosenCat === 'fractions') {
    const pool = [
      { q: "1/7 in % = ?", a: "14.28%" },
      { q: "3/8 in % = ?", a: "37.5%" },
      { q: "5/8 in % = ?", a: "62.5%" },
      { q: "7/8 in % = ?", a: "87.5%" },
      { q: "5/6 in % = ?", a: "83.33%" },
      { q: "1/12 in % = ?", a: "8.33%" },
      { q: "5/12 in % = ?", a: "41.66%" },
      { q: "4/7 in % = ?", a: "57.14%" },
      { q: "3/7 in % = ?", a: "42.85%" },
      { q: "2/11 in % = ?", a: "18.18%" },
      { q: "1/16 in % = ?", a: "6.25%" },
      { q: "3/16 in % = ?", a: "18.75%" },
      { q: "4/9 in % = ?", a: "44.44%" },
      { q: "1/15 in % = ?", a: "6.66%" }
    ];
    const item = pool[Math.floor(Math.random() * pool.length)];
    prompt = item.q;
    answer = item.a;
    const optSet = new Set([item.a]);
    while (optSet.size < 4) {
      optSet.add(pool[Math.floor(Math.random() * pool.length)].a);
    }
    options = Array.from(optSet).sort(() => Math.random() - 0.5);
  } else if (chosenCat === 'triplets') {
    const t = SSC_TRIPLETS_DATA[Math.floor(Math.random() * SSC_TRIPLETS_DATA.length)];
    const hideIdx = Math.floor(Math.random() * 2); // hide b or c
    if (hideIdx === 0) {
      prompt = `Triplet: (${t.a}, ?, ${t.c})`;
      answer = String(t.b);
      options = makeNumericOptions(t.b, 2);
    } else {
      prompt = `Triplet: (${t.a}, ${t.b}, ?)`;
      answer = String(t.c);
      options = makeNumericOptions(t.c, 2);
    }
  } else {
    // 2-Digit Mental Multiply
    const a = Math.floor(Math.random() * 35) + 15; // 15 to 49
    const b = Math.floor(Math.random() * 15) + 12; // 12 to 26
    const ans = a * b;
    prompt = `${a} × ${b} = ?`;
    answer = String(ans);
    options = makeNumericOptions(ans, 10);
  }

  return { prompt, answer, options };
}

function startSpeedDrill() {
  if (drillTimerId) clearInterval(drillTimerId);
  drillActive = true;
  drillTimeLeft = 60;
  drillCorrect = 0;
  drillTotal = 0;
  drillStreak = 0;
  drillMistakes = [];

  document.getElementById('drill-idle-screen')?.classList.add('hidden');
  document.getElementById('drill-result-screen')?.classList.add('hidden');
  document.getElementById('drill-active-screen')?.classList.remove('hidden');

  nextDrillPrompt();
  updateDrillHUD();

  drillTimerId = setInterval(() => {
    drillTimeLeft--;
    updateDrillHUD();
    if (drillTimeLeft <= 0) {
      finishSpeedDrill();
    }
  }, 1000);
}

function stopSpeedDrill() {
  if (drillTimerId) clearInterval(drillTimerId);
  drillActive = false;
  document.getElementById('drill-active-screen')?.classList.add('hidden');
  document.getElementById('drill-idle-screen')?.classList.remove('hidden');
}

function updateDrillHUD() {
  const timerEl = document.getElementById('drill-timer-val');
  const scoreEl = document.getElementById('drill-score-val');
  const streakEl = document.getElementById('drill-streak-val');
  if (timerEl) timerEl.innerText = `${drillTimeLeft}s`;
  if (scoreEl) scoreEl.innerText = `${drillCorrect}`;
  if (streakEl) streakEl.innerText = `🔥 ${drillStreak}`;
}

function nextDrillPrompt() {
  drillCurrentQ = generateDrillQuestion(drillCategory);
  const qEl = document.getElementById('drill-question-text');
  const optsEl = document.getElementById('drill-options-grid');
  const fbEl = document.getElementById('drill-feedback-banner');
  if (fbEl) fbEl.innerHTML = '';
  if (qEl) qEl.innerText = drillCurrentQ.prompt;
  if (optsEl) {
    optsEl.innerHTML = drillCurrentQ.options.map(opt => `
      <button onclick="answerDrillQuestion('${opt}')" class="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-indigo-600/40 border border-slate-700 hover:border-indigo-500 text-white font-mono font-bold text-base sm:text-lg active:scale-95 transition shadow-md">
        ${opt}
      </button>
    `).join('');
  }
}

function answerDrillQuestion(selected) {
  if (!drillActive || !drillCurrentQ) return;
  drillTotal++;
  const fbEl = document.getElementById('drill-feedback-banner');

  if (selected === drillCurrentQ.answer) {
    drillCorrect++;
    drillStreak++;
    playChime("success");
    updateDrillHUD();
    nextDrillPrompt();
  } else {
    drillStreak = 0;
    drillMistakes.push({ q: drillCurrentQ.prompt, correct: drillCurrentQ.answer, yours: selected });
    updateDrillHUD();
    if (fbEl) {
      fbEl.innerHTML = `<div class="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold text-center">❌ Oops! ${drillCurrentQ.prompt.replace('?', drillCurrentQ.answer)}</div>`;
    }
    setTimeout(() => {
      if (drillActive) nextDrillPrompt();
    }, 650);
  }
}

function finishSpeedDrill() {
  if (drillTimerId) clearInterval(drillTimerId);
  drillActive = false;

  if (!appState.speedDojo) appState.speedDojo = { bestQPM: 0, totalDrills: 0 };
  appState.speedDojo.totalDrills = (appState.speedDojo.totalDrills || 0) + 1;
  if (drillCorrect > (appState.speedDojo.bestQPM || 0)) {
    appState.speedDojo.bestQPM = drillCorrect;
  }
  saveState();
  addXP(35, `Morning Speed Drill: ${drillCorrect} QPM`);
  updateDrillStatsUI();

  document.getElementById('drill-active-screen')?.classList.add('hidden');
  const resScreen = document.getElementById('drill-result-screen');
  if (resScreen) {
    resScreen.classList.remove('hidden');
    const acc = drillTotal > 0 ? Math.round((drillCorrect / drillTotal) * 100) : 0;
    resScreen.innerHTML = `
      <div class="glass-card-accent rounded-3xl p-6 text-center space-y-4 border border-amber-500/40">
        <div class="text-3xl">🏆</div>
        <h4 class="text-lg font-bold text-white">60-Second Sprint Complete!</h4>
        <div class="grid grid-cols-3 gap-3 max-w-md mx-auto font-mono">
          <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[10px] text-slate-400">SPEED (QPM)</div>
            <div class="text-xl font-bold text-amber-400">${drillCorrect}</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[10px] text-slate-400">ACCURACY</div>
            <div class="text-xl font-bold text-emerald-400">${acc}%</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <div class="text-[10px] text-slate-400">BEST RECORD</div>
            <div class="text-xl font-bold text-indigo-400">${appState.speedDojo.bestQPM}</div>
          </div>
        </div>
        ${drillMistakes.length > 0 ? `
          <div class="text-left max-w-md mx-auto p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5 text-xs">
            <div class="font-bold text-rose-300">📝 Review Your Mistakes from This Sprint:</div>
            ${drillMistakes.map(m => `<div class="font-mono text-slate-200">• ${m.q.replace('?', '')} <strong class="text-emerald-400">${m.correct}</strong> <span class="text-slate-500">(You tapped ${m.yours})</span></div>`).join('')}
          </div>
        ` : `<div class="text-xs text-emerald-300 font-semibold">✨ 100% Flawless Accuracy! Zero mistakes!</div>`}
        <div class="flex justify-center space-x-3 pt-2">
          <button onclick="startSpeedDrill()" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition">🔄 Play Again (+35 XP)</button>
          <button onclick="switchDojoMainTab('learn')" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition">📚 Revise Tables/Squares</button>
        </div>
      </div>
    `;
  }
}

function updateDrillStatsUI() {
  const best = appState?.speedDojo?.bestQPM || 0;
  const badge1 = document.getElementById('dojo-best-qpm-badge');
  const badge2 = document.getElementById('cockpit-best-qpm-badge');
  if (badge1) badge1.innerText = `Best Speed: ${best} QPM`;
  if (badge2) badge2.innerText = `Best: ${best} QPM`;
}

// ==========================================================
// 45-SECOND PYQ BOOK PACER STOPWATCH
// ==========================================================
let pacerRunning = false;
let pacerSeconds = 0;
let pacerTimerId = null;
let pacerLaps = [];

function togglePyqPacer() {
  if (pacerRunning) {
    clearInterval(pacerTimerId);
    pacerRunning = false;
  } else {
    pacerRunning = true;
    pacerTimerId = setInterval(() => {
      pacerSeconds++;
      renderPyqPacerUI();
    }, 1000);
  }
  renderPyqPacerUI();
}

function logPyqLap(status = 'solved') {
  if (pacerSeconds === 0 && !pacerRunning) return;
  pacerLaps.unshift({
    qNum: pacerLaps.length + 1,
    sec: pacerSeconds,
    status
  });
  pacerSeconds = 0;
  if (!pacerRunning) {
    pacerRunning = true;
    pacerTimerId = setInterval(() => {
      pacerSeconds++;
      renderPyqPacerUI();
    }, 1000);
  }
  playChime("success");
  renderPyqPacerUI();
}

function resetPyqPacer() {
  if (pacerTimerId) clearInterval(pacerTimerId);
  pacerRunning = false;
  pacerSeconds = 0;
  pacerLaps = [];
  renderPyqPacerUI();
}

function renderPyqPacerUI() {
  const timeEl = document.getElementById('pacer-time-display');
  const zoneEl = document.getElementById('pacer-zone-badge');
  const btnEl = document.getElementById('pacer-toggle-btn');
  const avgEl = document.getElementById('pacer-avg-display');
  const lapsEl = document.getElementById('pacer-laps-list');

  if (timeEl) {
    const mins = String(Math.floor(pacerSeconds / 60)).padStart(2, '0');
    const secs = String(pacerSeconds % 60).padStart(2, '0');
    timeEl.innerText = `${mins}:${secs}`;
    if (pacerSeconds <= 40) timeEl.className = "text-4xl sm:text-5xl font-mono font-bold text-emerald-400";
    else if (pacerSeconds <= 55) timeEl.className = "text-4xl sm:text-5xl font-mono font-bold text-amber-400";
    else timeEl.className = "text-4xl sm:text-5xl font-mono font-bold text-rose-400 animate-pulse";
  }

  if (zoneEl) {
    if (pacerSeconds <= 40) {
      zoneEl.innerText = "🟢 Topper Speed Zone (< 40s)";
      zoneEl.className = "text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold";
    } else if (pacerSeconds <= 55) {
      zoneEl.innerText = "🟡 Exam Threshold (40s – 55s)";
      zoneEl.className = "text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold";
    } else {
      zoneEl.innerText = "🔴 Over 55s! Use Option Elimination / Skip!";
      zoneEl.className = "text-xs px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold";
    }
  }

  if (btnEl) {
    btnEl.innerText = pacerRunning ? "⏸ Pause Timer" : "▶ Start Question Timer";
  }

  if (avgEl) {
    if (pacerLaps.length === 0) {
      avgEl.innerText = "0 Qs | Avg: 0s/Q";
    } else {
      const sum = pacerLaps.reduce((a, b) => a + b.sec, 0);
      const avg = Math.round(sum / pacerLaps.length);
      avgEl.innerText = `${pacerLaps.length} Qs Solved | Avg: ${avg}s / Question`;
    }
  }

  if (lapsEl) {
    lapsEl.innerHTML = pacerLaps.map(l => {
      const badge = l.sec <= 40 ? '🟢 Fast' : l.sec <= 55 ? '🟡 OK' : '🔴 Slow';
      return `
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <span class="text-slate-300 font-bold">Question #${l.qNum} (${l.status.toUpperCase()})</span>
          <div class="flex items-center space-x-2">
            <span class="text-white font-bold">${l.sec}s</span>
            <span>${badge}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}


