import { Experience } from "@shared/schema";
import { Link } from "wouter";

interface ExperienceCardProps {
  experience: any;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  // Determine category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cultural":
        return "bg-[#CE1126]";
      case "Culinary":
        return "bg-[#E5B25D]";
      case "Crafts":
        return "bg-[#006B3F]";
      case "Adventure":
        return "bg-[#006B3F]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md">
      <img
        src={`${import.meta.env.VITE_BASE_URL}/${experience.imageUrl}`}
        alt={experience.title}
        className="w-full h-80 object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <span
          className={`${getCategoryColor(
            experience.category
          )} px-3 py-1 rounded-full text-white text-xs font-medium mb-3 inline-block`}
        >
          {experience.category}
        </span>
        <h3 className="text-xl font-bold text-white font-montserrat mb-2">
          {experience.title}
        </h3>
        <p className="text-white text-sm mb-3">{experience.description}</p>
        <Link href={`/experiences/${experience._id}`}>
          <span className="text-white flex items-center text-sm font-medium cursor-pointer hover:underline">
            <span>Explore this experience</span>
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
  );
};

export default ExperienceCard;
