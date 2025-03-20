
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'manager' | 'case-worker' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  last_login?: string;
}

export interface UserFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'manager' | 'case-worker' | 'viewer';
  password?: string; // Only for creating new users
}
