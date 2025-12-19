import React, { useCallback, useEffect, useState } from "react";
import { WeatherService } from "../services/weatherService";
import type { HourlyForecast } from "../types";

interface HourlyWeatherProps {
  apiKey?: string;
  unit?: "C" | "F";
}

/**
 * HourlyWeather 컴포넌트
 * 시간별 날씨 예보를 가로 스크롤로 표시
 */
export const HourlyWeather: React.FC<HourlyWeatherProps> = ({ apiKey, unit = "C" }) => {
  const [hourlyData, setHourlyData] = useState<HourlyForecast[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          maximumAge: 60 * 60 * 1000,
          enableHighAccuracy: false,
        }
      );
    });
  };

  /**
   * 시간별 날씨 로드
   */
  const loadHourlyWeather = useCallback(async () => {
    try {
      if (!apiKey || apiKey.trim() === "") {
        setError("no-api-key");
        setLoading(false);
        return;
      }

      // 캐시 확인
      const cached = WeatherService.getCachedHourlyForecast();
      if (cached && cached.length > 0) {
        console.log("[HourlyWeather] Using cached data");
        setHourlyData(cached);
        setLoading(false);
        return;
      }

      console.log("[HourlyWeather] Fetching new data...");
      const position = await getGeolocation();
      const data = await WeatherService.getHourlyForecast(position.coords.latitude, position.coords.longitude, apiKey);

      console.log("[HourlyWeather] Data loaded:", data);
      setHourlyData(data);
      WeatherService.cacheHourlyForecast(data);
      setError(null);
    } catch (err) {
      console.error("[HourlyWeather] Failed to load:", err);
      setError(err instanceof Error ? err.message : "Failed to load hourly weather");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  // 초기 로드
  useEffect(() => {
    loadHourlyWeather();
  }, [loadHourlyWeather]);

  // API 키 변경 시 새로고침
  useEffect(() => {
    if (apiKey && apiKey.trim() !== "") {
      setLoading(true);
      WeatherService.clearHourlyCache();
      loadHourlyWeather();
    }
  }, [apiKey, loadHourlyWeather]);

  if (loading) {
    return (
      <div className="hourly-weather-container">
        <div className="hourly-weather-loading">⏳ 로딩 중...</div>
      </div>
    );
  }

  if (error === "no-api-key") {
    return null; // API 키 없으면 아무것도 표시하지 않음
  }

  if (error || !hourlyData || hourlyData.length === 0) {
    return null; // 에러 시 조용히 숨김
  }

  return (
    <div className="hourly-weather-container">
      <div className="hourly-weather-scroll">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-item">
            <div className="hourly-time">{hour.time}</div>
            <div className="hourly-icon">{hour.icon}</div>
            <div className="hourly-temp">
              {Math.round(getTemperature(hour.temp))}°{unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
