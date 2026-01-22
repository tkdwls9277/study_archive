import React, { useEffect, useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface TimeEditModalProps {
  isOpen: boolean;
  date: string;
  checkIn: string;
  checkOut: string;
  isVacation: boolean;
  leaveType?: "none" | "annual" | "half";
  onClose: () => void;
  onSave: () => void;
  onCheckInChange: (checkIn: string) => void;
  onCheckOutChange: (checkOut: string) => void;
  onIsVacationChange: (isVacation: boolean) => void;
  onLeaveTypeChange?: (leaveType: "none" | "annual" | "half") => void;
}

export const TimeEditModal: React.FC<TimeEditModalProps> = ({
  isOpen,
  date,
  checkIn,
  checkOut,
  isVacation,
  leaveType = "none",
  onClose,
  onSave,
  onCheckInChange,
  onCheckOutChange,
  onIsVacationChange,
  onLeaveTypeChange,
}) => {
  const { t } = useTranslation();
  const firstInputRef = useRef<HTMLInputElement>(null);

  // leaveType에 따라 현재 상태 결정 (하위 호환성)
  const currentLeaveType = leaveType !== "none" ? leaveType : isVacation ? "annual" : "none";

  // 모달이 열릴 때 첫 번째 입력창에 포커스
  useEffect(() => {
    if (isOpen && firstInputRef.current && currentLeaveType === "none") {
      firstInputRef.current.focus();
    }
  }, [isOpen, currentLeaveType]);

  // ESC 키로 닫기, Enter 키로 저장
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        onSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onSave]);

  if (!isOpen) return null;

  // 휴가 타입 변경 핸들러
  const handleLeaveTypeChange = (newType: "none" | "annual" | "half") => {
    if (onLeaveTypeChange) {
      onLeaveTypeChange(newType);
    }
    // 하위 호환성을 위해 isVacation도 업데이트
    onIsVacationChange(newType === "annual");

    // 연차 선택 시에만 시간 초기화 (반차는 시간 입력 필요)
    if (newType === "annual") {
      onCheckInChange("");
      onCheckOutChange("");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="modal-title">{t.work.edit}</h2>
        <div className="modal-date-display">{date}</div>

        {/* 근무 유형 선택 */}
        <div className="modal-section">
          <label className="modal-label">{t.work.selectLeaveType}</label>
          <div className="leave-type-options">
            <label className="leave-type-option">
              <input
                type="radio"
                name="leaveType"
                value="none"
                checked={currentLeaveType === "none"}
                onChange={() => handleLeaveTypeChange("none")}
              />
              <span className="leave-type-icon">🏢</span>
              <span className="leave-type-text">{t.work.leaveTypeNone}</span>
            </label>
            <label className="leave-type-option">
              <input
                type="radio"
                name="leaveType"
                value="annual"
                checked={currentLeaveType === "annual"}
                onChange={() => handleLeaveTypeChange("annual")}
              />
              <span className="leave-type-icon">🌴</span>
              <span className="leave-type-text">{t.work.leaveTypeAnnual}</span>
            </label>
            <label className="leave-type-option">
              <input
                type="radio"
                name="leaveType"
                value="half"
                checked={currentLeaveType === "half"}
                onChange={() => handleLeaveTypeChange("half")}
              />
              <span className="leave-type-icon">🌤️</span>
              <span className="leave-type-text">{t.work.leaveTypeHalf}</span>
            </label>
          </div>
        </div>

        {currentLeaveType === "none" && (
          <>
            <label className="modal-label">
              {t.work.checkInTime}
              <input
                ref={firstInputRef}
                className="modal-input"
                type="time"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                placeholder="HH:MM"
              />
            </label>
            <label className="modal-label">
              {t.work.checkOutTime}
              <input
                className="modal-input"
                type="time"
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                placeholder="HH:MM"
              />
            </label>
            <div className="modal-hint">💡 {t.work.lunchExcluded}</div>
          </>
        )}

        {currentLeaveType === "annual" && <div className="modal-hint">💡 {t.work.annualLeaveNote}</div>}

        {currentLeaveType === "half" && (
          <>
            <label className="modal-label">
              {t.work.checkInTime}
              <input
                ref={firstInputRef}
                className="modal-input"
                type="time"
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                placeholder="HH:MM"
              />
            </label>
            <label className="modal-label">
              {t.work.checkOutTime}
              <input
                className="modal-input"
                type="time"
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                placeholder="HH:MM"
              />
            </label>
            <div className="modal-hint">💡 {t.work.halfDayLeaveNote}</div>
          </>
        )}

        <div className="modal-actions">
          <button className="modal-btn secondary" onClick={onClose}>
            {t.common.cancel} (ESC)
          </button>
          <button className="modal-btn primary" onClick={onSave}>
            {t.common.save} (Ctrl+Enter)
          </button>
        </div>
      </div>
    </div>
  );
};
