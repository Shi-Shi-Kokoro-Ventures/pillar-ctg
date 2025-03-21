
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ROLE_DEFINITIONS } from '@/types/user';
import { Check, X, Shield, Info, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface RolePermissionsInfoProps {
  selectedRole: string;
  showComparison?: boolean;
}

const RolePermissionsInfo = ({ selectedRole, showComparison = false }: RolePermissionsInfoProps) => {
  const { userRole } = useAuth();
  const roleInfo = ROLE_DEFINITIONS[selectedRole];
  const currentUserRoleInfo = userRole ? ROLE_DEFINITIONS[userRole] : null;

  if (!roleInfo) {
    return (
      <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
        <div className="flex items-center text-gray-600">
          <Info className="h-5 w-5 mr-2" />
          <p>Role information not available</p>
        </div>
      </div>
    );
  }

  // Compare selected role with current user role
  const isHigherRole = showComparison && userRole && 
    roleInfo.permissions.filter(p => p.enabled).length > 
    (currentUserRoleInfo?.permissions.filter(p => p.enabled).length || 0);

  return (
    <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-gray-900">{roleInfo.name}</h3>
          
          {showComparison && isHigherRole && (
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Higher privileges than your role
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{roleInfo.description}</p>
      </div>
      
      <Accordion type="single" collapsible className="bg-white">
        <AccordionItem value="permissions">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50">
            View Detailed Permissions
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <p className="text-xs text-gray-500 mb-3">
              The following permissions will be granted to this user
            </p>
            <ul className="space-y-2">
              {roleInfo.permissions.map((permission) => {
                // Compare with current user's permission if showing comparison
                const currentUserHasPermission = showComparison && currentUserRoleInfo?.permissions.find(
                  p => p.name === permission.name
                )?.enabled;
                
                const isHigherPermission = showComparison && permission.enabled && !currentUserHasPermission;
                
                return (
                  <li key={permission.name} className="flex items-start">
                    {permission.enabled ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${isHigherPermission ? 'text-yellow-700' : 'text-gray-900'}`}>
                        {permission.description}
                        {isHigherPermission && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            You don't have this
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RolePermissionsInfo;
