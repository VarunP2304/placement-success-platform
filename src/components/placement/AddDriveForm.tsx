
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { placementService } from "@/services/api";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  position: z.string().min(2, "Position is required"),
  driveDate: z.string().min(1, "Drive date is required"),
  registrationDeadline: z.string().min(1, "Registration deadline is required"),
  location: z.string().min(2, "Location is required"),
  eligibility: z.string().min(5, "Eligibility criteria is required"),
  roles: z.string().min(2, "Roles are required"),
  package: z.string().min(2, "Package details are required"),
  status: z.enum(["Upcoming", "Ongoing", "Completed"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddDriveForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      title: "",
      position: "",
      driveDate: new Date().toISOString().split("T")[0],
      registrationDeadline: new Date().toISOString().split("T")[0],
      location: "Campus",
      eligibility: "",
      roles: "",
      package: "",
      status: "Upcoming",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      const response = await placementService.addDrive(data);
      
      if (response.success) {
        toast.success("Placement drive added successfully");
        // Invalidate and refetch drives query
        queryClient.invalidateQueries({ queryKey: ["drives"] });
        form.reset();
        onSuccess();
      } else {
        toast.error("Failed to add placement drive");
      }
    } catch (error) {
      console.error("Error adding drive:", error);
      toast.error("An error occurred while adding the placement drive");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drive Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Engineer Recruitment 2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="driveDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drive Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Deadline</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Campus">Campus</SelectItem>
                    <SelectItem value="Virtual">Virtual</SelectItem>
                    <SelectItem value="Offsite">Offsite</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Roles Offered</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Engineer, Data Scientist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package</FormLabel>
              <FormControl>
                <Input placeholder="e.g. ₹18-24 LPA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eligibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eligibility Criteria</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g. CGPA ≥ 8.0, No backlogs, B.Tech/M.Tech in CS/IT" 
                  className="min-h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Calendar className="mr-2 h-4 w-4" />
          {isSubmitting ? "Adding..." : "Add Placement Drive"}
        </Button>
      </form>
    </Form>
  );
}
