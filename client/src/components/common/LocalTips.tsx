import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Globe, DollarSign, Utensils } from "lucide-react";

const LocalTips = () => {
  return (
    <Card className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold font-montserrat flex items-center">
          <Lightbulb className="h-6 w-6 text-[#006B3F] mr-3" />
          Local Tips & Insights
        </h3>
      </div>
      <CardContent className="p-6">
        <div className="mb-6">
          <h4 className="font-medium mb-2 flex items-center">
            <Globe className="h-5 w-5 text-[#E5B25D] mr-2" />
            Key Phrases
          </h4>
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="mb-2">
              <span className="font-bold">Akwaaba</span> - Welcome
            </div>
            <div className="mb-2">
              <span className="font-bold">Me da wo ase</span> - Thank you
            </div>
            <div>
              <span className="font-bold">Yebeshia bio</span> - See you again
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2 flex items-center">
            <DollarSign className="h-5 w-5 text-[#CE1126] mr-2" />
            Currency Tips
          </h4>
          <p className="text-gray-600 text-sm mb-2">Current exchange rate: 1 USD = 12.5 GHS (Ghana Cedi)</p>
          <p className="text-gray-600 text-sm">Most urban areas accept credit cards, but carry cash for markets and rural areas.</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <Utensils className="h-5 w-5 text-[#006B3F] mr-2" />
            Must-Try Foods
          </h4>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>• <span className="font-medium">Jollof Rice</span> - Spicy one-pot rice dish</li>
            <li>• <span className="font-medium">Waakye</span> - Rice and beans with spiced sauce</li>
            <li>• <span className="font-medium">Kelewele</span> - Spiced fried plantains</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalTips;
