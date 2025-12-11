# Product Requirements Document (PRD)

## Moment-Jin: Productivity-Focused Chrome New Tab Extension

---

## 1. Document Information

| Item                 | Details          |
| -------------------- | ---------------- |
| **Product Name**     | Moment-Jin       |
| **Version**          | 1.0.0            |
| **Document Version** | 1.0              |
| **Last Updated**     | 2025-12-10       |
| **Author**           | Development Team |
| **Status**           | Completed        |

---

## 2. Executive Summary

### 2.1 Product Overview

Moment-Jin is a Chrome extension that replaces the default new tab page with a productivity-focused dashboard. It combines time management, task tracking, work hour logging, and notification management in a beautiful, customizable interface inspired by the Momentum extension.

### 2.2 Target Users

- **Primary**: Knowledge workers, developers, and remote workers who need integrated productivity tools
- **Secondary**: Students and freelancers managing multiple tasks and schedules

### 2.3 Key Value Propositions

- All-in-one productivity dashboard without external dependencies
- Automatic date synchronization across multiple browser tabs
- Offline-first design with Chrome Storage API
- Multi-language support (Korean, English, Japanese, Chinese)
- Customizable panel visibility for personalized workflows
- Beautiful dynamic backgrounds from Unsplash

---

## 3. Product Goals & Success Metrics

### 3.1 Goals

1. Provide seamless daily productivity tracking without context switching
2. Enable real-time synchronization across multiple browser tabs
3. Ensure data persistence and reliability through Chrome Storage API
4. Support international users with comprehensive i18n

### 3.2 Success Metrics

- User engagement: Daily active usage > 80% of install base
- Data reliability: 99.9% successful storage operations
- Performance: < 100ms initial page load
- Cross-tab sync latency: < 1 second

---

## 4. Functional Requirements

### 4.1 Core Layout & Navigation

#### REQ-001: Responsive Layout System

**Priority**: P0 (Critical)  
**Description**: The application must provide adaptive layouts for both horizontal and vertical screen orientations.

**Acceptance Criteria**:

- Horizontal screens: Side panels (favorites on left, todos/work on right)
- Vertical screens: Bottom panels (stacked notification, todos, work records)
- Smooth transition when rotating/resizing browser window
- No layout breaking at any standard screen resolution (1024px ~ 4K)

**Dependencies**: None

---

#### REQ-002: Multi-Language Support (i18n)

**Priority**: P0 (Critical)  
**Description**: Support 4 languages with automatic browser language detection.

**Acceptance Criteria**:

- Supported languages: Korean (ko), English (en), Japanese (ja), Chinese (zh)
- Auto-detect browser language on first launch
- All UI text translated consistently
- Date/time formatting respects locale conventions
- Manual language switching available

**Dependencies**: None

---

### 4.2 Main Dashboard Area

#### REQ-003: Real-Time Clock Display

**Priority**: P0 (Critical)  
**Description**: Display current time in HH:MM format with automatic updates.

**Acceptance Criteria**:

- Updates every 30 seconds
- 12/24 hour format based on locale
- Large, readable font size (4rem)
- Smooth fade-in animation on page load

**Dependencies**: None

---

#### REQ-004: Personalized Greeting

**Priority**: P1 (High)  
**Description**: Display time-appropriate greeting with optional user name.

**Acceptance Criteria**:

- Time-based greetings: Morning (05:00-12:00), Afternoon (12:00-17:00), Evening (17:00-22:00), Night (22:00-05:00)
- Format: "{Greeting}, {UserName}" or just "{Greeting}" if name not set
- Localized greeting messages for all supported languages
- Updates automatically when name is changed in settings

**Dependencies**: REQ-002, REQ-021

---

#### REQ-005: Focus Goal Input

**Priority**: P1 (High)  
**Description**: Set and display daily focus goal with inline editing.

**Acceptance Criteria**:

- Click to edit current goal
- Enter key to save, Escape to cancel
- Blur to save automatically
- Placeholder text: "What's your main focus today?"
- Syncs across all open tabs
- Optional visibility control in settings

**Dependencies**: REQ-024

---

#### REQ-006: Dynamic Background Images

**Priority**: P2 (Medium)  
**Description**: Display beautiful nature photos from Unsplash with daily caching.

**Acceptance Criteria**:

- Fetch random nature photo from Unsplash API
- Cache photo for 24 hours
- Fallback to CSS gradient if API fails
- Smooth fade-in transition
- Dark overlay for text readability

