
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, User, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock login function for testing - in a real app, this would use Supabase auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For demo purposes, simulate login
    setTimeout(() => {
      // Predefined test users
      if (email === "admin@example.com" && password === "password") {
        // This would normally be handled by the AuthProvider after real auth
        toast.success("Logged in as Admin");
        navigate("/admin-dashboard");
      } else if (email === "manager@example.com" && password === "password") {
        toast.success("Logged in as Manager");
        navigate("/manager-dashboard");
      } else if (email === "caseworker@example.com" && password === "password") {
        toast.success("Logged in as Case Worker");
        navigate("/case-worker-dashboard");
      } else if (email === "viewer@example.com" && password === "password") {
        toast.success("Logged in as Viewer");
        navigate("/viewer-dashboard");
      } else {
        toast.error("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </span>
              )}
            </Button>
            <div className="text-sm text-center text-gray-500">
              <p>Demo accounts:</p>
              <p>admin@example.com / password</p>
              <p>manager@example.com / password</p>
              <p>caseworker@example.com / password</p>
              <p>viewer@example.com / password</p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
