import React, { useEffect, useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface OptionsModalProps {
  isOpen: boolean;
  userName: string;
  showFavorites: boolean;
  showTodos: boolean;
  showWork: boolean;
  onClose: () => void;
  onSave: () => void;
  onUserNameChange: (userName: string) => void;
  onShowFavoritesChange: (show: boolean) => void;
  onShowTodosChange: (show: boolean) => void;
  onShowWorkChange: (show: boolean) => void;
}

export const OptionsModal: React.FC<OptionsModalProps> = ({
  isOpen,
  userName,
  showFavorites,
  showTodos,
  showWork,
  onClose,
  onSave,
  onUserNameChange,
  onShowFavoritesChange,
  onShowTodosChange,
  onShowWorkChange,
}) => {
  const { t } = useTranslation();
  const nameInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 이름 입력창에 포커스
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 키로 닫기, Ctrl+Enter로 저장
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
        <h2 className="modal-title">⚙️ {t.options.title}</h2>
        <label className="modal-label">
          {t.options.name}
          <input
            ref={nameInputRef}
            className="modal-input"
            type="text"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            placeholder={t.options.namePlaceholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
            }}
          />
        </label>
        <div className="modal-hint">💡 {t.options.nameHint}</div>

        <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1rem" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "0.75rem", fontWeight: 600 }}>{t.options.panelSettings}</h3>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input type="checkbox" checked={showFavorites} onChange={(e) => onShowFavoritesChange(e.target.checked)} />
            <span>{t.options.showFavorites}</span>
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
            }}
          >
            <input type="checkbox" checked={showTodos} onChange={(e) => onShowTodosChange(e.target.checked)} />
            <span>{t.options.showTodos}</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" checked={showWork} onChange={(e) => onShowWorkChange(e.target.checked)} />
            <span>{t.options.showWork}</span>
          </label>
        </div>

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
