/**
 * WeatherService
 * OpenWeather API를 사용하여 날씨 정보를 가져오고 캐싱하는 서비스
 */

import type { WeatherData } from "../types";

export class WeatherService {
  private static readonly API_URL = "https://api.openweathermap.org/data/2.5/weather";
  private static readonly CACHE_KEY = "moment-jin-weather";
  private static readonly CACHE_DURATION = 60 * 60 * 1000; // 1시간

  /**
   * 현재 날씨 정보 가져오기
   * @param lat 위도
   * @param lon 경도
   * @param apiKey 사용자의 OpenWeather API 키
   * @returns 날씨 데이터
   */
  static async getCurrentWeather(lat: number, lon: number, apiKey: string): Promise<WeatherData> {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("OpenWeather API key is required. Please set it in Settings.");
    }

    const url = `${this.API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

    try {
      console.log("[WeatherService] Fetching weather data...");
      const response = await fetch(url);

      if (!response.ok) {
        // 상세한 에러 정보 수집
        let errorMessage = `Weather API request failed: ${response.status}`;

        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
          }
          console.error("[WeatherService] API Error Details:", errorData);
        } catch (e) {
          // JSON 파싱 실패 시 무시
        }

        // 401 에러에 대한 특별 처리
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenWeather API key in Settings.");
        }

        throw new Error(errorMessage);
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
    } catch (error) {
      console.error("[WeatherService] Failed to fetch weather:", error);
      throw error;
    }
  }

  /**
   * 캐시된 날씨 정보 가져오기
   * @returns 캐시된 날씨 데이터 또는 null
   */
  static getCachedWeather(): WeatherData | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const data: WeatherData = JSON.parse(cached);
      const age = Date.now() - data.timestamp;

      // 캐시가 만료되었으면 null 반환
      if (age > this.CACHE_DURATION) {
        this.clearCache();
        return null;
      }

      return data;
    } catch (error) {
      console.error("[WeatherService] Failed to read cache:", error);
      return null;
    }
  }

  /**
   * 날씨 정보 캐시
   * @param data 날씨 데이터
   */
  static cacheWeather(data: WeatherData): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("[WeatherService] Failed to cache weather:", error);
    }
  }

  /**
   * 캐시 삭제
   */
  static clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (error) {
      console.error("[WeatherService] Failed to clear cache:", error);
    }
  }

  /**
   * OpenWeather Condition ID를 이모지 아이콘으로 변환
   * @param weatherId OpenWeather API condition code
   * @returns 날씨 이모지
   */
  private static getWeatherIcon(weatherId: number): string {
    // Thunderstorm (200-299)
    if (weatherId >= 200 && weatherId < 300) return "⛈️";

    // Drizzle (300-399)
    if (weatherId >= 300 && weatherId < 400) return "🌦️";

    // Rain (500-599)
    if (weatherId >= 500 && weatherId < 600) return "🌧️";

    // Snow (600-699)
    if (weatherId >= 600 && weatherId < 700) return "❄️";

    // Atmosphere (701-781): Mist, Fog, Haze, etc.
    if (weatherId >= 700 && weatherId < 800) return "🌫️";

    // Clear (800)
    if (weatherId === 800) return "☀️";

    // Clouds (801-804)
    if (weatherId > 800 && weatherId < 900) return "☁️";

    // Default
    return "🌡️";
  }
}
