import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "@/components/common/ReviewCard";
import { ChevronLeft, MapPin, Star } from "lucide-react";
import { useGetDestinationQuery } from "@/redux/features/app";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../hooks/use-toast";
import { useAddBookingMutation } from "@/redux/features/bookingApi";
import Swal from "sweetalert2";

const DestinationDetail = () => {
  const { toast } = useToast();

  const { user } = useSelector((state: RootState) => state.auth) as any;
  const { id: destinationId } = useParams();
  console.log("destinationId", destinationId);

  const [open, setOpen] = useState<any>(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rating, setRating] = useState<any>(1);

  const {
    data: destination,
    isLoading: isLoadingDestination,
    refetch,
  } = useGetDestinationQuery({ destinationId });

  // Booking form state
  const [bookingData, setBookingData] = useState({
    destinationId: destination?.data?._id,
    date: "",
    totalPrice: destination?.data?.price || "",
    guests: "1",
    notes: "",
  });

  useEffect(() => {
    if (destination?.data) {
      const guestsCount = parseInt(bookingData.guests, 10) || 0;
      const price = destination.data.price || 0;

      setBookingData((prev) => ({
        ...prev,
        destinationId: destination.data._id,
        totalPrice: guestsCount > 0 ? (guestsCount * price).toFixed(2) : "",
      }));
    }
  }, [destination]);

  const reviewHandler = async (e: any) => {
    await axios
      .put(
        `${import.meta.env.VITE_PUBLIC_SERVER_URI}/destination/review`,
        {
          user,
          rating,
          comment,
          destinationId: selectedItem?._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // toast.success(res.data.message);
        refetch();
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        console.log("error", error);
        // toast.error(error);
      });
  };

  const handleBookingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setBookingData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };

      if (name === "guests" || name === "destinationId") {
        const guestsCount = parseInt(
          name === "guests" ? value : prev.guests,
          10
        );
        const price = destination?.data?.price || 0;
        updatedData.totalPrice = isNaN(guestsCount)
          ? ""
          : (guestsCount * price).toFixed(2);
      }

      return updatedData;
    });
  };

  const [bookPlace, { data, isLoading, isSuccess, error }] =
    useAddBookingMutation();

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await bookPlace(bookingData);

    // In a real app, would submit to API
    // toast({
    //   title: "Checking Availability",
    //   description:
    //     "We're checking availability for your selected dates and destination.",
    // });
  };

  useEffect(() => {
    if (isSuccess) {
      const message = `${data?.message}` || "Completed";
      Swal.fire({
        title: message,
        icon: "success",
        timer: 5000,
        confirmButtonColor: "#727cf5",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setBookingData({
            destinationId: destination?.data?._id,
            date: "",
            totalPrice: "",
            guests: "1",
            notes: "",
          });
          // refetch();
          // onClose();
        }
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        Swal.fire({
          title: "Oops...",
          text: errorData?.data?.message || "Something went wrong!",
          icon: "error",
          // timer: 5000,
          confirmButtonColor: "#727cf5",
          showConfirmButton: true,
        });
      }
    }
  }, [isSuccess, error]);

  if (isLoadingDestination || isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <Skeleton className="h-96 w-full mb-8" />
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
        <p className="mb-6">
          The destination you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/destinations">
          <Button>Back to Destinations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div
        className="h-96 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/${
            destination.data.imageUrl
          })`,
        }}
        // style={{ backgroundImage: `url(https://rggnews.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-11-at-10.39.50-AM.jpeg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-10">
            <Link href="/destinations">
              <Button variant="outline" className="mb-4 bg-white bg-opacity-80">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Destinations
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {destination.data.name}
            </h1>
            <div className="flex items-center text-white mb-2">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{destination.data.region}</span>
              <div className="ml-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1 fill-yellow-400" />
                <span>{destination.data.rating} / 5</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(destination.data.tags) &&
                destination.data.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">
                  About {destination.data.name}
                </h2>
                <p className="text-gray-700 mb-6">
                  {destination.data.description}
                </p>

                <h3 className="text-xl font-bold mb-3">Top Attractions</h3>
                <ul className="list-disc pl-5 mb-6">
                  {Array.isArray(destination.data.topAttractions) &&
                    destination.data.topAttractions.map(
                      (attraction: string, index: number) => (
                        <li key={index} className="mb-1 text-gray-700">
                          {attraction}
                        </li>
                      )
                    )}
                </ul>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    {/* <h3 className="text-xl font-bold mb-4">Plan Your Visit</h3>
                    <p className="text-gray-700 mb-6">
                      Ready to experience {destination.data.name}? Book your
                      trip now!
                    </p>

                    <Button className="w-full mb-3 bg-[#006B3F] hover:bg-[#005C35]">
                      Check Availability
                    </Button> */}

                    {/* Quick Booking */}
                    <div className="bg-[#E5B25D] bg-opacity-10 rounded-xl p-8">
                      <h3 className="text-2xl font-bold font-montserrat mb-4 text-[#E5B25D]">
                        Quick Booking
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Start planning your Ghana adventure with a simple
                        booking request.
                      </p>

                      <form
                        onSubmit={handleBookingSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <Label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Booking Date
                          </Label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={bookingData.date}
                            onChange={handleBookingChange}
                            className="w-full px-4 py-3 rounded-md"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor="guests"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Number of Guests
                            </Label>
                            <Input
                              id="guests"
                              name="guests"
                              type="number"
                              min={1}
                              value={bookingData.guests}
                              onChange={handleBookingChange}
                              className="w-full px-4 py-3 rounded-md"
                              required
                            />
                          </div>

                          <div>
                            <Label
                              htmlFor="totalPrice"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Total Price (GHS)
                            </Label>
                            <Input
                              id="totalPrice"
                              name="totalPrice"
                              type="number"
                              step="0.01"
                              min={0}
                              value={bookingData.totalPrice}
                              readOnly
                              className="w-full px-4 py-3 rounded-md bg-gray-100 cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="notes"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Notes (Optional)
                          </Label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            value={bookingData.notes}
                            onChange={handleBookingChange}
                            className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#E5B25D] focus:ring focus:ring-[#E5B25D] focus:ring-opacity-20"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#E5B25D] hover:bg-opacity-90 text-white font-medium"
                        >
                          Book Now
                        </Button>
                      </form>
                    </div>

                    {/* <Button variant="outline" className="w-full">
                      Add to Wishlist
                    </Button> */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attractions" className="mt-0">
            <h2 className="text-2xl font-bold mb-6">
              Top Attractions in {destination.data.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(destination.data.topAttractions) &&
                destination.data.topAttractions.map(
                  (attraction: string, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{attraction}</h3>
                        <p className="text-gray-700">
                          Detailed information about this attraction would be
                          displayed here.
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Traveler Reviews</h2>
              <Button
                onClick={() => {
                  setOpen(true), setSelectedItem(destination.data);
                }}
                className={`${!user && "hidden"}`}
              >
                Write a Review
              </Button>
            </div>

            {destination.data.reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                No reviews yet. Be the first to review this destination!
              </p>
            ) : (
              <div className="space-y-6">
                {destination.data.reviews.map((review: any) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            {/* review popup */}
            {open && (
              <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
                <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      onClick={() => setOpen(false)}
                      className="cursor-pointer"
                    />
                  </div>
                  <h2 className="text-[30px] font-[500]  text-center">
                    Give a Review
                  </h2>
                  <br />
                  <h5 className="pl-3 text-[20px] font-[500]">
                    Give a Rating <span className="text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pt-1">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <br />
                  <div className="w-full ml-3">
                    <label className="block text-[20px] font-[500]">
                      Write a comment
                      <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      name="comment"
                      id=""
                      cols={20}
                      rows={5}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="How was your experience?!"
                      className="mt-2 w-[95%] border p-2 outline-none"
                    ></textarea>
                  </div>
                  <div
                    className="w-[140px] bg-black h-[40px] my-3 flex items-center justify-center rounded-md cursor-pointer mt-4 text-white"
                    onClick={reviewHandler}
                  >
                    Submit
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <h2 className="text-2xl font-bold mb-6">Location & Map</h2>
            {/* <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-2">
                  Interactive map would be displayed here
                </p>
                {destination.data.coordinates && (
                  <p className="text-gray-500">
                    Coordinates: {destination.data.coordinates.lat},{" "}
                    {destination.data.coordinates.lng}
                  </p>
                )}
              </div>
            </div> */}

            <TabsContent value="map" className="mt-0">
              <h2 className="text-2xl font-bold mb-6">Location & Map</h2>
              <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${destination.data.coordinates.coordinates[1]},${destination.data.coordinates.coordinates[0]}&z=14&output=embed`}
                ></iframe>
              </div>
            </TabsContent>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DestinationDetail;
