# Design Specification Document

## Moment-Jin: Architecture & Design Documentation

---

## 1. Document Information

| Item                  | Content                  |
| --------------------- | ------------------------ |
| **Project Name**      | Moment-Jin               |
| **Version**           | 1.0.0                    |
| **Document Version**  | 1.0                      |
| **Last Modified**     | December 10, 2025        |
| **Author**            | Development Team         |
| **Status**            | Complete                 |
| **Related Documents** | [PRD_EN.md](./PRD_EN.md) |

---

## 2. System Architecture

### 2.1 Overall Structure

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

### 2.2 Layered Architecture

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

## 3. Component Design

### 3.1 Component Tree

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

### 3.2 Key Component Specifications

#### 3.2.1 App.tsx

**Role**: Root component, overall state management and orchestration

**State**:

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

**Key Logic**:

- Load and sync storage
- Update time/date (every 30s for time, every 60s for date check)
- Load and cache background images
- Pass all handlers to child components via props

---

#### 3.2.2 AppHeader.tsx

**Role**: Top area (clock, greeting, focus, notifications, work buttons)

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

**Layout**:

```
┌──────────────────────────────────────────┐
│  14:30                                    │
│  Good afternoon, User                     │
│  [What's your focus today?]               │
│  [📢 Next: 16:00 Team Meeting]           │
│  [🏢 Check In] [🏠 Check Out]            │
└──────────────────────────────────────────┘
```

---

#### 3.2.3 FavoritesPanel.tsx

**Role**: Favorites management panel (left side)

**Features**:

- Drag and drop for reordering (@dnd-kit)
- CRUD operations (add, edit, delete)
- Collapsible state management
- Can be hidden entirely from options

**State Transition**:

```
Open State          Collapsed State
┌─────────────┐    ┌─┐
│ ⚙️ Settings │    │★│ (vertical text)
│ ──────────  │    │F│
│ ⭐ GitHub   │    │a│
│ 📺 YouTube  │    │v│
│ 💼 Gmail    │    │o│
│             │    │r│
│ [+] ◀      │    │i│
└─────────────┘    │t│
                   │e│
                   │s│
                   └─┘
```

---

#### 3.2.4 TodoPanel.tsx

**Role**: Task management panel (right or bottom)

**Features**:

- Grouped by date
- Completed/incomplete filtering
- Date selection and scrolling
- Real-time date detection

**Data Structure**:

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

**Role**: Weekly work records panel

**Features**:

- Weekly calendar view (Mon-Sun)
- Weekly total work hours calculation
- Overtime/undertime display
- Vacation day indicators

**Calculation Logic**:

```typescript
// Work time calculation (minus 1 hour lunch)
workMinutes = (checkOut - checkIn) - 60

// Weekly total
weekTotal = sum(dailyMinutes[])
weekTarget = 40 hours = 2400 minutes

// Overtime/undertime
overtime = weekTotal - weekTarget
```

---

#### 3.2.6 NotificationPanel.tsx

**Role**: Notification creation and management panel

**Notification Timings**:

- at-time: Exact time
- 5min-before
- 10min-before
- 30min-before
- 1hour-before
- 1day-before

**Storage**:

```typescript
// Stored in chrome.storage.local (larger capacity)
key: "moment-jin-notifications"
value: Notification[]
```

---

### 3.3 Responsive Layout

#### Horizontal Screen

```
┌─────────────────────────────────────────────────────────┐
│  [⚙️]       14:30 Good afternoon        [🏢][🏠]       │
│  Favorites  What's your focus today?        Todos      │
│  ────────   ─────────────────────          ────────   │
│  ⭐ GitHub                                  📝 Task 1   │
│  📺 YouTube                                 ✓ Task 2   │
│  💼 Gmail                                   📝 Task 3   │
│                                                         │
│                                            Work Panel   │
│                                            ────────    │
│                                            📊 Records   │
└─────────────────────────────────────────────────────────┘
```

#### Vertical Screen

```
┌─────────────────────┐
│   14:30             │
│   Good afternoon    │
│   [Your focus...]   │
│   [🏢] [🏠]         │
├─────────────────────┤
│   Main Area         │
│   (maximum space)   │
├─────────────────────┤
│ 📢 Notifications ▲ │
├─────────────────────┤
│ 📝 Todos ▲│📊 Work ▲│
└─────────────────────┘
```

---

## 4. State Management Design

