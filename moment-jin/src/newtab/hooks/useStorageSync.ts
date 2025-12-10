import { useEffect } from "react";
import type { Favorite, Todo, WorkRecord } from "../types/index";

interface StorageSyncProps {
  setUserName: (value: string | null) => void;
  setFocus: (value: string) => void;
  setFocusInputValue: (value: string) => void;
  setTodos: (value: Todo[]) => void;
  setFavorites: (value: Favorite[]) => void;
  setWorkRecords: (value: WorkRecord[]) => void;
  setFavoritesOpen: (value: boolean) => void;
  setTodosOpen: (value: boolean) => void;
  setWorkPanelOpen: (value: boolean) => void;
  setNotificationPanelOpen: (value: boolean) => void;
  setShowFavoritesPanel: (value: boolean) => void;
  setShowTodosPanel: (value: boolean) => void;
  setShowWorkPanel: (value: boolean) => void;
  setShowNotificationPanel: (value: boolean) => void;
  setShowFocusSection: (value: boolean) => void;
}

/**
 * Chrome Storage 동기화를 관리하는 커스텀 훅
 * 다른 탭에서의 변경사항을 실시간으로 감지하여 상태 업데이트
 */
export function useStorageSync(props: StorageSyncProps) {
  const {
    setUserName,
    setFocus,
    setTodos,
    setFavorites,
    setWorkRecords,
    setFavoritesOpen,
    setTodosOpen,
    setWorkPanelOpen,
    setNotificationPanelOpen,
    setShowFavoritesPanel,
    setShowTodosPanel,
    setShowWorkPanel,
    setShowNotificationPanel,
    setShowFocusSection,
  } = props;

  useEffect(() => {
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, namespace: string) => {
      if (namespace !== "sync") return;

      console.log("[App] Storage changed in another tab:", changes);

      // userName 변경
      if (changes.userName) {
        const newValue = changes.userName.newValue as string | null | undefined;
        setUserName(newValue ?? null);
      }

      // todayFocus 변경
      if (changes.todayFocus) {
        const newValue = changes.todayFocus.newValue as string | undefined;
        setFocus(newValue ?? "");
      }

      // todos 변경
      if (changes.todos) {
        const newValue = changes.todos.newValue as Todo[] | undefined;
        setTodos(newValue ?? []);
      }

      // favorites 변경
      if (changes.favorites) {
        const newValue = changes.favorites.newValue as Favorite[] | undefined;
        setFavorites(newValue ?? []);
      }

      // workRecords 변경
      if (changes.workRecords) {
        const newValue = changes.workRecords.newValue as WorkRecord[] | undefined;
        setWorkRecords(newValue ?? []);
      }

      // 패널 열림/닫힘 상태 변경
      if (changes.favoritesOpen !== undefined) {
        const newValue = changes.favoritesOpen.newValue as boolean | undefined;
        setFavoritesOpen(newValue ?? true);
      }
      if (changes.todosOpen !== undefined) {
        const newValue = changes.todosOpen.newValue as boolean | undefined;
        setTodosOpen(newValue ?? true);
      }
      if (changes.workPanelOpen !== undefined) {
        const newValue = changes.workPanelOpen.newValue as boolean | undefined;
        setWorkPanelOpen(newValue ?? true);
      }
      if (changes.notificationPanelOpen !== undefined) {
        const newValue = changes.notificationPanelOpen.newValue as boolean | undefined;
        setNotificationPanelOpen(newValue ?? true);
      }

      // 패널 표시/숨김 상태 변경
      if (changes.showFavoritesPanel !== undefined) {
        const newValue = changes.showFavoritesPanel.newValue as boolean | undefined;
        setShowFavoritesPanel(newValue ?? true);
      }
      if (changes.showTodosPanel !== undefined) {
        const newValue = changes.showTodosPanel.newValue as boolean | undefined;
        setShowTodosPanel(newValue ?? true);
      }
      if (changes.showWorkPanel !== undefined) {
        const newValue = changes.showWorkPanel.newValue as boolean | undefined;
        setShowWorkPanel(newValue ?? true);
      }
      if (changes.showNotificationPanel !== undefined) {
        const newValue = changes.showNotificationPanel.newValue as boolean | undefined;
        setShowNotificationPanel(newValue ?? true);
      }
      if (changes.showFocusSection !== undefined) {
        const newValue = changes.showFocusSection.newValue as boolean | undefined;
        setShowFocusSection(newValue ?? true);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [
    setUserName,
    setFocus,
    setTodos,
    setFavorites,
    setWorkRecords,
    setFavoritesOpen,
    setTodosOpen,
    setWorkPanelOpen,
    setNotificationPanelOpen,
    setShowFavoritesPanel,
    setShowTodosPanel,
    setShowWorkPanel,
    setShowNotificationPanel,
    setShowFocusSection,
  ]);
}
