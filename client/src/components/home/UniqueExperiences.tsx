import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ExperienceCard from "@/components/common/ExperienceCard";
import { useState } from "react";
import { useGetAllExperiencesQuery } from "@/redux/features/app";

const UniqueExperiences = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const {
    data: experiences = [],
    isLoading,
    error,
  } = useGetAllExperiencesQuery({page, limit, search: ""});

  return (
    <section id="experiences" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 font-montserrat mb-3">
            Unique Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in authentic Ghanaian experiences tailored to your
            interests
          </p>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences?.data?.map((experience:any) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/experiences">
            <Button
              variant="outline"
              className="inline-flex items-center border-2 border-[#006B3F] text-[#006B3F] hover:bg-[#006B3F] hover:text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              View All Experiences
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

export default UniqueExperiences;
