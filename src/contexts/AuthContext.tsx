
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasPermission: () => false,
  userRole: null,
  roleInfo: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

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
    if (!user || !userRole) return false;
    
    const rolePermissions = ROLE_DEFINITIONS[userRole];
    if (!rolePermissions) return false;
    
    const permissionObj = rolePermissions.permissions.find(p => p.name === permission);
    return permissionObj ? permissionObj.enabled : false;
  };

  const roleInfo = userRole ? ROLE_DEFINITIONS[userRole] : null;

  return (
    <AuthContext.Provider value={{ user, isLoading, hasPermission, userRole, roleInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
