
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

/**
 * RoleGuard component for role-based UI element rendering
 * Use this to conditionally render UI elements based on user roles
 */
const RoleGuard = ({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleGuardProps) => {
  const { hasRole } = useAuth();
  
  if (!hasRole(allowedRoles)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default RoleGuard;
