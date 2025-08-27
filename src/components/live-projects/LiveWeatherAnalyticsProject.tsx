import { useState, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  CloudDrizzle,
  Wind,
  Eye,
  Droplets,
  Thermometer,
  Gauge,
  Navigation,
  Sunrise,
  Sunset,
  Moon,
  Zap,
  Snowflake,
  CloudLightning,
  Tornado,
  Search,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  AlertTriangle,
  Info,
  CheckCircle,
  Settings,
  Download,
  Share2,
  RefreshCw,
  Globe,
  Satellite,
  Radio,
  Target,
  Layers,
  Filter,
  Database,
  Brain,
  Cpu,
  Smartphone,
  Monitor
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
    timezone: string;
  };
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
    dewPoint: number;
    cloudCover: number;
    precipitation: number;
    timestamp: string;
  };
  hourly: {
    time: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitation: number;
    windSpeed: number;
    humidity: number;
  }[];
  daily: {
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
    humidity: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
  }[];
  alerts: {
    id: string;
    title: string;
    description: string;
    severity: 'minor' | 'moderate' | 'severe' | 'extreme';
    startTime: string;
    endTime: string;
    areas: string[];
  }[];
}

interface HistoricalData {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

interface WeatherStation {
  id: string;
  name: string;
  location: {
    lat: number;
    lon: number;
    elevation: number;
  };
  status: 'active' | 'maintenance' | 'offline';
  lastUpdate: string;
  sensors: {
    temperature: { value: number; status: 'normal' | 'warning' | 'error' };
    humidity: { value: number; status: 'normal' | 'warning' | 'error' };
    pressure: { value: number; status: 'normal' | 'warning' | 'error' };
    windSpeed: { value: number; status: 'normal' | 'warning' | 'error' };
    rainfall: { value: number; status: 'normal' | 'warning' | 'error' };
  };
}

export function LiveWeatherAnalyticsProject() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedLocation, setSelectedLocation] = useState("nairobi");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [searchLocation, setSearchLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);

  const [weatherData] = useState<WeatherData>({
    location: {
      name: "Nairobi",
      country: "Kenya",
      lat: -1.2921,
      lon: 36.8219,
      timezone: "Africa/Nairobi"
    },
    current: {
      temperature: 24,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      humidity: 65,
      windSpeed: 12,
      windDirection: 180,
      pressure: 1013,
      visibility: 10,
      uvIndex: 8,
      feelsLike: 27,
      dewPoint: 17,
      cloudCover: 40,
      precipitation: 0,
      timestamp: new Date().toISOString()
    },
    hourly: Array.from({ length: 24 }, (_, i) => ({
      time: new Date(Date.now() + i * 60 * 60 * 1000).toISOString(),
      temperature: 20 + Math.sin(i * Math.PI / 12) * 8 + Math.random() * 4,
      condition: ["Clear", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
      icon: "partly-cloudy",
      precipitation: Math.random() * 10,
      windSpeed: 8 + Math.random() * 15,
      humidity: 50 + Math.random() * 30
    })),
    daily: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      high: 25 + Math.random() * 8,
      low: 15 + Math.random() * 5,
      condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain"][Math.floor(Math.random() * 5)],
      icon: "sunny",
      precipitation: Math.random() * 20,
      humidity: 60 + Math.random() * 20,
      windSpeed: 10 + Math.random() * 12,
      sunrise: "06:30",
      sunset: "18:45"
    })),
    alerts: [
      {
        id: "alert-001",
        title: "Heavy Rain Warning",
        description: "Heavy rainfall expected in the afternoon. Possible flooding in low-lying areas.",
        severity: "moderate",
        startTime: "2024-01-25T14:00:00Z",
        endTime: "2024-01-25T18:00:00Z",
        areas: ["Nairobi", "Kiambu", "Machakos"]
      }
    ]
  });

  const [historicalData] = useState<HistoricalData[]>(
    Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      avgTemp: 20 + Math.sin(i * Math.PI / 15) * 6 + Math.random() * 4,
      maxTemp: 25 + Math.sin(i * Math.PI / 15) * 8 + Math.random() * 5,
      minTemp: 15 + Math.sin(i * Math.PI / 15) * 4 + Math.random() * 3,
      precipitation: Math.random() * 25,
      humidity: 55 + Math.random() * 25,
      windSpeed: 8 + Math.random() * 12,
      pressure: 1010 + Math.random() * 10
    }))
  );

  const [weatherStations] = useState<WeatherStation[]>([
    {
      id: "station-001",
      name: "Nairobi Central",
      location: { lat: -1.2921, lon: 36.8219, elevation: 1795 },
      status: "active",
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      sensors: {
        temperature: { value: 24.5, status: "normal" },
        humidity: { value: 65, status: "normal" },
        pressure: { value: 1013.2, status: "normal" },
        windSpeed: { value: 12.3, status: "normal" },
        rainfall: { value: 0, status: "normal" }
      }
    },
    {
      id: "station-002",
      name: "University Campus",
      location: { lat: -1.3, lon: 36.85, elevation: 1850 },
      status: "active",
      lastUpdate: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      sensors: {
        temperature: { value: 23.8, status: "normal" },
        humidity: { value: 68, status: "warning" },
        pressure: { value: 1012.8, status: "normal" },
        windSpeed: { value: 15.2, status: "warning" },
        rainfall: { value: 2.5, status: "normal" }
      }
    },
    {
      id: "station-003",
      name: "Industrial Area",
      location: { lat: -1.32, lon: 36.88, elevation: 1700 },
      status: "maintenance",
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sensors: {
        temperature: { value: 26.1, status: "error" },
        humidity: { value: 0, status: "error" },
        pressure: { value: 1015.1, status: "normal" },
        windSpeed: { value: 0, status: "error" },
        rainfall: { value: 0, status: "error" }
      }
    }
  ]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny': return Sun;
      case 'partly cloudy': return Cloud;
      case 'cloudy': return Cloud;
      case 'light rain':
      case 'drizzle': return CloudDrizzle;
      case 'heavy rain':
      case 'rain': return CloudRain;
      case 'snow': return CloudSnow;
      case 'thunderstorm': return CloudLightning;
      case 'fog': return Cloud;
      default: return Cloud;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'extreme': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300';
      case 'severe': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300';
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time data updates
        console.log("Auto-refreshing weather data...");
      }, 300000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-sky-900/10 dark:to-indigo-900/10 rounded-lg overflow-hidden border shadow-2xl">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  WeatherScope AI
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Advanced Weather Analytics & Prediction
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {autoRefresh ? 'Live Data' : 'Manual'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Connected</span>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? 'bg-green-50 border-green-200 text-green-700' : ''}
              >
                <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
              </Button>
              
              <Button size="sm" variant="outline" onClick={refreshData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 rounded-none h-12">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-sky-600 data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="forecast" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-sky-600 data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20"
              >
                <Calendar className="w-4 h-4" />
                Forecast
              </TabsTrigger>
              <TabsTrigger 
                value="maps" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-sky-600 data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20"
              >
                <Globe className="w-4 h-4" />
                Weather Maps
              </TabsTrigger>
              <TabsTrigger 
                value="historical" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-sky-600 data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20"
              >
                <LineChart className="w-4 h-4" />
                Historical
              </TabsTrigger>
              <TabsTrigger 
                value="stations" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-sky-600 data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20"
              >
                <Radio className="w-4 h-4" />
                Stations
              </TabsTrigger>
              <TabsTrigger 
                value="alerts" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-sky-600 data-[state=active]:bg-sky-50 dark:data-[state=active]:bg-sky-900/20"
              >
                <AlertTriangle className="w-4 h-4" />
                Alerts
                {weatherData.alerts.length > 0 && (
                  <Badge className="bg-red-500 text-white text-xs ml-1">
                    {weatherData.alerts.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} className="h-full">
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="h-full mt-0 p-6">
              
              {/* Current Weather Hero */}
              <Card className="p-6 mb-6 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <div>
                        <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
                        <p className="text-white/80">{weatherData.location.country}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{Math.round(weatherData.current.temperature)}°C</div>
                      <div className="text-white/80">Feels like {Math.round(weatherData.current.feelsLike)}°C</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const Icon = getWeatherIcon(weatherData.current.condition);
                        return <Icon className="w-8 h-8" />;
                      })()}
                      <div>
                        <div className="text-lg font-semibold">{weatherData.current.condition}</div>
                        <div className="text-white/80">Last updated: {formatTime(weatherData.current.timestamp)}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        <span>{weatherData.current.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4" />
                        <span>{weatherData.current.windSpeed} km/h {getWindDirection(weatherData.current.windDirection)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4" />
                        <span>{weatherData.current.pressure} mb</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{weatherData.current.visibility} km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Hourly Forecast */}
                <Card className="lg:col-span-2 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    24-Hour Forecast
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {weatherData.hourly.slice(0, 12).map((hour, index) => {
                      const Icon = getWeatherIcon(hour.condition);
                      return (
                        <div key={index} className="flex-shrink-0 text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-[80px]">
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {index === 0 ? 'Now' : formatTime(hour.time)}
                          </div>
                          <Icon className="w-6 h-6 mx-auto mb-2 text-sky-600" />
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">
                            {Math.round(hour.temperature)}°
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {Math.round(hour.precipitation)}mm
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Key Metrics */}
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Temperature</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weatherData.current.temperature}°C
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Feels like {weatherData.current.feelsLike}°C
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Humidity</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weatherData.current.humidity}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Dew point: {weatherData.current.dewPoint}°C
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Wind</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weatherData.current.windSpeed}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      km/h {getWindDirection(weatherData.current.windDirection)}
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-purple-500" />
                        <span className="font-medium text-gray-900 dark:text-white">Pressure</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {weatherData.current.pressure}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      millibars
                    </div>
                  </Card>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  7-Day Forecast
                </h3>
                <div className="space-y-3">
                  {weatherData.daily.map((day, index) => {
                    const Icon = getWeatherIcon(day.condition);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white w-16">
                            {index === 0 ? 'Today' : formatDate(day.date)}
                          </div>
                          <Icon className="w-5 h-5 text-sky-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-24">{day.condition}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <CloudDrizzle className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600 dark:text-gray-400">{Math.round(day.precipitation)}%</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {Math.round(day.high)}° / {Math.round(day.low)}°
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            {/* Forecast Tab */}
            <TabsContent value="forecast" className="h-full mt-0 p-6">
              <div className="space-y-6">
                
                {/* Forecast Controls */}
                <div className="flex items-center gap-4">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
                      <SelectItem value="mombasa">Mombasa, Kenya</SelectItem>
                      <SelectItem value="kisumu">Kisumu, Kenya</SelectItem>
                      <SelectItem value="nakuru">Nakuru, Kenya</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 Hours</SelectItem>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="14d">14 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search location..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Extended Forecast Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {weatherData.daily.slice(0, 8).map((day, index) => {
                    const Icon = getWeatherIcon(day.condition);
                    return (
                      <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="text-center">
                          <div className="font-semibold text-gray-900 dark:text-white mb-2">
                            {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : formatDate(day.date)}
                          </div>
                          <Icon className="w-12 h-12 mx-auto mb-3 text-sky-600" />
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{day.condition}</div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">High:</span>
                              <span className="font-semibold">{Math.round(day.high)}°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Low:</span>
                              <span className="font-semibold">{Math.round(day.low)}°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Rain:</span>
                              <span className="font-semibold">{Math.round(day.precipitation)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Wind:</span>
                              <span className="font-semibold">{Math.round(day.windSpeed)} km/h</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Sunrise className="w-3 h-3" />
                              <span>{day.sunrise}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Sunset className="w-3 h-3" />
                              <span>{day.sunset}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Maps Tab */}
            <TabsContent value="maps" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <Globe className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Interactive Weather Maps
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Satellite imagery, radar maps, temperature overlays, and precipitation forecasts coming soon!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Satellite className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">Satellite View</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Real-time satellite imagery and cloud coverage
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Radio className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="font-semibold mb-2">Radar Maps</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Precipitation radar and storm tracking
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Thermometer className="w-8 h-8 text-red-500 mb-3" />
                    <h3 className="font-semibold mb-2">Temperature Maps</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Temperature overlays and heat maps
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Historical Tab */}
            <TabsContent value="historical" className="h-full mt-0 p-6">
              <div className="space-y-6">
                
                {/* Controls */}
                <div className="flex items-center gap-4">
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="precipitation">Precipitation</SelectItem>
                      <SelectItem value="humidity">Humidity</SelectItem>
                      <SelectItem value="pressure">Pressure</SelectItem>
                      <SelectItem value="windSpeed">Wind Speed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                {/* Historical Chart Placeholder */}
                <Card className="p-6 h-96">
                  <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <LineChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Historical Weather Chart</p>
                      <p className="text-sm">Interactive charts showing {selectedMetric} trends over time</p>
                    </div>
                  </div>
                </Card>

                {/* Historical Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-red-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-red-600">
                      {Math.round(Math.max(...historicalData.map(d => d.maxTemp)))}°C
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Record High</div>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <TrendingDown className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(Math.min(...historicalData.map(d => d.minTemp)))}°C
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Record Low</div>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <CloudRain className="w-8 h-8 text-sky-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-sky-600">
                      {Math.round(historicalData.reduce((sum, d) => sum + d.precipitation, 0))}mm
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Rainfall</div>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <Thermometer className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(historicalData.reduce((sum, d) => sum + d.avgTemp, 0) / historicalData.length)}°C
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Temp</div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Stations Tab */}
            <TabsContent value="stations" className="h-full mt-0 p-6">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Stations</h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      {weatherStations.filter(s => s.status === 'active').length} active stations
                    </Badge>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Station
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {weatherStations.map(station => (
                    <Card key={station.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            station.status === 'active' ? 'bg-green-500' :
                            station.status === 'maintenance' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{station.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {station.location.lat.toFixed(4)}°N, {station.location.lon.toFixed(4)}°E • 
                              {station.location.elevation}m elevation
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            station.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            station.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }>
                            {station.status}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(station.lastUpdate).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Thermometer className={`w-6 h-6 mx-auto mb-2 ${
                            station.sensors.temperature.status === 'normal' ? 'text-green-500' :
                            station.sensors.temperature.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {station.sensors.temperature.value.toFixed(1)}°C
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Temperature</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Droplets className={`w-6 h-6 mx-auto mb-2 ${
                            station.sensors.humidity.status === 'normal' ? 'text-blue-500' :
                            station.sensors.humidity.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {station.sensors.humidity.value}%
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Humidity</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Gauge className={`w-6 h-6 mx-auto mb-2 ${
                            station.sensors.pressure.status === 'normal' ? 'text-purple-500' :
                            station.sensors.pressure.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {station.sensors.pressure.value.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Pressure (mb)</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Wind className={`w-6 h-6 mx-auto mb-2 ${
                            station.sensors.windSpeed.status === 'normal' ? 'text-green-500' :
                            station.sensors.windSpeed.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {station.sensors.windSpeed.value.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Wind (km/h)</div>
                        </div>
                        
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <CloudRain className={`w-6 h-6 mx-auto mb-2 ${
                            station.sensors.rainfall.status === 'normal' ? 'text-blue-500' :
                            station.sensors.rainfall.status === 'warning' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {station.sensors.rainfall.value.toFixed(1)}mm
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Rainfall</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="h-full mt-0 p-6">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Alerts</h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      {weatherData.alerts.length} active alerts
                    </Badge>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Alert Settings
                    </Button>
                  </div>
                </div>

                {weatherData.alerts.length > 0 ? (
                  <div className="space-y-4">
                    {weatherData.alerts.map(alert => (
                      <Card key={alert.id} className={`p-6 border-l-4 ${
                        alert.severity === 'extreme' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                        alert.severity === 'severe' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                        alert.severity === 'moderate' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                        'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className={`w-6 h-6 ${
                              alert.severity === 'extreme' ? 'text-red-600' :
                              alert.severity === 'severe' ? 'text-orange-600' :
                              alert.severity === 'moderate' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{alert.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(alert.startTime).toLocaleString()} - {new Date(alert.endTime).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge className={getAlertColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{alert.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Areas: {alert.areas.join(', ')}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Active Alerts</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      All weather conditions are currently normal for your area.
                    </p>
                  </Card>
                )}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}