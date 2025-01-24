
export interface User {
    email: string;
    password: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    gender: string;
    user_type: string;
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

export interface loginResponse {
  message: string;
  user: {
    id: string;
    access: string;
    refresh: string;
    email: string;
    user_type: string
 }
}


export interface Address {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
}
