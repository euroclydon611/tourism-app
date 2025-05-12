import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";

const NewsletterBooking = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    adults: "1",
    children: "0"
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreed) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive updates and marketing emails.",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!"
      });
      
      setEmail("");
      setAgreed(false);
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate booking data
    if (!bookingData.destination) {
      toast({
        title: "Destination Required",
        description: "Please select a destination.",
        variant: "destructive"
      });
      return;
    }
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast({
        title: "Dates Required",
        description: "Please select check-in and check-out dates.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, would submit to API
    toast({
      title: "Checking Availability",
      description: "We're checking availability for your selected dates and destination."
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Newsletter Signup */}
          <div className="bg-neutral-50 rounded-xl p-8 hidden">
            <h3 className="text-2xl font-bold font-montserrat mb-4">Stay Updated on Ghana</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for travel tips, seasonal recommendations, and exclusive offers.
            </p>
            
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="bg-[#E5B25D] hover:bg-opacity-90 text-white font-medium"
                  disabled={submitting}
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter-consent" 
                    checked={agreed}
                    onCheckedChange={() => setAgreed(!agreed)}
                  />
                  <Label htmlFor="newsletter-consent" className="cursor-pointer">
                    I agree to receive updates and marketing emails. You can unsubscribe at any time.
                  </Label>
                </div>
              </div>
            </form>
          </div>
          
          {/* Quick Booking */}
          <div className="bg-[#E5B25D] bg-opacity-10 rounded-xl p-8">
            <h3 className="text-2xl font-bold font-montserrat mb-4 text-[#E5B25D]">Quick Booking</h3>
            <p className="text-gray-600 mb-6">
              Start planning your Ghana adventure with a simple booking request.
            </p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <Label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination</Label>
                <select 
                  id="destination"
                  name="destination"
                  value={bookingData.destination}
                  onChange={handleBookingChange}
                  className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#E5B25D] focus:ring focus:ring-[#E5B25D] focus:ring-opacity-20"
                >
                  <option value="">Select destination</option>
                  <option value="Accra">Accra</option>
                  <option value="Cape Coast">Cape Coast</option>
                  <option value="Kumasi">Kumasi</option>
                  <option value="Mole National Park">Mole National Park</option>
                  <option value="Volta Region">Volta Region</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in</Label>
                  <Input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    value={bookingData.checkIn}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-3 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out</Label>
                  <Input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    value={bookingData.checkOut}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-3 rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Adults</Label>
                  <select 
                    id="adults"
                    name="adults"
                    value={bookingData.adults}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#E5B25D] focus:ring focus:ring-[#E5B25D] focus:ring-opacity-20"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Children</Label>
                  <select 
                    id="children"
                    name="children"
                    value={bookingData.children}
                    onChange={handleBookingChange}
                    className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#E5B25D] focus:ring focus:ring-[#E5B25D] focus:ring-opacity-20"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-[#E5B25D] hover:bg-opacity-90 text-white font-medium">
                Check Availability
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBooking;
