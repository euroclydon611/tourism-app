import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");

  const handleSearch = () => {
    // In a real app, this would navigate to search results
    window.location.href = `/destinations?search=${encodeURIComponent(destination)}`;
  };




  return (
    <section className="pt-20 bg-cover bg-center bg-no-repeat" style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')" 
    }}>
      <div className="bg-black bg-opacity-40 pt-16 pb-24 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-montserrat mb-6">
              Discover the Beauty and Culture of Ghana
            </h1>
            <p className="text-xl text-white mb-10 font-opensans">
              Your personalized journey through Ghana's rich heritage, hidden gems, and unforgettable experiences
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mx-auto max-w-3xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Where to?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <Input
                      className="pl-10 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#006B3F] focus:ring focus:ring-[#006B3F] focus:ring-opacity-20"
                      placeholder="Search destinations, attractions..."
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">When?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      className="pl-10 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#006B3F] focus:ring focus:ring-[#006B3F] focus:ring-opacity-20"
                      placeholder="Select dates"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:self-end">
                  <Button 
                    className="w-full md:w-auto bg-[#006B3F] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition"
                    onClick={handleSearch}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center mt-8 gap-3">
              <Link href="/destinations">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30 transition">Cultural Heritage</span>
              </Link>
              <Link href="/destinations">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30 transition">Beaches</span>
              </Link>
              <Link href="/destinations">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30 transition">Nature & Wildlife</span>
              </Link>
              <Link href="/destinations">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30 transition">Local Cuisine</span>
              </Link>
              <Link href="/destinations">
                <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-opacity-30 transition">Hidden Gems</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
