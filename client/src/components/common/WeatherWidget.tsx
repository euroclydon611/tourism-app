import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudSun } from "lucide-react";

interface WeatherData {
  city: string;
  date: string;
  temperature: number;
  condition: string;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

interface WeatherWidgetProps {
  weather?: WeatherData;
  isLoading: boolean;
}

const WeatherWidget = ({ weather, isLoading }: WeatherWidgetProps) => {
  const [selectedCity, setSelectedCity] = useState("Accra");
  
  // Weather condition icons
  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case "partly cloudy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="10" r="4" fill="currentColor" />
            <path d="M5 18a3 3 0 110-6h9a3 3 0 110 6H5z" fill="#ccc" stroke="gray" />
          </svg>
        );
      case "cloudy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 16a3 3 0 013-3h13a3 3 0 010 6H7a3 3 0 01-3-3z" fill="currentColor" />
            <path d="M7 9a3 3 0 013-3h7a3 3 0 010 6h-7a3 3 0 01-3-3z" fill="currentColor" />
          </svg>
        );
      case "rainy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 14a3 3 0 013-3h10a3 3 0 010 6H7a3 3 0 01-3-3z" fill="#ccc" stroke="gray" />
            <path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      default:
        return <CloudSun className="h-6 w-6 text-yellow-400" />;
    }
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    // In a real app, would fetch weather for the new city
  };

  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold font-montserrat flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E5B25D] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Weather Updates
        </h3>
      </div>
      
      {isLoading ? (
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-16 w-1/3" />
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <Skeleton className="h-4 w-10 mx-auto mb-2" />
                <Skeleton className="h-8 w-8 mx-auto mb-2 rounded-full" />
                <Skeleton className="h-4 w-8 mx-auto" />
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      ) : (
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold">{weather?.city || selectedCity}</h4>
              <p className="text-gray-500">{weather?.date || "Today"}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{weather?.temperature || 32}°C</div>
              <p className="text-gray-500">{weather?.condition || "Partly Cloudy"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {(weather?.forecast || [
              { day: "Mon", temp: 33, condition: "Sunny" },
              { day: "Tue", temp: 31, condition: "Partly Cloudy" },
              { day: "Wed", temp: 29, condition: "Rainy" },
              { day: "Thu", temp: 30, condition: "Partly Cloudy" }
            ]).map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-gray-500">{day.day}</p>
                {getWeatherIcon(day.condition)}
                <p className="text-sm font-bold">{day.temp}°C</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Select value={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Accra">Accra</SelectItem>
                <SelectItem value="Kumasi">Kumasi</SelectItem>
                <SelectItem value="Tamale">Tamale</SelectItem>
                <SelectItem value="Cape Coast">Cape Coast</SelectItem>
                <SelectItem value="Takoradi">Takoradi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WeatherWidget;
