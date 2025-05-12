
import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, validateUsername } from "@/lib/utils";
import { authService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import UsernameFormatHelp from "./UsernameFormatHelp";

type UserType = "student" | "placement" | "employer" | "admin";

interface UserTypeOption {
  type: UserType;
  title: string;
  description: string;
  dashboardPath: string;
}

const userTypes: UserTypeOption[] = [
  {
    type: "student",
    title: "Student",
    description: "Access your profile, applications, and resources",
    dashboardPath: "/student-dashboard",
  },
  {
    type: "placement",
    title: "Placement Department",
    description: "Manage drives, students, and employers",
    dashboardPath: "/placement-dashboard",
  },
  {
    type: "employer",
    title: "Employer",
    description: "Post jobs, manage applications, and find talent",
    dashboardPath: "/employer-dashboard",
  },
  {
    type: "admin",
    title: "System Administrator",
    description: "Manage users, permissions, and system settings",
    dashboardPath: "/admin-dashboard",
  },
];

export default function UserTypeSelector() {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create schema based on selected user type
  const createFormSchema = (selectedType: UserType | null) => {
    return z.object({
      username: z
        .string()
        .min(1, "Username is required")
        .refine(
          (val) => selectedType ? validateUsername(val, selectedType) : true, 
          { message: "Invalid username format" }
        ),
      password: z.string().min(1, "Password is required"),
    });
  };

  const form = useForm<z.infer<ReturnType<typeof createFormSchema>>>({
    resolver: zodResolver(createFormSchema(selectedType)),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleContinue = () => {
    if (selectedType) {
      setShowLoginForm(true);
    }
  };

  const checkServerConnection = async () => {
    try {
      // For demonstration purposes, we'll simulate a server check
      // In a real app, you might do a simple ping to your server
      await fetch("http://localhost:5000/api/health", { method: "HEAD" })
        .then(() => setServerError(false))
        .catch(() => {
          setServerError(true);
          throw new Error("Backend server not running");
        });
      return true;
    } catch (error) {
      setServerError(true);
      return false;
    }
  };

  const handleLogin = async (values: z.infer<ReturnType<typeof createFormSchema>>) => {
    if (selectedType) {
      try {
        setIsLoading(true);
        
        // Check if server is running first
        const isServerRunning = await checkServerConnection();
        
        if (!isServerRunning) {
          toast({
            title: "Server connection error",
            description: "Cannot connect to backend server. Is it running?",
            variant: "destructive",
          });
          return;
        }
        
        const response = await authService.login(values.username, values.password, selectedType);
        
        if (response.success) {
          // Store token and user in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Show success toast
          toast({
            title: "Login successful",
            description: `Welcome back, ${response.data.user.name}`,
          });
          
          // Navigate to dashboard
          const selected = userTypes.find((type) => type.type === selectedType);
          if (selected) {
            navigate(selected.dashboardPath);
          }
        }
      } catch (error: any) {
        console.error("Login error:", error);
        const errorMessage = error.response?.data?.message || 
          (error.code === "ERR_NETWORK" 
            ? "Cannot connect to the backend server. Please make sure it's running." 
            : "Login failed. Please try again later.");
            
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const goBack = () => {
    setShowLoginForm(false);
    form.reset();
    setServerError(false);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to PlaceSuccess</h1>
        <p className="mt-2 text-muted-foreground">
          {showLoginForm 
            ? `Login as ${selectedType?.charAt(0).toUpperCase()}${selectedType?.slice(1)}` 
            : "Select your role to continue to your dashboard"}
        </p>
      </div>

      {!showLoginForm ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {userTypes.map((type) => (
              <Card
                key={type.type}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary",
                  selectedType === type.type && "border-primary bg-primary/5"
                )}
                onClick={() => setSelectedType(type.type)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    <div className="flex items-center justify-between">
                      <span>{type.title}</span>
                      {selectedType === type.type && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{type.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedType}
              className="px-8"
            >
              Continue
            </Button>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormDescription className="flex items-center space-x-1">
                          <span>
                            {selectedType && `For demo, use valid format like ${
                              selectedType === "student" ? "4SF22CI001" : 
                              selectedType === "placement" ? "FA001" : 
                              selectedType === "employer" ? "CA001" : "SA001"
                            }`}
                          </span>
                          <UsernameFormatHelp userType={selectedType as "student" | "placement" | "employer" | "admin"} />
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          For demo, use "password123"
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {serverError && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      <p>Cannot connect to backend server. Please make sure the server is running on http://localhost:5000</p>
                      <p className="mt-1 font-medium">Run this command in the server directory: npm run dev</p>
                    </div>
                  )}
                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={goBack} 
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-sm text-muted-foreground">
                Note: For demo, use password "password123" with any valid username format
              </p>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
