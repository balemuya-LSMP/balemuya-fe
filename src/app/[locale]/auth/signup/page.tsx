/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [userType, setUserType] = useState("");
  const [entityType, setEntityType] = useState("");
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
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


  const handleGoogleSignUp = (e: any) => {
    e.preventDefault();;

    if (userType && entityType) {
      localStorage.setItem("userType", userType);
      localStorage.setItem("entityType", entityType)
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=552354262058-om4aifoqn3godt2jgdlfpgr7boihdi86.apps.googleusercontent.com&redirect_uri=${window.location.origin}/en/auth/google-callback&response_type=code&scope=email%20profile%20openid&access_type=offline&prompt=consent`
      window.location.href = url;
    } else {
      toast.error("Please select user type and entity type before signing up with Google.");
    }

  }

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
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, my: 6, position: "relative", overflow: "visible" }}>
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
              <TextField fullWidth label="User Name" {...register("user_name")} error={!!errors.user_name} helperText={errors.user_name?.message} margin="normal" variant="outlined"
              />
              <TextField fullWidth label="Email" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} margin="normal" />
              <PhoneInput international defaultCountry="ET" value={watch("phone_number")} onChange={(value) => setValue("phone_number", value ?? "")} className="mt-1 block w-full px-4 py-4 border border-gray-400 text-gray-600 rounded-md shadow-sm focus:outline-none" />
              <FormControl component="fieldset" fullWidth margin="normal">
                <InputLabel id="user_role_type">Role</InputLabel>
                <Select {...register("user_type")}
                  labelId="user_role_type"
                  label="Role"
                  variant="outlined"
                  value={watch("user_type") ?? ""}
                  onChange={(e) => setValue("user_type", e.target.value)} >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                </Select>

              </FormControl>
              <FormControl component="fieldset" fullWidth margin="normal">
                <InputLabel id="user_type_label">Register As</InputLabel>
                <Select {...register("entity_type")}
                  labelId="user_type_label"
                  label="Register As"
                  variant="outlined"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={20} color="#fff" /> : "Register"}
              </Button>
              {!showUserTypeSelection ? (
                <Button
                  onClick={() => setShowUserTypeSelection(true)}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 2, marginTop: 2 }}
                >
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/88/07/84/1000_F_388078454_mKtbdXYF9cyQovCCTsjqI0gbfu7gCcSp.jpg"
                    alt="Google Logo"
                    style={{ width: 20, marginRight: 10 }}
                  />

                  Sign Up with Google
                </Button>
              ) : (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                    {/* User Type Line */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1" sx={{ minWidth: 100 }}>
                        Please Select User Type:
                      </Typography>
                      <RadioGroup
                        row
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                        <FormControlLabel value="professional" control={<Radio />} label="Professional" />
                      </RadioGroup>
                    </Box>

                    {/* Entity Type Line */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1" sx={{ minWidth: 100 }}>
                        Please Select Entity Type:
                      </Typography>
                      <RadioGroup
                        row
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value)}
                      >
                        <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                        <FormControlLabel value="organization" control={<Radio />} label="Organization" />
                      </RadioGroup>
                    </Box>
                  </Box>
                  <Button
                    onClick={handleGoogleSignUp}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2, marginTop: 2 }}
                  >
                    <img
                      src="https://as1.ftcdn.net/v2/jpg/03/88/07/84/1000_F_388078454_mKtbdXYF9cyQovCCTsjqI0gbfu7gCcSp.jpg"
                      alt="Google Logo"
                      style={{ width: 20, marginRight: 10 }}
                    />
                    Continue with Google
                  </Button>
                </>
              )}
              <Typography variant="body2" align="center" mt={2}>
                Already have an account? <Link href="/auth/login">Login</Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Box>
      <ToastContainer position="top-center" />
    </>
  );
}
