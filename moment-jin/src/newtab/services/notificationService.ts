import type { Notification, NotificationAlert, NotificationTiming } from "../types/notification";

const STORAGE_KEY = "moment-jin-notifications";

// 알림 시간 계산 (분 단위)
const TIMING_MINUTES: Record<NotificationTiming, number> = {
  "at-time": 0,
  "5min-before": 5,
  "10min-before": 10,
  "30min-before": 30,
  "1hour-before": 60,
  "1day-before": 1440, // 24 * 60
};

export const notificationService = {
  // 모든 알림 가져오기
  getAll(): Notification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get notifications:", error);
      return [];
    }
  },

  // 알림 추가
  add(notification: Omit<Notification, "id" | "createdAt" | "updatedAt">): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const notifications = this.getAll();
    notifications.push(newNotification);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));

    return newNotification;
  },

  // 알림 수정
  update(id: string, updates: Partial<Omit<Notification, "id" | "createdAt">>): Notification | null {
    const notifications = this.getAll();
    const index = notifications.findIndex((n) => n.id === id);

    if (index === -1) return null;

    notifications[index] = {
      ...notifications[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    return notifications[index];
  },

  // 알림 삭제
  delete(id: string): boolean {
    const notifications = this.getAll();
    const filtered = notifications.filter((n) => n.id !== id);

    if (filtered.length === notifications.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // 알림 토글
  toggle(id: string): Notification | null {
    const notifications = this.getAll();
    const notification = notifications.find((n) => n.id === id);

    if (!notification) return null;

    return this.update(id, { isEnabled: !notification.isEnabled });
  },

  // 특정 시간에 울릴 알림 계산
  calculateAlertTime(targetDateTime: string, timing: NotificationTiming): Date {
    const targetDate = new Date(targetDateTime);
    const minutesBefore = TIMING_MINUTES[timing];
    return new Date(targetDate.getTime() - minutesBefore * 60 * 1000);
  },

  // 다음 알림 가져오기 (가장 가까운 미래의 알림)
  getNextAlert(): NotificationAlert | null {
    const notifications = this.getAll().filter((n) => n.isEnabled);
    const now = new Date();

    let nextAlert: NotificationAlert | null = null;
    let minTimeDiff = Infinity;

    for (const notification of notifications) {
      for (const timing of notification.timings) {
        const alertTime = this.calculateAlertTime(notification.targetDateTime, timing);
        const timeDiff = alertTime.getTime() - now.getTime();

        // 미래의 알림만 고려
        if (timeDiff > 0 && timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          nextAlert = {
            notificationId: notification.id,
            title: notification.title,
            description: notification.description,
            timing,
            alertTime: alertTime.toISOString(),
          };
        }
      }
    }

    return nextAlert;
  },

  // 현재 시간에 울려야 할 알림들 가져오기 (백그라운드에서 사용)
  getAlertsToTrigger(): NotificationAlert[] {
    const notifications = this.getAll().filter((n) => n.isEnabled);
    const now = new Date();
    const alerts: NotificationAlert[] = [];

    for (const notification of notifications) {
      for (const timing of notification.timings) {
        const alertTime = this.calculateAlertTime(notification.targetDateTime, timing);
        const timeDiff = Math.abs(alertTime.getTime() - now.getTime());

        // 1분 이내면 알림 트리거 (오차 범위)
        if (timeDiff < 60 * 1000) {
          alerts.push({
            notificationId: notification.id,
            title: notification.title,
            description: notification.description,
            timing,
            alertTime: alertTime.toISOString(),
          });
        }
      }
    }

    return alerts;
  },

  // 알림 시간 텍스트 변환
  getTimingText(timing: NotificationTiming): string {
    const texts: Record<NotificationTiming, string> = {
      "at-time": "정시",
      "5min-before": "5분 전",
      "10min-before": "10분 전",
      "30min-before": "30분 전",
      "1hour-before": "1시간 전",
      "1day-before": "1일 전",
    };
    return texts[timing];
  },

  // 날짜 포맷팅
  formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month}월 ${day}일 ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  },

  // 남은 시간 텍스트
  getTimeUntilText(isoString: string): string {
    const target = new Date(isoString);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff < 0) return "지난 알림";

    const minutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 후`;
    if (hours > 0) return `${hours}시간 후`;
    if (minutes > 0) return `${minutes}분 후`;
    return "곧";
  },
};
