import { useState } from "react";
import { StorageService } from "../services/storageService";

interface UseOptionsModalProps {
  userName: string | null;
  showFavoritesPanel: boolean;
  showTodosPanel: boolean;
  showWorkPanel: boolean;
  showNotificationPanel: boolean;
  setUserName: (value: string | null) => void;
  setShowFavoritesPanel: (value: boolean) => void;
  setShowTodosPanel: (value: boolean) => void;
  setShowWorkPanel: (value: boolean) => void;
  setShowNotificationPanel: (value: boolean) => void;
}

/**
 * 옵션 모달 관련 로직을 관리하는 커스텀 훅
 */
export function useOptionsModal(props: UseOptionsModalProps) {
  const {
    userName,
    showFavoritesPanel,
    showTodosPanel,
    showWorkPanel,
    showNotificationPanel,
    setUserName,
    setShowFavoritesPanel,
    setShowTodosPanel,
    setShowWorkPanel,
    setShowNotificationPanel,
  } = props;

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [optionsUserName, setOptionsUserName] = useState("");
  const [optionsShowFavorites, setOptionsShowFavorites] = useState(true);
  const [optionsShowTodos, setOptionsShowTodos] = useState(true);
  const [optionsShowWork, setOptionsShowWork] = useState(true);
  const [optionsShowNotifications, setOptionsShowNotifications] = useState(true);

  const openOptionsModal = () => {
    setOptionsUserName(userName || "");
    setOptionsShowFavorites(showFavoritesPanel);
    setOptionsShowTodos(showTodosPanel);
    setOptionsShowWork(showWorkPanel);
    setOptionsShowNotifications(showNotificationPanel);
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
    setShowNotificationPanel(optionsShowNotifications);

    StorageService.savePanelVisibility("showFavoritesPanel", optionsShowFavorites);
    StorageService.savePanelVisibility("showTodosPanel", optionsShowTodos);
    StorageService.savePanelVisibility("showWorkPanel", optionsShowWork);
    StorageService.savePanelVisibility("showNotificationPanel", optionsShowNotifications);

    closeOptionsModal();
  };

  return {
    isOptionsModalOpen,
    optionsUserName,
    setOptionsUserName,
    optionsShowFavorites,
    setOptionsShowFavorites,
    optionsShowTodos,
    setOptionsShowTodos,
    optionsShowWork,
    setOptionsShowWork,
    optionsShowNotifications,
    setOptionsShowNotifications,
    openOptionsModal,
    closeOptionsModal,
    handleSaveOptions,
  };
}