### 4.1 Custom Hooks Structure

```
useAppState (Global State)
├── useState (all state declarations)
└── return { states + setters }

App.tsx (Consumer)
├── useAppState() → state
├── useStorage() → initial load
├── useStorageSync() → real-time sync
├── useFocusHandler()
├── useTodoHandler()
├── useFavoriteHandler()
├── useWorkHandler()
├── useOptionsModal()
├── usePanelToggle()
└── useComputedValues()
```

### 4.2 Key Custom Hooks

#### useAppState

```typescript
export function useAppState() {
  // Declare all states
  const [time, setTime] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  // ... more states

  return {
    time,
    setTime,
    userName,
    setUserName,
    // ... all states and setters
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
        // Detect Chrome Storage changes
        // Also check for date changes
        checkDateChange();

        // Reflect each change to state
        if (changes.userName) props.setUserName(changes.userName.newValue);
        // ...
      };

      chrome.storage.onChanged.addListener(handleStorageChange);

      // Periodic date check (every 1 minute)
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

    // Save to storage
    chrome.storage.sync.set({ todos: updatedTodos });

    // Reset input
    props.setNewTodoText("");
  }, [props.todos, props.newTodoText, props.selectedDate]);

  // ... more handlers

  return { handleAddTodo, handleToggleTodo, handleDeleteTodo };
}
```

---

## 5. Data Models

### 5.1 Type Definitions

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
  icon?: string; // emoji or text
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

### 5.2 Storage Structure

```typescript
// chrome.storage.sync (100KB limit)
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

// chrome.storage.local (10MB limit)
{
  "moment-jin-notifications": Notification[]
}

// localStorage (backup/cache)
{
  "unsplash-photo-url": string
  "unsplash-photo-timestamp": number
}
```

---

## 6. Service Layer

### 6.1 StorageService

```typescript
// services/storageService.ts

export class StorageService {
  /**
   * Load data from Chrome Storage
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
   * Save panel state
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
   * Save panel visibility settings
   */
  static savePanelVisibility(
    key: "showFavoritesPanel" | "showTodosPanel" | "showWorkPanel" | "showNotificationPanel" | "showFocusSection",
    value: boolean
  ): void {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ [key]: value });
    }
  }

  // ... more methods
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
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Fetch random nature photo
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
      return ""; // Fallback handled in App.tsx
    }
  }

  /**
   * Get cached photo URL
   */
  static getCachedPhotoUrl(): string | null {
    const url = localStorage.getItem(this.CACHE_KEY);
    const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);

    if (!url || !timestamp) return null;

    const age = Date.now() - parseInt(timestamp);
    if (age > this.CACHE_DURATION) {
      // Cache expired
      this.clearCache();
      return null;
    }

    return url;
  }

  /**
   * Cache photo URL
   */
  static cachePhotoUrl(url: string): void {
    localStorage.setItem(this.CACHE_KEY, url);
    localStorage.setItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
  }

  /**
   * Clear cache
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
   * Get all notifications
   */
  static getAll(): Notification[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Add notification
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
   * Update notification
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
   * Delete notification
   */
  static delete(id: string): void {
    const notifications = this.getAll().filter((n) => n.id !== id);
    this.saveAll(notifications);
  }

  /**
   * Toggle notification (enabled/disabled)
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
   * Save all notifications
   */
  private static saveAll(notifications: Notification[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
  }
}
```

---

## 7. Background Service

### 7.1 Service Worker (background.js)

```javascript
// public/background.js

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("[Background] Alarm fired:", alarm.name);

  // Parse alarm name: "notification-{id}-{timing}"
  const match = alarm.name.match(/^notification-(.+)-(.+)$/);
  if (!match) return;

  const [, notificationId, timing] = match;

  // Get notification info from localStorage
  chrome.storage.local.get(["moment-jin-notifications"], (result) => {
    const notifications = result["moment-jin-notifications"] || [];
    const notification = notifications.find((n) => n.id === notificationId);

    if (!notification || !notification.isEnabled) return;

    // Show Chrome notification
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: notification.title,
      message: notification.description || "",
      priority: 2,
    });

    // Optional: Remove triggered timing from timings array
    // ...
  });
});

// Storage change listener
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== "local") return;

  if (changes["moment-jin-notifications"]) {
    console.log("[Background] Notifications updated, re-scheduling alarms");

    // Clear all alarms and recreate
    chrome.alarms.clearAll(() => {
      const notifications = changes["moment-jin-notifications"].newValue || [];

      notifications.forEach((notification) => {
        if (!notification.isEnabled) return;

        const targetTime = new Date(notification.targetDateTime).getTime();

        notification.timings.forEach((timing) => {
          let alarmTime = targetTime;

          // Adjust time based on timing
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

          // Skip if in the past
          if (alarmTime <= Date.now()) return;

          // Create alarm
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

## 8. i18n (Internationalization) Design

### 8.1 Structure

```
src/newtab/i18n/
├── index.ts           # i18n entry point
├── types.ts           # Translation type definitions
└── locales/
    ├── ko.ts          # Korean
    ├── en.ts          # English
    ├── ja.ts          # Japanese
    └── zh.ts          # Chinese
