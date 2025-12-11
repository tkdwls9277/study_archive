# 설계 명세서 (Design Specification)

## Moment-Jin: 아키텍처 및 설계 문서

---

## 1. 문서 정보

| 항목            | 내용                     |
| --------------- | ------------------------ |
| **프로젝트명**  | Moment-Jin               |
| **버전**        | 1.0.0                    |
| **문서 버전**   | 1.0                      |
| **최종 수정일** | 2025년 12월 10일         |
| **작성자**      | 개발팀                   |
| **상태**        | 완료                     |
| **관련 문서**   | [PRD_KR.md](./PRD_KR.md) |

---

## 2. 시스템 아키텍처

### 2.1 전체 구조도

```
┌─────────────────────────────────────────────────────────────┐
│                    Chrome Extension                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              New Tab Page (newtab.html)              │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                       │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │         React Application (App.tsx)         │    │   │
│  │  ├─────────────────────────────────────────────┤    │   │
│  │  │                                              │    │   │
│  │  │  State Management (useAppState)             │    │   │
│  │  │  ├─ UI State                                │    │   │
│  │  │  ├─ Data (Todos, Favorites, Work, etc)     │    │   │
│  │  │  └─ Settings (Locale, Panel Visibility)     │    │   │
│  │  │                                              │    │   │
│  │  │  Components Tree                             │    │   │
│  │  │  ├─ AppHeader                               │    │   │
│  │  │  ├─ FavoritesPanel                          │    │   │
│  │  │  ├─ TodoPanel                               │    │   │
│  │  │  ├─ WorkPanel                               │    │   │
│  │  │  ├─ NotificationPanel                       │    │   │
│  │  │  └─ ModalContainer                          │    │   │
│  │  │                                              │    │   │
│  │  └──────────────────────────────────────────────┘    │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Background Service Worker (background.js)     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Chrome Alarms Management                          │   │
│  │  • Notification Scheduling                           │   │
│  │  • Storage Sync Monitoring                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
           │                          │
           ↓                          ↓
    ┌──────────────┐          ┌──────────────┐
    │ Chrome APIs  │          │ External APIs│
    ├──────────────┤          ├──────────────┤
    │ • storage    │          │ • Unsplash   │
    │ • alarms     │          │              │
    │ • notifications│        │              │
    └──────────────┘          └──────────────┘
```

### 2.2 레이어 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                   Presentation Layer                     │
│  (Components, UI, User Interactions)                     │
│  • AppHeader, TodoPanel, WorkPanel, etc.                │
├─────────────────────────────────────────────────────────┤
│                   Application Layer                      │
│  (Business Logic, State Management)                      │
│  • Custom Hooks (useAppState, useTodoHandler, etc.)    │
│  • Event Handlers                                        │
├─────────────────────────────────────────────────────────┤
│                   Service Layer                          │
│  (Data Operations, External Communications)              │
│  • StorageService, UnsplashService                      │
│  • NotificationService                                   │
├─────────────────────────────────────────────────────────┤
│                   Data Layer                             │
│  (Persistence, Caching)                                  │
│  • Chrome Storage (sync + local)                        │
│  • localStorage (fallback)                              │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 컴포넌트 설계

### 3.1 컴포넌트 트리

```
App
├── AppHeader
│   ├── FocusInput
│   ├── NextNotification
│   └── WorkCheckButtons
│
├── FavoritesPanel
│   └── FavoriteItem[]
│
├── NotificationPanel
│   ├── NotificationItem[]
│   └── NotificationModal (Portal)
│
├── TodoPanel
│   └── TodoDateSection[]
│       └── TodoItem[]
│
├── WorkPanel
│   └── WorkRecordItem[]
│
└── ModalContainer
    ├── FavoriteModal
    ├── TimeEditModal
    └── OptionsModal
```

### 3.2 주요 컴포넌트 명세

#### 3.2.1 App.tsx

**역할**: 루트 컴포넌트, 전체 상태 관리 및 조율

**상태**:

```typescript
interface AppState {
  // UI State
  time: string;
  greeting: string;
  currentDate: string;
  backgroundImage: string;

  // User Settings
  userName: string | null;
  focus: string;
  focusInputValue: string;

  // Data
  todos: Todo[];
  favorites: Favorite[];
  workRecords: WorkRecord[];

  // Panel States
  favoritesOpen: boolean;
  todosOpen: boolean;
  workPanelOpen: boolean;
  notificationPanelOpen: boolean;

  // Panel Visibility
  showFavoritesPanel: boolean;
  showTodosPanel: boolean;
  showWorkPanel: boolean;
  showNotificationPanel: boolean;
  showFocusSection: boolean;

  // Other
  selectedDate: string | null;
  showCompletedTodos: boolean;
  weekOffset: number;
}
```