**Dependencies**: None

---

### 4.3 Favorites Panel

#### REQ-007: Bookmark Management

**Priority**: P1 (High)  
**Description**: Quick access panel for frequently visited websites.

**Acceptance Criteria**:

- Add favorite: Label, URL, optional emoji icon
- Edit existing favorites
- Delete with confirmation
- Drag & drop to reorder favorites
- Click to open in current tab
- Auto-extract favicon if no icon provided
- Collapsible panel (expand/collapse)
- Optional panel visibility in settings

**Dependencies**: REQ-020, REQ-024

---

#### REQ-008: Favorites Panel States

**Priority**: P1 (High)  
**Description**: Panel must support open/collapsed states with smooth transitions.

**Acceptance Criteria**:

- Open state: Full list view with icons and labels
- Collapsed state: Vertical indicator only
- Toggle button with appropriate icon (◀/▶ or ▲/▼ based on screen orientation)
- State persists across sessions
- Smooth CSS transitions (300ms)

**Dependencies**: REQ-007

---

### 4.4 Todo Panel

#### REQ-009: Task Management

**Priority**: P0 (Critical)  
**Description**: Create, manage, and track daily tasks organized by date.

**Acceptance Criteria**:

- Add task with Enter key
- Group tasks by date (YYYY-MM-DD)
- Show "Today" badge for current date
- Display remaining/total count
- Check/uncheck to mark completion
- Delete task with confirmation
- Tasks sorted by date (newest first)
- Completed tasks visually distinct (strikethrough, reduced opacity)

**Dependencies**: REQ-012

---

#### REQ-010: Date-Based Task Filtering

**Priority**: P1 (High)  
**Description**: Filter tasks by selected date with visual indication.

**Acceptance Criteria**:

- Click date header to select
- Selected date highlighted
- New tasks added to selected date (or today if none selected)
- Clear selection button
- Scroll to selected date automatically
- Date format: "MM/DD (Day)" with localized day names

**Dependencies**: REQ-009

---

#### REQ-011: Completed Tasks Toggle

**Priority**: P2 (Medium)  
**Description**: Option to show/hide completed tasks to reduce clutter.

**Acceptance Criteria**:

- Toggle button with eye icon (👁️/👁️‍🗨️)
- Active state indicator
- Filter applies immediately
- State persists across sessions
- Tooltip shows current state

**Dependencies**: REQ-009

---

#### REQ-012: Real-Time Date Detection

**Priority**: P1 (High)  
**Description**: Automatically detect date changes without page reload.

**Acceptance Criteria**:

- Check date every 60 seconds
- Triggered on any Chrome Storage change
- Update "Today" indicators immediately
- Console log when date changes
- Works even if tab open for 24+ hours

**Dependencies**: REQ-027

---

### 4.5 Work Records Panel

#### REQ-013: Check-In/Check-Out Tracking

**Priority**: P1 (High)  
**Description**: Track daily work hours with check-in and check-out times.

**Acceptance Criteria**:

- Check-in button records current time
- Check-out button records current time
- Display today's work duration in header
- Click recorded time to edit manually
- Right-click to edit time
- Times in HH:MM format (24-hour)
- Automatic lunch break deduction (1 hour)
- Visual indication when times recorded (✓ icon)

**Dependencies**: REQ-014

---

#### REQ-014: Weekly Work Summary

**Priority**: P1 (High)  
**Description**: View weekly work hours with target comparison.

**Acceptance Criteria**:

- Display Monday-Sunday week view
- Navigate between weeks (◀ Previous / Next ▶)
- Show total hours worked vs. target (40 hours)
- Calculate overtime/undertime
- Week range display: "MM/DD ~ MM/DD"
- Each day shows: Date, Day name, Work duration, Progress bar
- Highlight today's entry
- Click date to scroll to todos for that date

**Dependencies**: REQ-013

---

#### REQ-015: Vacation Day Marking

**Priority**: P2 (Medium)  
**Description**: Mark days as vacation with automatic 8-hour credit.

**Acceptance Criteria**:

- Checkbox in time edit modal
- Vacation days count as 8 hours
- Visual indicator on calendar (distinct styling)
- Included in weekly total calculation
- Cannot have check-in/check-out on vacation days

**Dependencies**: REQ-013

---

### 4.6 Notifications Panel

#### REQ-016: Notification Creation