```

### 8.2 Type Definitions

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
    // Detect browser language
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

## 9. Styling Design

### 9.1 CSS Structure

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

### 9.2 Color Scheme

```css
:root {
  /* Background */
  --bg-panel: rgba(0, 0, 0, 0.3);
  --bg-panel-hover: rgba(0, 0, 0, 0.4);
  --bg-blur: blur(10px);

  /* Text */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-tertiary: rgba(255, 255, 255, 0.6);

  /* Accent */
  --accent-blue: #3b82f6;
  --accent-blue-hover: #2563eb;

  /* Status */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Spacing */
  --spacing-unit: 8px;
  --radius: 12px;

  /* Transitions */
  --transition: 300ms ease;
}
```

### 9.3 Responsive Breakpoints

```css
/* Vertical screen detection */
@media (max-aspect-ratio: 1/1) {
  /* height > width */

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

## 10. Performance Optimization

### 10.1 Memoization

```typescript
// High-cost computed values
const computed = useComputedValues({
  todos: state.todos,
  showCompletedTodos: state.showCompletedTodos,
  workRecords: state.workRecords,
  weekOffset: state.weekOffset,
});

// Internal implementation
export function useComputedValues(props: ComputedValuesProps) {
  // Group todos by date
  const todosByDate = useMemo(() => {
    const grouped = new Map<string, Todo[]>();

    props.todos.forEach((todo) => {
      const todos = grouped.get(todo.date) || [];
      todos.push(todo);
      grouped.set(todo.date, todos);
    });

    // Filter
    const filtered = props.showCompletedTodos
      ? grouped
      : new Map([...grouped].map(([date, todos]) => [date, todos.filter((t) => !t.done)]));

    // Sort and transform
    return Array.from(filtered.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, todos]) => ({
        date,
        todos,
        hasIncomplete: todos.some((t) => !t.done),
      }));
  }, [props.todos, props.showCompletedTodos]);

  // ... more computations

  return { todosByDate, remainingCount, weekRecords /* ... */ };
}
```

### 10.2 Debouncing

```typescript
// Debounce for auto-save
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

### 10.3 Virtualization (Future)

```typescript
// Virtualization for large lists (react-window or react-virtual)
import { FixedSizeList } from "react-window";

<FixedSizeList height={600} itemCount={todos.length} itemSize={50} width="100%">
  {({ index, style }) => <TodoItem key={todos[index].id} todo={todos[index]} style={style} />}
</FixedSizeList>;
```

---

## 11. v1.1 Design: Weather Widget

### 11.1 Architecture

```
┌─────────────────────────────────────────────┐
│           Weather Widget Component          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │   WeatherService (API calls)        │  │
│  ├─────────────────────────────────────┤  │
│  │  • getCurrentWeather(lat, lon)     │  │
│  │  • getCachedWeather()              │  │
│  │  • cacheWeather(data)              │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │   Geolocation (location detection)  │  │
│  ├─────────────────────────────────────┤  │
│  │  • navigator.geolocation           │  │
│  │  • Permission management           │  │
│  │  • Fallback: Manual city input    │  │
│  └─────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

### 11.2 Component Design

```typescript
// components/Weather.tsx

interface WeatherProps {
  compact?: boolean; // mini/full mode
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

  // Get location and load weather
  useEffect(() => {
    loadWeather();

    // Update every hour
    const timer = setInterval(loadWeather, 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const loadWeather = async () => {
    try {
      // 1. Check cache
      const cached = WeatherService.getCachedWeather();
      if (cached && Date.now() - cached.timestamp < 60 * 60 * 1000) {
        setWeather(cached);
        setLoading(false);
        return;
      }

      // 2. Get location
      const position = await getGeolocation();

      // 3. Call weather API
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
        maximumAge: 60 * 60 * 1000, // 1 hour cache
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
              Feels like: {Math.round(getTemperature(weather.feelsLike))}°{unit}
            </div>
            <div>Humidity: {weather.humidity}%</div>
            <div>Wind: {weather.windSpeed}m/s</div>
            <button onClick={toggleUnit}>
              °{unit} ⇄ °{unit === "C" ? "F" : "C"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full mode (future)
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
    const url = `${this.API_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=en`;

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
    // Map OpenWeather Condition ID to emoji
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

### 11.4 UI Integration

```typescript
// Integrate into AppHeader.tsx

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

### 11.5 Styling

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

## 12. Security Considerations

### 12.1 Content Security Policy

```json
// manifest.json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; connect-src 'self' https://api.unsplash.com https://api.openweathermap.org"
  }
}
```

### 12.2 API Key Management

```typescript
// .env (NEVER commit)
VITE_UNSPLASH_ACCESS_KEY = your_key_here;
VITE_OPENWEATHER_API_KEY =
  // Add to .gitignore
  your_key_here.env.env.local;
```

### 12.3 Data Validation

```typescript
// Validate user input
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Prevent XSS
    .slice(0, 500); // Length limit
}

// Validate URL
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

## 13. Testing Strategy (Future)

### 13.1 Unit Tests

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

### 13.2 Integration Tests

```typescript
// __tests__/integration/todo.test.tsx
describe("Todo Integration", () => {
  test("should add and display todo", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Test Todo")).toBeInTheDocument();
    });
  });
});
```

### 13.3 E2E Tests

```typescript
// e2e/basic-flow.spec.ts (Playwright)
test("basic user flow", async ({ page }) => {
  await page.goto("chrome-extension://[id]/newtab.html");

  // Add favorite
  await page.click('button:has-text("+")');
  await page.fill('input[placeholder="Name"]', "GitHub");
  await page.fill('input[placeholder="URL"]', "https://github.com");
  await page.click('button:has-text("Add")');

  // Verify favorite appears
  await expect(page.locator("text=GitHub")).toBeVisible();
});
```

---

## 14. Deployment & Build

### 14.1 Build Process

```bash
# Development mode
npm run dev

