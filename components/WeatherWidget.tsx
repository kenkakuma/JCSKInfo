'use client'

import { Cloud, CloudRain, Sun, CloudSnow, MapPin, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getWidgetTranslation, type WidgetLang } from '@/lib/widget-translations'

interface WeatherData {
  city: string
  country: string
  temp: number
  description: string
  icon: string
  forecast: Array<{
    day: string
    temp: number
    icon: string
  }>
}

interface WeatherWidgetProps {
  lang?: WidgetLang
}

export default function WeatherWidget({ lang = 'ja' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const t = getWidgetTranslation(lang).weather

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async () => {
    try {
      setLoading(true)
      setError(false)

      // 1. 获取用户位置
      let lat = 35.6762 // 默认东京
      let lon = 139.6503

      if ('geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
            })
          })
          lat = position.coords.latitude
          lon = position.coords.longitude
        } catch (geoError) {
          console.log('Geolocation failed, using default location')
        }
      }

      // 2. 获取天气数据 (Open-Meteo API - 免费无需key)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      )
      const weatherData = await weatherRes.json()

      // 3. 获取城市名称 (使用反向地理编码)
      const geoRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${lang === 'vi' ? 'vi' : lang === 'ja' ? 'ja' : 'en'}`
      )
      const geoData = await geoRes.json()

      const cityName =
        geoData.city ||
        geoData.locality ||
        (lang === 'vi' ? 'Tokyo' : lang === 'ja' ? '東京' : 'Tokyo')
      const current = weatherData.current
      const daily = weatherData.daily

      // 创建天气对象
      const weatherObj: WeatherData = {
        city: cityName,
        country: geoData.countryCode || 'JP',
        temp: Math.round(current.temperature_2m),
        description: getWeatherDescription(current.weather_code),
        icon: getWeatherIcon(current.weather_code),
        forecast: daily.time.slice(0, 5).map((date: string, index: number) => ({
          day: getDayName(date, index, lang),
          temp: Math.round(daily.temperature_2m_max[index]),
          icon: getWeatherIcon(daily.weather_code[index]),
        })),
      }

      setWeather(weatherObj)
    } catch (err) {
      console.error('Weather fetch error:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return '☀️'
    if (code === 2) return '⛅'
    if (code === 3) return '☁️'
    if (code >= 51 && code <= 67) return '🌧️'
    if (code >= 71 && code <= 77) return '❄️'
    if (code >= 80 && code <= 82) return '🌦️'
    if (code >= 95 && code <= 99) return '⛈️'
    return '☁️'
  }

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Clear'
    if (code === 1) return 'Mainly Clear'
    if (code === 2) return 'Partly Cloudy'
    if (code === 3) return 'Overcast'
    if (code >= 51 && code <= 67) return 'Rainy'
    if (code >= 71 && code <= 77) return 'Snowy'
    if (code >= 80 && code <= 82) return 'Rain Showers'
    if (code >= 95 && code <= 99) return 'Thunderstorm'
    return 'Cloudy'
  }

  const getDayName = (dateString: string, index: number, language: WidgetLang) => {
    if (index === 0) return t.today
    if (index === 1) return t.tomorrow
    const date = new Date(dateString)
    const dayIndex = date.getDay()
    return t.days[dayIndex]
  }

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">{t.loading}</span>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <p className="text-sm text-red-500">{t.error}</p>
        <p className="mt-2 text-xs text-gray-500">{t.retry}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          {weather.city}
        </h3>
        <div className="text-2xl">{weather.forecast[0]?.icon}</div>
      </div>

      <div className="mb-4 text-center">
        <div className="text-4xl text-gray-900 dark:text-white">{weather.temp}°</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{weather.description}</div>
      </div>

      <div className="flex justify-between gap-2">
        {weather.forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">{day.day}</div>
            <div className="my-1 text-lg">{day.icon}</div>
            <div className="text-sm text-gray-900 dark:text-white">{day.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