**주요 로직**:

- Storage 로드 및 동기화
- 시간/날짜 업데이트 (30초마다 시간, 60초마다 날짜 체크)
- 배경 이미지 로드 및 캐싱
- 모든 핸들러를 자식 컴포넌트에 props로 전달

---

#### 3.2.2 AppHeader.tsx

**역할**: 상단 영역 (시계, 인사, 목표, 알림, 출퇴근)

**Props**:

```typescript
interface AppHeaderProps {
  time: string;
  greeting: string;
  focus: string;
  focusInputValue: string;
  todayRecord: WorkRecord | undefined;
  showWorkPanel: boolean;
  showNotificationPanel: boolean;
  showFocusSection: boolean;
  onFocusInputChange: (value: string) => void;
  onFocusKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onFocusBlur: () => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onCheckInEdit: () => void;
  onCheckOutEdit: () => void;
  workTranslations: WorkTranslations;
}
```

**레이아웃**:

```
┌──────────────────────────────────────────┐
│  14:30                                    │
│  좋은 오후입니다, 사용자님                 │
│  [오늘의 핵심 목표는?]                     │
│  [📢 다음: 16:00 팀 미팅]                 │
│  [🏢 출근] [🏠 퇴근]                       │
└──────────────────────────────────────────┘
```

---

#### 3.2.3 FavoritesPanel.tsx

**역할**: 즐겨찾기 관리 패널 (좌측)

**특징**:

- 드래그 앤 드롭으로 순서 변경 (@dnd-kit)
- CRUD 작업 (추가, 편집, 삭제)
- 접기/펴기 상태 관리
- 옵션에서 전체 패널 숨김 가능

**상태 전환**:

```
Open State          Collapsed State
┌─────────────┐    ┌─┐
│ ⚙️ Settings │    │★│ (세로 텍스트)
│ ──────────  │    │즐│
│ ⭐ GitHub   │    │겨│
│ 📺 YouTube  │    │찾│
│ 💼 Gmail    │    │기│
│             │    │ │
│ [+] ◀      │    └─┘
└─────────────┘
```

---

#### 3.2.4 TodoPanel.tsx

**역할**: 할일 관리 패널 (우측 또는 하단)

**특징**:

- 날짜별 그룹화
- 완료/미완료 필터링
- 날짜 선택 및 스크롤
- 실시간 날짜 감지

**데이터 구조**:

```typescript
interface Todo {
  id: string;
  text: string;
  done: boolean;
  date: string; // YYYY-MM-DD
}

interface TodoGroup {
  date: string;
  todos: Todo[];
  hasIncomplete: boolean;
}
```

---

#### 3.2.5 WorkPanel.tsx

**역할**: 주간 근무 기록 패널

**특징**:

- 주간 캘린더 뷰 (월~일)
- 주간 총 근무 시간 계산
- 초과/부족 근무 시간 표시
- 휴가일 표시

**계산 로직**:

```typescript
// 근무 시간 계산 (점심 1시간 제외)
workMinutes = (checkOut - checkIn) - 60

// 주간 총계
weekTotal = sum(dailyMinutes[])
weekTarget = 40 hours = 2400 minutes

// 초과/부족
overtime = weekTotal - weekTarget
```

---

#### 3.2.6 NotificationPanel.tsx

**역할**: 알림 생성 및 관리 패널

**알림 타이밍**:

- at-time: 정시
- 5min-before
- 10min-before
- 30min-before
- 1hour-before
- 1day-before

**Storage**:

```typescript
// chrome.storage.local에 저장 (큰 용량)
key: "moment-jin-notifications"
value: Notification[]
```

---

### 3.3 반응형 레이아웃

#### 가로 화면 (Horizontal)

```
┌─────────────────────────────────────────────────────────┐
│  [⚙️]         14:30 좋은 오후입니다         [🏢][🏠]    │
│  Favorites    오늘의 핵심 목표는?             Todos     │
│  ────────     ─────────────────────          ────────  │
│  ⭐ GitHub                                   📝 할일 1   │
│  📺 YouTube                                  ✓ 할일 2   │
│  💼 Gmail                                    📝 할일 3   │
│                                                          │
│                                             Work Panel   │
│                                             ────────    │
│                                             📊 주간 기록 │
└─────────────────────────────────────────────────────────┘
```

#### 세로 화면 (Vertical)

```
┌─────────────────────┐
│   14:30             │
│   좋은 오후입니다    │
│   [핵심 목표...]    │
│   [🏢] [🏠]         │
├─────────────────────┤
│   Main Area         │
│   (최대 공간)        │
├─────────────────────┤
│ 📢 알림 ▲          │
├─────────────────────┤
│ 📝 할일 ▲│📊 근무 ▲│
└─────────────────────┘
```

