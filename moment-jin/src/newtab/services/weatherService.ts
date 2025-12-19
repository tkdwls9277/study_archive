/**
 * WeatherService
 * OpenWeather API를 사용하여 날씨 정보를 가져오고 캐싱하는 서비스
 */

import type { DailyForecast, HourlyForecast, WeatherData } from "../types";

export class WeatherService {
  private static readonly API_URL = "https://api.openweathermap.org/data/2.5/weather";
  private static readonly FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
  private static readonly CACHE_KEY = "moment-jin-weather";
  private static readonly FORECAST_CACHE_KEY = "moment-jin-forecast";
  private static readonly HOURLY_CACHE_KEY = "moment-jin-hourly";
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

  /**
   * 7일 날씨 예보 가져오기
   * @param lat 위도
   * @param lon 경도
   * @param apiKey 사용자의 OpenWeather API 키
   * @returns 일일 예보 배열
   */
  static async getWeeklyForecast(lat: number, lon: number, apiKey: string): Promise<DailyForecast[]> {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("OpenWeather API key is required. Please set it in Settings.");
    }

    const url = `${this.FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

    try {
      console.log("[WeatherService] Fetching weekly forecast...");
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenWeather API key in Settings.");
        }
        throw new Error(`Forecast API request failed: ${response.status}`);
      }

      const data = await response.json();

      // 5일 예보를 일별로 그룹화
      const dailyData = this.processForecastData(data.list);

      return dailyData;
    } catch (error) {
      console.error("[WeatherService] Failed to fetch forecast:", error);
      throw error;
    }
  }

  /**
   * 예보 데이터를 일별로 처리
   */
  private static processForecastData(list: any[]): DailyForecast[] {
    const dailyMap = new Map<string, any[]>();

    // 날짜별로 그룹화
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, []);
      }
      dailyMap.get(dateKey)!.push(item);
    });

    // 각 날짜의 최고/최저 온도 계산
    const forecasts: DailyForecast[] = [];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    dailyMap.forEach((items, dateKey) => {
      const temps = items.map((item) => item.main.temp);
      const weatherIds = items.map((item) => item.weather[0].id);
      const conditions = items.map((item) => item.weather[0].description);

      // 가장 많이 나타나는 날씨 상태 선택
      const mostCommonWeatherId = this.getMostCommon(weatherIds);
      const mostCommonCondition = this.getMostCommon(conditions);

      const date = new Date(dateKey);
      const dayOfWeek = dayNames[date.getDay()];
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

      forecasts.push({
        date: formattedDate,
        dayOfWeek,
        tempMax: Math.round(Math.max(...temps)),
        tempMin: Math.round(Math.min(...temps)),
        icon: this.getWeatherIcon(mostCommonWeatherId),
        condition: mostCommonCondition,
      });
    });

    // 최대 7일만 반환 (오늘 포함)
    return forecasts.slice(0, 7);
  }

  /**
   * 배열에서 가장 많이 나타나는 값 찾기
   */
  private static getMostCommon<T>(arr: T[]): T {
    const counts = new Map<T, number>();
    arr.forEach((item) => {
      counts.set(item, (counts.get(item) || 0) + 1);
    });

    let maxCount = 0;
    let mostCommon = arr[0];
    counts.forEach((count, item) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = item;
      }
    });

    return mostCommon;
  }

  /**
   * 캐시된 예보 정보 가져오기
   */
  static getCachedForecast(): DailyForecast[] | null {
    try {
      const cached = localStorage.getItem(this.FORECAST_CACHE_KEY);
      if (!cached) return null;

      const data: { forecasts: DailyForecast[]; timestamp: number } = JSON.parse(cached);
      const age = Date.now() - data.timestamp;

      if (age > this.CACHE_DURATION) {
        this.clearForecastCache();
        return null;
      }

      return data.forecasts;
    } catch (error) {
      console.error("[WeatherService] Failed to read forecast cache:", error);
      return null;
    }
  }

  /**
   * 예보 정보 캐시
   */
  static cacheForecast(forecasts: DailyForecast[]): void {
    try {
      const data = {
        forecasts,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.FORECAST_CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("[WeatherService] Failed to cache forecast:", error);
    }
  }

  /**
   * 예보 캐시 삭제
   */
  static clearForecastCache(): void {
    try {
      localStorage.removeItem(this.FORECAST_CACHE_KEY);
    } catch (error) {
      console.error("[WeatherService] Failed to clear forecast cache:", error);
    }
  }

  /**
   * 시간별 날씨 예보 가져오기 (최대 24시간)
   */
  static async getHourlyForecast(lat: number, lon: number, apiKey: string): Promise<HourlyForecast[]> {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("OpenWeather API key is required. Please set it in Settings.");
    }

    const url = `${this.FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

    try {
      console.log("[WeatherService] Fetching hourly forecast data...");
      const response = await fetch(url);

      if (!response.ok) {
        let errorMessage = `Hourly Forecast API request failed: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage += ` - ${errorData.message}`;
          }
        } catch (e) {
          // JSON 파싱 실패 시 무시
        }

        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenWeather API key in Settings.");
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return this.processHourlyData(data.list);
    } catch (error) {
      console.error("[WeatherService] Failed to fetch hourly forecast:", error);
      throw error;
    }
  }

  /**
   * 시간별 데이터 처리 (최대 8개 = 24시간)
   */
  private static processHourlyData(list: any[]): HourlyForecast[] {
    const hourlyForecasts: HourlyForecast[] = [];
    const now = Date.now();

    // 현재 시간 이후의 예보만 최대 8개 (24시간) 가져오기
    for (let i = 0; i < Math.min(list.length, 8); i++) {
      const item = list[i];
      const timestamp = item.dt * 1000;

      // 현재 시간 이후의 데이터만
      if (timestamp < now) continue;

      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      hourlyForecasts.push({
        time: timeStr,
        temp: Math.round(item.main.temp),
        icon: this.getWeatherIcon(item.weather[0].id),
        condition: item.weather[0].description,
        timestamp: timestamp,
      });
    }

    return hourlyForecasts;
  }

  /**
   * 캐시된 시간별 예보 가져오기
   */
  static getCachedHourlyForecast(): HourlyForecast[] | null {
    try {
      const cached = localStorage.getItem(this.HOURLY_CACHE_KEY);
      if (!cached) return null;

      const data: { forecasts: HourlyForecast[]; timestamp: number } = JSON.parse(cached);
      const age = Date.now() - data.timestamp;

      if (age > this.CACHE_DURATION) {
        this.clearHourlyCache();
        return null;
      }

      return data.forecasts;
    } catch (error) {
      console.error("[WeatherService] Failed to read hourly cache:", error);
      return null;
    }
  }

  /**
   * 시간별 예보 캐시
   */
  static cacheHourlyForecast(forecasts: HourlyForecast[]): void {
    try {
      const data = {
        forecasts,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.HOURLY_CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("[WeatherService] Failed to cache hourly forecast:", error);
    }
  }

  /**
   * 시간별 예보 캐시 삭제
   */
  static clearHourlyCache(): void {
    try {
      localStorage.removeItem(this.HOURLY_CACHE_KEY);
    } catch (error) {
      console.error("[WeatherService] Failed to clear hourly cache:", error);
    }
  }
}
