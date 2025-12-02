import React from "react";
import { useTranslation } from "../hooks/useTranslation";

interface FocusInputProps {
  focus: string;
  focusInputValue: string;
  onFocusInputChange: (value: string) => void;
  onFocusKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FocusInput: React.FC<FocusInputProps> = ({
  focus,
  focusInputValue,
  onFocusInputChange,
  onFocusKeyDown,
}) => {
  const { t } = useTranslation();

  return (
    <div className="app-focus">
      <div className="app-focus-label">{t.main.focusLabel}</div>
      <input
        className="app-focus-input"
        placeholder={t.main.focusPlaceholder}
        value={focusInputValue}
        onChange={(e) => onFocusInputChange(e.target.value)}
        onKeyDown={onFocusKeyDown}
      />
      {focus && <div className="app-focus-display">{focus}</div>}
    </div>
  );
};
