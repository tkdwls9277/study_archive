import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import type { WorkRecord } from "../types/index";
import { formatDate } from "../utils/date";
import { formatWorkTime } from "../utils/work";

interface WorkPanelProps {
  isOpen: boolean;
  weekRecords: WorkRecord[];
  weekOffset: number;
  selectedDate: string | null;
  weekRangeText: string;
  weekTotal: number;
  weekTarget: number;
  overtime: { minutes: number; isOver: boolean };
  onToggle: () => void;
  onWeekOffsetChange: (offset: number) => void;
  onEditClick: (record: WorkRecord) => void;
  onDateClick: (date: string) => void;
}

export const WorkPanel: React.FC<WorkPanelProps> = ({
  isOpen,
  weekRecords,
  weekOffset,
  selectedDate,
  weekRangeText,
  weekTotal,
  weekTarget,
  overtime,
  onToggle,
  onWeekOffsetChange,
  onEditClick,
  onDateClick,
}) => {
  const { t, locale } = useTranslation();

  // 요일 이름을 번역에 따라 반환
  const getDayName = (dayIndex: number): string => {
    const dayNames = {
      en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      ko: ["일", "월", "화", "수", "목", "금", "토"],
      zh: ["日", "一", "二", "三", "四", "五", "六"],
      ja: ["日", "月", "火", "水", "木", "金", "土"],
    };
    return dayNames[locale][dayIndex];
  };

  const calculateWorkMinutes = (checkIn: string, checkOut: string): number => {
    const [inH, inM] = checkIn.split(":").map(Number);
    const [outH, outM] = checkOut.split(":").map(Number);

    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;

    let diff = outMinutes - inMinutes;
    if (diff < 0) diff += 24 * 60;

    // 점심시간 1시간 제외
    const LUNCH_BREAK_MINUTES = 60;
    return diff > LUNCH_BREAK_MINUTES ? diff - LUNCH_BREAK_MINUTES : diff;
  };

  return (
    <aside className={`work-panel ${isOpen ? "open" : "collapsed"}`}>
      <div className="panel-header panel-header-right" onClick={onToggle} style={{ cursor: "pointer" }}>
        <span className="panel-title">📊 {t.work.title}</span>
        <button
          className="panel-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label={`${t.work.title} ${isOpen ? "collapse" : "expand"}`}
        >
          {isOpen ? "▶" : "◀"}
        </button>
      </div>
      {!isOpen && (
        <div className="collapsed-indicator" onClick={onToggle} style={{ cursor: "pointer" }}>
          <span className="vertical-text">📊 {t.work.title}</span>
        </div>
      )}

      {isOpen && (
        <div className="work-records">
          {/* 주간 네비게이션 */}
          <div className="week-navigation">
            <button
              className="week-nav-btn"
              onClick={() => onWeekOffsetChange(weekOffset - 1)}
              aria-label={t.work.prevWeek}
              title={t.work.prevWeek}
            >
              ◀
            </button>
            <div className="week-range">{weekRangeText}</div>
            <button
              className="week-nav-btn"
              onClick={() => onWeekOffsetChange(weekOffset + 1)}
              aria-label={t.work.nextWeek}
              title={t.work.nextWeek}
            >
              ▶
            </button>
          </div>

          <div className="week-total">
            <div className="week-total-label">{t.work.weekTotal}</div>
            <div className="week-total-value">
              {formatWorkTime(weekTotal, t.work.hour, t.work.minute)} /{" "}
              {formatWorkTime(weekTarget, t.work.hour, t.work.minute)}
            </div>
            {overtime.minutes > 0 && (
              <div className={`overtime-info ${overtime.isOver ? "over" : "under"}`}>
                {overtime.isOver ? `⏰ ${t.work.overtime}: +` : `⚠️ ${t.work.undertime}: -`}
                {formatWorkTime(overtime.minutes, t.work.hour, t.work.minute)}
              </div>
            )}
          </div>

          <div className="work-list">
            {weekRecords.map((record) => {
              const date = new Date(record.date);
              const dayName = getDayName(date.getDay());
              const isToday = record.date === formatDate(new Date());
              const workMinutes =
                record.checkIn && record.checkOut ? calculateWorkMinutes(record.checkIn, record.checkOut) : 0;
              const targetMinutes = 8 * 60; // 8시간
              const percentage = workMinutes > 0 ? Math.round((workMinutes / targetMinutes) * 100) : 0;

              return (
                <div
                  key={record.date}
                  className={`work-record-item ${isToday ? "today" : ""} ${
                    selectedDate === record.date ? "selected" : ""
                  }`}
                  onClick={() => onDateClick(record.date)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="work-record-header">
                    <div className="work-record-date">
                      {date.getMonth() + 1}/{date.getDate()} ({dayName})
                      {record.isVacation && <span className="vacation-badge">🌴 {t.work.vacation}</span>}
                    </div>
                    <button
                      className="work-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(record);
                      }}
                      aria-label={t.common.edit}
                    >
                      ✎
                    </button>
                  </div>

                  {record.isVacation ? (
                    <div className="work-record-vacation">{t.work.vacation}</div>
                  ) : record.checkIn || record.checkOut ? (
                    <>
                      <div className="work-record-times">
                        <span className="work-record-time">
                          {record.checkIn ? `${t.work.checkIn} ${record.checkIn}` : t.work.checkIn}
                        </span>
                        <span className="work-record-time">
                          {record.checkOut ? `${t.work.checkOut} ${record.checkOut}` : t.work.checkOut}
                        </span>
                      </div>

                      {record.checkIn && record.checkOut && (
                        <div className="work-record-summary">
                          <div className="work-record-hours">
                            {formatWorkTime(workMinutes, t.work.hour, t.work.minute)}
                          </div>
                          <div className="work-progress-bar">
                            <div
                              className="work-progress-fill"
                              style={{
                                width: `${Math.min(percentage, 100)}%`,
                                backgroundColor:
                                  percentage >= 100
                                    ? "rgba(34, 197, 94, 0.7)"
                                    : percentage >= 80
                                    ? "rgba(251, 191, 36, 0.7)"
                                    : "rgba(239, 68, 68, 0.5)",
                              }}
                            />
                          </div>
                          <div className="work-percentage">{percentage}%</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="work-record-empty">{t.work.noRecord}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
