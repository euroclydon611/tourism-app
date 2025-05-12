import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Experience } from "@shared/schema";
import ExperienceCard from "@/components/common/ExperienceCard";
import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllExperiencesQuery } from "@/redux/features/app";

const categories = [
  "All",
  "Cultural",
  "Culinary",
  "Crafts",
  "Adventure",
  "Nature",
  "Heritage",
];

const Experiences = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: experiences = [],
    isLoading,
    error,
  } = useGetAllExperiencesQuery({ page, limit, search: searchQuery });

  // Filter experiences based on search query and selected category
  const filteredExperiences = experiences?.data?.filter((experience: any) => {
    const matchesSearch =
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || experience.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-neutral-800 font-montserrat mb-4">
            Unique Ghanaian Experiences
          </h1>
          <p className="text-lg text-gray-600">
            Immerse yourself in authentic Ghanaian experiences tailored to your
            interests
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            placeholder="Search experiences by name or features..."
            onSearch={setSearchQuery}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">
              Error loading experiences. Please try again later.
            </p>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No experiences found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience:any) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
