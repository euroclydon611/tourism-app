import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ placeholder = "Search...", onSearch, initialValue = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 w-full text-base rounded-lg border border-gray-300 shadow-sm focus:border-[#006B3F] focus:ring focus:ring-[#006B3F] focus:ring-opacity-20"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Button
            type="submit"
            className="bg-[#006B3F] hover:bg-opacity-90 rounded-md px-4 h-10"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
