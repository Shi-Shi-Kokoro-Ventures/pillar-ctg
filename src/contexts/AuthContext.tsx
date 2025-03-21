
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, ROLE_DEFINITIONS } from '@/types/user';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  userRole: string | null;
  perspectiveRole: string | null; // Add perspectiveRole to context
  setPerspectiveRole: (role: string | null) => void; // Add setter for perspectiveRole
  roleInfo: typeof ROLE_DEFINITIONS[keyof typeof ROLE_DEFINITIONS] | null;
  hasRole: (roles: string | string[], checkRole?: string | null) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasPermission: () => false,
  userRole: null,
  perspectiveRole: null,
  setPerspectiveRole: () => {},
  roleInfo: null,
  hasRole: () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [perspectiveRole, setPerspectiveRole] = useState<string | null>(null);

  // For demo purposes - in a real app this would come from the backend
  useEffect(() => {
    // Mock user authentication
    const mockUser: User = {
      id: 'current-admin-id',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'active',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setUserRole(mockUser.role);
    setPerspectiveRole(mockUser.role); // Initialize perspective role with user role
    setIsLoading(false);
    
    // In a real implementation, we would use Supabase auth
    /*
    const fetchUser = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (sessionData?.session) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();
            
          if (userError) {
            throw userError;
          }
          
          setUser(userData);
          setUserRole(userData.role);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to authenticate user');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          fetchUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserRole(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
    */
  }, []);

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Use perspective role if available, otherwise use actual role
    const roleToUse = perspectiveRole || userRole;
    if (!roleToUse) return false;
    
    const rolePermissions = ROLE_DEFINITIONS[roleToUse as keyof typeof ROLE_DEFINITIONS];
    if (!rolePermissions) return false;
    
    const permissionObj = rolePermissions.permissions.find(p => p.name === permission);
    return permissionObj ? permissionObj.enabled : false;
  };

  // Check if user has one of the specified roles
  const hasRole = (roles: string | string[], checkRole?: string | null): boolean => {
    // Determine which role to check against
    const roleToCheck = checkRole || perspectiveRole || userRole;
    
    if (!roleToCheck) return false;
    
    if (typeof roles === 'string') {
      return roleToCheck === roles;
    }
    
    return roles.includes(roleToCheck);
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // In a real app, we would use Supabase auth
      /*
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      */
      
      // For demo - just clear the user state
      setUser(null);
      setUserRole(null);
      setPerspectiveRole(null); // Clear perspective role on logout
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to log out');
    }
  };

  // Use perspective role for roleInfo if available, otherwise use actual role
  const roleToUse = perspectiveRole || userRole;
  const roleInfo = roleToUse ? ROLE_DEFINITIONS[roleToUse as keyof typeof ROLE_DEFINITIONS] : null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      hasPermission, 
      userRole, 
      perspectiveRole,
      setPerspectiveRole,
      roleInfo,
      hasRole,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
