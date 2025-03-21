
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, ROLE_DEFINITIONS } from '@/types/user';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  userRole: string | null;
  roleInfo: typeof ROLE_DEFINITIONS[keyof typeof ROLE_DEFINITIONS] | null;
  hasRole: (roles: string | string[]) => boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasPermission: () => false,
  userRole: null,
  roleInfo: null,
  hasRole: () => false,
  logout: async () => {},
  login: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check for a stored role in localStorage for persisting role between page refreshes
    const storedRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('user');
    
    if (storedUser && storedRole) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserRole(storedRole);
    }
    
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

  // Mock login function for testing different roles
  const login = async (email: string, password: string, role: string): Promise<void> => {
    // For demo purposes, we'll accept any login credentials and just use the selected role
    try {
      // Mock user
      const mockUser: User = {
        id: `mock-${role}-id`,
        email: email,
        firstName: role.charAt(0).toUpperCase() + role.slice(1),
        lastName: 'User',
        role: role,
        status: 'active',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };
      
      setUser(mockUser);
      setUserRole(role);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('userRole', role);
      
      // In a real app, we would use Supabase auth
      /*
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      */
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed');
      throw error;
    }
  };

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user || !userRole) return false;
    
    const rolePermissions = ROLE_DEFINITIONS[userRole];
    if (!rolePermissions) return false;
    
    const permissionObj = rolePermissions.permissions.find(p => p.name === permission);
    return permissionObj ? permissionObj.enabled : false;
  };

  // Check if user has one of the specified roles
  const hasRole = (roles: string | string[]): boolean => {
    if (!userRole) return false;
    
    if (typeof roles === 'string') {
      return userRole === roles;
    }
    
    return roles.includes(userRole);
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
      
      // Remove from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to log out');
    }
  };

  const roleInfo = userRole ? ROLE_DEFINITIONS[userRole] : null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      hasPermission, 
      userRole, 
      roleInfo,
      hasRole,
      logout,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
};
