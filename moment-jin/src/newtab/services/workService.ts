import { DEFAULT_CHECK_IN_TIME, DEFAULT_CHECK_OUT_TIME, WORK_HOURS_PER_DAY, WORK_HOURS_PER_WEEK } from "../constants";
import type { OvertimeInfo, WorkRecord } from "../types";
import { formatDate, getCurrentTimeString } from "../utils/date";
import { calculateWorkMinutes } from "../utils/work";

/**
 * 근무 기록 관리 서비스
 */
export class WorkService {
  /**
   * Work 기록 저장
   */
  static saveWorkRecords(workRecords: WorkRecord[]): void {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ workRecords });
    }
  }

  /**
   * 출근 체크 (즉시 현재 시간)
   */
  static checkIn(workRecords: WorkRecord[]): WorkRecord[] {
    const now = new Date();
    const today = formatDate(now);
    const currentTime = getCurrentTimeString();

    const existingIndex = workRecords.findIndex((r) => r.date === today);

    if (existingIndex >= 0) {
      const updated = [...workRecords];
      updated[existingIndex] = { ...updated[existingIndex], checkIn: currentTime };
      return updated;
    } else {
      const newRecord: WorkRecord = { date: today, checkIn: currentTime };
      return [...workRecords, newRecord];
    }
  }

  /**
   * 퇴근 체크 (즉시 현재 시간)
   */
  static checkOut(workRecords: WorkRecord[]): WorkRecord[] {
    const now = new Date();
    const today = formatDate(now);
    const currentTime = getCurrentTimeString();

    const existingIndex = workRecords.findIndex((r) => r.date === today);

    if (existingIndex >= 0) {
      const updated = [...workRecords];
      updated[existingIndex] = { ...updated[existingIndex], checkOut: currentTime };
      return updated;
    } else {
      const newRecord: WorkRecord = { date: today, checkOut: currentTime };
      return [...workRecords, newRecord];
    }
  }

  /**
   * 시간 수정 저장
   */
  static saveTimeEdit(
    workRecords: WorkRecord[],
    editingDate: string,
    editingCheckIn: string,
    editingCheckOut: string,
    editingIsVacation: boolean
  ): WorkRecord[] {
    if (!editingDate) return workRecords;

    const existingIndex = workRecords.findIndex((r) => r.date === editingDate);

    const updatedRecord: WorkRecord = {
      date: editingDate,
      checkIn: editingIsVacation ? undefined : editingCheckIn || undefined,
      checkOut: editingIsVacation ? undefined : editingCheckOut || undefined,
      isVacation: editingIsVacation || undefined,
    };

    if (existingIndex >= 0) {
      const updated = [...workRecords];
      updated[existingIndex] = updatedRecord;
      return updated;
    } else {
      return [...workRecords, updatedRecord];
    }
  }

  /**
   * 주간 기록 가져오기 (월-금)
   */
  static getWeekRecords(workRecords: WorkRecord[], weekOffset: number): WorkRecord[] {
    const today = new Date();
    const weekRecords: WorkRecord[] = [];

    // 이번 주 월요일 구하기
    const currentDay = today.getDay(); // 0(일) ~ 6(토)
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
    const thisMonday = new Date(today);
    thisMonday.setDate(today.getDate() - daysFromMonday + weekOffset * 7);

    // 월~금 5일치 기록
    for (let i = 0; i < 5; i++) {
      const date = new Date(thisMonday);
      date.setDate(thisMonday.getDate() + i);
      const dateStr = formatDate(date);

      const record = workRecords.find((r) => r.date === dateStr);
      weekRecords.push(record || { date: dateStr });
    }

    return weekRecords;
  }

  /**
   * 주간 총 근무시간 계산
   */
  static calculateWeekTotal(weekRecords: WorkRecord[]): number {
    let totalMinutes = 0;

    weekRecords.forEach((record) => {
      if (record.isVacation) {
        // 연차는 근무시간에 포함하지 않음
      } else if (record.checkIn && record.checkOut) {
        totalMinutes += calculateWorkMinutes(record.checkIn, record.checkOut);
      }
    });

    return totalMinutes;
  }

  /**
   * 주간 목표 시간 계산
   */
  static calculateWeekTarget(weekRecords: WorkRecord[]): number {
    let vacationDays = 0;

    weekRecords.forEach((record) => {
      if (record.isVacation) {
        vacationDays++;
      }
    });

    const targetMinutes = WORK_HOURS_PER_WEEK * 60;
    return targetMinutes - vacationDays * WORK_HOURS_PER_DAY * 60;
  }

  /**
   * 현재까지 근무해야 할 시간 계산
   */
  static calculateExpectedHours(weekRecords: WorkRecord[], weekOffset: number): number {
    const today = new Date();
    const todayStr = formatDate(today);

    // 다른 주를 보고 있으면 전체 주간 목표 반환
    if (weekOffset !== 0) {
      return this.calculateWeekTarget(weekRecords);
    }

    let expectedMinutes = 0;
    let reachedToday = false;

    weekRecords.forEach((record) => {
      if (reachedToday) return;

      const recordDate = new Date(record.date);
      const isBeforeOrToday = recordDate <= today;

      if (isBeforeOrToday) {
        if (record.isVacation) {
          // 연차는 계산하지 않음
        } else {
          expectedMinutes += WORK_HOURS_PER_DAY * 60;
        }
      }

      if (record.date === todayStr) {
        reachedToday = true;
      }
    });

    return expectedMinutes;
  }

  /**
   * 초과/미달 시간 계산
   */
  static calculateOvertime(weekRecords: WorkRecord[], weekOffset: number): OvertimeInfo {
    const worked = this.calculateWeekTotal(weekRecords);
    const expected = this.calculateExpectedHours(weekRecords, weekOffset);
    const diff = worked - expected;

    return {
      minutes: Math.abs(diff),
      isOver: diff > 0,
    };
  }

  /**
   * 주간 날짜 범위 텍스트
   */
  static getWeekRangeText(weekRecords: WorkRecord[]): string {
    if (weekRecords.length === 0) return "";

    const firstDate = new Date(weekRecords[0].date);
    const lastDate = new Date(weekRecords[weekRecords.length - 1].date);

    const formatShort = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
    return `${formatShort(firstDate)} - ${formatShort(lastDate)}`;
  }

  /**
   * 시간 수정 모달 초기 데이터 가져오기
   */
  static getEditModalData(record: WorkRecord): {
    checkIn: string;
    checkOut: string;
    isVacation: boolean;
  } {
    return {
      checkIn: record.checkIn || DEFAULT_CHECK_IN_TIME,
      checkOut: record.checkOut || DEFAULT_CHECK_OUT_TIME,
      isVacation: record.isVacation || false,
    };
  }

  /**
   * 출근 수정 모달 초기 데이터
   */
  static getCheckInEditData(workRecords: WorkRecord[]): {
    date: string;
    checkIn: string;
    checkOut: string;
    isVacation: boolean;
  } {
    const now = new Date();
    const today = formatDate(now);
    const existingRecord = workRecords.find((r) => r.date === today);

    return {
      date: today,
      checkIn: existingRecord?.checkIn || DEFAULT_CHECK_IN_TIME,
      checkOut: existingRecord?.checkOut || "",
      isVacation: existingRecord?.isVacation || false,
    };
  }

  /**
   * 퇴근 수정 모달 초기 데이터
   */
  static getCheckOutEditData(workRecords: WorkRecord[]): {
    date: string;
    checkIn: string;
    checkOut: string;
    isVacation: boolean;
  } {
    const now = new Date();
    const today = formatDate(now);
    const existingRecord = workRecords.find((r) => r.date === today);

    return {
      date: today,
      checkIn: existingRecord?.checkIn || "",
      checkOut: existingRecord?.checkOut || DEFAULT_CHECK_OUT_TIME,
      isVacation: existingRecord?.isVacation || false,
    };
  }
}
