import { z } from "zod";

export const UserSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(10, "Phone number should be at least 10 digits"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  user_type: z.enum(["customer", "professional"]),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
