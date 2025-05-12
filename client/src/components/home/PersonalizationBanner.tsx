import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const PersonalizationBanner = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    culturalHeritage: false,
    beaches: false,
    natureWildlife: false,
    localCuisine: false,
    markets: false,
    adventure: false
  });

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const handleSubmit = () => {
    // Submit preferences to API in a real app
    toast({
      title: "Preferences Saved",
      description: "We'll recommend destinations based on your interests.",
    });
  };

  return (
    <section className="py-16 bg-[#006B3F] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-8 lg:mb-0 lg:mr-8">
            <h2 className="text-3xl font-bold font-montserrat mb-4">Personalize Your Ghana Experience</h2>
            <p className="text-lg opacity-90 max-w-xl mb-6">
              Tell us about your interests and preferences, and we'll recommend the perfect destinations and experiences for your journey.
            </p>
            <Button 
              className="bg-white text-[#006B3F] hover:bg-[#E5B25D] hover:text-white font-medium py-3 px-6 rounded-md transition"
              onClick={handleSubmit}
            >
              Get Personalized Recommendations
            </Button>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl w-full lg:w-1/3">
            <h3 className="text-xl font-bold font-montserrat mb-4">What interests you most?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="culturalHeritage" 
                  checked={preferences.culturalHeritage}
                  onCheckedChange={() => handlePreferenceChange('culturalHeritage')}
                  className="data-[state=checked]:bg-[#E5B25D] data-[state=checked]:border-[#E5B25D]"
                />
                <Label 
                  htmlFor="culturalHeritage" 
                  className="text-white cursor-pointer"
                >
                  Historical & Cultural Sites
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="beaches" 
                  checked={preferences.beaches}
                  onCheckedChange={() => handlePreferenceChange('beaches')}
                  className="data-[state=checked]:bg-[#E5B25D] data-[state=checked]:border-[#E5B25D]"
                />
                <Label 
                  htmlFor="beaches" 
                  className="text-white cursor-pointer"
                >
                  Beaches & Coastal Areas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="natureWildlife" 
                  checked={preferences.natureWildlife}
                  onCheckedChange={() => handlePreferenceChange('natureWildlife')}
                  className="data-[state=checked]:bg-[#E5B25D] data-[state=checked]:border-[#E5B25D]"
                />
                <Label 
                  htmlFor="natureWildlife" 
                  className="text-white cursor-pointer"
                >
                  Wildlife & Nature
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="localCuisine" 
                  checked={preferences.localCuisine}
                  onCheckedChange={() => handlePreferenceChange('localCuisine')}
                  className="data-[state=checked]:bg-[#E5B25D] data-[state=checked]:border-[#E5B25D]"
                />
                <Label 
                  htmlFor="localCuisine" 
                  className="text-white cursor-pointer"
                >
                  Food & Culinary Experiences
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="markets" 
                  checked={preferences.markets}
                  onCheckedChange={() => handlePreferenceChange('markets')}
                  className="data-[state=checked]:bg-[#E5B25D] data-[state=checked]:border-[#E5B25D]"
                />
                <Label 
                  htmlFor="markets" 
                  className="text-white cursor-pointer"
                >
                  Markets & Shopping
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="adventure" 
                  checked={preferences.adventure}
                  onCheckedChange={() => handlePreferenceChange('adventure')}
                  className="data-[state=checked]:bg-[#E5B25D] data-[state=checked]:border-[#E5B25D]"
                />
                <Label 
                  htmlFor="adventure" 
                  className="text-white cursor-pointer"
                >
                  Adventure & Outdoor Activities
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizationBanner;
