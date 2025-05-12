import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@shared/schema";
import { Calendar } from "lucide-react";

interface EventsListProps {
  events?: Event[];
  isLoading: boolean;
}

const EventsList = ({ events = [], isLoading }: EventsListProps) => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold font-montserrat flex items-center">
          <Calendar className="h-6 w-6 text-[#CE1126] mr-3" />
          Upcoming Events
        </h3>
      </div>
      <div className="divide-y">
        {isLoading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="p-6">
              <div className="flex">
                <Skeleton className="flex-shrink-0 h-16 w-16 rounded-lg mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : events.length === 0 ? (
          // No events
          <div className="p-6 text-center">
            <p className="text-gray-500">No upcoming events at this time.</p>
          </div>
        ) : (
          // Events list
          events.map((event) => (
            <div key={event.id} className="p-6">
              <div className="flex">
                <div className={`
                  flex-shrink-0 
                  ${event.month === 'MAY' ? 'bg-[#CE1126]' : 
                    event.month === 'JUN' ? 'bg-[#E5B25D]' : 
                    'bg-[#006B3F]'} 
                  bg-opacity-10 
                  ${event.month === 'MAY' ? 'text-[#CE1126]' : 
                    event.month === 'JUN' ? 'text-[#E5B25D]' : 
                    'text-[#006B3F]'} 
                  rounded-lg p-3 mr-4 text-center
                `}>
                  <div className="text-sm font-medium">{event.month}</div>
                  <div className="text-xl font-bold">{event.day}</div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">{event.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default EventsList;
