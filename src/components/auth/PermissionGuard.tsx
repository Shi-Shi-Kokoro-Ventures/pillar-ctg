
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
}

/**
 * PermissionGuard component for fine-grained permission control within components
 * Use this to conditionally render UI elements based on user permissions
 */
const PermissionGuard = ({ 
  children, 
  permission, 
  fallback = null 
}: PermissionGuardProps) => {
  const { hasPermission } = useAuth();
  
  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default PermissionGuard;
