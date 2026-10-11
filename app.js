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

