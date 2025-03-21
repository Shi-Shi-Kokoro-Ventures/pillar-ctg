
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_DEFINITIONS } from '@/types/user';

/**
 * Custom hook for centralized role and permission checks
 * Provides consistent interface for checking permissions throughout the application
 */
export function useRolePermissions() {
  const { userRole, hasPermission: authHasPermission, hasRole: authHasRole } = useAuth();
  
  // Get all permissions for the current user role
  const getAllPermissions = () => {
    if (!userRole) return [];
    
    const roleInfo = ROLE_DEFINITIONS[userRole];
    if (!roleInfo) return [];
    
    return roleInfo.permissions
      .filter(p => p.enabled)
      .map(p => p.name);
  };
  
  // Check if user can access a specific feature
  const canAccess = (feature: string): boolean => {
    const featurePermissions = {
      'user-management': ['manage_users'],
      'application-management': ['manage_applications'],
      'reports': ['access_reports'],
      'settings': ['manage_settings'],
      'case-assignment': ['assign_cases'],
      'resource-management': ['manage_resources'],
      'audit-logs': ['view_audit_logs'],
    };
    
    const requiredPermissions = featurePermissions[feature as keyof typeof featurePermissions];
    if (!requiredPermissions) return false;
    
    return requiredPermissions.some(permission => authHasPermission(permission));
  };
  
  // Get user's role display name
  const getRoleDisplayName = (): string => {
    if (!userRole) return 'Unknown';
    
    const roleInfo = ROLE_DEFINITIONS[userRole];
    return roleInfo ? roleInfo.name : userRole;
  };
  
  return {
    hasPermission: authHasPermission,
    hasRole: authHasRole,
    getAllPermissions,
    canAccess,
    getRoleDisplayName,
  };
}
