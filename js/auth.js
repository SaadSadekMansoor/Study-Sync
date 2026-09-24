/**
 * Study Sync - Nudge & Notification System
 */

export class NotificationSystem {
  constructor() {
    this.permissionGranted = false;
    this.initPermissions();
  }

  async initPermissions() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      this.permissionGranted = permission === 'granted';
    }
  }

  // Trigger local notification when partner sends a nudge
  receiveNudge(senderName) {
    if (this.permissionGranted) {
      new Notification('Study Sync Alert 🔔', {
        body: `${senderName} is waiting for your study check-in photo!`,
        icon: '/icon.png'
      });
    } else {
      alert(`🔔 NUDGE FROM ${senderName}: Time to submit your verification photo!`);
    }
  }
}