# Production build
npm run build

# Build output
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

### 14.2 Optimization

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
        drop_console: true, // Remove console.log in production
      },
    },
  },
});
```

---

## 15. Monitoring & Debugging

### 15.1 Logging Strategy

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

    // Send to error tracking service in production (future)
    if (import.meta.env.PROD) {
      // Sentry.captureException(...)
    }
  }
}
```

### 15.2 Performance Monitoring

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

## 16. Appendix

### 16.1 File Structure

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
│       ├── main.tsx                 # Entry point
│       ├── App.tsx                  # Root component
│       ├── components/              # UI components
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
│       ├── hooks/                   # Custom hooks
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
│       ├── services/                # Service layer
│       │   ├── storageService.ts
│       │   ├── unsplashService.ts
│       │   ├── notificationService.ts
│       │   └── weatherService.ts  # v1.1
│       │
│       ├── types/                   # TypeScript types
│       │   └── index.ts
│       │
│       ├── i18n/                    # Internationalization
│       │   ├── index.ts
│       │   ├── types.ts
│       │   └── locales/
│       │       ├── ko.ts
│       │       ├── en.ts
│       │       ├── ja.ts
│       │       └── zh.ts
│       │
│       ├── utils/                   # Utility functions
│       │   ├── date.ts
│       │   ├── work.ts
│       │   ├── index.ts
│       │   └── logger.ts
│       │
│       ├── constants/               # Constants
│       │   └── index.ts
│       │
│       └── styles/                  # Styles
│           └── index.css
│
├── docs/                            # Documentation
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

### 16.2 Key Dependencies

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

## 17. Change History

| Version       | Date       | Author           | Changes                     |
| ------------- | ---------- | ---------------- | --------------------------- |
| 1.0           | 2025-12-10 | Development Team | Initial design document     |
| 1.1 (Planned) | 2026-Q1    | Development Team | Weather widget design added |

---

**Document Status**: ✅ Complete  
**Next Steps**: Implement v1.1 Weather Widget
