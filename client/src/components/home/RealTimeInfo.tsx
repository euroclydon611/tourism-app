import { useQuery } from "@tanstack/react-query";
import WeatherWidget from "@/components/common/WeatherWidget";
import EventsList from "@/components/common/EventsList";
import LocalTips from "@/components/common/LocalTips";

const RealTimeInfo = () => {
  const { data: events = [], isLoading: isLoadingEvents } = useQuery({
    queryKey: ['/api/events'],
  });

  const { data: weather, isLoading: isLoadingWeather } = useQuery({
    queryKey: ['/api/weather/Accra'],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 font-montserrat mb-3">Real-time Information</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the latest updates on weather, events, and local recommendations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather Widget */}
          <WeatherWidget weather={weather} isLoading={isLoadingWeather} />
          
          {/* Upcoming Events */}
          <EventsList events={events} isLoading={isLoadingEvents} />
          
          {/* Local Tips */}
          <LocalTips />
        </div>
      </div>
    </section>
  );
};

export default RealTimeInfo;