---

## 4. 상태 관리 설계

### 4.1 Custom Hooks 구조

```
useAppState (전역 상태)
├── useState (모든 상태 선언)
└── return { states + setters }

App.tsx (Consumer)
├── useAppState() → state
├── useStorage() → 초기 로드
├── useStorageSync() → 실시간 동기화
├── useFocusHandler()
├── useTodoHandler()
├── useFavoriteHandler()
├── useWorkHandler()
├── useOptionsModal()
├── usePanelToggle()
└── useComputedValues()
```

### 4.2 주요 Custom Hooks

#### useAppState

```typescript
export function useAppState() {
  // 모든 상태 선언
  const [time, setTime] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  // ... 더 많은 상태

  return {
    time,
    setTime,
    userName,
    setUserName,
    // ... 모든 상태와 setter
  };
}
```

#### useStorage

```typescript
export function useStorage() {
  const [data, setData] = useState<StorageData | null>(null);

  useEffect(() => {
    StorageService.loadFromStorage().then(setData);
  }, []);

  return { data };
}
```

#### useStorageSync

```typescript
export function useStorageSync(props: StorageSyncProps) {
  useEffect(
    () => {
      const handleStorageChange = (changes, namespace) => {
        // Chrome Storage 변경 감지
        // 날짜 변경도 함께 체크
        checkDateChange();

        // 각 변경사항을 state에 반영
        if (changes.userName) props.setUserName(changes.userName.newValue);
        // ...
      };

      chrome.storage.onChanged.addListener(handleStorageChange);

      // 주기적 날짜 체크 (1분마다)
      const timer = setInterval(checkDateChange, 60000);

      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
        clearInterval(timer);
      };
    },
    [
      /* dependencies */
    ]
  );
}
```

#### useTodoHandler

```typescript
export function useTodoHandler(props: TodoHandlerProps) {
  const handleAddTodo = useCallback(() => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: props.newTodoText.trim(),
      done: false,
      date: props.selectedDate || formatDate(new Date()),
    };

    const updatedTodos = [...props.todos, newTodo];
    props.setTodos(updatedTodos);

    // Storage에 저장
    chrome.storage.sync.set({ todos: updatedTodos });

    // 입력창 초기화
    props.setNewTodoText("");
  }, [props.todos, props.newTodoText, props.selectedDate]);

  // ... 더 많은 핸들러

  return { handleAddTodo, handleToggleTodo, handleDeleteTodo };
}
```

---

## 5. 데이터 모델

### 5.1 타입 정의

```typescript
// types/index.ts

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
  icon?: string; // 이모지 또는 텍스트
};

export type WorkRecord = {
  date: string; // YYYY-MM-DD
  checkIn?: string; // HH:MM
  checkOut?: string; // HH:MM
  isVacation?: boolean;
};

export type Notification = {
  id: string;
  title: string;
  description?: string;
  targetDateTime: string; // ISO 8601
  timings: NotificationTiming[];
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationTiming =
  | "at-time"
  | "5min-before"
  | "10min-before"
  | "30min-before"
  | "1hour-before"
  | "1day-before";

export interface StorageData {
  userName?: string | null;
  todayFocus?: string;
  todos?: Todo[];
  favorites?: Favorite[];
  workRecords?: WorkRecord[];
  favoritesOpen?: boolean;
  todosOpen?: boolean;
  workPanelOpen?: boolean;
  notificationPanelOpen?: boolean;
  showFavoritesPanel?: boolean;
  showTodosPanel?: boolean;
  showWorkPanel?: boolean;
  showNotificationPanel?: boolean;
  showFocusSection?: boolean;
}
```

### 5.2 Storage 구조

```typescript
// chrome.storage.sync (100KB 제한)
{
  userName: string | null
  todayFocus: string
  todos: Todo[]
  favorites: Favorite[]
  workRecords: WorkRecord[]
  favoritesOpen: boolean
  todosOpen: boolean
  workPanelOpen: boolean
  notificationPanelOpen: boolean
  showFavoritesPanel: boolean
  showTodosPanel: boolean
  showWorkPanel: boolean
  showNotificationPanel: boolean
  showFocusSection: boolean
}

// chrome.storage.local (10MB 제한)
{
  "moment-jin-notifications": Notification[]
}

// localStorage (백업/캐시)
{
  "unsplash-photo-url": string
  "unsplash-photo-timestamp": number
}
```

---

## 6. 서비스 레이어

### 6.1 StorageService

