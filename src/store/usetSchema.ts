import { z } from "zod";

export const UserSchema = z.object({
  user_name: z.string().min(2, "user name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number should be at least 10 digits"),
  user_type: z.enum(["customer", "professional"], {
    errorMap: () => ({ message: "Please select a user type" }),
  }),
  entity_type: z.enum(["individual", "organization"], {
    errorMap: () => ({ message: "Please select a user type" }),
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
