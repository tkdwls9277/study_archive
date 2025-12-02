import React, { useEffect, useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface TimeEditModalProps {
  isOpen: boolean;
  date: string;
  checkIn: string;
  checkOut: string;
  isVacation: boolean;
  onClose: () => void;
  onSave: () => void;
  onCheckInChange: (checkIn: string) => void;
  onCheckOutChange: (checkOut: string) => void;
  onIsVacationChange: (isVacation: boolean) => void;
}

export const TimeEditModal: React.FC<TimeEditModalProps> = ({
  isOpen,
  date,
  checkIn,
  checkOut,
  isVacation,
  onClose,
  onSave,
  onCheckInChange,
  onCheckOutChange,
  onIsVacationChange,
}) => {
  const { t } = useTranslation();
  const firstInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 첫 번째 입력창에 포커스
  useEffect(() => {
    if (isOpen && firstInputRef.current && !isVacation) {
      firstInputRef.current.focus();
    }
  }, [isOpen, isVacation]);

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

        <label className="modal-checkbox-label">
          <input
            type="checkbox"
            checked={isVacation}
            onChange={(e) => onIsVacationChange(e.target.checked)}
            className="modal-checkbox"
          />
          <span>🌴 {t.work.isVacation}</span>
        </label>

        {!isVacation && (
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
          </>
        )}

        <div className="modal-hint">{isVacation ? `💡 ${t.work.vacationNote}` : `💡 ${t.work.vacationNote}`}</div>
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
