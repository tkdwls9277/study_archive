import React from "react";
import type { WorkRecord } from "../types/index";

interface WorkCheckButtonsProps {
  todayRecord: WorkRecord | undefined;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onCheckInEdit: () => void;
  onCheckOutEdit: () => void;
  translations: {
    clickToEdit: string;
    rightClickToEdit: string;
    clickToCheckIn: string;
    clickToCheckOut: string;
    checkInButton: string;
    checkInButtonRecorded: string;
    checkOutButton: string;
    checkOutButtonRecorded: string;
    todayWork: string;
    hour: string;
    minute: string;
    lunchExcluded: string;
  };
}

/**
 * 출퇴근 체크 버튼 컴포넌트
 */
export const WorkCheckButtons: React.FC<WorkCheckButtonsProps> = ({
  todayRecord,
  onCheckIn,
  onCheckOut,
  onCheckInEdit,
  onCheckOutEdit,
  translations: t,
}) => {
  // 근무시간 계산 (점심시간 1시간 제외, 반차는 제외 안함)
  const calculateWorkMinutes = (checkIn: string, checkOut: string): number => {
    const [inHour, inMin] = checkIn.split(":").map(Number);
    const [outHour, outMin] = checkOut.split(":").map(Number);
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    const totalMinutes = outMinutes - inMinutes;

    // 반차인 경우 점심시간 제외하지 않음
    const isHalfDay = todayRecord?.leaveType === "half";
    if (isHalfDay) {
      return Math.max(0, totalMinutes);
    }

    // 일반 근무는 점심시간 1시간 제외
    return Math.max(0, totalMinutes - 60);
  };

  const formatWorkTime = (minutes: number, hourText: string, minuteText: string): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}${hourText} ${m}${minuteText}`;
    if (h > 0) return `${h}${hourText}`;
    return `${m}${minuteText}`;
  };

  return (
    <div className="work-check-container">
      <div className="work-check-buttons">
        <button
          className={`work-btn check-in ${todayRecord?.checkIn ? "recorded" : ""}`}
          onClick={todayRecord?.checkIn ? onCheckInEdit : onCheckIn}
          onContextMenu={(e) => {
            e.preventDefault();
            onCheckInEdit();
          }}
          title={
            todayRecord?.checkIn
              ? `${t.clickToEdit} | ${t.rightClickToEdit}`
              : `${t.clickToCheckIn} | ${t.rightClickToEdit}`
          }
        >
          {todayRecord?.checkIn ? t.checkInButtonRecorded : t.checkInButton}
          {todayRecord?.checkIn && <span className="work-time-badge">{todayRecord.checkIn}</span>}
        </button>
        <button
          className={`work-btn check-out ${todayRecord?.checkOut ? "recorded" : ""}`}
          onClick={todayRecord?.checkOut ? onCheckOutEdit : onCheckOut}
          onContextMenu={(e) => {
            e.preventDefault();
            onCheckOutEdit();
          }}
          title={
            todayRecord?.checkOut
              ? `${t.clickToEdit} | ${t.rightClickToEdit}`
              : `${t.clickToCheckOut} | ${t.rightClickToEdit}`
          }
        >
          {todayRecord?.checkOut ? t.checkOutButtonRecorded : t.checkOutButton}
          {todayRecord?.checkOut && <span className="work-time-badge">{todayRecord.checkOut}</span>}
        </button>
      </div>

      {todayRecord?.checkIn && todayRecord?.checkOut && (
        <div className="today-work-summary">
          {t.todayWork}:{" "}
          {formatWorkTime(calculateWorkMinutes(todayRecord.checkIn, todayRecord.checkOut), t.hour, t.minute)}
          {todayRecord.leaveType === "half" ? "" : ` (${t.lunchExcluded})`}
        </div>
      )}
    </div>
  );
};
