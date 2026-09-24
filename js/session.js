/**
 * Study Sync - Time Zone & Session Manager
 */

export class SessionManager {
  constructor(partnerTimeZone = 'America/New_York') {
    this.partnerTimeZone = partnerTimeZone;
    this.sessionTimer = null;
    this.graceTimer = null;
    this.hourlyInterval = null;
    this.sessionEndTime = null;
  }

  // 1. Get current time in partner's local time zone
  getPartnerTime() {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: this.partnerTimeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date());
  }

  // 2. Convert a local date/time selection to UTC ISO String
  localToUTC(localDateTimeString) {
    const localDate = new Date(localDateTimeString);
    return localDate.toISOString();
  }

  // 3. Start the 10-Minute Grace Period Countdown
  startGraceCountdown(onTick, onExpired) {
    let graceSecondsRemaining = 600; // 10 minutes

    this.graceTimer = setInterval(() => {
      graceSecondsRemaining--;

      const minutes = Math.floor(graceSecondsRemaining / 60);
      const seconds = graceSecondsRemaining % 60;
      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      onTick(formatted);

      if (graceSecondsRemaining <= 0) {
        clearInterval(this.graceTimer);
        onExpired();
      }
    }, 1000);
  }

  // 4. Stop Grace Period Countdown (Called when opening photo is taken)
  clearGraceCountdown() {
    if (this.graceTimer) {
      clearInterval(this.graceTimer);
      this.graceTimer = null;
    }
  }

  // 5. Schedule Hourly Verification Prompts
  startHourlyCheckins(onHourlyPrompt) {
    const ONE_HOUR_MS = 60 * 60 * 1000;
    
    this.hourlyInterval = setInterval(() => {
      onHourlyPrompt();
    }, ONE_HOUR_MS);
  }

  // 6. End active timers
  stopSession() {
    if (this.sessionTimer) clearInterval(this.sessionTimer);
    if (this.graceTimer) clearInterval(this.graceTimer);
    if (this.hourlyInterval) clearInterval(this.hourlyInterval);
  }
}