
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
  respectPerspective?: boolean; // New prop to check if we should respect perspective role
}

/**
 * RoleGuard component for role-based UI element rendering
 * Use this to conditionally render UI elements based on user roles
 */
const RoleGuard = ({ 
  children, 
  allowedRoles, 
  fallback = null,
  respectPerspective = true // Default to respecting perspective
}: RoleGuardProps) => {
  const { hasRole, perspectiveRole, userRole } = useAuth();
  
  // Check if we should use the perspective role for checking
  const roleToCheck = (respectPerspective && perspectiveRole) || undefined;
  
  if (!hasRole(allowedRoles, roleToCheck)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default RoleGuard;
