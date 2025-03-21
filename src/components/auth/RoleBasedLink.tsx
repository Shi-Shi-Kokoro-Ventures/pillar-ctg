
import React, { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: ReactNode;
  allowedRoles?: string[];
  requiredPermission?: string;
  hide?: boolean;
}

/**
 * RoleBasedLink component for navigation elements that respect role-based access
 * Either hides the link or disables it based on user permissions
 */
const RoleBasedLink = ({
  to,
  children,
  allowedRoles = [],
  requiredPermission,
  hide = false,
  ...rest
}: RoleBasedLinkProps) => {
  const { hasRole, hasPermission } = useAuth();
  
  const hasAccess = (
    (allowedRoles.length === 0 || hasRole(allowedRoles)) &&
    (!requiredPermission || hasPermission(requiredPermission))
  );
  
  if (!hasAccess && hide) {
    return null;
  }
  
  if (!hasAccess) {
    return (
      <span 
        className="cursor-not-allowed opacity-50"
        title="You don't have permission to access this area"
        {...rest}
      >
        {children}
      </span>
    );
  }
  
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default RoleBasedLink;