```typescript
// services/storageService.ts

export class StorageService {
  /**
   * Chrome Storage에서 데이터 로드
   */
  static async loadFromStorage(): Promise<StorageData | null> {
    if (typeof chrome === "undefined" || !chrome.storage) {
      return null;
    }

    return new Promise((resolve) => {
      chrome.storage.sync.get(
        [
          "userName",
          "todayFocus",
          "todos",
          "favorites",
          "workRecords",
          "favoritesOpen",
          "todosOpen",
          "workPanelOpen",
          "notificationPanelOpen",
          "showFavoritesPanel",
          "showTodosPanel",
          "showWorkPanel",
          "showNotificationPanel",
          "showFocusSection",
        ],
        (res) => {
          resolve(res as StorageData);
        }
      );
    });
  }

  /**
   * 패널 상태 저장
   */
  static savePanelState(
    key: "favoritesOpen" | "todosOpen" | "workPanelOpen" | "notificationPanelOpen",
    value: boolean
  ): void {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ [key]: value });
    }
  }

  /**
   * 패널 표시 설정 저장
   */
  static savePanelVisibility(
    key: "showFavoritesPanel" | "showTodosPanel" | "showWorkPanel" | "showNotificationPanel" | "showFocusSection",
    value: boolean
  ): void {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ [key]: value });
    }
  }

  // ... 더 많은 메서드
}
```

### 6.2 UnsplashService

```typescript
// services/unsplashService.ts

export class UnsplashService {
  private static readonly API_URL = "https://api.unsplash.com";
  private static readonly ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  private static readonly CACHE_KEY = "unsplash-photo-url";
  private static readonly CACHE_TIMESTAMP_KEY = "unsplash-photo-timestamp";
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간

  /**
   * 랜덤 자연 사진 가져오기
   */
  static async getRandomNaturePhoto(): Promise<string> {
    try {
      const response = await fetch(`${this.API_URL}/photos/random?query=nature&orientation=landscape`, {
        headers: {
          Authorization: `Client-ID ${this.ACCESS_KEY}`,
        },
      });

      if (!response.ok) throw new Error("Unsplash API error");

      const data = await response.json();
      return data.urls.regular;
    } catch (error) {
      console.error("Failed to fetch Unsplash photo:", error);
      return ""; // 폴백은 App.tsx에서 처리
    }
  }

  /**
   * 캐시된 사진 URL 가져오기
   */
  static getCachedPhotoUrl(): string | null {
    const url = localStorage.getItem(this.CACHE_KEY);
    const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);

    if (!url || !timestamp) return null;

    const age = Date.now() - parseInt(timestamp);
    if (age > this.CACHE_DURATION) {
      // 캐시 만료
      this.clearCache();
      return null;
    }

    return url;
  }

  /**
   * 사진 URL 캐시
   */
  static cachePhotoUrl(url: string): void {
    localStorage.setItem(this.CACHE_KEY, url);
    localStorage.setItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
  }

  /**
   * 캐시 삭제
   */
  static clearCache(): void {
    localStorage.removeItem(this.CACHE_KEY);
    localStorage.removeItem(this.CACHE_TIMESTAMP_KEY);
  }
}
```

### 6.3 NotificationService

```typescript
// services/notificationService.ts

export class NotificationService {
  private static readonly STORAGE_KEY = "moment-jin-notifications";

  /**
   * 모든 알림 가져오기
   */
  static getAll(): Notification[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * 알림 추가
   */
  static add(notificationData: Omit<Notification, "id" | "createdAt" | "updatedAt">): Notification {
    const notifications = this.getAll();

    const newNotification: Notification = {
      ...notificationData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notifications.push(newNotification);
    this.saveAll(notifications);

    return newNotification;
  }

  /**
   * 알림 업데이트
   */
  static update(id: string, updates: Partial<Notification>): void {
    const notifications = this.getAll();
    const index = notifications.findIndex((n) => n.id === id);

    if (index !== -1) {
      notifications[index] = {
        ...notifications[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.saveAll(notifications);
    }
  }

  /**
   * 알림 삭제
   */
  static delete(id: string): void {
    const notifications = this.getAll().filter((n) => n.id !== id);
    this.saveAll(notifications);
  }

  /**
   * 알림 토글 (활성/비활성)
   */
  static toggle(id: string): void {
    const notifications = this.getAll();
    const notification = notifications.find((n) => n.id === id);

    if (notification) {
      notification.isEnabled = !notification.isEnabled;
      notification.updatedAt = new Date().toISOString();
      this.saveAll(notifications);
    }
  }

  /**
   * 모든 알림 저장
   */
  private static saveAll(notifications: Notification[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
  }
}
```

---

## 7. 백그라운드 서비스

### 7.1 Service Worker (background.js)