**Priority**: P1 (High)  
**Description**: Create timed notifications with multiple reminder intervals.

**Acceptance Criteria**:

- Required fields: Title, Target date & time
- Optional field: Description
- Multiple reminder timings:
  - At time (exact moment)
  - 5 minutes before
  - 10 minutes before
  - 30 minutes before
  - 1 hour before
  - 1 day before
- Enable/disable notification
- Edit existing notification
- Delete with confirmation

**Dependencies**: REQ-017

---

#### REQ-017: Notification Display

**Priority**: P1 (High)  
**Description**: Show upcoming notifications with time-based styling.

**Acceptance Criteria**:

- Display format: Title, Date/Time, Description (optional)
- Show selected reminder timings as badges
- Past notifications grayed out
- Disabled notifications reduced opacity
- Next notification shown in main header
- Chrome notifications at reminder times
- Sorted by date/time (earliest first)

**Dependencies**: REQ-018

---

#### REQ-018: Background Notification Service

**Priority**: P0 (Critical)  
**Description**: Service worker to trigger Chrome notifications at scheduled times.

**Acceptance Criteria**:

- Check notifications every minute
- Trigger Chrome notification at reminder time
- Notification includes title and description
- Click notification to focus extension tab
- Clear triggered reminders
- Work even when browser tab closed
- Sync with localStorage changes

**Dependencies**: REQ-016

---

#### REQ-019: Next Notification Preview

**Priority**: P2 (Medium)  
**Description**: Display next upcoming notification in main header.

**Acceptance Criteria**:

- Show closest future notification
- Format: "[Time] {Title}"
- Update immediately when notifications change
- Hide if no notifications panel hidden
- Relative time display if within 24 hours

**Dependencies**: REQ-017, REQ-024

---

### 4.7 Panel Management

#### REQ-020: Drag & Drop Reordering

**Priority**: P1 (High)  
**Description**: Reorder favorites using drag and drop interaction.

**Acceptance Criteria**:

- Use @dnd-kit library for smooth DnD
- Visual feedback during drag (elevation, opacity)
- Drop zones clearly indicated
- Changes save automatically
- Works on both desktop and touch devices
- Prevent accidental drags (threshold: 5px)

**Dependencies**: REQ-007

---

#### REQ-021: Settings Modal

**Priority**: P1 (High)  
**Description**: Centralized configuration for all app settings.

**Acceptance Criteria**:

- Open via gear icon (bottom-left)
- Sections:
  - User name input
  - Panel visibility toggles (Favorites, Todos, Work, Notifications, Focus)
  - Data export/import
- Save button with Ctrl+Enter shortcut
- Cancel button with Escape shortcut
- Auto-focus name input on open
- Changes applied immediately on save

**Dependencies**: REQ-024

---

#### REQ-022: Data Export/Import

**Priority**: P1 (High)  
**Description**: Backup and restore all user data via JSON file.

**Acceptance Criteria**:

- Export includes:
  - User settings (name, panel states)
  - All favorites
  - All todos
  - All work records
  - All notifications
  - Export timestamp
- Import shows preview with item counts
- Confirmation dialog before import
- Import overwrites all data
- Auto-reload after successful import
- File format: JSON with version info

**Dependencies**: REQ-021

---

#### REQ-023: Panel Expand/Collapse

**Priority**: P1 (High)  
**Description**: All panels support expand/collapse with persistent state.

**Acceptance Criteria**:

- Toggle button in panel header
- Icons change based on orientation:
  - Vertical screens: ▲ (open) / ▼ (closed)
  - Horizontal screens: ▶ (open) / ◀ (closed)
- Collapsed state shows vertical text indicator
- Click indicator to expand
- State saved to Chrome Storage
- Smooth CSS transitions

**Dependencies**: None

---

#### REQ-024: Panel Visibility Settings

**Priority**: P1 (High)  
**Description**: Show/hide entire panels via settings modal.

**Acceptance Criteria**:

- Independent toggles for each panel:
  - Favorites
  - Todos
  - Work Records
  - Notifications
  - Focus Section
- Hidden panels removed from DOM
- Hiding notifications also hides next notification preview
- Settings persist across sessions
- Applied immediately without reload

**Dependencies**: REQ-021

---

### 4.8 Data Persistence & Synchronization

#### REQ-025: Chrome Storage Integration

**Priority**: P0 (Critical)  
**Description**: Store all user data in chrome.storage.sync for cloud backup.

