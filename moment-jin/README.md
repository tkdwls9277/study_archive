# Moment-Jin

모멘텀 스타일의 Chrome 확장 프로그램 - React + TypeScript로 만든 생산성 중심의 새 탭 페이지

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 주요 기능

### v1.0 (현재)

- ⏰ **실시간 시계** - 깔끔한 시간 표시 및 인사말
- 🎯 **오늘의 목표** - 하루의 핵심 목표 설정
- ⭐ **즐겨찾기** - 드래그 앤 드롭으로 자유로운 순서 변경
- ✅ **할일 관리** - 날짜별 그룹화 및 완료 상태 관리
- 🏢 **근무 기록** - 출퇴근 시간 기록 및 주간 통계
- 📢 **알림 시스템** - 다양한 타이밍 옵션으로 알림 예약
- 🖼️ **배경 이미지** - Unsplash API를 통한 자연 이미지
- 🌐 **다국어 지원** - 한국어, 영어, 일본어, 중국어

### v1.1 (최신) ✨ NEW

- 🌤️ **날씨 위젯** - Geolocation 기반 실시간 날씨 정보
  - 현재 온도 및 날씨 상태
  - 체감 온도, 습도, 풍속
  - 섭씨/화씨 전환
  - 1시간 캐싱으로 API 호출 최적화

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치

1. **저장소 클론**

```bash
git clone https://github.com/tkdwls9277/study_archive.git
cd moment-jin
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**

`.env.example` 파일을 복사하여 `.env` 파일을 생성하세요:

```bash
cp .env.example .env
```

그리고 다음 API 키를 설정하세요:

- **Unsplash API Key** (배경 이미지용)
  - https://unsplash.com/developers 에서 무료 계정 생성
  - Access Key 발급 후 `.env`에 입력
- **OpenWeather API Key** (날씨 위젯용)
  - https://openweathermap.org/api 에서 무료 계정 생성
  - API Key 발급 후 `.env`에 입력

```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_key_here
```

4. **빌드**

```bash
npm run build
```

### Chrome 확장 프로그램 설치

1. Chrome 브라우저에서 `chrome://extensions` 접속
2. 우측 상단의 "개발자 모드" 활성화
3. "압축해제된 확장 프로그램을 로드합니다." 클릭
4. 프로젝트의 `dist` 폴더 선택
5. 새 탭을 열어 확인!

## 🛠️ 개발

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 타입 체크

```bash
npm run type-check
```

## 📚 문서

- [PRD (한글)](./docs/PRD_KR.md) - 제품 요구사항 명세서
- [PRD (English)](./docs/PRD_EN.md) - Product Requirements Document
- [설계 문서 (한글)](./docs/DESIGN_KR.md) - 아키텍처 및 설계
- [Design Document (English)](./docs/DESIGN_EN.md) - Architecture & Design

## 🧪 날씨 위젯 테스트

날씨 위젯을 테스트하려면:

1. **위치 권한 허용**

   - 브라우저에서 위치 정보 접근 허용 필요
   - 첫 로드 시 권한 요청 팝업이 표시됩니다

2. **API 키 확인**

   - `.env` 파일에 `VITE_OPENWEATHER_API_KEY`가 설정되어 있는지 확인
   - 빌드 후 확장 프로그램을 재로드하세요

3. **동작 확인**

   - 시계 옆에 날씨 위젯이 표시됩니다
   - 위젯 클릭 시 상세 정보 팝업이 나타납니다
   - 새로고침 버튼으로 수동 업데이트 가능
   - 온도 단위 전환 버튼으로 °C ↔ °F 변경

4. **디버깅**
   - 개발자 도구 콘솔에서 `[Weather]` 로그 확인
   - 위치 오류 또는 API 오류 메시지 확인
   - 캐시는 localStorage에 `moment-jin-weather` 키로 저장됩니다

## 🏗️ 기술 스택

- **Frontend**: React 19, TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4.1
- **Drag & Drop**: @dnd-kit
- **Chrome APIs**: Storage, Alarms, Notifications
- **External APIs**:
  - Unsplash (배경 이미지)
  - OpenWeather (날씨 정보)

## 📦 프로젝트 구조

```
moment-jin/
├── public/
│   ├── manifest.json       # Chrome 확장 매니페스트
│   ├── background.js       # Background Service Worker
│   └── icons/              # 확장 아이콘
├── src/newtab/
│   ├── components/         # React 컴포넌트
│   │   ├── AppHeader.tsx
│   │   ├── Weather.tsx     # ✨ 날씨 위젯
│   │   ├── FavoritesPanel.tsx
│   │   ├── TodoPanel.tsx
│   │   ├── WorkPanel.tsx
│   │   └── NotificationPanel.tsx
│   ├── hooks/              # Custom Hooks
│   ├── services/           # API 서비스
│   │   ├── weatherService.ts  # ✨ 날씨 서비스
│   │   ├── unsplashService.ts
│   │   └── storageService.ts
│   ├── types/              # TypeScript 타입
│   ├── i18n/               # 국제화
│   ├── styles/             # CSS
│   └── utils/              # 유틸리티
├── docs/                   # 문서
└── .env.example            # 환경 변수 예제
```

## 🎨 스크린샷

[스크린샷 추가 예정]

## 🔮 향후 계획

- [ ] v1.2: 포모도로 타이머
- [ ] v1.3: 카테고리 및 태그 시스템
- [ ] v1.4: 동기부여 명언
- [ ] v2.0: AI 기반 인사이트
- [ ] v2.1: 팀 협업 기능

자세한 로드맵은 [PRD 문서](./docs/PRD_KR.md#8-향후-기능-로드맵)를 참고하세요.

## 📄 라이선스

MIT License

## 👨‍💻 개발자

- GitHub: [@tkdwls9277](https://github.com/tkdwls9277)

## 🤝 기여하기

이슈 리포트 및 Pull Request를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**즐거운 하루 보내세요! 🎉**
