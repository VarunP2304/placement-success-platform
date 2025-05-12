
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
import { cn } from "@/lib/utils";
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

type UserType = "student" | "placement" | "employer" | "admin";

interface UserTypeOption {
  type: UserType;
  title: string;
  description: string;
  dashboardPath: string;
  usernamePattern: {
    regex: RegExp;
    hint: string;
  };
}

const userTypes: UserTypeOption[] = [
  {
    type: "student",
    title: "Student",
    description: "Access your profile, applications, and resources",
    dashboardPath: "/student-dashboard",
    usernamePattern: {
      regex: /^4SF22(CI|IS|ME|RA|CS|CD)[0-9]{3}$/,
      hint: "Format: 4SF22CI123 (where CI can be IS, ME, RA, CS, or CD)",
    },
  },
  {
    type: "placement",
    title: "Placement Department",
    description: "Manage drives, students, and employers",
    dashboardPath: "/placement-dashboard",
    usernamePattern: {
      regex: /^FA[0-9]{3}$/,
      hint: "Format: FA123 (where 123 is a 3-digit number)",
    },
  },
  {
    type: "employer",
    title: "Employer",
    description: "Post jobs, manage applications, and find talent",
    dashboardPath: "/employer-dashboard",
    usernamePattern: {
      regex: /^CA[0-9]{3}$/,
      hint: "Format: CA123 (where 123 is a 3-digit number)",
    },
  },
  {
    type: "admin",
    title: "System Administrator",
    description: "Manage users, permissions, and system settings",
    dashboardPath: "/admin-dashboard",
    usernamePattern: {
      regex: /^SA[0-9]{3}$/,
      hint: "Format: SA123 (where 123 is a 3-digit number)",
    },
  },
];

export default function UserTypeSelector() {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create schema based on selected user type
  const createFormSchema = (selectedType: UserType | null) => {
    const selectedUserType = userTypes.find((type) => type.type === selectedType);
    
    return z.object({
      username: z
        .string()
        .min(1, "Username is required")
        .refine(
          (val) => selectedUserType ? selectedUserType.usernamePattern.regex.test(val) : true, 
          { message: selectedUserType ? `Invalid format. ${selectedUserType.usernamePattern.hint}` : "Invalid username" }
        ),
      password: z.string().min(6, "Password must be at least 6 characters"),
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

  const handleLogin = async (values: z.infer<ReturnType<typeof createFormSchema>>) => {
    if (selectedType) {
      try {
        setIsLoading(true);
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
        toast({
          title: "Login failed",
          description: error.response?.data?.message || "Please try again later",
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
                        <FormDescription>
                          {selectedType && userTypes.find(type => type.type === selectedType)?.usernamePattern.hint}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