**Acceptance Criteria**:

- Storage keys:
  - userName, todayFocus
  - todos, favorites, workRecords
  - favoritesOpen, todosOpen, workPanelOpen, notificationPanelOpen
  - showFavoritesPanel, showTodosPanel, showWorkPanel, showNotificationPanel, showFocusSection
- Automatic save on all data changes
- Load on app initialization
- Handle storage quota limits gracefully
- Fallback to localStorage if sync unavailable

**Dependencies**: None

---

#### REQ-026: Cross-Tab Real-Time Sync

**Priority**: P0 (Critical)  
**Description**: Changes in one tab immediately reflect in all other open tabs.

**Acceptance Criteria**:

- Listen to chrome.storage.onChanged events
- Update state immediately on storage change
- Sync includes:
  - User settings
  - All data (todos, favorites, work, notifications)
  - Panel states (open/closed, visible/hidden)
  - Focus goal
- No user action required
- Console log on sync events
- Max sync delay: 1 second

**Dependencies**: REQ-025

---

#### REQ-027: Automatic Date Change Detection

**Priority**: P1 (High)  
**Description**: Detect when date changes and update UI without reload.

**Acceptance Criteria**:

- Check date every 60 seconds
- Also check on every Chrome Storage change event
- Update immediately when date changes:
  - "Today" badges in todos
  - Work record "Today" entry
  - Time and greeting
- Log date change to console
- Works even after 24+ hours of tab being open
- No duplicate checks (debouncing)

**Dependencies**: REQ-026

---

### 4.9 Notification System

#### REQ-028: Local Notification Storage

**Priority**: P1 (High)  
**Description**: Store notifications in chrome.storage.local (large quota).

**Acceptance Criteria**:

- Separate storage from sync data
- Key: "moment-jin-notifications"
- Sync to storage on all CRUD operations
- Load on component mount
- Handle storage errors gracefully
- Console log sync operations

**Dependencies**: REQ-016, REQ-025

---

#### REQ-029: Chrome Alarms API Integration

**Priority**: P1 (High)  
**Description**: Use Chrome Alarms API for reliable notification scheduling.

**Acceptance Criteria**:

- Create alarm for each reminder time
- Alarm name format: "notification-{id}-{timing}"
- Check alarms every minute
- Fire Chrome notification when alarm triggers
- Clear alarm after firing
- Re-schedule if notification edited
- Cancel alarms when notification deleted

**Dependencies**: REQ-018

---

### 4.10 UI/UX Requirements

#### REQ-030: Visual Consistency

**Priority**: P1 (High)  
**Description**: Maintain consistent design language across all components.

**Acceptance Criteria**:

- Panel headers use same structure
- Buttons follow same styling patterns
- Consistent spacing (8px base unit)
- Color scheme:
  - Background: rgba(0,0,0,0.3) with blur
  - Text: White with varying opacity
  - Accents: Blue for interactive elements
- Same transition duration (300ms)
- Same border radius (12px)

**Dependencies**: None

---

#### REQ-031: Accessibility

**Priority**: P2 (Medium)  
**Description**: Ensure keyboard navigation and screen reader support.

**Acceptance Criteria**:

- All interactive elements keyboard accessible
- Tab order logical and consistent
- ARIA labels for icon buttons
- Focus visible indicators
- Escape key closes modals
- Enter key submits forms
- No keyboard traps

**Dependencies**: None

---

#### REQ-032: Performance Optimization

**Priority**: P1 (High)  
**Description**: Fast load times and smooth interactions.

**Acceptance Criteria**:

- Initial page load < 100ms
- Smooth 60fps animations
- Virtualized lists for large datasets
- Memoized computed values
- Debounced auto-save operations
- Lazy load background images
- No unnecessary re-renders

**Dependencies**: None

---

#### REQ-033: Error Handling

**Priority**: P1 (High)  
**Description**: Graceful degradation and user-friendly error messages.

**Acceptance Criteria**:

- Try-catch blocks on all async operations
- User-friendly error messages (no technical jargon)
- Fallback UI when data fails to load
- Console logging for debugging
- Retry mechanisms for network requests
- Toast notifications for user actions
- No app crashes on edge cases

**Dependencies**: None

---

## 5. Non-Functional Requirements

### 5.1 Performance

- **NFR-001**: Initial page load under 100ms
- **NFR-002**: All interactions respond within 16ms (60fps)
- **NFR-003**: Chrome Storage operations complete within 100ms
- **NFR-004**: Memory usage under 50MB

