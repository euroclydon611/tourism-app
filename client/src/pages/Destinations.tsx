import { useState } from "react";
import DestinationCard from "@/components/common/DestinationCard";
import SearchBar from "@/components/common/SearchBar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllDestinationsQuery } from "@/redux/features/app";

const regions = [
  "All Regions",
  "Greater Accra",
  "Ashanti",
  "Central",
  "Eastern",
  "Northern",
  "Western",
  "Volta",
  "Upper East",
  "Upper West",
];

const Destinations = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const {
    data: destinationsData,
    isLoading,
    error,
  } = useGetAllDestinationsQuery({ page, limit, search: searchQuery });

  // Filter destinations based on search query and selected region
  const filteredDestinations = destinationsData?.data?.filter(
    (destination: any) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === "All Regions" ||
        destination.region.includes(selectedRegion);
      return matchesSearch && matchesRegion;
    }
  );

  // Handle region selection
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-neutral-800 font-montserrat mb-4">
            Explore Ghana's Beautiful Destinations
          </h1>
          <p className="text-lg text-gray-600">
            Discover the rich culture, stunning landscapes, and vibrant cities
            that make Ghana a must-visit destination.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            placeholder="Search destinations by name or features..."
            onSearch={setSearchQuery}
          />
        </div>

        <Tabs defaultValue="All Regions" className="mb-8">
          <TabsList className="flex flex-wrap gap-2 mb-6 justify-center">
            {regions.map((region) => (
              <TabsTrigger
                key={region}
                value={region}
                onClick={() => handleRegionChange(region)}
                className="px-4 py-2 rounded-full text-sm font-medium"
              >
                {region}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">
              Error loading destinations. Please try again later.
            </p>
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No destinations found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination: any) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
