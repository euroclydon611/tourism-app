import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Review } from "@shared/schema";
import ReviewCard from "@/components/common/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Star } from "lucide-react";

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  // Filter reviews based on search and rating
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          review.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedRating === null || review.rating === selectedRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-neutral-800 font-montserrat mb-4">
            Traveler Experiences
          </h1>
          <p className="text-lg text-gray-600">
            Read authentic reviews and stories from fellow travelers who've explored Ghana
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <Filter className="mr-2 h-5 w-5 text-gray-500" />
            <span className="mr-2">Filter by rating:</span>
            <div className="flex space-x-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <Button
                  key={rating}
                  variant="ghost"
                  size="sm"
                  className={`p-1 ${selectedRating === rating ? 'bg-yellow-100' : ''}`}
                  onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                >
                  <Star 
                    className={`h-5 w-5 ${selectedRating === rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="space-y-6">
                {Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 mb-4">No reviews found matching your search criteria.</p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setSelectedRating(null);
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Button className="bg-[#CE1126] hover:bg-[#B00E21]">
                Share Your Experience
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="destinations" className="mt-0">
            <div className="text-center py-10">
              <p className="text-gray-500">Filter by destination type to see specific reviews.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="experiences" className="mt-0">
            <div className="text-center py-10">
              <p className="text-gray-500">Filter by experience type to see specific reviews.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="accommodations" className="mt-0">
            <div className="text-center py-10">
              <p className="text-gray-500">Filter by accommodation type to see specific reviews.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reviews;
