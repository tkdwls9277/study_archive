import { useState } from "react";
import { StorageService } from "../services/storageService";

interface UseOptionsModalProps {
  userName: string | null;
  showFavoritesPanel: boolean;
  showTodosPanel: boolean;
  showWorkPanel: boolean;
  showNotificationPanel: boolean;
  showFocusSection: boolean;
  weatherApiKey: string;
  showWeeklyForecast: boolean;
  showHourlyForecast: boolean;
  weatherDraggable: boolean;
  showWeatherPanel: boolean;
  setUserName: (value: string | null) => void;
  setShowFavoritesPanel: (value: boolean) => void;
  setShowTodosPanel: (value: boolean) => void;
  setShowWorkPanel: (value: boolean) => void;
  setShowNotificationPanel: (value: boolean) => void;
  setShowFocusSection: (value: boolean) => void;
  setWeatherApiKey: (value: string) => void;
  setShowWeeklyForecast: (value: boolean) => void;
  setShowHourlyForecast: (value: boolean) => void;
  setWeatherDraggable: (value: boolean) => void;
  setShowWeatherPanel: (value: boolean) => void;
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
    showFocusSection,
    weatherApiKey,
    showWeeklyForecast,
    showHourlyForecast,
    weatherDraggable,
    showWeatherPanel,
    setUserName,
    setShowFavoritesPanel,
    setShowTodosPanel,
    setShowWorkPanel,
    setShowNotificationPanel,
    setShowFocusSection,
    setWeatherApiKey,
    setShowWeeklyForecast,
    setShowHourlyForecast,
    setWeatherDraggable,
    setShowWeatherPanel,
  } = props;

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [optionsUserName, setOptionsUserName] = useState("");
  const [optionsShowFavorites, setOptionsShowFavorites] = useState(true);
  const [optionsShowTodos, setOptionsShowTodos] = useState(true);
  const [optionsShowWork, setOptionsShowWork] = useState(true);
  const [optionsShowNotifications, setOptionsShowNotifications] = useState(true);
  const [optionsShowFocus, setOptionsShowFocus] = useState(true);
  const [optionsWeatherApiKey, setOptionsWeatherApiKey] = useState("");
  const [optionsShowWeeklyForecast, setOptionsShowWeeklyForecast] = useState(false);
  const [optionsShowHourlyForecast, setOptionsShowHourlyForecast] = useState(false);
  const [optionsWeatherDraggable, setOptionsWeatherDraggable] = useState(true);
  const [optionsShowWeatherPanel, setOptionsShowWeatherPanel] = useState(true);

  const openOptionsModal = () => {
    console.log("[OptionsModal] Opening modal with showWeeklyForecast:", showWeeklyForecast);
    setOptionsUserName(userName || "");
    setOptionsShowFavorites(showFavoritesPanel);
    setOptionsShowTodos(showTodosPanel);
    setOptionsShowWork(showWorkPanel);
    setOptionsShowNotifications(showNotificationPanel);
    setOptionsShowFocus(showFocusSection);
    setOptionsWeatherApiKey(weatherApiKey);
    setOptionsShowWeeklyForecast(showWeeklyForecast);
    setOptionsShowHourlyForecast(showHourlyForecast);
    setOptionsWeatherDraggable(weatherDraggable);
    setOptionsShowWeatherPanel(showWeatherPanel);
    setIsOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setIsOptionsModalOpen(false);
  };

  // 실시간 저장 핸들러들
  const handleUserNameChange = (value: string) => {
    setOptionsUserName(value);
    const newUserName = value.trim() || null;
    setUserName(newUserName);
    StorageService.saveUserName(newUserName);
  };

  const handleShowFavoritesChange = (value: boolean) => {
    setOptionsShowFavorites(value);
    setShowFavoritesPanel(value);
    StorageService.savePanelVisibility("showFavoritesPanel", value);
  };

  const handleShowTodosChange = (value: boolean) => {
    setOptionsShowTodos(value);
    setShowTodosPanel(value);
    StorageService.savePanelVisibility("showTodosPanel", value);
  };

  const handleShowWorkChange = (value: boolean) => {
    setOptionsShowWork(value);
    setShowWorkPanel(value);
    StorageService.savePanelVisibility("showWorkPanel", value);
  };

  const handleShowNotificationsChange = (value: boolean) => {
    setOptionsShowNotifications(value);
    setShowNotificationPanel(value);
    StorageService.savePanelVisibility("showNotificationPanel", value);
  };

  const handleShowFocusChange = (value: boolean) => {
    setOptionsShowFocus(value);
    setShowFocusSection(value);
    StorageService.savePanelVisibility("showFocusSection", value);
  };

  const handleWeatherApiKeyChange = (value: string) => {
    setOptionsWeatherApiKey(value);
    setWeatherApiKey(value);
    chrome.storage.sync.set({ weatherApiKey: value });
  };

  const handleShowWeeklyForecastChange = (value: boolean) => {
    setOptionsShowWeeklyForecast(value);
    setShowWeeklyForecast(value);
    console.log("[OptionsModal] Saving showWeeklyForecast:", value);
    chrome.storage.sync.set({ showWeeklyForecast: value }, () => {
      console.log("[OptionsModal] showWeeklyForecast saved successfully");
    });
  };

  const handleShowHourlyForecastChange = (value: boolean) => {
    setOptionsShowHourlyForecast(value);
    setShowHourlyForecast(value);
    console.log("[OptionsModal] Saving showHourlyForecast:", value);
    chrome.storage.sync.set({ showHourlyForecast: value }, () => {
      console.log("[OptionsModal] showHourlyForecast saved successfully");
    });
  };

  const handleWeatherDraggableChange = (value: boolean) => {
    setOptionsWeatherDraggable(value);
    setWeatherDraggable(value);
    console.log("[OptionsModal] Saving weatherDraggable:", value);
    chrome.storage.sync.set({ weatherDraggable: value }, () => {
      console.log("[OptionsModal] weatherDraggable saved successfully");
    });
  };

  const handleShowWeatherPanelChange = (value: boolean) => {
    setOptionsShowWeatherPanel(value);
    setShowWeatherPanel(value);
    StorageService.savePanelVisibility("showWeatherPanel", value);
  };

  return {
    isOptionsModalOpen,
    optionsUserName,
    optionsShowFavorites,
    optionsShowTodos,
    optionsShowWork,
    optionsShowNotifications,
    optionsShowFocus,
    optionsWeatherApiKey,
    optionsShowWeeklyForecast,
    optionsShowHourlyForecast,
    optionsWeatherDraggable,
    optionsShowWeatherPanel,
    openOptionsModal,
    closeOptionsModal,
    handleUserNameChange,
    handleShowFavoritesChange,
    handleShowTodosChange,
    handleShowWorkChange,
    handleShowNotificationsChange,
    handleShowFocusChange,
    handleWeatherApiKeyChange,
    handleShowWeeklyForecastChange,
    handleShowHourlyForecastChange,
    handleWeatherDraggableChange,
    handleShowWeatherPanelChange,
  };
}
