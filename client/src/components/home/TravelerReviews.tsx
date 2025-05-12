import { useQuery } from "@tanstack/react-query";
import { Review } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from "@/components/common/ReviewCard";

const TravelerReviews = () => {
  const { data: reviews = [], isLoading, error } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  return (
    <section id="reviews" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 font-montserrat mb-3">Traveler Experiences</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read authentic reviews and stories from fellow travelers who've explored Ghana
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading reviews. Please try again later.</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No reviews available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/reviews">
            <Button className="inline-flex items-center bg-[#CE1126] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition">
              Read More Reviews
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravelerReviews;
