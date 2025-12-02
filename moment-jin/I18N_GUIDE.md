# i18n (다국어 지원) 시스템

## 개요

moment-jin 확장 프로그램에 다국어 지원 기능이 추가되었습니다.

- **지원 언어**: 영어 (en), 한국어 (ko), 중국어 (zh), 일본어 (ja)
- **자동 감지**: Chrome 브라우저의 언어 설정을 자동으로 감지
- **폴백**: 지원하지 않는 언어는 영어로 표시

## 파일 구조

```
src/newtab/i18n/
├── types.ts           # 타입 정의 (Locale, Translations)
├── index.ts           # i18n 유틸리티 함수
└── locales/
    ├── en.ts          # 영어 번역
    ├── ko.ts          # 한국어 번역
    ├── zh.ts          # 중국어 번역
    └── ja.ts          # 일본어 번역
```

## 사용 방법

### 1. React 컴포넌트에서 사용

```typescript
import { useTranslation } from "../hooks/useTranslation";

export const MyComponent = () => {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h1>{t.main.greeting.morning}</h1>
      <p>{t.favorites.title}</p>
    </div>
  );
};
```

### 2. 일반 함수에서 사용

```typescript
import { detectLocale, getTranslations } from "./i18n";

function myFunction() {
  const locale = detectLocale();
  const t = getTranslations(locale);

  console.log(t.common.add);
}
```

## 번역 키 구조

```typescript
t.common.add; // "추가" / "Add" / "添加" / "追加"
t.common.edit; // "수정" / "Edit" / "编辑" / "編集"
t.common.delete; // "삭제" / "Delete" / "删除" / "削除"

t.favorites.title; // "즐겨찾기" / "Favorites" / "收藏夹" / "お気に入り"
t.favorites.add; // "즐겨찾기 추가" / "Add Favorite" ...
t.favorites.empty; // 빈 상태 메시지

t.todo.title; // "할 일" / "To-Do" / "待办事项" / "やること"
t.todo.placeholder; // 입력 플레이스홀더
t.todo.today; // "오늘" / "Today" / "今天" / "今日"

t.work.title; // "근무 기록" / "Work Record" ...
t.work.checkIn; // "출근" / "Check In" / "上班打卡" / "出勤"
t.work.checkOut; // "퇴근" / "Check Out" / "下班打卡" / "退勤"

t.main.greeting.morning; // "좋은 아침입니다" / "Good Morning" / "早上好" / "おはようございます"
t.main.greeting.afternoon; // 오후 인사말
t.main.greeting.evening; // 저녁 인사말
t.main.greeting.night; // 밤 인사말
t.main.searchPlaceholder; // 검색창 플레이스홀더
t.main.focusLabel; // 목표 입력 레이블
```

## 새로운 번역 추가 방법

### 1. types.ts에 인터페이스 정의 추가

```typescript
export interface Translations {
  common: {
    add: string;
    // ... 기존 키들
    newKey: string; // 새로운 키 추가
  };
}
```

### 2. 각 언어 파일에 번역 추가

**en.ts**

```typescript
export const en: Translations = {
  common: {
    // ...
    newKey: "New Translation",
  },
};
```

**ko.ts**

```typescript
export const ko: Translations = {
  common: {
    // ...
    newKey: "새로운 번역",
  },
};
```

### 3. 컴포넌트에서 사용

```typescript
const { t } = useTranslation();
<button>{t.common.newKey}</button>;
```

## 아직 업데이트되지 않은 컴포넌트

다음 컴포넌트들은 아직 한국어로 하드코딩되어 있습니다:

### 🔴 WorkPanel.tsx

- "근무 기록", "출근", "퇴근" 등의 텍스트
- 업데이트 방법:

  ```typescript
  import { useTranslation } from "../hooks/useTranslation";
  const { t } = useTranslation();
  // "근무 기록" → t.work.title
  // "출근" → t.work.checkIn
  ```

### 🔴 FavoriteModal.tsx

- "즐겨찾기 추가", placeholder 텍스트
- 업데이트 방법:

  ```typescript
  <input placeholder={t.favorites.labelPlaceholder} />
  <input placeholder={t.favorites.urlPlaceholder} />
  <input placeholder={t.favorites.iconPlaceholder} />
  ```

### 🔴 TimeEditModal.tsx

- "근무 기록 수정", "출근 시간", "퇴근 시간" 등
- 업데이트 방법:

  ```typescript
  <h2>{t.work.edit}</h2>
  <label>{t.work.checkInTime}</label>
  <label>{t.work.checkOutTime}</label>
  ```

### 🔴 OptionsModal.tsx

- 옵션 관련 텍스트
- 필요시 types.ts에 options 섹션 추가

## 완료된 컴포넌트

✅ SearchBar.tsx - 검색창 플레이스홀더
✅ FocusInput.tsx - 목표 입력 레이블 및 플레이스홀더
✅ FavoritesPanel.tsx - 즐겨찾기 패널 제목 및 버튼
✅ TodoPanel.tsx - 할 일 패널 전체 텍스트
✅ utils/index.ts - getGreeting 함수 (시간대별 인사말)

## 언어 감지 로직

1. **chrome.i18n.getUILanguage()** - Chrome Extension API 사용 (최우선)
2. **navigator.language** - 브라우저 언어 설정 (폴백)
3. **영어** - 기본값

지원 언어가 아닌 경우 자동으로 영어로 표시됩니다.