### 5.2 Security

- **NFR-005**: No external data transmission except Unsplash API
- **NFR-006**: All user data stored locally in Chrome Storage
- **NFR-007**: No third-party analytics or tracking
- **NFR-008**: Content Security Policy enforced

### 5.3 Compatibility

- **NFR-009**: Chrome 120+ (Manifest V3)
- **NFR-010**: Screen resolutions: 1024px ~ 4K
- **NFR-011**: Works offline (except background fetch)
- **NFR-012**: Cross-platform (Windows, Mac, Linux, ChromeOS)

### 5.4 Maintainability

- **NFR-013**: TypeScript for type safety
- **NFR-014**: Component-based architecture
- **NFR-015**: Custom hooks for reusable logic
- **NFR-016**: ESLint + Prettier for code quality
- **NFR-017**: Comprehensive inline documentation

### 5.5 Scalability

- **NFR-018**: Support up to 1000 todos without performance degradation
- **NFR-019**: Support up to 100 favorites
- **NFR-020**: Support up to 500 notifications
- **NFR-021**: 2 years of work records (~730 entries)

---

## 6. Technical Stack

### 6.1 Frontend

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: CSS + Tailwind CSS 4.1.17

### 6.2 Libraries

- **DnD**: @dnd-kit (core, sortable, utilities)
- **Types**: @types/chrome, @types/react

### 6.3 Chrome APIs

- **Storage**: chrome.storage.sync, chrome.storage.local
- **Alarms**: chrome.alarms
- **Notifications**: chrome.notifications
- **Service Worker**: Background script for alarms

### 6.4 External APIs

- **Unsplash**: Random nature photos (1600x900)

---

## 7. User Flows

### 7.1 First-Time User Setup

1. Install extension from Chrome Web Store
2. Open new tab → Extension loads with default settings
3. (Optional) Click settings → Enter name
4. (Optional) Configure panel visibility
5. Start adding favorites, todos, or work records

### 7.2 Daily Task Management

1. Open new tab
2. See today's focus goal and current tasks
3. Add new tasks with Enter key
4. Check off completed tasks
5. Review weekly work hours
6. Check in/out for work tracking

### 7.3 Notification Workflow

1. Click "+" in notification panel
2. Enter title, date/time, description
3. Select reminder timings
4. Save notification
5. Receive Chrome notification at scheduled time
6. Click notification to return to dashboard

### 7.4 Cross-Device Sync

1. Make changes on Device A
2. Open new tab on Device B (Chrome sync enabled)
3. Changes automatically appear
4. Both devices stay in sync in real-time

---

## 8. Future Enhancements & Roadmap

### 8.1 v1.1 Planned Features (High Priority)

#### FE-001: Real-Time Weather Widget

**Priority**: P1 (High)  
**Target Version**: v1.1  
**Description**: Display real-time weather information based on user location next to the clock.

**Requirements**:

- Auto-detect user location with Geolocation API
- Integrate OpenWeatherMap API or WeatherAPI.com
- Display Information:
  - Current temperature (°C/°F toggle)
  - Weather icon (Sunny ☀️, Cloudy ☁️, Rainy 🌧️, Snowy ❄️, etc.)
  - Feels-like temperature
  - Humidity & wind speed (optional)
- Minimal space usage (harmonious design with clock)
- Auto-refresh every hour
- Click to expand detailed weather info (modal or dropdown)
- Manual city input option when location permission denied
- Display last cached data when offline

**Tech Stack**:

- Geolocation API (browser native)
- OpenWeatherMap Free API (60 calls/min)
- Icons: Weather Icons or custom SVG

**UI Mockup**:

```
┌─────────────────────────────────────┐
│  14:30        ☀️ 23°C  Clear         │
│  Good Afternoon, User                │
└─────────────────────────────────────┘
```

**Acceptance Criteria**:

- [ ] Geolocation API integration
- [ ] Weather API integration with error handling
- [ ] Modern weather icon set design
- [ ] Temperature unit conversion (°C ⇄ °F)
- [ ] Caching and offline support
- [ ] Location permission management UX
- [ ] i18n support (weather descriptions)

**Estimated Effort**: 5 days

---

#### FE-002: Pomodoro Timer

**Priority**: P1 (High)  
**Target Version**: v1.1  
**Description**: Pomodoro technique timer for focused work sessions.