```javascript
// public/background.js

// 알람 리스너
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("[Background] Alarm fired:", alarm.name);

  // 알람 이름 파싱: "notification-{id}-{timing}"
  const match = alarm.name.match(/^notification-(.+)-(.+)$/);
  if (!match) return;

  const [, notificationId, timing] = match;

  // localStorage에서 알림 정보 가져오기
  chrome.storage.local.get(["moment-jin-notifications"], (result) => {
    const notifications = result["moment-jin-notifications"] || [];
    const notification = notifications.find((n) => n.id === notificationId);

    if (!notification || !notification.isEnabled) return;

    // Chrome 알림 표시
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: notification.title,
      message: notification.description || "",
      priority: 2,
    });

    // 발생한 타이밍을 timings에서 제거 (선택적)
    // ...
  });
});

// Storage 변경 리스너
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== "local") return;

  if (changes["moment-jin-notifications"]) {
    console.log("[Background] Notifications updated, re-scheduling alarms");

    // 모든 알람 삭제 후 재생성
    chrome.alarms.clearAll(() => {
      const notifications = changes["moment-jin-notifications"].newValue || [];

      notifications.forEach((notification) => {
        if (!notification.isEnabled) return;

        const targetTime = new Date(notification.targetDateTime).getTime();

        notification.timings.forEach((timing) => {
          let alarmTime = targetTime;

          // 타이밍에 따라 시간 조정
          switch (timing) {
            case "5min-before":
              alarmTime -= 5 * 60 * 1000;
              break;
            case "10min-before":
              alarmTime -= 10 * 60 * 1000;
              break;
            case "30min-before":
              alarmTime -= 30 * 60 * 1000;
              break;
            case "1hour-before":
              alarmTime -= 60 * 60 * 1000;
              break;
            case "1day-before":
              alarmTime -= 24 * 60 * 60 * 1000;
              break;
          }

          // 과거 시간이면 스킵
          if (alarmTime <= Date.now()) return;

          // 알람 생성
          chrome.alarms.create(`notification-${notification.id}-${timing}`, {
            when: alarmTime,
          });
        });
      });
    });
  }
});
```

---

## 8. i18n (국제화) 설계

### 8.1 구조

```
src/newtab/i18n/
├── index.ts           # i18n 진입점
├── types.ts           # 번역 타입 정의
└── locales/
    ├── ko.ts          # 한국어
    ├── en.ts          # 영어
    ├── ja.ts          # 일본어
    └── zh.ts          # 중국어
```

### 8.2 타입 정의

```typescript
// i18n/types.ts

export type Locale = "en" | "ko" | "zh" | "ja";

export interface Translations {
  common: {
    add: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    close: string;
    confirm: string;
  };
  favorites: {
    title: string;
    add: string;
    // ...
  };
  todo: {
    title: string;
    placeholder: string;
    // ...
  };
  work: {
    title: string;
    checkIn: string;
    // ...
  };
  main: {
    greeting: {
      morning: string;
      afternoon: string;
      evening: string;
      night: string;
    };
    searchPlaceholder: string;
    focusLabel: string;
    focusPlaceholder: string;
  };
  options: {
    title: string;
    name: string;
    // ...
  };
}
```

### 8.3 useTranslation Hook

```typescript
// i18n/index.ts

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(() => {
    // 브라우저 언어 감지
    const browserLang = navigator.language.split("-")[0];
    return ["ko", "en", "ja", "zh"].includes(browserLang) ? (browserLang as Locale) : "en";
  });

  const t = useMemo(() => {
    switch (locale) {
      case "ko":
        return ko;
      case "ja":
        return ja;
      case "zh":
        return zh;
      default:
        return en;
    }
  }, [locale]);

  return { t, locale, setLocale };
}
```

---

## 9. 스타일링 설계

### 9.1 CSS 구조

```
src/newtab/styles/
└── index.css
    ├── Global Styles
    ├── Scrollbar Styles
    ├── App Root Layout
    ├── App Background
    ├── Favorites Panel
    ├── Main Area
    ├── Todo Panel
    ├── Work Panel
    ├── Notification Panel
    ├── Modals
    └── Responsive (Media Queries)
```

### 9.2 색상 체계

```css
:root {
  /* 배경 */
  --bg-panel: rgba(0, 0, 0, 0.3);
  --bg-panel-hover: rgba(0, 0, 0, 0.4);
  --bg-blur: blur(10px);

  /* 텍스트 */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-tertiary: rgba(255, 255, 255, 0.6);

  /* 강조 */
  --accent-blue: #3b82f6;
  --accent-blue-hover: #2563eb;

  /* 상태 */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  /* 간격 */
  --spacing-unit: 8px;
  --radius: 12px;

  /* 전환 */
  --transition: 300ms ease;
}
```

### 9.3 반응형 브레이크포인트

