
export interface EmergencyContactInfo {
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface HouseholdMember {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  ssn?: string;
  income?: number;
  incomePeriod?: 'weekly' | 'biweekly' | 'monthly' | 'annually';
  incomeSource?: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  ssn?: string;
  householdMembers: HouseholdMember[];
  emergencyContact: EmergencyContactInfo;
  assistanceTypes: string[];
  created_at: string;
  status: 'pending' | 'approved' | 'denied' | 'in-review';
}
