export interface User {
  email: string;
  password: string;
  user_name: string;
  phone_number: string;
  user_type: string;
  entity_type: string;
  confirmPassword: string;
}
export interface UserResponse {
  id: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  user_type: string;
}

// types for  login page
export interface loginState {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  user_type: string;
  entity_type: string;
  access: string;
  refresh: string;
}

export interface loginResponse {
  message: string;
  user: UserData;
}

export interface Address {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
}
export interface ProfessionalRequest {
  id: string;
  professional: string;
  professional_name: string;
  status: string;
  admin_comment: string;
  created_at: string;
  updated_at: string;
}
export interface PaymentResponse {
  message: string;
  data: {
    payment_url: string;
    transaction_id: string;
  };
}
export interface SubscriptionPayload {
  plan_type: string;
  duration: number;
  amount: number;
  return_url: string;
}
export interface PaymentStatusResponse {
  message: string;
  data: {
    payment: {
      id: string;
      subscription_plan: {
        plan_type: string;
        duration: number;
        start_date: string;
        end_date: string;
      };
      professional: string;
      amount: string;
      payment_date: string;
      payment_status: string;
      payment_method: string;
      transaction_id: string;
    };
  };
  first_name: string;
  last_name: string;
  email: string;
  amount: number;
  currency: string;
}

export interface PaymentVerifyResponse {
  detail: string;
}
export interface WorkPostResponse {
  id: string;
  customer: string;
  category: string;
  description: string;
  location: Address;
  status: string;
  urgency: string;
  work_due_date: string;
  created_at: string;
  updated_at: string;
}

export interface WorkPost {
  title: string;
  category: string;
  description: string;
  status: string;
  work_due_date: string;
  location: {
    latitude?: number;
    longitude?: number;
  } | null;
}

export interface paymentInitiate {
  professional: string;
  amount: number;
  booking: string;
  return_url: string;
}
