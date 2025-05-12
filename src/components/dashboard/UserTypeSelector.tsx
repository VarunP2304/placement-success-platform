
import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = async () => {
    if (selectedType) {
      try {
        setIsLoading(true);
        // Use selected type as username and a fixed password for this demo
        const response = await authService.login(selectedType, "password123");
        
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
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Login failed",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to PlaceSuccess</h1>
        <p className="mt-2 text-muted-foreground">
          Select your role to continue to your dashboard
        </p>
      </div>

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
          disabled={!selectedType || isLoading}
          className="px-8"
        >
          {isLoading ? "Logging in..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
