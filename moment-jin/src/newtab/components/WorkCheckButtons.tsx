import React, { useState } from "react";
import type { WorkRecord } from "../types/index";
import { TimePicker } from "./TimePicker";

interface WorkCheckButtonsProps {
  todayRecord: WorkRecord | undefined;
  onSave: (type: "in" | "out", time: string, leaveType: "none" | "annual" | "half") => void;
  translations: {
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

function getCurrentTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

const LEAVE_TYPES = [
  { key: "none",   icon: "🏢", label: "일반 근무" },
  { key: "annual", icon: "🌴", label: "연차" },
  { key: "half",   icon: "🌤️", label: "반차" },
] as const;

export const WorkCheckButtons: React.FC<WorkCheckButtonsProps> = ({
  todayRecord,
  onSave,
  translations: t,
}) => {
  const [activeType, setActiveType] = useState<"in" | "out" | null>(null);
  const [time, setTime] = useState("");
  const [leaveType, setLeaveType] = useState<"none" | "annual" | "half">("none");

  const openPanel = (type: "in" | "out") => {
    if (activeType === type) {
      setActiveType(null);
      return;
    }
    const existingTime =
      type === "in" ? todayRecord?.checkIn : todayRecord?.checkOut;
    setTime(existingTime || getCurrentTime());
    setLeaveType(todayRecord?.leaveType || "none");
    setActiveType(type);
  };

  const handleSave = () => {
    if (!activeType) return;
    onSave(activeType, leaveType === "annual" ? "" : time, leaveType);
    setActiveType(null);
  };

  const handleCancel = () => setActiveType(null);

  // 근무 시간 계산
  const calculateWorkMinutes = (checkIn: string, checkOut: string): number => {
    const [ih, im] = checkIn.split(":").map(Number);
    const [oh, om] = checkOut.split(":").map(Number);
    const total = (oh * 60 + om) - (ih * 60 + im);
    return Math.max(0, todayRecord?.leaveType === "half" ? total : total - 60);
  };

  const formatWorkTime = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}${t.hour} ${m}${t.minute}`;
    if (h > 0) return `${h}${t.hour}`;
    return `${m}${t.minute}`;
  };

  return (
    <div className="work-check-container">
      {/* 출/퇴근 버튼 */}
      <div className="work-check-buttons">
        <button
          className={`work-btn check-in${todayRecord?.checkIn ? " recorded" : ""}${activeType === "in" ? " active-panel" : ""}`}
          onClick={() => openPanel("in")}
        >
          {todayRecord?.checkIn ? t.checkInButtonRecorded : t.checkInButton}
          {todayRecord?.checkIn && (
            <span className="work-time-badge">{todayRecord.checkIn}</span>
          )}
        </button>
        <button
          className={`work-btn check-out${todayRecord?.checkOut ? " recorded" : ""}${activeType === "out" ? " active-panel" : ""}`}
          onClick={() => openPanel("out")}
        >
          {todayRecord?.checkOut ? t.checkOutButtonRecorded : t.checkOutButton}
          {todayRecord?.checkOut && (
            <span className="work-time-badge">{todayRecord.checkOut}</span>
          )}
        </button>
      </div>

      {/* 인라인 패널 */}
      {activeType && (
        <div className="check-panel">
          {/* 출근일 때만 근무 유형 표시 */}
          {activeType === "in" && (
            <div className="check-panel-leave">
              {LEAVE_TYPES.map(({ key, icon, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`check-panel-leave-btn${leaveType === key ? " active" : ""}`}
                  onClick={() => setLeaveType(key)}
                >
                  <span className="cp-leave-icon">{icon}</span>
                  <span className="cp-leave-label">{label}</span>
                </button>
              ))}
            </div>
          )}

          {/* 연차 외엔 시간 입력 */}
          {leaveType !== "annual" && (
            <TimePicker
              label={activeType === "in" ? "출근 시간" : "퇴근 시간"}
              value={time}
              onChange={setTime}
            />
          )}

          {leaveType === "annual" && (
            <div className="check-panel-note">💡 연차는 8시간으로 계산됩니다.</div>
          )}

          {/* 확인/취소 */}
          <div className="check-panel-actions">
            <button type="button" className="check-panel-cancel" onClick={handleCancel}>
              취소
            </button>
            <button type="button" className="check-panel-save" onClick={handleSave}>
              {activeType === "in" ? "출근 기록" : "퇴근 기록"}
            </button>
          </div>
        </div>
      )}

      {/* 오늘 근무 요약 */}
      {!activeType && todayRecord?.checkIn && todayRecord?.checkOut && (
        <div className="today-work-summary">
          {t.todayWork}:{" "}
          {formatWorkTime(calculateWorkMinutes(todayRecord.checkIn, todayRecord.checkOut))}
          {todayRecord.leaveType !== "half" && ` (${t.lunchExcluded})`}
        </div>
      )}
    </div>
  );
};
