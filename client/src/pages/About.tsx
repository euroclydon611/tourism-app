import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-neutral-800 font-montserrat mb-4">
            About DiscoverGhana
          </h1>
          <p className="text-lg text-gray-600">
            Your comprehensive guide to experiencing Ghana's rich culture, natural beauty, and hidden gems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="col-span-full lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                DiscoverGhana was created with a simple yet powerful mission: to provide travelers with a comprehensive, 
                user-friendly web-based tour guide that simplifies travel planning and improves the overall travel experience 
                in Ghana.
              </p>
              <p className="text-gray-700 mb-4">
                We aim to showcase the rich cultural heritage, stunning landscapes, and vibrant cities of Ghana, while 
                also highlighting lesser-known destinations and hidden gems that offer unique, authentic experiences off 
                the beaten path.
              </p>
              <p className="text-gray-700">
                Through personalized recommendations, interactive features, and real-time information, we strive to foster 
                cultural understanding and stimulate local economic development by promoting sustainable tourism practices 
                across Ghana.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#006B3F] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700"><span className="font-bold">Authenticity:</span> Showcasing the true essence of Ghana</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#E5B25D] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700"><span className="font-bold">Community:</span> Supporting local economies and development</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#CE1126] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700"><span className="font-bold">Sustainability:</span> Promoting responsible tourism</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#006B3F] text-white flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700"><span className="font-bold">Personalization:</span> Tailoring experiences to individual preferences</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Our Objectives</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#006B3F] bg-opacity-5 p-5 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-[#006B3F]">Personalized Recommendations</h3>
                  <p className="text-gray-700">
                    We provide tailored travel suggestions based on your preferences and interests, 
                    ensuring a more enjoyable and relevant experience in Ghana.
                  </p>
                </div>
                
                <div className="bg-[#E5B25D] bg-opacity-5 p-5 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-[#E5B25D]">Highlight Hidden Gems</h3>
                  <p className="text-gray-700">
                    We shine a spotlight on lesser-known destinations, offering travelers unique experiences 
                    that aren't commonly found in standard tour guides.
                  </p>
                </div>
                
                <div className="bg-[#CE1126] bg-opacity-5 p-5 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-[#CE1126]">Enhanced User Experience</h3>
                  <p className="text-gray-700">
                    Through interactive features, intuitive navigation, and comprehensive information, 
                    we make planning your Ghana trip seamless and enjoyable.
                  </p>
                </div>
                
                <div className="bg-[#006B3F] bg-opacity-5 p-5 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-[#006B3F]">Support Local Communities</h3>
                  <p className="text-gray-700">
                    By promoting local businesses, artisans, and cultural sites, we contribute to 
                    sustainable economic development across Ghana.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Have questions, suggestions, or feedback about DiscoverGhana? We'd love to hear from you! 
              Reach out to our team using the information below:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#006B3F] bg-opacity-10 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#006B3F]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p className="text-gray-700">+233 (0) 555 056 044</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#E5B25D] bg-opacity-10 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#E5B25D]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-gray-700">info@discoverghana.com</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#CE1126] bg-opacity-10 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#CE1126]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-bold mb-1">Address</h3>
                <p className="text-gray-700">Nii Koi Street 20 East Legon, Accra, Ghana</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
