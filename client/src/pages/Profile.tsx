import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Edit, MapPin, Calendar, LogOut, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetBookingsQuery } from "@/redux/features/bookingApi";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth) as any;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [
    logout,
    { data: logoutData, isSuccess, isLoading: loggingOut, error },
  ] = useLogoutMutation();

  const imgUrl = user?.avatar;

  const logOutHandler = async (e: any) => {
    e.preventDefault();
    try {
      await logout({});
    } catch (error) {
      toast.error("Logout failed. Please try again later.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      try {
        toast.success(logoutData?.message, { duration: 5000 });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }, [isSuccess, error]);

  // Mock preferences - in a real app, this would come from API
  const [preferences, setPreferences] = useState({
    culturalHeritage: true,
    beaches: true,
    natureWildlife: false,
    localCuisine: true,
    markets: false,
    adventure: true,
  });

  const handlePreferencesChange = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const handleSavePreferences = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // toast({
      //   title: "Preferences updated",
      //   description: "Your travel preferences have been updated successfully.",
      // });
    }, 1000);
  };

  return (
    <div className="bg-neutral-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${imgUrl}`}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                    <p className="text-gray-500 mb-4">{user?.email}</p>

                    {/* <Button variant="outline" className="mb-6 w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button> */}

                    <div className="w-full">
                      <nav className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start hidden"
                          disabled
                        >
                          <User className="mr-2 h-5 w-5" />
                          Profile Information
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hidden"
                          disabled
                        >
                          <Heart className="mr-2 h-5 w-5" />
                          Saved Destinations
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hidden"
                          disabled
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          My Bookings
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hidden"
                          disabled
                        >
                          <MapPin className="mr-2 h-5 w-5 hidden" />
                          Travel History
                        </Button>
                        <Separator className="my-2" />
                        <Button
                          variant="ghost"
                          onClick={logOutHandler}
                          disabled={loggingOut}
                          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-5 w-5" />
                          Logout
                        </Button>
                      </nav>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Tabs defaultValue="profile">
                <TabsList className="mb-8">
                  <TabsTrigger value="profile">Profile Details</TabsTrigger>
                  <TabsTrigger value="preferences">
                    Travel Preferences
                  </TabsTrigger>
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                  {/* <TabsTrigger value="wishlist">Wishlist</TabsTrigger> */}
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input id="fullName" value={user?.name} disabled />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={user?.email} disabled />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={user?.phoneNumber}
                            placeholder="Add your phone number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={user?.country}
                            placeholder="Add your country"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">About Me</Label>
                        <textarea
                          id="bio"
                          rows={4}
                          className="w-full p-3 border rounded-md border-gray-300 focus:border-[#006B3F] focus:ring focus:ring-[#006B3F] focus:ring-opacity-20"
                          placeholder="Tell us about yourself and your travel interests..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button className="bg-[#006B3F] hover:bg-[#005C35]">
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Travel Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        Tell us what you're interested in, and we'll customize
                        your Ghana travel recommendations.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="culturalHeritage"
                              checked={preferences.culturalHeritage}
                              onCheckedChange={() =>
                                handlePreferencesChange("culturalHeritage")
                              }
                            />
                            <Label
                              htmlFor="culturalHeritage"
                              className="cursor-pointer"
                            >
                              Historical & Cultural Sites
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="beaches"
                              checked={preferences.beaches}
                              onCheckedChange={() =>
                                handlePreferencesChange("beaches")
                              }
                            />
                            <Label htmlFor="beaches" className="cursor-pointer">
                              Beaches & Coastal Areas
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="natureWildlife"
                              checked={preferences.natureWildlife}
                              onCheckedChange={() =>
                                handlePreferencesChange("natureWildlife")
                              }
                            />
                            <Label
                              htmlFor="natureWildlife"
                              className="cursor-pointer"
                            >
                              Wildlife & Nature
                            </Label>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="localCuisine"
                              checked={preferences.localCuisine}
                              onCheckedChange={() =>
                                handlePreferencesChange("localCuisine")
                              }
                            />
                            <Label
                              htmlFor="localCuisine"
                              className="cursor-pointer"
                            >
                              Food & Culinary Experiences
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="markets"
                              checked={preferences.markets}
                              onCheckedChange={() =>
                                handlePreferencesChange("markets")
                              }
                            />
                            <Label htmlFor="markets" className="cursor-pointer">
                              Markets & Shopping
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="adventure"
                              checked={preferences.adventure}
                              onCheckedChange={() =>
                                handlePreferencesChange("adventure")
                              }
                            />
                            <Label
                              htmlFor="adventure"
                              className="cursor-pointer"
                            >
                              Adventure & Outdoor Activities
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          className="bg-[#006B3F] hover:bg-[#005C35]"
                          onClick={handleSavePreferences}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MyBookings user={user} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">
                          Your Wishlist is Empty
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Save destinations and experiences you're interested in
                          to plan your perfect Ghana trip.
                        </p>
                        <Button className="bg-[#CE1126] hover:bg-opacity-90">
                          Discover Experiences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent> */}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MyBookings = ({ user }: any) => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: bookings } = useGetBookingsQuery({
    page,
    limit,
    search: searchQuery,
    userId: user?._id,
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Guests
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase text-right">
                  Total Price (GHS)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {bookings?.data.length > 0 ? (
                bookings.data.map((booking: any) => (
                  <tr key={booking._id}>
                    {/* Format date as YYYY-MM-DD */}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(booking.date).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {booking.guests}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right">
                      {booking.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`
                inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full
                ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : booking.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              `}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {booking.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <button
                        // onClick={() => handleEditBooking(booking)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Edit className="h-5 w-5 text-primary-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">No Bookings Yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't made any bookings yet. Start exploring Ghana!
                    </p>
                    <Button className="bg-[#E5B25D] hover:bg-opacity-90">
                      Explore Destinations
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
