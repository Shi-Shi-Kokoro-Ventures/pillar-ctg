
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