```css
/* 세로 화면 감지 */
@media (max-aspect-ratio: 1/1) {
  /* 높이 > 너비 */

  .app-content {
    flex-direction: column;
  }

  .favorites-panel {
    width: 100%;
    height: auto;
  }

  .bottom-panels {
    flex-direction: column;
  }

  .todo-work-wrapper {
    flex-direction: row;
  }
}
```

---

## 10. 성능 최적화

### 10.1 메모이제이션

```typescript
// 계산 비용이 높은 값들
const computed = useComputedValues({
  todos: state.todos,
  showCompletedTodos: state.showCompletedTodos,
  workRecords: state.workRecords,
  weekOffset: state.weekOffset,
});

// 내부 구현
export function useComputedValues(props: ComputedValuesProps) {
  // 날짜별 할일 그룹화
  const todosByDate = useMemo(() => {
    const grouped = new Map<string, Todo[]>();

    props.todos.forEach((todo) => {
      const todos = grouped.get(todo.date) || [];
      todos.push(todo);
      grouped.set(todo.date, todos);
    });

    // 필터링
    const filtered = props.showCompletedTodos
      ? grouped
      : new Map([...grouped].map(([date, todos]) => [date, todos.filter((t) => !t.done)]));

    // 정렬 및 변환
    return Array.from(filtered.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, todos]) => ({
        date,
        todos,
        hasIncomplete: todos.some((t) => !t.done),
      }));
  }, [props.todos, props.showCompletedTodos]);

  // ... 더 많은 계산

  return { todosByDate, remainingCount, weekRecords /* ... */ };
}
```

### 10.2 디바운싱

```typescript
// 자동 저장에 디바운스 적용
const debouncedSave = useMemo(
  () =>
    debounce((value: string) => {
      chrome.storage.sync.set({ todayFocus: value });
    }, 500),
  []
);

const handleFocusInputChange = useCallback(
  (value: string) => {
    setFocusInputValue(value);
    debouncedSave(value);
  },
  [debouncedSave]
);
```

### 10.3 가상화 (향후)

```typescript
// 큰 목록을 위한 가상화 (react-window 또는 react-virtual)
import { FixedSizeList } from "react-window";

<FixedSizeList height={600} itemCount={todos.length} itemSize={50} width="100%">
  {({ index, style }) => <TodoItem key={todos[index].id} todo={todos[index]} style={style} />}
</FixedSizeList>;
```

---

## 11. v1.1 설계: 날씨 위젯

### 11.1 아키텍처

```
┌─────────────────────────────────────────────┐
│           Weather Widget Component          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │   WeatherService (API 호출)         │  │
│  ├─────────────────────────────────────┤  │
│  │  • getCurrentWeather(lat, lon)     │  │
│  │  • getCachedWeather()              │  │
│  │  • cacheWeather(data)              │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │   Geolocation (위치 감지)           │  │
│  ├─────────────────────────────────────┤  │
│  │  • navigator.geolocation           │  │
│  │  • 권한 관리                        │  │
│  │  • 폴백: 수동 도시 입력             │  │
│  └─────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

### 11.2 컴포넌트 설계

```typescript
// components/Weather.tsx

interface WeatherProps {
  compact?: boolean; // 미니/풀 모드
}

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  location: string;
  timestamp: number;
}

