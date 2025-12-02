import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import type { Todo, TodoGroup } from "../types/index";
import { formatDate } from "../utils/date";

interface TodoPanelProps {
  isOpen: boolean;
  todos: Todo[];
  todosByDate: TodoGroup[];
  remainingCount: number;
  selectedDate: string | null;
  newTodoText: string;
  showCompletedTodos: boolean;
  todoRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  onToggle: () => void;
  onAddTodo: () => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onNewTodoTextChange: (text: string) => void;
  onSelectedDateChange: (date: string | null) => void;
  onShowCompletedTodosToggle: () => void;
}

export const TodoPanel: React.FC<TodoPanelProps> = ({
  isOpen,
  todos,
  todosByDate,
  remainingCount,
  selectedDate,
  newTodoText,
  showCompletedTodos,
  todoRefs,
  onToggle,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onNewTodoTextChange,
  onSelectedDateChange,
  onShowCompletedTodosToggle,
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

  return (
    <aside className={`todo-panel ${isOpen ? "open" : "collapsed"}`}>
      <div className="panel-header panel-header-right" onClick={onToggle} style={{ cursor: "pointer" }}>
        {isOpen && (
          <span className="panel-title">
            📝 {t.todo.title} ({remainingCount}/{todos.length})
          </span>
        )}
        <button
          className="panel-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label={`${t.todo.title} ${isOpen ? "collapse" : "expand"}`}
        >
          {isOpen ? "▶" : "◀"}
        </button>
      </div>
      {!isOpen && (
        <div className="collapsed-indicator" onClick={onToggle} style={{ cursor: "pointer" }}>
          <span className="vertical-text">✓ {t.todo.title}</span>
        </div>
      )}

      {isOpen && (
        <>
          <div className="todo-input-container">
            {selectedDate &&
              (() => {
                const dateObj = new Date(selectedDate);
                const isToday = selectedDate === formatDate(new Date());
                const dayName = getDayName(dateObj.getDay());

                return (
                  <div className="selected-date-info">
                    <span className="selected-date-text">
                      {isToday ? t.todo.today : `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${dayName})`}
                    </span>
                    <button
                      className="clear-date-btn"
                      onClick={() => onSelectedDateChange(null)}
                      title={t.todo.clearDate}
                    >
                      ✕
                    </button>
                  </div>
                );
              })()}
            <div className="todo-input-row">
              <input
                className="panel-input"
                placeholder={t.todo.placeholder}
                value={newTodoText}
                onChange={(e) => onNewTodoTextChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAddTodo();
                }}
              />
              <button className="panel-add-btn" onClick={onAddTodo}>
                {t.common.add}
              </button>
            </div>

            {/* 완료된 Todo 표시 토글 */}
            <div className="todo-filter-row">
              <button
                className={`todo-filter-btn ${showCompletedTodos ? "active" : ""}`}
                onClick={onShowCompletedTodosToggle}
                title={showCompletedTodos ? t.todo.completed : t.todo.filterAll}
              >
                {showCompletedTodos ? `👁️ ${t.todo.completed}` : `👁️‍🗨️ ${t.todo.filterAll}`}
              </button>
            </div>
          </div>

          <div className="todo-list-container">
            {todosByDate.map(({ date, todos: dateTodos }) => {
              const dateObj = new Date(date);
              const isToday = date === formatDate(new Date());
              const dayName = getDayName(dateObj.getDay());
              const remaining = dateTodos.filter((t) => !t.done).length;

              return (
                <div
                  key={date}
                  className={`todo-date-section ${selectedDate === date ? "selected" : ""}`}
                  ref={(el) => {
                    todoRefs.current[date] = el;
                  }}
                >
                  <div className="todo-date-header">
                    <span className={`todo-date-label ${isToday ? "today" : ""}`}>
                      {dateObj.getMonth() + 1}/{dateObj.getDate()} ({dayName})
                      {isToday && <span className="today-badge">{t.todo.today}</span>}
                    </span>
                    <span className="todo-count">
                      {remaining}/{dateTodos.length}
                    </span>
                  </div>
                  <ul className="todo-list">
                    {dateTodos.map((todo) => (
                      <li key={todo.id} className="todo-item">
                        <input type="checkbox" checked={todo.done} onChange={() => onToggleTodo(todo.id)} />
                        <span className={`todo-text ${todo.done ? "done" : ""}`}>{todo.text}</span>
                        <button
                          className="panel-delete-btn"
                          onClick={() => onDeleteTodo(todo.id)}
                          aria-label={t.common.delete}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {todos.length === 0 && <div className="todo-empty">{t.todo.empty}</div>}
          </div>
        </>
      )}
    </aside>
  );
};
