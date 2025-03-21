
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'manager' | 'case-worker' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  last_login?: string;
  avatarUrl?: string;
  created_by?: string;
  created_by_email?: string;
}

export interface UserFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'manager' | 'case-worker' | 'viewer';
  password?: string; // Only for creating new users
  avatarUrl?: string;
}

export interface RolePermissions {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
  description: string;
  enabled: boolean;
}

export const ROLE_DEFINITIONS: Record<string, RolePermissions> = {
  'admin': {
    name: 'Administrator',
    description: 'Full system access with user management capabilities',
    permissions: [
      { name: 'manage_users', description: 'Create, edit, and deactivate users', enabled: true },
      { name: 'manage_applications', description: 'Process all applications in the system', enabled: true },
      { name: 'access_reports', description: 'Access and generate all system reports', enabled: true },
      { name: 'manage_settings', description: 'Configure system-wide settings', enabled: true },
      { name: 'assign_cases', description: 'Assign cases to case workers', enabled: true },
      { name: 'manage_resources', description: 'Manage system resources and programs', enabled: true },
      { name: 'view_audit_logs', description: 'View system audit logs', enabled: true },
    ]
  },
  'manager': {
    name: 'Manager',
    description: 'Department-level access with limited administrative capabilities',
    permissions: [
      { name: 'manage_users', description: 'Create and edit non-admin users', enabled: true },
      { name: 'manage_applications', description: 'Process all applications in their department', enabled: true },
      { name: 'access_reports', description: 'Access departmental reports', enabled: true },
      { name: 'manage_settings', description: 'Configure department-specific settings', enabled: true },
      { name: 'assign_cases', description: 'Assign cases to case workers', enabled: true },
      { name: 'manage_resources', description: 'Manage departmental resources', enabled: true },
      { name: 'view_audit_logs', description: 'View departmental audit logs', enabled: true },
    ]
  },
  'case-worker': {
    name: 'Case Worker',
    description: 'Case-specific access for direct client assistance',
    permissions: [
      { name: 'manage_users', description: 'Create and edit non-admin users', enabled: false },
      { name: 'manage_applications', description: 'Process assigned applications only', enabled: true },
      { name: 'access_reports', description: 'Access basic case reports', enabled: true },
      { name: 'manage_settings', description: 'Configure department-specific settings', enabled: false },
      { name: 'assign_cases', description: 'Assign cases to case workers', enabled: false },
      { name: 'manage_resources', description: 'Access and refer to resources', enabled: true },
      { name: 'view_audit_logs', description: 'View own activity logs', enabled: true },
    ]
  },
  'viewer': {
    name: 'View-Only',
    description: 'Read-only access to specified system areas',
    permissions: [
      { name: 'manage_users', description: 'Create and edit non-admin users', enabled: false },
      { name: 'manage_applications', description: 'View applications only', enabled: false },
      { name: 'access_reports', description: 'View basic reports only', enabled: true },
      { name: 'manage_settings', description: 'Configure department-specific settings', enabled: false },
      { name: 'assign_cases', description: 'Assign cases to case workers', enabled: false },
      { name: 'manage_resources', description: 'View available resources', enabled: true },
      { name: 'view_audit_logs', description: 'No access to audit logs', enabled: false },
    ]
  }
};