export const Weather: React.FC<WeatherProps> = ({ compact = true }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [expanded, setExpanded] = useState(false);

  // 위치 가져오기 및 날씨 로드
  useEffect(() => {
    loadWeather();

    // 1시간마다 업데이트
    const timer = setInterval(loadWeather, 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const loadWeather = async () => {
    try {
      // 1. 캐시 확인
      const cached = WeatherService.getCachedWeather();
      if (cached && Date.now() - cached.timestamp < 60 * 60 * 1000) {
        setWeather(cached);
        setLoading(false);
        return;
      }

      // 2. 위치 가져오기
      const position = await getGeolocation();

      // 3. 날씨 API 호출
      const data = await WeatherService.getCurrentWeather(position.coords.latitude, position.coords.longitude);

      setWeather(data);
      WeatherService.cacheWeather(data);
    } catch (err) {
      console.error("Weather load error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getGeolocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        maximumAge: 60 * 60 * 1000, // 1시간 캐시
      });
    });
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  const getTemperature = (temp: number): number => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  if (loading) {
    return <div className="weather-widget loading">⏳</div>;
  }

  if (error || !weather) {
    return <div className="weather-widget error">🌡️ --°</div>;
  }

  if (compact) {
    return (
      <div className="weather-widget compact" onClick={() => setExpanded(!expanded)}>
        <span className="weather-icon">{weather.icon}</span>
        <span className="weather-temp">
          {Math.round(getTemperature(weather.temp))}°<span className="weather-unit">{unit}</span>
        </span>
        <span className="weather-condition">{weather.condition}</span>

        {expanded && (
          <div className="weather-details">
            <div>
              체감: {Math.round(getTemperature(weather.feelsLike))}°{unit}
            </div>
            <div>습도: {weather.humidity}%</div>
            <div>풍속: {weather.windSpeed}m/s</div>
            <button onClick={toggleUnit}>
              °{unit} ⇄ °{unit === "C" ? "F" : "C"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full mode (향후)
  return null;
};
```

### 11.3 WeatherService

```typescript
// services/weatherService.ts

export class WeatherService {
  private static readonly API_URL = "https://api.openweathermap.org/data/2.5/weather";
  private static readonly API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  private static readonly CACHE_KEY = "moment-jin-weather";

  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = `${this.API_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=kr`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    return {
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description,
      icon: this.getWeatherIcon(data.weather[0].id),
      location: data.name,
      timestamp: Date.now(),
    };
  }

  static getCachedWeather(): WeatherData | null {
    const cached = localStorage.getItem(this.CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }

  static cacheWeather(data: WeatherData): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
  }

  private static getWeatherIcon(weatherId: number): string {
    // OpenWeather Condition ID에 따라 이모지 매핑
    if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return "🌦️"; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
    if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
    if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
    if (weatherId === 800) return "☀️"; // Clear
    if (weatherId > 800) return "☁️"; // Clouds
    return "🌡️";
  }
}
```

### 11.4 UI 통합

```typescript
// AppHeader.tsx에 통합

export const AppHeader: React.FC<AppHeaderProps> = ({
  time,
  greeting,
  // ...
}) => {
  return (
    <div className="app-top">
      <div className="time-weather-row">
        <div className="app-time">{time}</div>
        <Weather compact />
      </div>
      <div className="app-greeting">{greeting}</div>
      {/* ... */}
    </div>
  );
};
```

### 11.5 스타일링

```css
/* Weather Widget Styles */
.weather-widget {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  cursor: pointer;
  transition: all 300ms ease;
  font-size: 1rem;
}

.weather-widget:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.weather-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.weather-temp {
  font-weight: 600;
  font-size: 1.2rem;
}

.weather-unit {
  font-size: 0.9rem;
  opacity: 0.8;
}

.weather-condition {
  font-size: 0.9rem;
  opacity: 0.9;
}

.weather-details {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  min-width: 200px;
  z-index: 100;
  animation: fadeIn 200ms ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Time + Weather Row */
.time-weather-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
```

---

## 12. 보안 고려사항

### 12.1 Content Security Policy

```json
// manifest.json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; connect-src 'self' https://api.unsplash.com https://api.openweathermap.org"
  }
}
```

### 12.2 API 키 관리

```typescript
// .env (절대 커밋하지 말 것)
VITE_UNSPLASH_ACCESS_KEY = your_key_here;
VITE_OPENWEATHER_API_KEY =
  // .gitignore에 추가
  your_key_here.env.env.local;
```

### 12.3 데이터 검증

```typescript
// 사용자 입력 검증
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // XSS 방지
    .slice(0, 500); // 길이 제한
}

// URL 검증
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
```

---

## 13. 테스트 전략 (향후)

### 13.1 단위 테스트

```typescript
// __tests__/services/storageService.test.ts
describe("StorageService", () => {
  beforeEach(() => {
    // Mock chrome.storage
    global.chrome = {
      storage: {
        sync: {
          get: jest.fn(),
          set: jest.fn(),
        },
      },
    };
  });

  test("should load data from storage", async () => {
    const mockData = { userName: "Test User" };
    chrome.storage.sync.get.mockImplementation((keys, callback) => {
      callback(mockData);
    });

    const result = await StorageService.loadFromStorage();
    expect(result).toEqual(mockData);
  });
});
```

### 13.2 통합 테스트

```typescript
// __tests__/integration/todo.test.tsx
describe("Todo Integration", () => {
  test("should add and display todo", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("새로운 할 일을 입력하세요...");
    const addButton = screen.getByText("추가");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Test Todo")).toBeInTheDocument();
    });
  });
});
```

### 13.3 E2E 테스트

```typescript
// e2e/basic-flow.spec.ts (Playwright)
test("basic user flow", async ({ page }) => {
  await page.goto("chrome-extension://[id]/newtab.html");

  // Add favorite
  await page.click('button:has-text("+")');
  await page.fill('input[placeholder="이름"]', "GitHub");
  await page.fill('input[placeholder="URL"]', "https://github.com");
  await page.click('button:has-text("추가")');

  // Verify favorite appears
  await expect(page.locator("text=GitHub")).toBeVisible();
});
```

---

## 14. 배포 및 빌드

### 14.1 빌드 프로세스

```bash
# 개발 모드
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과
dist/
├── newtab.html
├── options.html
├── manifest.json
├── background.js
├── assets/
│   ├── newtab-[hash].js
│   ├── newtab-[hash].css
│   └── ...
└── icons/
```

### 14.2 최적화

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "dnd-vendor": ["@dnd-kit/core", "@dnd-kit/sortable"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // 프로덕션에서 console.log 제거
      },
    },
  },
});
```

---

## 15. 모니터링 및 디버깅

### 15.1 로깅 전략

```typescript
// utils/logger.ts
export class Logger {
  static debug(message: string, ...args: any[]) {
    if (import.meta.env.DEV) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  static info(message: string, ...args: any[]) {
    console.log(`[INFO] ${message}`, ...args);
  }

  static warn(message: string, ...args: any[]) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  static error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args);

    // 프로덕션에서는 오류 추적 서비스로 전송 (향후)
    if (import.meta.env.PROD) {
      // Sentry.captureException(...)
    }
  }
}
```

### 15.2 성능 모니터링

```typescript
// Performance tracking
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();

  Logger.debug(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
}

// Usage
measurePerformance("loadTodos", () => {
  const todos = StorageService.loadTodos();
  setTodos(todos);
});
```

---

## 16. 부록

### 16.1 파일 구조

```
moment-jin/
├── public/
│   ├── manifest.json
│   ├── background.js
│   ├── newtab.html
│   ├── options.html
│   └── icons/
│       └── icon128.png
│
├── src/
│   └── newtab/
│       ├── main.tsx                 # 진입점
│       ├── App.tsx                  # 루트 컴포넌트
│       ├── components/              # UI 컴포넌트
│       │   ├── AppHeader.tsx
│       │   ├── FavoritesPanel.tsx
│       │   ├── TodoPanel.tsx
│       │   ├── WorkPanel.tsx
│       │   ├── NotificationPanel.tsx
│       │   ├── FocusInput.tsx
│       │   ├── NextNotification.tsx
│       │   ├── WorkCheckButtons.tsx
│       │   ├── ModalContainer.tsx
│       │   └── modals/
│       │       ├── FavoriteModal.tsx
│       │       ├── TimeEditModal.tsx
│       │       └── OptionsModal.tsx
│       │
│       ├── hooks/                   # Custom Hooks
│       │   ├── useAppState.ts
│       │   ├── useStorage.ts
│       │   ├── useStorageSync.ts
│       │   ├── useTodoHandler.ts
│       │   ├── useFavoriteHandler.ts
│       │   ├── useWorkHandler.ts
│       │   ├── useFocusHandler.ts
│       │   ├── useOptionsModal.ts
│       │   ├── usePanelToggle.ts
│       │   ├── useComputedValues.ts
│       │   └── useTranslation.ts
│       │
│       ├── services/                # 서비스 레이어
│       │   ├── storageService.ts
│       │   ├── unsplashService.ts
│       │   ├── notificationService.ts
│       │   └── weatherService.ts  # v1.1
│       │
│       ├── types/                   # TypeScript 타입
│       │   └── index.ts
│       │
│       ├── i18n/                    # 국제화
│       │   ├── index.ts
│       │   ├── types.ts
│       │   └── locales/
│       │       ├── ko.ts
│       │       ├── en.ts
│       │       ├── ja.ts
│       │       └── zh.ts
│       │
│       ├── utils/                   # 유틸리티 함수
│       │   ├── date.ts
│       │   ├── work.ts
│       │   ├── index.ts
│       │   └── logger.ts
│       │
│       ├── constants/               # 상수
│       │   └── index.ts
│       │
│       └── styles/                  # 스타일
│           └── index.css
│
├── docs/                            # 문서
│   ├── PRD_KR.md
│   ├── PRD_EN.md
│   ├── DESIGN_KR.md
│   └── DESIGN_EN.md
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

### 16.2 주요 의존성

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2"
  },
  "devDependencies": {
    "@types/chrome": "^0.1.31",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "typescript": "~5.9.3",
    "vite": "^7.2.4",
    "@vitejs/plugin-react": "^5.1.1",
    "tailwindcss": "^4.1.17"
  }
}
```

---

## 17. 변경 이력

| 버전       | 날짜       | 작성자 | 변경사항            |
| ---------- | ---------- | ------ | ------------------- |
| 1.0        | 2025-12-10 | 개발팀 | 초기 설계 문서 작성 |
| 1.1 (계획) | 2026-Q1    | 개발팀 | 날씨 위젯 설계 추가 |

---

**문서 상태**: ✅ 완료  
**다음 단계**: v1.1 날씨 위젯 구현
