import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, Edit, Loader2 } from "lucide-react";
import {
  useGetHiddenGemsQuery,
} from "@/redux/features/app";
import {
  useAddHiddenGemsMutation,
  useUpdateHiddengemsMutation,
} from "@/redux/features/adminApi";

const regions = [
  "Greater Accra",
  "Ashanti",
  "Central",
  "Eastern",
  "Northern",
  "Western",
  "Volta",
  "Upper East",
  "Upper West",
];

const destinationSchema = z.object({
  name: z.string().min(1, "Destination name is required"),
  region: z.string().min(1, "Region is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  rating: z
    .number()
    .min(0, "Rating cannot be less than 0")
    .max(5, "Rating cannot be greater than 5"),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  coordinates: z
    .object({
      type: z.literal("Point"),
      coordinates: z
        .tuple([z.number(), z.number()])
        .refine(
          ([lng, lat]) => lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180,
          { message: "Invalid coordinates" }
        ),
    })
    .transform((coords) => ({
      type: coords.type,
      coordinates: [coords.coordinates[0], coords.coordinates[1]],
    })),
  // topAttractions: z.array(z.string()),
  // tags: z.array(z.string()),
  imageUrl: z.custom<File>((val) => val instanceof File, {
    message: "Image file is required",
  }),
});

type DestinationFormValues = z.infer<typeof destinationSchema>;
import React from "react";

export default function HiddenGemsSection({ employee }: any) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [destination, setDestination] = useState<any>(null);

  const {
    data: destinationsData,
    isLoading: isLoadingDestination,
    refetch,
  } = useGetHiddenGemsQuery({ page, limit, search: searchQuery });

  const { toast } = useToast();

  const destinations = destinationsData?.data || [];

  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      region: "",
      description: "",
      shortDescription: "",
      rating: 0,
      coordinates: {
        type: "Point",
        coordinates: [0, 0],
      },
      // topAttractions: [],
      // tags: [],
      imageUrl: undefined, // This would be populated after file upload
    },
  });

  const [createDestination, { isSuccess, isLoading, error }] =
    useAddHiddenGemsMutation();

  const [
    updateDestination,
    { isSuccess: updated, isLoading: updating, error: updateError },
  ] = useUpdateHiddengemsMutation();

  useEffect(() => {
    if (destination) {
      // Manually set form values
      form.setValue("name", destination.name || "");
      form.setValue("region", destination.region || "");
      form.setValue("description", destination.description || "");
      form.setValue("shortDescription", destination.shortDescription || "");
      form.setValue("rating", destination.rating || 0);
      form.setValue("latitude", destination.coordinates?.coordinates?.[1] || 0);
      form.setValue(
        "longitude",
        destination.coordinates?.coordinates?.[0] || 0
      );
      // form.setValue("topAttractions", destination.topAttractions || []);
      // form.setValue("tags", destination.tags || []);
    }
  }, [destination, form]);

  const onSubmit = (data: DestinationFormValues) => {
    console.log("Editing destination:", destination); // Check if destination exists

    const formData = new FormData();

    // Append other fields
    formData.append("name", data.name);
    formData.append("region", data.region);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
    formData.append("rating", data.rating.toString());

    // Coordinates as required
    const coordinates = {
      type: "Point",
      coordinates: [data.longitude, data.latitude],
    };
    formData.append("coordinates", JSON.stringify(coordinates));

    // Top attractions and tags as JSON strings
    // formData.append("topAttractions", JSON.stringify(data.topAttractions));
    // formData.append("tags", JSON.stringify(data.tags));

    // Image file handling
    if (data.imageUrl && data.imageUrl instanceof File) {
      formData.append("imageUrl", data.imageUrl);
    }

    // Check if destination is present for update
    if (destination) {
      console.log("Updating destination with ID:", destination.id);
      formData.append("id", destination._id); // Append the destination ID to the formData
      updateDestination({ formData, id: destination._id }); // Call update API or mutation
    } else {
      console.log("Creating new destination");
      createDestination(formData); // Call create API or mutation
    }
  };

  useEffect(() => {
    if (isSuccess || updated) {
      toast({
        title: "Destination Saved",
        description: "The destination has been saved successfully.",
      });
      setOpen(false);
      setDestination(null);
      refetch();
    }

    if (error || updateError) {
      const err: any = error || updateError;
      console.log("Error caught:", err);

      if (err && "data" in err && err.data) {
        toast({
          title: "Failed to Save Destination",
          description:
            err.data.error ||
            "An error occurred while saving the destination. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to Save Destination",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [isSuccess, updated, error, updateError]);

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Hidden Gems</h2>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center">
                <PlusCircle className="mr-1 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Hidden</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Destination name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border border-input rounded-md px-3 py-2 text-sm"
                          >
                            {regions.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Full description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Short summary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              placeholder="Latitude"
                              {...field}
                              onChange={
                                (e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  ) // Ensure value is a number
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              placeholder="Longitude"
                              {...field}
                              onChange={
                                (e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  ) // Ensure value is a number
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <FormField
                    control={form.control}
                    name="topAttractions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Top Attractions</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Comma-separated (e.g., Kakum, Elmina Castle)"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  .split(",")
                                  .map((v) => v.trim())
                                  .filter(Boolean)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
{/* 
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Comma-separated (e.g., Beaches, History)"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  .split(",")
                                  .map((v) => v.trim())
                                  .filter(Boolean)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            min={0}
                            max={100}
                            step={0.1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Destination Image</FormLabel>
                        <FormControl>
                          <div className="grid gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                onChange(file);
                              }}
                              {...fieldProps}
                            />
                          </div>
                        </FormControl>

                        <FormLabel>
                          Upload one image of the destination
                        </FormLabel>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={isLoading || updating}>
                      {isLoading || updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Destination"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoadingDestination ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Coordinates
                    </th>
                    {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tags
                    </th> */}
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {destinations.map((destination: any) => (
                    <tr key={destination.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {destination.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {destination.region}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {destination.rating}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        [{destination.coordinates?.coordinates?.[1]},{" "}
                        {destination.coordinates?.coordinates?.[0]}]
                      </td>
                      {/* <td className="px-4 py-3 text-sm text-gray-500">
                        {destination.tags?.join(", ")}
                      </td> */}
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-primary-600 hover:text-primary-800"
                          onClick={() => {
                            setOpen(true);
                            setDestination(destination);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
