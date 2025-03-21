
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ROLE_DEFINITIONS } from '@/types/user';
import { Check, X, Shield, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RolePermissionsInfoProps {
  selectedRole: string;
}

const RolePermissionsInfo = ({ selectedRole }: RolePermissionsInfoProps) => {
  const roleInfo = ROLE_DEFINITIONS[selectedRole];

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

  return (
    <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-gray-900">{roleInfo.name}</h3>
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
              {roleInfo.permissions.map((permission) => (
                <li key={permission.name} className="flex items-start">
                  {permission.enabled ? (
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {permission.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RolePermissionsInfo;
