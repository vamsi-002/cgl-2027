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
