import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Destination } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Umbrella, 
  Landmark, 
  TreeDeciduous, 
  Utensils, 
  ShoppingBag 
} from "lucide-react";

const regions = [
  "All Regions", 
  "Greater Accra", 
  "Ashanti", 
  "Central", 
  "Eastern", 
  "Northern", 
  "Western"
];

const filterCategories = [
  { icon: <Umbrella className="mr-2 text-[#E5B25D]" />, label: "Beaches" },
  { icon: <Landmark className="mr-2 text-[#CE1126]" />, label: "Heritage Sites" },
  { icon: <TreeDeciduous className="mr-2 text-[#006B3F]" />, label: "Nature" },
  { icon: <Utensils className="mr-2 text-[#E5B25D]" />, label: "Food" },
  { icon: <ShoppingBag className="mr-2 text-[#CE1126]" />, label: "Markets" }
];

const Map = () => {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data: destinations = [], isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 font-montserrat mb-3">Explore Ghana</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through Ghana's diverse regions and discover the perfect destinations for your journey
          </p>
        </div>
        
        <Card className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="relative">
            {isLoading ? (
              <Skeleton className="h-96 w-full" />
            ) : (
              <div className="w-full h-96 bg-gray-200 relative">
                {/* This would be replaced with an actual map component in a real implementation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white bg-opacity-90 p-6 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#CE1126] mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-lg text-neutral-800 font-medium">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-600">Explore regions, attractions, and plan your routes</p>
                  </div>
                </div>
                
                {/* Sample markers that would be implemented with actual map markers */}
                {destinations.map(destination => (
                  <div 
                    key={destination.id}
                    className="absolute w-3 h-3 bg-[#CE1126] rounded-full"
                    style={{ 
                      left: `${Math.random() * 80 + 10}%`, 
                      top: `${Math.random() * 80 + 10}%` 
                    }}
                    title={destination.name}
                  />
                ))}
              </div>
            )}
          </div>
          
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              {regions.map(region => (
                <Button 
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region)}
                  className={selectedRegion === region ? "bg-[#006B3F]" : ""}
                >
                  {region}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              {filterCategories.map(category => (
                <Button
                  key={category.label}
                  variant="outline"
                  onClick={() => toggleFilter(category.label)}
                  className={`flex items-center ${
                    selectedFilters.includes(category.label) 
                      ? "bg-neutral-100 border-gray-400" 
                      : ""
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))
          ) : (
            destinations
              .filter(dest => selectedRegion === "All Regions" || dest.region.includes(selectedRegion))
              .filter(dest => 
                selectedFilters.length === 0 || 
                selectedFilters.some(filter => 
                  Array.isArray(dest.tags) && dest.tags.some(tag => tag.includes(filter))
                )
              )
              .slice(0, 6)
              .map(dest => (
                <Card key={dest.id} className="hover:shadow-lg transition duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img 
                          src={dest.imageUrl} 
                          alt={dest.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{dest.name}</h3>
                        <p className="text-sm text-gray-500">{dest.region}</p>
                        <div className="flex mt-1">
                          {Array.isArray(dest.tags) && dest.tags.slice(0, 2).map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-neutral-100 px-2 py-0.5 rounded mr-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
        
        {!isLoading && destinations.length > 6 && (
          <div className="text-center mt-8">
            <Button variant="outline">View All Destinations</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