**Requirements**:

- 25min work / 5min break default settings
- Customizable time intervals
- Visual timer (circular progress bar)
- Notification sound and Chrome notification
- Display today's completed pomodoros count
- Link with todos (assign pomodoros to specific tasks)
- Statistics: Daily/weekly/monthly completed pomodoros

**Acceptance Criteria**:

- [ ] Timer logic implementation
- [ ] Visual design (minimalist circular UI)
- [ ] Notification sound and Chrome alerts
- [ ] Todo integration
- [ ] Statistics dashboard
- [ ] Settings options (time intervals, sounds)

**Estimated Effort**: 4 days

---

#### FE-003: Todo Categories & Tags

**Priority**: P2 (Medium)  
**Target Version**: v1.1  
**Description**: Organize tasks with categories and tags.

**Requirements**:

- Color-based categories (Work, Personal, Learning, Health, etc.)
- Hashtag-style tags (#urgent, #today, etc.)
- Filter by category/tag
- Drag & drop to assign categories
- Category-based statistics (completion rate, time spent)

**Acceptance Criteria**:

- [ ] Category CRUD
- [ ] Tag system
- [ ] Filtering UI
- [ ] Drag & drop integration
- [ ] Category color customization

**Estimated Effort**: 3 days

---

#### FE-004: Inspirational Quotes

**Priority**: P2 (Medium)  
**Target Version**: v1.1  
**Description**: Display daily inspirational quotes.

**Requirements**:

- Different quote each day
- Quote categories (Motivation, Success, Happiness, Wisdom, etc.)
- User can add custom quotes
- API: Quotable.io or local DB
- Simple placement below focus goal
- Share functionality (Twitter, copy)

**Acceptance Criteria**:

- [ ] Quote API integration
- [ ] Local quote DB (100+ quotes)
- [ ] Category filtering
- [ ] User quote management
- [ ] Share functionality

**Estimated Effort**: 2 days

---

### 8.2 v1.2 Planned Features (Medium Priority)

#### FE-005: Todo Calendar View

**Priority**: P2 (Medium)  
**Target Version**: v1.2  
**Description**: Visualize todos in monthly/weekly calendar format.

**Requirements**:

- Monthly calendar view
- Weekly calendar view
- Click date to view todos for that day
- Drag & drop to move dates
- Recurring task settings (daily, weekly, monthly)
- Google Calendar integration (optional)

**Estimated Effort**: 7 days

---

#### FE-006: Focus Mode

**Priority**: P2 (Medium)  
**Target Version**: v1.2  
**Description**: Hide all panels during focus time, showing only clock and main goal.

**Requirements**:

- Activate with keyboard shortcut (Ctrl+Shift+F) or button
- Display timer during focus mode (optional)
- Minimal UI (clock, goal, background only)
- Pause notifications option
- Auto-exit timer setting

**Estimated Effort**: 2 days

---

#### FE-007: Productivity Analytics Dashboard

**Priority**: P2 (Medium)  
**Target Version**: v1.2  
**Description**: Provide productivity statistics and insights.

**Requirements**:

- Completed todos trend graph
- Weekly/monthly work hours statistics
- Most productive time analysis
- Time distribution by category
- Goal achievement rate
- Data visualization (Chart.js or Recharts)

**Estimated Effort**: 5 days

---

#### FE-008: Quick Notes

**Priority**: P2 (Medium)  
**Target Version**: v1.2  
**Description**: Quick memo pad for jotting down thoughts.

**Requirements**:

- Floating button in bottom-right
- Quick text input
- Markdown support
- Note search
- Tags and categories
- Favorite/pinned notes
- Convert note to todo

**Estimated Effort**: 4 days

---

### 8.3 v2.0 Long-Term Vision (Lower Priority)

#### FE-009: Custom Background Image Upload

**Target Version**: v2.0  
**Description**: Allow users to use their own images as backgrounds.

**Requirements**:

- Image upload (max 5MB)
- Image gallery (store up to 10 images)
- Auto-rotation settings (daily, weekly)
- Image filters (brightness, contrast, blur)
- Mix Unsplash and local images

---

#### FE-010: External Calendar API Integration

**Target Version**: v2.0  
**Description**: Integrate with Google Calendar, Outlook Calendar.

**Requirements**:

- OAuth authentication
- Import events
- Bi-directional todo sync
- Convert calendar events to todos
- Add events directly to calendar

---

#### FE-011: Habit Tracker

**Target Version**: v2.0  
**Description**: Daily habit formation and tracking.

**Requirements**:

- Daily habit checklist
- Habit streaks
- Per-habit statistics graphs
- Habit reminders
- Badges/rewards for habit completion

---

#### FE-012: AI-Powered Productivity Insights

**Target Version**: v2.0  
**Description**: AI analysis of productivity patterns and recommendations.

**Requirements**:

- Task pattern analysis
- Optimal work time recommendations
- AI-suggested todo priorities
- Burnout risk warnings
- Goal achievement predictions

---

#### FE-013: Team Collaboration Features

**Target Version**: v2.0+  
**Description**: Share todos and projects with team members.

**Requirements**:

- Team workspaces
- Shared todo lists
- Task assignment and tracking
- Comments and mentions
- Real-time collaboration
- Backend service required

---

### 8.4 Technical Improvements

#### TI-001: Progressive Web App (PWA) Version

**Target Version**: v1.3  
**Description**: Provide PWA version that can run as standalone app.

---

#### TI-002: Firefox Extension Port

**Target Version**: v1.3  
**Description**: Support Firefox using WebExtension API.

---

#### TI-003: Offline Background Image Caching

**Target Version**: v1.2  
**Description**: Permanent background image caching with ServiceWorker.

---

#### TI-004: End-to-End Encryption

**Target Version**: v2.0  
**Description**: E2E encryption for sensitive data.

---

#### TI-005: GraphQL API (Backend)

**Target Version**: v2.0+  
**Description**: Backend service for team collaboration features.

---

#### TI-006: End-to-End Test Suite

**Target Version**: v1.2  
**Description**: Automated testing with Playwright or Cypress.

---

#### TI-007: Performance Monitoring

**Target Version**: v1.2  
**Description**: Error tracking with Sentry or LogRocket integration.

---

### 8.5 Roadmap Summary

```
v1.0 (Current)
├─ Core features complete
└─ 33 requirements implemented

v1.1 (Q1 2026) - Productivity Enhancement
├─ ⭐ Real-time Weather Widget
├─ ⭐ Pomodoro Timer
├─ Todo Categories & Tags
└─ Inspirational Quotes

v1.2 (Q2 2026) - Visualization & Analysis
├─ Calendar View
├─ Focus Mode
├─ Analytics Dashboard
└─ Quick Notes

v1.3 (Q3 2026) - Cross-Platform
├─ PWA Version
├─ Firefox Support
└─ Offline Enhancement

v2.0 (Q4 2026+) - AI & Collaboration
├─ External Calendar Integration
├─ Habit Tracker
├─ AI Insights
└─ Team Collaboration (requires backend)
```

---

## 9. Constraints & Assumptions

### 9.1 Constraints

- Chrome extension only (no other browsers in v1.0)
- Limited by Chrome Storage quota (100KB sync, 10MB local)
- Requires Chrome 120+ for Manifest V3
- English documentation only

### 9.2 Assumptions

- Users have Chrome browser installed
- Users have internet connection for initial load
- Users familiar with Chrome extension installation
- Users comfortable with English UI (or native speakers of supported languages)

---

## 10. Glossary

| Term             | Definition                                                            |
| ---------------- | --------------------------------------------------------------------- |
| **Panel**        | Collapsible section of the UI (Favorites, Todos, Work, Notifications) |
| **Sync**         | Real-time data synchronization across browser tabs                    |
| **Storage**      | Chrome Storage API (sync for small data, local for large data)        |
| **Locale**       | Language/region setting (ko, en, ja, zh)                              |
| **Focus**        | Daily main goal/objective                                             |
| **Check-in/out** | Work hour tracking timestamps                                         |
| **Notification** | Timed reminder with Chrome notification                               |
| **Heartbeat**    | Periodic check for date changes                                       |
| **DnD**          | Drag and Drop interaction                                             |

---

## 11. Appendix

### 11.1 Related Documents

- [Design Specification](./DESIGN.md) - To be created
- [API Documentation](./API.md) - To be created
- [User Guide](./USER_GUIDE.md) - To be created

### 11.2 Revision History

| Version | Date       | Author   | Changes              |
| ------- | ---------- | -------- | -------------------- |
| 1.0     | 2025-12-10 | Dev Team | Initial PRD creation |

---

**Document Status**: ✅ Completed  
**Next Steps**: Create Design Specification Document
