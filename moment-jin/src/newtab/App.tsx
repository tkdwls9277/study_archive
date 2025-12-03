import React, { useEffect, useMemo, useRef, useState } from "react";
import { FavoritesPanel } from "./components/FavoritesPanel";
import { FocusInput } from "./components/FocusInput";
import { TodoPanel } from "./components/TodoPanel";
import { WorkPanel } from "./components/WorkPanel";
import { FavoriteModal } from "./components/modals/FavoriteModal";
import { OptionsModal } from "./components/modals/OptionsModal";
import { TimeEditModal } from "./components/modals/TimeEditModal";
import { GRADIENTS } from "./constants/index";
import { useStorage } from "./hooks/useStorage";
import { useTranslation } from "./hooks/useTranslation";
import { FavoriteService } from "./services/favoriteService";
import { StorageService } from "./services/storageService";
import { TodoService } from "./services/todoService";
import { WorkService } from "./services/workService";
import type { Favorite, Todo, WorkRecord } from "./types/index";
import { formatDate } from "./utils/date";
import { getGreeting, getTimeString } from "./utils/index";
import { calculateWorkMinutes, formatWorkTime } from "./utils/work";

export const App: React.FC = () => {
  const { t } = useTranslation();

  // ===== 상태 관리 =====
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState<string | null>(null);

  const [focus, setFocus] = useState("");
  const [focusInputValue, setFocusInputValue] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCompletedTodos, setShowCompletedTodos] = useState(false);

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [todosOpen, setTodosOpen] = useState(true);
  const [workPanelOpen, setWorkPanelOpen] = useState(true);

  const [showFavoritesPanel, setShowFavoritesPanel] = useState(true);
  const [showTodosPanel, setShowTodosPanel] = useState(true);
  const [showWorkPanel, setShowWorkPanel] = useState(true);

  const [workRecords, setWorkRecords] = useState<WorkRecord[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);

  // 모달 상태
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);
  const [favLabel, setFavLabel] = useState("");
  const [favUrl, setFavUrl] = useState("");
  const [favIcon, setFavIcon] = useState("");
  const [editingFavoriteId, setEditingFavoriteId] = useState<string | null>(null);

  const [isTimeEditModalOpen, setIsTimeEditModalOpen] = useState(false);
  const [editingDate, setEditingDate] = useState("");
  const [editingCheckIn, setEditingCheckIn] = useState("");
  const [editingCheckOut, setEditingCheckOut] = useState("");
  const [editingIsVacation, setEditingIsVacation] = useState(false);

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [optionsUserName, setOptionsUserName] = useState("");
  const [optionsShowFavorites, setOptionsShowFavorites] = useState(true);
  const [optionsShowTodos, setOptionsShowTodos] = useState(true);
  const [optionsShowWork, setOptionsShowWork] = useState(true);

  const todoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // ===== 배경 그라디언트 =====
  const background = useMemo(() => {
    const idx = Math.floor(Math.random() * GRADIENTS.length);
    return GRADIENTS[idx];
  }, []);

  // ===== Storage 로드 =====
  const { data: storageData } = useStorage();

  useEffect(() => {
    if (!storageData) return;

    if (storageData.userName) setUserName(storageData.userName);
    if (storageData.todayFocus) {
      setFocus(storageData.todayFocus);
      setFocusInputValue("");
    }
    if (Array.isArray(storageData.todos)) setTodos(storageData.todos);
    if (Array.isArray(storageData.favorites)) setFavorites(storageData.favorites);
    if (typeof storageData.favoritesOpen === "boolean") setFavoritesOpen(storageData.favoritesOpen);
    if (typeof storageData.todosOpen === "boolean") setTodosOpen(storageData.todosOpen);
    if (Array.isArray(storageData.workRecords)) setWorkRecords(storageData.workRecords);
    if (typeof storageData.workPanelOpen === "boolean") setWorkPanelOpen(storageData.workPanelOpen);
    if (typeof storageData.showFavoritesPanel === "boolean") setShowFavoritesPanel(storageData.showFavoritesPanel);
    if (typeof storageData.showTodosPanel === "boolean") setShowTodosPanel(storageData.showTodosPanel);
    if (typeof storageData.showWorkPanel === "boolean") setShowWorkPanel(storageData.showWorkPanel);
  }, [storageData]);

  // ===== 시간 & 인사 업데이트 =====
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      setTime(getTimeString());
      setGreeting(getGreeting(userName));
    };

    updateTimeAndGreeting();
    const timer = setInterval(updateTimeAndGreeting, 1000 * 30);
    return () => clearInterval(timer);
  }, [userName]);

  // ===== Focus 핸들러 =====
  const handleFocusKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const value = focusInputValue.trim();
      if (!value) return;
      setFocus(value);
      setFocusInputValue("");
      StorageService.saveTodayFocus(value);
    }
  };

  // ===== Todo 핸들러 =====
  const handleSaveTodos = (next: Todo[]) => {
    setTodos(next);
    TodoService.saveTodos(next);
  };

  const handleAddTodo = () => {
    const text = newTodoText.trim();
    if (!text) return;
    const next = TodoService.addTodo(todos, text, selectedDate);
    handleSaveTodos(next);
    setNewTodoText("");
  };

  const handleToggleTodo = (id: string) => {
    const next = TodoService.toggleTodo(todos, id);
    handleSaveTodos(next);
  };

  const handleDeleteTodo = (id: string) => {
    const next = TodoService.deleteTodo(todos, id);
    handleSaveTodos(next);
  };

  const todosByDate = TodoService.getTodosByDate(todos, showCompletedTodos);
  const remainingCount = TodoService.getRemainingTodoCount(todos);

  const scrollToDate = (date: string) => {
    setSelectedDate(date);
    setTimeout(() => {
      const element = todoRefs.current[date];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // ===== Favorite 핸들러 =====
  const handleSaveFavorites = (next: Favorite[]) => {
    setFavorites(next);
    FavoriteService.saveFavorites(next);
  };

  const openAddFavoriteModal = () => {
    setEditingFavoriteId(null);
    setFavLabel("");
    setFavUrl("");
    setFavIcon("");
    setIsFavModalOpen(true);
  };

  const openEditFavoriteModal = (fav: Favorite) => {
    setEditingFavoriteId(fav.id);
    setFavLabel(fav.label);
    setFavUrl(fav.url);
    setFavIcon(fav.icon || "");
    setIsFavModalOpen(true);
  };

  const closeFavModal = () => {
    setIsFavModalOpen(false);
  };

  const handleSubmitFavorite = () => {
    const label = favLabel.trim();
    const url = favUrl.trim();
    if (!label || !url) return;

    let next: Favorite[];
    if (editingFavoriteId) {
      next = FavoriteService.updateFavorite(favorites, editingFavoriteId, label, url, favIcon);
    } else {
      next = FavoriteService.addFavorite(favorites, label, url, favIcon);
    }

    handleSaveFavorites(next);
    closeFavModal();
  };

  const handleDeleteFavorite = (id: string) => {
    const next = FavoriteService.deleteFavorite(favorites, id);
    handleSaveFavorites(next);
  };

  const handleOpenFavorite = (fav: Favorite) => {
    FavoriteService.openFavorite(fav);
  };

  const handleReorderFavorites = (reorderedFavorites: Favorite[]) => {
    handleSaveFavorites(reorderedFavorites);
  };

  // ===== Work 핸들러 =====
  const handleSaveWorkRecords = (next: WorkRecord[]) => {
    setWorkRecords(next);
    WorkService.saveWorkRecords(next);
  };

  const handleCheckIn = () => {
    const next = WorkService.checkIn(workRecords);
    handleSaveWorkRecords(next);
  };

  const handleCheckOut = () => {
    const next = WorkService.checkOut(workRecords);
    handleSaveWorkRecords(next);
  };

  const handleCheckInEdit = () => {
    const data = WorkService.getCheckInEditData(workRecords);
    setEditingDate(data.date);
    setEditingCheckIn(data.checkIn);
    setEditingCheckOut(data.checkOut);
    setEditingIsVacation(data.isVacation);
    setIsTimeEditModalOpen(true);
  };

  const handleCheckOutEdit = () => {
    const data = WorkService.getCheckOutEditData(workRecords);
    setEditingDate(data.date);
    setEditingCheckIn(data.checkIn);
    setEditingCheckOut(data.checkOut);
    setEditingIsVacation(data.isVacation);
    setIsTimeEditModalOpen(true);
  };

  const openTimeEditModal = (record: WorkRecord) => {
    const data = WorkService.getEditModalData(record);
    setEditingDate(record.date);
    setEditingCheckIn(data.checkIn);
    setEditingCheckOut(data.checkOut);
    setEditingIsVacation(data.isVacation);
    setIsTimeEditModalOpen(true);
  };

  const closeTimeEditModal = () => {
    setIsTimeEditModalOpen(false);
  };

  const handleSaveTimeEdit = () => {
    const next = WorkService.saveTimeEdit(workRecords, editingDate, editingCheckIn, editingCheckOut, editingIsVacation);
    handleSaveWorkRecords(next);
    closeTimeEditModal();
  };

  const weekRecords = WorkService.getWeekRecords(workRecords, weekOffset);
  const weekTotal = WorkService.calculateWeekTotal(weekRecords);
  const weekTarget = WorkService.calculateWeekTarget(weekRecords);
  const overtime = WorkService.calculateOvertime(weekRecords, weekOffset);
  const weekRangeText = WorkService.getWeekRangeText(weekRecords);

  // ===== 패널 토글 핸들러 =====
  const toggleFavoritesOpen = () => {
    const next = !favoritesOpen;
    setFavoritesOpen(next);
    StorageService.savePanelState("favoritesOpen", next);
  };

  const toggleTodosOpen = () => {
    const next = !todosOpen;
    setTodosOpen(next);
    StorageService.savePanelState("todosOpen", next);
  };

  const toggleWorkPanelOpen = () => {
    const next = !workPanelOpen;
    setWorkPanelOpen(next);
    StorageService.savePanelState("workPanelOpen", next);
  };

  // ===== 옵션 모달 핸들러 =====
  const openOptionsModal = () => {
    setOptionsUserName(userName || "");
    setOptionsShowFavorites(showFavoritesPanel);
    setOptionsShowTodos(showTodosPanel);
    setOptionsShowWork(showWorkPanel);
    setIsOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setIsOptionsModalOpen(false);
  };

  const handleSaveOptions = () => {
    const newUserName = optionsUserName.trim() || null;
    setUserName(newUserName);
    StorageService.saveUserName(newUserName);

    setShowFavoritesPanel(optionsShowFavorites);
    setShowTodosPanel(optionsShowTodos);
    setShowWorkPanel(optionsShowWork);

    StorageService.savePanelVisibility("showFavoritesPanel", optionsShowFavorites);
    StorageService.savePanelVisibility("showTodosPanel", optionsShowTodos);
    StorageService.savePanelVisibility("showWorkPanel", optionsShowWork);

    closeOptionsModal();
  };

  // ===== 오늘의 출퇴근 기록 =====
  const todayRecord = workRecords.find((r) => r.date === formatDate(new Date()));

  return (
    <div className="app-root">
      <div className="app-bg" style={{ background }} />

      <div className="app-content">
        {/* 좌측 즐겨찾기 패널 */}
        {showFavoritesPanel && (
          <FavoritesPanel
            isOpen={favoritesOpen}
            favorites={favorites}
            onToggle={toggleFavoritesOpen}
            onAddClick={openAddFavoriteModal}
            onEditClick={openEditFavoriteModal}
            onDeleteClick={handleDeleteFavorite}
            onOpenFavorite={handleOpenFavorite}
            onReorder={handleReorderFavorites}
          />
        )}

        {/* 중앙 메인 영역 */}
        <main className="app-main">
          <div className="app-top">
            <div className="app-time">{time}</div>
            <div className="app-greeting">{greeting}</div>

            {/* 오늘의 목표 */}
            <FocusInput
              focus={focus}
              focusInputValue={focusInputValue}
              onFocusInputChange={setFocusInputValue}
              onFocusKeyDown={handleFocusKeyDown}
            />

            {/* 출퇴근 체크 */}
            <div className="work-check-container">
              <div className="work-check-buttons">
                <button
                  className={`work-btn check-in ${todayRecord?.checkIn ? "recorded" : ""}`}
                  onClick={todayRecord?.checkIn ? handleCheckInEdit : handleCheckIn}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleCheckInEdit();
                  }}
                  title={
                    todayRecord?.checkIn
                      ? `${t.work.clickToEdit} | ${t.work.rightClickToEdit}`
                      : `${t.work.clickToCheckIn} | ${t.work.rightClickToEdit}`
                  }
                >
                  {todayRecord?.checkIn ? t.work.checkInButtonRecorded : t.work.checkInButton}
                  {todayRecord?.checkIn && <span className="work-time-badge">{todayRecord.checkIn}</span>}
                </button>
                <button
                  className={`work-btn check-out ${todayRecord?.checkOut ? "recorded" : ""}`}
                  onClick={todayRecord?.checkOut ? handleCheckOutEdit : handleCheckOut}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleCheckOutEdit();
                  }}
                  title={
                    todayRecord?.checkOut
                      ? `${t.work.clickToEdit} | ${t.work.rightClickToEdit}`
                      : `${t.work.clickToCheckOut} | ${t.work.rightClickToEdit}`
                  }
                >
                  {todayRecord?.checkOut ? t.work.checkOutButtonRecorded : t.work.checkOutButton}
                  {todayRecord?.checkOut && <span className="work-time-badge">{todayRecord.checkOut}</span>}
                </button>
              </div>

              {todayRecord?.checkIn && todayRecord?.checkOut && (
                <div className="today-work-summary">
                  {t.work.todayWork}:{" "}
                  {formatWorkTime(
                    calculateWorkMinutes(todayRecord.checkIn, todayRecord.checkOut),
                    t.work.hour,
                    t.work.minute
                  )}{" "}
                  ({t.work.lunchExcluded})
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 우측 투두 패널 */}
        {showTodosPanel && (
          <TodoPanel
            isOpen={todosOpen}
            todos={todos}
            todosByDate={todosByDate}
            remainingCount={remainingCount}
            selectedDate={selectedDate}
            newTodoText={newTodoText}
            showCompletedTodos={showCompletedTodos}
            todoRefs={todoRefs}
            onToggle={toggleTodosOpen}
            onAddTodo={handleAddTodo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onNewTodoTextChange={setNewTodoText}
            onSelectedDateChange={setSelectedDate}
            onShowCompletedTodosToggle={() => setShowCompletedTodos(!showCompletedTodos)}
          />
        )}

        {/* 주간 근무 기록 패널 */}
        {showWorkPanel && (
          <WorkPanel
            isOpen={workPanelOpen}
            weekRecords={weekRecords}
            weekOffset={weekOffset}
            selectedDate={selectedDate}
            weekRangeText={weekRangeText}
            weekTotal={weekTotal}
            weekTarget={weekTarget}
            overtime={overtime}
            onToggle={toggleWorkPanelOpen}
            onWeekOffsetChange={setWeekOffset}
            onEditClick={openTimeEditModal}
            onDateClick={scrollToDate}
          />
        )}
      </div>

      {/* 모달들 */}
      <FavoriteModal
        isOpen={isFavModalOpen}
        isEditing={!!editingFavoriteId}
        label={favLabel}
        url={favUrl}
        icon={favIcon}
        onClose={closeFavModal}
        onSubmit={handleSubmitFavorite}
        onLabelChange={setFavLabel}
        onUrlChange={setFavUrl}
        onIconChange={setFavIcon}
      />

      <TimeEditModal
        isOpen={isTimeEditModalOpen}
        date={editingDate}
        checkIn={editingCheckIn}
        checkOut={editingCheckOut}
        isVacation={editingIsVacation}
        onClose={closeTimeEditModal}
        onSave={handleSaveTimeEdit}
        onCheckInChange={setEditingCheckIn}
        onCheckOutChange={setEditingCheckOut}
        onIsVacationChange={setEditingIsVacation}
      />

      <OptionsModal
        isOpen={isOptionsModalOpen}
        userName={optionsUserName}
        showFavorites={optionsShowFavorites}
        showTodos={optionsShowTodos}
        showWork={optionsShowWork}
        onClose={closeOptionsModal}
        onSave={handleSaveOptions}
        onUserNameChange={setOptionsUserName}
        onShowFavoritesChange={setOptionsShowFavorites}
        onShowTodosChange={setOptionsShowTodos}
        onShowWorkChange={setOptionsShowWork}
      />

      {/* 설정 버튼 */}
      <button className="settings-btn" onClick={openOptionsModal} aria-label={t.options.settings}>
        ⚙️
      </button>
    </div>
  );
};
