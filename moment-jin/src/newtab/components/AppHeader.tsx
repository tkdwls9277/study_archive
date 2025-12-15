import React from "react";
import type { WorkRecord } from "../types/index";
import { FocusInput } from "./FocusInput";
import { NextNotification } from "./NextNotification";
import { WorkCheckButtons } from "./WorkCheckButtons";
import { Weather } from "./Weather";

interface AppHeaderProps {
  time: string;
  greeting: string;
  focus: string;
  focusInputValue: string;
  todayRecord: WorkRecord | undefined;
  showWorkPanel: boolean;
  showNotificationPanel: boolean;
  showFocusSection: boolean;
  weatherApiKey: string;
  onFocusInputChange: (value: string) => void;
  onFocusKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onFocusBlur: () => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onCheckInEdit: () => void;
  onCheckOutEdit: () => void;
  onSettingsClick: () => void;
  workTranslations: {
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
 * 앱 헤더 영역 (시간, 인사말, 오늘의 목표, 알림, 출퇴근)
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  time,
  greeting,
  focus,
  focusInputValue,
  todayRecord,
  showWorkPanel,
  showNotificationPanel,
  showFocusSection,
  weatherApiKey,
  onFocusInputChange,
  onFocusKeyDown,
  onFocusBlur,
  onCheckIn,
  onCheckOut,
  onCheckInEdit,
  onCheckOutEdit,
  onSettingsClick,
  workTranslations,
}) => {
  return (
    <div className="app-top">
      {/* 시간 + 날씨 위젯 */}
      <div className="time-weather-row">
        <div className="app-time">{time}</div>
        <Weather compact apiKey={weatherApiKey} onSettingsClick={onSettingsClick} />
      </div>

      <div className="app-greeting">{greeting}</div>

      {/* 오늘의 목표 - 표시 설정에 따라 조건부 렌더링 */}
      {showFocusSection && (
        <FocusInput
          focus={focus}
          focusInputValue={focusInputValue}
          onFocusInputChange={onFocusInputChange}
          onFocusKeyDown={onFocusKeyDown}
          onFocusBlur={onFocusBlur}
        />
      )}

      {/* 다음 알림 - 알림 패널이 활성화된 경우만 표시 */}
      {showNotificationPanel && <NextNotification />}

      {/* 출퇴근 체크 - 근무 기록 패널이 활성화된 경우만 표시 */}
      {showWorkPanel && (
        <WorkCheckButtons
          todayRecord={todayRecord}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          onCheckInEdit={onCheckInEdit}
          onCheckOutEdit={onCheckOutEdit}
          translations={workTranslations}
        />
      )}
    </div>
  );
};
