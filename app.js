/**
 * Nordic Modern Personal Timepiece & Space
 * Real-time clock, localized date & timezone, dynamic greeting, and customizable name.
 */

// DOM Elements
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const meridiemEl = document.getElementById('meridiem');
const fullDateTextEl = document.getElementById('fullDateText');
const timezoneTextEl = document.getElementById('timezoneText');
const gmtOffsetTextEl = document.getElementById('gmtOffsetText');
const greetingTimeEl = document.getElementById('greetingTime');

const userNameDisplay = document.getElementById('userNameDisplay');
const userNameInput = document.getElementById('userNameInput');
const editNameBtn = document.getElementById('editNameBtn');
const avatarInitial = document.getElementById('avatarInitial');

const formatToggleBtn = document.getElementById('formatToggle');
const formatTextEl = document.getElementById('formatText');

// State Management
const STORAGE_KEYS = {
  USER_NAME: 'nordic_space_user_name',
  TIME_FORMAT: 'nordic_space_time_format', // '24h' or '12h'
};

let currentFormat = localStorage.getItem(STORAGE_KEYS.TIME_FORMAT) || '24h';
let savedUserName = localStorage.getItem(STORAGE_KEYS.USER_NAME);
if (!savedUserName || savedUserName === 'Alex') {
  savedUserName = 'Ryan Lin';
  localStorage.setItem(STORAGE_KEYS.USER_NAME, 'Ryan Lin');
}

/**
 * Initialize User Profile
 */
function initUserProfile() {
  updateUserDisplay(savedUserName);

  // Click on name to edit
  userNameDisplay.addEventListener('click', enterEditMode);
  editNameBtn.addEventListener('click', enterEditMode);

  // Key & blur handlers for input
  userNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      commitNameChange();
    } else if (e.key === 'Escape') {
      cancelEditMode();
    }
  });

  userNameInput.addEventListener('blur', () => {
    commitNameChange();
  });
}

function updateUserDisplay(name) {
  const safeName = name.trim() || 'Ryan Lin';
  userNameDisplay.textContent = safeName;
  document.title = `${safeName} · Personal Timepiece`;
  avatarInitial.textContent = safeName.charAt(0).toUpperCase();
}

function enterEditMode() {
  userNameInput.value = userNameDisplay.textContent;
  userNameDisplay.classList.add('hidden');
  editNameBtn.classList.add('hidden');
  userNameInput.classList.remove('hidden');
  userNameInput.focus();
  userNameInput.select();
}

function commitNameChange() {
  if (userNameInput.classList.contains('hidden')) return;

  const newName = userNameInput.value.trim() || 'Ryan Lin';
  savedUserName = newName;
  localStorage.setItem(STORAGE_KEYS.USER_NAME, newName);

  updateUserDisplay(newName);
  exitEditMode();
}

function cancelEditMode() {
  exitEditMode();
}

function exitEditMode() {
  userNameInput.classList.add('hidden');
  userNameDisplay.classList.remove('hidden');
  editNameBtn.classList.remove('hidden');
}

/**
 * Format Toggle Handler (12H / 24H)
 */
function initFormatToggle() {
  updateFormatUI();

  formatToggleBtn.addEventListener('click', () => {
    currentFormat = currentFormat === '24h' ? '12h' : '24h';
    localStorage.setItem(STORAGE_KEYS.TIME_FORMAT, currentFormat);
    updateFormatUI();
    updateClock(); // Immediately refresh clock display
  });
}

function updateFormatUI() {
  if (currentFormat === '24h') {
    formatTextEl.textContent = '24H';
    meridiemEl.classList.add('hidden');
  } else {
    formatTextEl.textContent = '12H';
    meridiemEl.classList.remove('hidden');
  }
}

/**
 * Detect & Display Timezone & Offset
 */
function initTimezone() {
  try {
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local Time';
    timezoneTextEl.textContent = tzName;

    // Calculate GMT Offset
    const now = new Date();
    const offsetMinutes = -now.getTimezoneOffset();
    const offsetHours = offsetMinutes / 60;
    const sign = offsetHours >= 0 ? '+' : '-';
    const absHours = Math.abs(offsetHours);
    const formattedOffset = `GMT${sign}${absHours % 1 === 0 ? absHours : absHours.toFixed(1)}`;

    gmtOffsetTextEl.textContent = formattedOffset;
  } catch (err) {
    timezoneTextEl.textContent = 'Local Time';
    gmtOffsetTextEl.textContent = 'UTC';
  }
}

/**
 * Calculate Appropriate Greeting
 */
function updateGreeting(hours24) {
  let greeting = 'Good day';
  if (hours24 >= 5 && hours24 < 12) {
    greeting = 'Good morning';
  } else if (hours24 >= 12 && hours24 < 17) {
    greeting = 'Good afternoon';
  } else if (hours24 >= 17 && hours24 < 22) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good night';
  }

  if (greetingTimeEl.textContent !== greeting) {
    greetingTimeEl.textContent = greeting;
  }
}

/**
 * Main Precision Clock Engine
 */
function updateClock() {
  const now = new Date();
  const rawHours = now.getHours();
  const rawMinutes = now.getMinutes();
  const rawSeconds = now.getSeconds();

  // Dynamic greeting based on 24h hour
  updateGreeting(rawHours);

  // Time calculation
  let displayHours = rawHours;
  let meridiem = '';

  if (currentFormat === '12h') {
    meridiem = rawHours >= 12 ? 'PM' : 'AM';
    displayHours = rawHours % 12;
    displayHours = displayHours ? displayHours : 12; // '0' becomes '12'
    meridiemEl.textContent = meridiem;
  }

  // Zero-padding
  hoursEl.textContent = String(displayHours).padStart(2, '0');
  minutesEl.textContent = String(rawMinutes).padStart(2, '0');
  secondsEl.textContent = String(rawSeconds).padStart(2, '0');

  // Full Date display (e.g. Wednesday, September 16, 2026)
  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  fullDateTextEl.textContent = now.toLocaleDateString(undefined, dateOptions);
}

// Synchronize timer precisely on the second boundary
function startClockEngine() {
  updateClock();
  
  // Calculate milliseconds until next exact second to avoid tick drift
  const now = new Date();
  const delayUntilNextSecond = 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 1000);
  }, delayUntilNextSecond);
}

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initUserProfile();
  initFormatToggle();
  initTimezone();
  startClockEngine();
});
