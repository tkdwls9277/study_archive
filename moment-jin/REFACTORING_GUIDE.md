# 리팩토링 가이드

## 완료된 작업

### 1. 새로운 폴더 구조 생성

```
src/newtab/
  ├── components/         # UI 컴포넌트
  │   └── modals/        # 모달 컴포넌트
  ├── hooks/             # 커스텀 훅
  ├── services/          # 비즈니스 로직
  ├── utils/             # 유틸리티 함수
  ├── types/             # 타입 정의
  ├── constants/         # 상수
  └── styles/            # 스타일
```

### 2. 생성된 파일들

#### Types (`types/index.ts`)

- Todo, Favorite, WorkRecord 등 모든 타입 정의
- StorageData 인터페이스 추가

#### Constants (`constants/index.ts`)

- GRADIENTS, isChromeExtensionEnv
- 근무시간 관련 상수들
- DAY_NAMES 배열

#### Utils

- `utils/date.ts`: 날짜 관련 유틸리티
- `utils/work.ts`: 근무시간 계산 유틸리티
- `utils/index.ts`: favicon, 시간 문자열, 인사말 생성

#### Services

- `services/todoService.ts`: Todo CRUD 로직을 클래스로 캡슐화
- `services/favoriteService.ts`: Favorite CRUD 로직을 클래스로 캡슐화

## 다음 단계 (수동 작업 필요)

### 3. WorkService 생성

`src/newtab/services/workService.ts` 생성하여 `workHelpers.ts`의 로직을 클래스로 변환

```typescript
import type { WorkRecord, OvertimeInfo } from "../types";
import { formatDate } from "../utils/date";
import { calculateWorkMinutes } from "../utils/work";
import { DEFAULT_CHECK_IN_TIME, DEFAULT_CHECK_OUT_TIME, WORK_HOURS_PER_DAY, LUNCH_BREAK_MINUTES } from "../constants";

export class WorkService {
  static saveWorkRecords(records: WorkRecord[], isChromeExtensionEnv: boolean): void {
    if (isChromeExtensionEnv) {
      chrome.storage.sync.set({ workRecords: records });
    }
  }

  static checkIn(records: WorkRecord[], currentTime: string): WorkRecord[] {
    // 기존 checkIn 로직
  }

  static checkOut(records: WorkRecord[], currentTime: string): WorkRecord[] {
    // 기존 checkOut 로직
  }

  // ... 나머지 메서드들
}
```

### 4. StorageService 생성

`src/newtab/services/storageService.ts` 생성하여 `storageHelpers.ts`의 로직을 통합

```typescript
import type { StorageData } from "../types";

export class StorageService {
  static async loadFromStorage(isChromeExtensionEnv: boolean): Promise<StorageData | null> {
    // 기존 loadFromStorage 로직
  }

  static savePanelState(key: string, value: boolean, isChromeExtensionEnv: boolean): void {
    // 기존 savePanelState 로직
  }

  // ... 나머지 메서드들
}
```

### 5. 커스텀 훅 생성

`src/newtab/hooks/useStorage.ts`

```typescript
import { useEffect, useState } from "react";
import { StorageService } from "../services/storageService";
import { isChromeExtensionEnv } from "../constants";
import type { StorageData } from "../types";

export function useStorage() {
  const [data, setData] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StorageService.loadFromStorage(isChromeExtensionEnv).then((loadedData) => {
      setData(loadedData);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
```

### 6. 컴포넌트 분리

#### SearchBar Component

`src/newtab/components/SearchBar.tsx`

```typescript
import React, { useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (query) {
      onSubmit(query);
    }
  };

  return (
    <form className="google-search-form" onSubmit={handleSubmit}>
      <div className="google-search-wrapper">
        <svg className="google-search-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          ref={searchInputRef}
          type="text"
          className="google-search-input"
          placeholder="Google 검색 또는 URL 입력"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </form>
  );
};
```

#### FocusInput Component

`src/newtab/components/FocusInput.tsx`

#### FavoritesPanel Component

`src/newtab/components/FavoritesPanel.tsx`

#### TodoPanel Component

`src/newtab/components/TodoPanel.tsx`

#### WorkPanel Component

`src/newtab/components/WorkPanel.tsx`

### 7. 모달 컴포넌트 분리

- `components/modals/FavoriteModal.tsx`
- `components/modals/TimeEditModal.tsx`
- `components/modals/OptionsModal.tsx`

### 8. 스타일 이동

`styles.css`를 `styles/index.css`로 이동

### 9. App.tsx 리팩토링

- 서비스와 유틸리티 import 경로 수정
- 컴포넌트 분리로 코드 간소화
- 비즈니스 로직을 서비스로 위임

### 10. 기존 파일 정리

리팩토링 완료 후 다음 파일들 삭제:

- `types.ts`
- `constants.ts`
- `utils.ts`
- `timeHelpers.ts`
- `todoHelpers.ts`
- `favoriteHelpers.ts`
- `workHelpers.ts`
- `storageHelpers.ts`
- `styles.css`

## 임포트 경로 예시

리팩토링 후:

```typescript
// Before
import { Todo } from "./types";
import { GRADIENTS } from "./constants";
import { formatDate } from "./utils";
import { saveTodos } from "./todoHelpers";

// After
import type { Todo } from "./types";
import { GRADIENTS, isChromeExtensionEnv } from "./constants";
import { formatDate } from "./utils/date";
import { TodoService } from "./services/todoService";
```

## 장점

1. **모듈화**: 기능별로 명확하게 분리
2. **재사용성**: 컴포넌트와 서비스를 독립적으로 사용 가능
3. **유지보수**: 각 기능의 위치를 쉽게 파악
4. **테스트**: 서비스 클래스를 독립적으로 테스트 가능
5. **확장성**: 새로운 기능 추가 시 명확한 위치 지정

## 우선순위

1. ✅ 타입 및 상수 정리 (완료)
2. ✅ 유틸리티 함수 분리 (완료)
3. ✅ TodoService, FavoriteService 생성 (완료)
4. ⏳ WorkService, StorageService 생성 (다음)
5. ⏳ SearchBar 컴포넌트 분리 (다음)
6. ⏳ 패널 컴포넌트들 분리
7. ⏳ 모달 컴포넌트들 분리
8. ⏳ App.tsx 최종 리팩토링
9. ⏳ 기존 파일 삭제
