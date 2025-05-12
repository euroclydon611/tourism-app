import { Destination } from "@shared/schema";
import { Link } from "wouter";
import { Star } from "lucide-react";

interface DestinationCardProps {
  destination: any;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  // Calculate rating display (from 0-50 to 0-5)
  const ratingDisplay = (destination.rating / 10).toFixed(1);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img
          className="h-64 w-full object-cover"
          src={`${import.meta.env.VITE_BASE_URL}/${destination.imageUrl}`}
          alt={destination.name}
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
          <Star className="h-4 w-4 text-yellow-400 inline mr-1 fill-yellow-400" />
          {ratingDisplay}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-montserrat mb-2">
          {destination.name}
        </h3>
        <p className="text-gray-600 mb-4">{destination.shortDescription}</p>
        <div className="flex items-center mb-4">
          {Array.isArray(destination.tags) &&
            destination.tags.slice(0, 2).map((tag:string, index:number) => (
              <span
                key={index}
                className={`
                ${index === 0 ? "mr-2" : ""}
                ${
                  tag.includes("Cultural")
                    ? "bg-[#E5B25D] bg-opacity-20 text-[#E5B25D]"
                    : tag.includes("Beaches")
                    ? "bg-[#006B3F] bg-opacity-20 text-[#006B3F]"
                    : tag.includes("Nature")
                    ? "bg-[#006B3F] bg-opacity-20 text-[#006B3F]"
                    : tag.includes("Markets")
                    ? "bg-[#CE1126] bg-opacity-20 text-[#CE1126]"
                    : tag.includes("Safari")
                    ? "bg-[#E5B25D] bg-opacity-20 text-[#E5B25D]"
                    : "bg-gray-200 text-gray-700"
                }
                px-3 py-1 rounded-full text-xs font-medium
              `}
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-neutral-800 font-bold">Top Attractions:</span>
            <span className="text-gray-600 text-sm ml-1">
              {Array.isArray(destination.topAttractions) &&
                destination.topAttractions.slice(0, 2).join(", ")}
            </span>
          </div>
          <Link href={`/destinations/${destination._id}`}>
            <span className="text-[#006B3F] hover:underline flex items-center cursor-pointer">
              <span>Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
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
    </div>
  );
};

export default DestinationCard;
