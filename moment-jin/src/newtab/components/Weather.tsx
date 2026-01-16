import React, { useCallback, useEffect, useState } from "react";
import { WeatherService } from "../services/weatherService";
import type { WeatherData } from "../types";

interface WeatherProps {
  compact?: boolean; // 미니 모드 (기본값: true)
  apiKey?: string; // 사용자의 OpenWeather API 키
  onSettingsClick?: () => void; // 설정 버튼 클릭 핸들러
  draggable?: boolean; // 드래그 가능 여부
  onWeatherDataUpdate?: (data: WeatherData | null) => void; // 날씨 데이터 업데이트 콜백
}

/**
 * Weather 컴포넌트
 * 사용자 위치 기반 날씨 정보를 표시하는 위젯
 */
export const Weather: React.FC<WeatherProps> = ({ compact = true, apiKey, onSettingsClick, draggable = true, onWeatherDataUpdate }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [expanded, setExpanded] = useState(false);
  const [showApiKeyGuide, setShowApiKeyGuide] = useState(false);

  /**
   * 날씨 정보 로드
   */
  const loadWeather = useCallback(
    async (forceRefresh = false) => {
      try {
        // API 키 확인
        if (!apiKey || apiKey.trim() === "") {
          setError("no-api-key"); // 특별한 에러 코드
          setLoading(false);
          return;
        }

        // 1. 캐시 확인 (1시간 이내) - forceRefresh가 true면 캐시 무시
        if (!forceRefresh) {
          const cached = WeatherService.getCachedWeather();

          if (cached && Date.now() - cached.timestamp < 60 * 60 * 1000) {
            console.log("[Weather] Using cached data");
            setWeather(cached);
            setLoading(false);
            return;
          }
        }

        console.log("[Weather] Fetching new weather data...");

        // 2. Geolocation API로 위치 가져오기
        const position = await getGeolocation();

        // 3. 날씨 API 호출
        const data = await WeatherService.getCurrentWeather(
          position.coords.latitude,
          position.coords.longitude,
          apiKey
        );

        console.log("[Weather] Weather data loaded:", data);
        setWeather(data);
        WeatherService.cacheWeather(data);
        
        // 상위 컴포넌트로 날씨 데이터 전달
        if (onWeatherDataUpdate) {
          onWeatherDataUpdate(data);
        }

        setError(null);
      } catch (err) {
        console.error("[Weather] Failed to load weather:", err);
        setError(err instanceof Error ? err.message : "Failed to load weather");
        
        // 에러 시 null 전달
        if (onWeatherDataUpdate) {
          onWeatherDataUpdate(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKey, onWeatherDataUpdate]
  );

  /**
   * Geolocation API로 위치 가져오기
   */
  const getGeolocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("Location permission denied"));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information unavailable"));
              break;
            case error.TIMEOUT:
              reject(new Error("Location request timed out"));
              break;
            default:
              reject(new Error("Unknown location error"));
          }
        },
        {
          timeout: 10000,
          maximumAge: 60 * 60 * 1000, // 1시간 캐시
          enableHighAccuracy: false, // 빠른 응답을 위해 정확도 낮춤
        }
      );
    });
  };

  /**
   * 온도 단위 토글
   */
  const toggleUnit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setUnit((prev) => (prev === "C" ? "F" : "C"));
  }, []);

  /**
   * 온도 변환 (섭씨 ↔ 화씨)
   */
  const getTemperature = useCallback(
    (temp: number): number => {
      return unit === "C" ? temp : (temp * 9) / 5 + 32;
    },
    [unit]
  );

  /**
   * 새로고침 핸들러
   */
  const handleRefresh = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setLoading(true);
      WeatherService.clearCache();
      WeatherService.clearForecastCache();
      await loadWeather(true);
    },
    [loadWeather]
  );

  // API 키 변경 시 강제 새로고침
  useEffect(() => {
    if (apiKey && apiKey.trim() !== "") {
      setLoading(true);
      WeatherService.clearCache();
      WeatherService.clearForecastCache();
      loadWeather(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // 초기 로드
  useEffect(() => {
    loadWeather(false);

    // 1시간마다 자동 새로고침
    const timer = setInterval(() => loadWeather(false), 60 * 60 * 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로딩 상태
  if (loading) {
    return (
      <div className="weather-widget loading" title="날씨 정보 로딩 중...">
        <span className="weather-icon">⏳</span>
      </div>
    );
  }

  // API 키 없음 - 안내 표시
  if (error === "no-api-key") {
    return (
      <div className="weather-widget no-api-key">
        <div
          className="weather-setup-trigger"
          onClick={() => setShowApiKeyGuide(!showApiKeyGuide)}
          title="날씨 위젯 설정하기"
        >
          <span className="weather-icon">🌤️</span>
          <span className="weather-temp">설정</span>
        </div>

        {showApiKeyGuide && (
          <div className="weather-api-guide">
            <div className="weather-guide-header">
              <strong>🌤️ 날씨 위젯 설정</strong>
              <button
                className="weather-guide-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowApiKeyGuide(false);
                }}
              >
                ✕
              </button>
            </div>
            <div className="weather-guide-content">
              <p className="weather-guide-step">
                <strong>1단계:</strong> 무료 API 키 발급받기
              </p>
              <a
                href="https://openweathermap.org/api"
                target="_blank"
                rel="noopener noreferrer"
                className="weather-guide-link"
                onClick={(e) => e.stopPropagation()}
              >
                🔗 OpenWeatherMap 가입하기
              </a>
              <p className="weather-guide-step">
                <strong>2단계:</strong> 설정에서 API 키 입력하기
              </p>
              <button
                className="weather-guide-settings-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowApiKeyGuide(false);
                  onSettingsClick?.();
                }}
              >
                ⚙️ 설정 열기
              </button>
              <p className="weather-guide-note">
                💡 무료 플랜: 하루 1,000회 호출 가능
                <br />
                ⚠️ API 키는 브라우저에만 저장되며 안전합니다
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 기타 에러 상태
  if (error || !weather) {
    // 401 에러 (잘못된 API 키)인 경우 특별 처리
    const isInvalidApiKey = error?.includes("Invalid API key") || error?.includes("401");

    return (
      <div className="weather-widget error">
        <div
          className="weather-error-trigger"
          onClick={() => setShowApiKeyGuide(!showApiKeyGuide)}
          title={error || "날씨 정보를 불러올 수 없습니다"}
        >
          <span className="weather-icon">{isInvalidApiKey ? "🔑" : "🌡️"}</span>
          <span className="weather-temp">{isInvalidApiKey ? "키 오류" : "--°"}</span>
        </div>

        {showApiKeyGuide && isInvalidApiKey && (
          <div className="weather-api-guide">
            <div className="weather-guide-header">
              <strong>🔑 API 키 오류</strong>
              <button
                className="weather-guide-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowApiKeyGuide(false);
                }}
              >
                ✕
              </button>
            </div>
            <div className="weather-guide-content">
              <p className="weather-guide-step" style={{ color: "#ff6b6b" }}>
                ❌ API 키가 유효하지 않습니다
              </p>
              <p className="weather-guide-step">
                <strong>해결 방법:</strong>
              </p>
              <ul style={{ margin: "8px 0", paddingLeft: "20px", fontSize: "13px", lineHeight: "1.6" }}>
                <li>API 키를 다시 확인해주세요</li>
                <li>OpenWeatherMap에서 활성화 확인 (최대 2시간 소요)</li>
                <li>무료 플랜 한도 확인 (하루 1,000회)</li>
              </ul>
              <button
                className="weather-guide-settings-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowApiKeyGuide(false);
                  onSettingsClick?.();
                }}
              >
                ⚙️ 설정에서 수정하기
              </button>
              <a
                href="https://home.openweathermap.org/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="weather-guide-link"
                onClick={(e) => e.stopPropagation()}
                style={{ marginTop: "8px" }}
              >
                🔗 API 키 관리 페이지
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Compact 모드
  if (compact) {
    return (
      <div
        className={`weather-widget compact ${draggable ? "" : "no-drag"}`}
        onClick={() => setExpanded(!expanded)}
        title={`${weather.location}: ${weather.condition}`}
        style={{ cursor: draggable ? "pointer" : "default" }}
      >
        <span className="weather-icon">{weather.icon}</span>
        <span className="weather-temp">
          {Math.round(getTemperature(weather.temp))}°<span className="weather-unit">{unit}</span>
        </span>

        {expanded && (
          <div className="weather-details">
            <div className="weather-details-header">
              <strong>{weather.location}</strong>
              <button className="weather-refresh" onClick={handleRefresh} title="새로고침">
                🔄
              </button>
            </div>
            <div className="weather-details-content">
              <div className="weather-detail-item">
                <span className="weather-detail-label">날씨:</span>
                <span className="weather-detail-value">{weather.condition}</span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">체감:</span>
                <span className="weather-detail-value">
                  {Math.round(getTemperature(weather.feelsLike))}°{unit}
                </span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">습도:</span>
                <span className="weather-detail-value">{weather.humidity}%</span>
              </div>
              <div className="weather-detail-item">
                <span className="weather-detail-label">풍속:</span>
                <span className="weather-detail-value">{weather.windSpeed.toFixed(1)}m/s</span>
              </div>
            </div>

            <button className="weather-unit-toggle" onClick={toggleUnit}>
              °{unit} ⇄ °{unit === "C" ? "F" : "C"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full 모드 (향후 확장)
  return null;
};
