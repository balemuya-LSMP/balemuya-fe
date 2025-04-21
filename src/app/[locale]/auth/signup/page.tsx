/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/store/usetSchema";
import { useRegisterUserMutation } from "@/store/api/auth.api";
import { User } from "@/store/types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useRouter } from "@/i18n/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, IconButton, Typography, Container, Paper, Box } from "@mui/material";
import Header from "../../(features)/_components/header";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isPasswordMatch = password === confirmPassword;

  const onSubmit = async (data: User) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful please verify your email");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Container component="main" maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, my: 6, position: "relative", overflow: "visible" }}>
            <Box
              sx={{
                position: "absolute",
                top: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 60,
                backgroundColor: "white", // Optional, to match the background
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3, // Adds shadow effect
              }}
            >
              <img
                src="/images/logo.jpg"
                alt="Logo"
                width={55}
                height={55}
                style={{ borderRadius: "50%" }}
              />
            </Box>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField fullWidth label="User Name" {...register("user_name")} error={!!errors.user_name} helperText={errors.user_name?.message} margin="normal" />
              <TextField fullWidth label="Email" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal" />
              <PhoneInput international defaultCountry="ET" value={watch("phone_number")} onChange={(value) => setValue("phone_number", value ?? "")} className="mt-1 block w-full px-4 py-2 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600" />
              <FormControl component="fieldset" fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select {...register("user_type")}
                  value={watch("user_type") ?? ""}
                  onChange={(e) => setValue("user_type", e.target.value)} >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                </Select>

              </FormControl>
              <FormControl component="fieldset" fullWidth margin="normal">
                <InputLabel>Register As</InputLabel>
                <Select {...register("entity_type")}
                  value={watch("entity_type") ?? ""}
                  onChange={(e) => setValue("entity_type", e.target.value)} >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                </Select>

              </FormControl>
              <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} {...register("password")} error={!!errors.password} helperText={errors.password?.message} margin="normal" InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                ),
              }} />
              <TextField fullWidth label="Confirm Password" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} error={!isPasswordMatch} helperText={!isPasswordMatch ? "Passwords do not match" : ""} margin="normal" InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                ),
              }} />
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={isLoading}>
                {isLoading ? <ClipLoader size={20} color="#fff" /> : "Register"}
              </Button>
              <Typography variant="body2" align="center" mt={2}>
                Already have an account? <Link href="/auth/login">Login</Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
}
