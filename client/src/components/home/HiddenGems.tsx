import { useQuery } from "@tanstack/react-query";
import { HiddenGem } from "@shared/schema";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { useGetHiddenGemsQuery } from "@/redux/features/app";
import { useState } from "react";

const HiddenGems = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: hiddenGems = [],
    isLoading,
    error,
  } = useGetHiddenGemsQuery({ page, limit, search: searchQuery });

  return (
    <section className="py-16 bg-[#006B3F] bg-opacity-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-neutral-800 font-montserrat mb-3">
              Hidden Gems
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover Ghana's lesser-known treasures that offer authentic
              experiences away from the tourist crowds
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link href="/destinations">
              <span className="inline-flex items-center text-[#006B3F] hover:underline font-medium cursor-pointer">
                <span>View all hidden gems</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex overflow-x-auto pb-6 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-none w-80">
                <Skeleton className="h-48 w-full mb-3 rounded-xl" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">
              Error loading hidden gems. Please try again later.
            </p>
          </div>
        ) : (
          <div className="flex overflow-x-auto hide-scrollbar pb-6 gap-6">
            {hiddenGems?.data?.map((gem: any) => (
              <div
                key={gem.id}
                className="flex-none w-80 bg-white rounded-xl overflow-hidden shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    className="h-48 w-full object-cover"
                    src={`${import.meta.env.VITE_BASE_URL}/${gem.imageUrl}`}
                    alt={gem.name}
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#E5B25D] inline mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    Hidden Gem
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold font-montserrat mb-1">
                    {gem.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {gem.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <MapPin className="h-4 w-4 text-[#CE1126] inline mr-1" />
                      {gem.region}
                    </span>
                    <Link href={`/hiddengem/${gem._id}`}>
                      <span className="text-[#006B3F] hover:underline text-sm cursor-pointer">
                        Learn more
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HiddenGems;
