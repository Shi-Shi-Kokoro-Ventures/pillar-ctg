
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';

interface RoleBasedWrapperProps {
  children: ReactNode;
  allowedRoles?: string[];
  requiredPermission?: string;
  fallbackPath?: string;
  showDeniedMessage?: boolean;
}

const RoleBasedWrapper = ({
  children,
  allowedRoles = [],
  requiredPermission,
  fallbackPath = '/admin-dashboard',
  showDeniedMessage = true,
}: RoleBasedWrapperProps) => {
  const { user, isLoading, hasPermission, userRole, roleInfo } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-redcross"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  const hasRoleAccess = allowedRoles.length === 0 || (userRole && allowedRoles.includes(userRole));
  
  // Check permission-based access
  const hasPermissionAccess = !requiredPermission || hasPermission(requiredPermission);

  // If user doesn't have required role or permission
  if (!hasRoleAccess || !hasPermissionAccess) {
    // Option 1: Redirect to fallback path
    if (fallbackPath && !showDeniedMessage) {
      return <Navigate to={fallbackPath} replace />;
    }
    
    // Option 2: Show access denied message
    if (showDeniedMessage) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center px-4">
          <Shield className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 max-w-md mb-4">
            You don't have permission to access this area. 
            {roleInfo && (
              <span className="block mt-2">
                Your current role ({roleInfo.name}) doesn't have the required permissions.
              </span>
            )}
          </p>
          {fallbackPath && (
            <button 
              onClick={() => window.location.href = fallbackPath}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      );
    }
  }

  // If user has access, render the children
  return <>{children}</>;
};

export default RoleBasedWrapper;
