# Study Sync

---

## 1. Product Overview

**Study Sync** is a mutual accountability study platform built around pair-enforced consistency. The app requires a minimum of two connected users who sign a mutual commitment pact. By combining live-only camera submissions, session-gated live location tracking, and real-time partner nudges, the app eliminates passive tracking and holds users accountable across any time zone.

---

## 2. Core Features & Rules

### A. Mutual Onboarding & Commitment

* **Minimum Group Size:** Requires at least 2 connected partners to unlock study session features.
* **The Commitment Pact:** Users must digitally sign a mutual agreement promising consistency and full partner transparency before scheduling sessions.

### B. Flexible & Time-Zone-Aware Scheduling

* **Asynchronous Sessions:** Partners can study at completely different local times (e.g., User A studies at 9:00 AM in Dubai; User B studies at 9:00 PM in New York).
* **Time Zone Normalization:** Schedules are stored globally in UTC and dynamically rendered in each user’s local time zone on a shared dashboard.

### C. Live Location & Session Lifecycle

* **10-Minute Grace Period:** For a scheduled start time (e.g., 9:00 AM), the user must submit an opening live photo by 9:10 AM to start the session.
* **Session-Gated Live Tracking:**
* Live GPS tracking **turns ON** only after the opening photo is verified.
* Live GPS tracking **turns OFF** immediately once the final session-ending photo is submitted.


* **Hourly Interim Check-ins:** Hourly prompts require a live photo to verify continued presence at the study location.

### D. Verification & Anti-Cheating

* **In-App Live Camera Only:** File manager and photo gallery access are completely disabled to prevent pre-recorded uploads.
* **Server-Side Verification:** Time-stamping and grace-period countdowns are managed server-side to prevent local device time manipulation.

### E. Nudge & Engagement System

* **Partner Nudges:** If a user is close to missing a grace window or hourly check-in, their partner can tap a button to send an urgent notification ("Your partner is waiting for your check-in!").
* **Consistency Streaks:** Successfully completing planned study sessions builds shared and individual streaks; missed check-ins log a strike on the session report.

---

## 3. End-to-End User Flow

```
[ Sign Up & Profile Setup ]
            │
            ▼
[ Connect Partner ] ──▶ Minimum 2 users connected
            │
            ▼
[ Sign Digital Commitment Pact ]
            │
            ▼
[ Schedule Session ] ──▶ Set local date, start time, and target duration
            │
            ▼
 ┌─────────────────────────────────────────────────────────────┐
 │ ACTIVE SESSION LIFECYCLE                                    │
 ├─────────────────────────────────────────────────────────────┤
 │ 1. Scheduled Start Time Reached                             │
 │    └─▶ 10-Minute Grace Window Starts                        │
 │                                                             │
 │ 2. Submit Opening Live Camera Photo                         │
 │    └─▶ Live Location Tracking ACTIVATED                    │
 │                                                             │
 │ 3. Hourly Check-in Prompts                                  │
 │    ├─▶ Prompt triggered every 60 minutes                    │
 │    └─▶ Partner can send "Nudge" if response is pending      │
 │                                                             │
 │ 4. Session End Time Reached                                 │
 │    └─▶ Submit Final Live Camera Photo                       │
 │                                                             │
 │ 5. Live Location Tracking DEACTIVATED                       │
 └─────────────────────────────────────────────────────────────┘
            │
            ▼
[ Session Summary & Streak Updated ]

```

---

## 4. Technical Architecture Specifications

| Module | Technical Implementation |
| --- | --- |
| **Authentication** | OAuth 2.0 / Firebase Auth with mandatory 2-user pairing key |
| **Camera Module** | Native Camera API integration with gallery picker explicit restriction |
| **Location Tracking** | Foreground Service / Native Geolocation API enabled strictly between start/end photos |
| **Time Handling** | UTC server-side cron triggers converted to client `Intl.DateTimeFormat` |
| **Real-Time Data** | WebSockets / Firebase Realtime Database for live feed updates and nudges |

---

## 5. UI/UX Screen Architecture

1. **Dashboard:** Displays partner’s local time, upcoming scheduled sessions, and live streak counters.
2. **Scheduling Modal:** Interface to select study days, start times, and duration in local system time.
3. **Live Session Screen:** Displays live timer, current location map badge, photo capture button, and partner status updates.
4. **Partner Overview Screen:** Displays partner's live location map (when active), latest verified photo feed, and the "Nudge Partner" action button.