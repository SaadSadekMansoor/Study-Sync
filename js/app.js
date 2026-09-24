import { SessionManager } from './session.js';
import { NotificationSystem } from './auth.js';

// Initialize Managers
const sessionMgr = new SessionManager('America/New_York'); // Example partner time zone
const notifySys = new NotificationSystem();

// DOM Elements
const partnerTimeDisplay = document.getElementById('partner-time');
const nudgeBtn = document.getElementById('nudge-btn');
const graceTimerDisplay = document.getElementById('grace-timer');
const graceNotice = document.getElementById('grace-period-notice');

// 1. Live Partner Clock Update (Every second)
setInterval(() => {
  if (partnerTimeDisplay) {
    partnerTimeDisplay.textContent = sessionMgr.getPartnerTime();
  }
}, 1000);

// 2. Handle Nudge Button Click
nudgeBtn.addEventListener('click', () => {
  // Simulating sending nudge to partner
  nudgeBtn.disabled = true;
  nudgeBtn.textContent = 'Nudge Sent! 🔔';
  
  setTimeout(() => {
    nudgeBtn.disabled = false;
    nudgeBtn.textContent = 'Send Nudge 🔔';
  }, 30000); // 30-second cooldown
});

// 3. Update Session Start Flow
const originalStartBtn = document.getElementById('start-session-btn');
originalStartBtn.addEventListener('click', () => {
  // Start Grace Period Countdown
  sessionMgr.startGraceCountdown(
    (formattedTime) => {
      graceTimerDisplay.textContent = formattedTime;
    },
    () => {
      alert('Grace period expired! Session marked as missed.');
      sessionMgr.stopSession();
    }
  );

  // Enable Nudge button for testing
  nudgeBtn.disabled = false;
});

// 4. Update Photo Capture Flow
const originalCaptureBtn = document.getElementById('capture-btn');
originalCaptureBtn.addEventListener('click', () => {
  // Stop grace countdown upon photo submission
  sessionMgr.clearGraceCountdown();
  graceNotice.classList.add('hidden');

  // Start Hourly Prompts
  sessionMgr.startHourlyCheckins(() => {
    alert('⏰ Hourly Verification Time! Please snap a live photo within 5 minutes.');
  });
});