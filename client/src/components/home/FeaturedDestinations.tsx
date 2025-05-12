import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationCard from "@/components/common/DestinationCard";
import { useGetAllDestinationsQuery } from "@/redux/features/app";
import { useState } from "react";

const FeaturedDestinations = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: destinationsData,
    isLoading,
    error,
  } = useGetAllDestinationsQuery({ page, limit, search: searchQuery });

  return (
    <section id="destinations" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 font-montserrat mb-3">
            Featured Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the beauty and diversity of Ghana through our handpicked
            selection of must-visit destinations
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 bg-white">
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">
              Error loading destinations. Please try again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinationsData.data.map((destination: any) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/destinations">
            <Button className="inline-flex items-center bg-[#E5B25D] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition">
              View All Destinations
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
