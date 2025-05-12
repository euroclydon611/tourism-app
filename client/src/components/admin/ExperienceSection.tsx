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
  useAddExperienceMutation,
  useUpdateExperienceMutation,
} from "@/redux/features/adminApi";
import { useGetAllExperiencesQuery } from "@/redux/features/app";

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  duration: z.string().min(1, "Duration must be at least 1 hour"),
  imageUrl: z.custom<File>((val) => val instanceof File, {
    message: "Image file is required",
  }),
});
type ExperienceFormValues = z.infer<typeof experienceSchema>;
import React from "react";

export default function ExperienceSection({ employee }: any) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [experience, setExperience] = useState<any>(null);

  console.log("experience", experience);

  const {
    data: destinationsData,
    isLoading: isLoadingDestination,
    refetch,
  } = useGetAllExperiencesQuery({ page, limit, search: searchQuery });

  const { toast } = useToast();

  const destinations = destinationsData?.data || [];

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      location: "",
      price: 0,
      duration: "",
      imageUrl: undefined, // Will be set via file input
    },
  });

  const [createExperience, { isSuccess, isLoading, error }] =
    useAddExperienceMutation();

  const [
    updateExperience,
    { isSuccess: updated, isLoading: updating, error: updateError },
  ] = useUpdateExperienceMutation();

  useEffect(() => {
    if (experience) {
      form.setValue("title", experience.title || "");
      form.setValue("category", experience.category || "");
      form.setValue("description", experience.description || "");
      form.setValue("location", experience.location || "");
      form.setValue("price", experience.price || 0);
      form.setValue("duration", experience.duration || "");
      // Skip setting imageUrl unless you're using a preview system
    }
  }, [experience, form]);
  const onSubmit = (data: ExperienceFormValues) => {
    console.log("Editing experience:", experience); // Check if editing or creating

    const formData = new FormData();

    // Append scalar fields
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("price", data.price.toString());
    formData.append("duration", data.duration.toString());

    // Image file
    if (data.imageUrl && data.imageUrl instanceof File) {
      formData.append("imageUrl", data.imageUrl);
    }

    // Check if experience exists for update
    if (experience) {
      console.log("Updating experience with ID:", experience._id);
      formData.append("id", experience._id); // Optional if your API expects it
      updateExperience({ formData, id: experience._id }); // Call your mutation or API
    } else {
      console.log("Creating new experience");
      createExperience(formData); // Call your mutation or API
    }
  };

  useEffect(() => {
    if (isSuccess || updated) {
      toast({
        title: "Destination Saved",
        description: "The destination has been saved successfully.",
      });
      setOpen(false);
      setExperience(null);
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
            <h2 className="text-lg font-semibold text-gray-900">Experiences</h2>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center">
                <PlusCircle className="mr-1 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Experience</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Experience title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Adventure, Cultural"
                            {...field}
                          />
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
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Aburi, Volta Region"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (GHS)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="Enter price"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            min={1}
                            placeholder="e.g., 3"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
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
                        <FormLabel>Experience Image</FormLabel>
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
                          Upload one image for the experience
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
                        "Submit Experience"
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
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {destinations.map((destination: any) => (
                    <tr key={destination.id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {destination.title}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {destination.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {destination.location}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {destination?.price?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-primary-600 hover:text-primary-800"
                          onClick={() => {
                            setOpen(true);
                            setExperience(destination);
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
