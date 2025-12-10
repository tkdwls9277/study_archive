export type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: string; // YYYY-MM-DD
};

export type Favorite = {
  id: string;
  label: string;
  url: string;
  icon?: string; // 커스텀 아이콘 (이모지 또는 텍스트)
};

export type WorkRecord = {
  date: string; // YYYY-MM-DD
  checkIn?: string; // HH:MM
  checkOut?: string; // HH:MM
  isVacation?: boolean; // 연차 여부
};

export type TodoGroup = {
  date: string;
  todos: Todo[];
  hasIncomplete: boolean;
};

export type OvertimeInfo = {
  minutes: number;
  isOver: boolean;
};

export interface StorageData {
  userName?: string | null;
  todayFocus?: string;
  todos?: Todo[];
  favorites?: Favorite[];
  favoritesOpen?: boolean;
  todosOpen?: boolean;
  workRecords?: WorkRecord[];
  workPanelOpen?: boolean;
  notificationPanelOpen?: boolean;
  showFavoritesPanel?: boolean;
  showTodosPanel?: boolean;
  showWorkPanel?: boolean;
  showNotificationPanel?: boolean;
  showFocusSection?: boolean; // 핵심목표 표시 여부
}
