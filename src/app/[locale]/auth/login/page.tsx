/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuth } from "@/contexts/authContext";
import {
  useGoogleLoginMutation,
  useLoginUserMutation,
} from "@/store/api/auth.api";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, Link } from "@/i18n/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { TextField, Button, RadioGroup, FormControlLabel, Radio, IconButton, Typography, Container, Paper, Box } from "@mui/material";
import Header from "../../(features)/_components/header";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      login(response);
      toast.success("Login successful");
      if (response.user.user_type == "admin") {
        router.push("/admin/dashboard");
      } else if (response.user.user_type == "customer") {
        router.push("/customer");
      } else if (response.user.user_type == "professional") {
        router.push("/professional");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    if (userType === "customer" || userType === "professional") {
      const state = encodeURIComponent(JSON.stringify({ user_type: userType }));

      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=552354262058-om4aifoqn3godt2jgdlfpgr7boihdi86.apps.googleusercontent.com&redirect_uri=${window.location.origin}/auth/google-callback/&response_type=code&scope=email%20profile&state=${state}&access_type=offline&prompt=consent`;

      window.location.href = url;
    } else {
      toast.error("Please select a user type (Customer or Professional) before signing in with Google.");
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, my: 6, position: "relative", overflow: "visible", maxWidth: "md", display: 'flex' }}>
          <Box
            sx={{
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 60,
              height: 60,
              backgroundColor: "white", 
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3, 
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
          {/* Left Section - Login Form */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Login
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  required
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                sx={{ marginBottom: 2 }}
              >
                {isLoading ? <ClipLoader color="#ffffff" loading={isLoading} size={25} /> : "Login"}
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                  <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                  <FormControlLabel value="professional" control={<Radio />} label="Professional" />
                </RadioGroup>
              </Box>
            </form>
            <Button
              onClick={handleGoogleSignIn}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              <img src="https://as1.ftcdn.net/v2/jpg/03/88/07/84/1000_F_388078454_mKtbdXYF9cyQovCCTsjqI0gbfu7gCcSp.jpg" alt="Google Logo" style={{ width: 20, marginRight: 10 }} />
              Sign in with Google
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Not Registered?{" "}
                <Link href="/auth/signup" style={{ textDecoration: 'underline', color: '#6200EE' }}>
                  Signup
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Right Section - Welcome Text */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' }, pl: 6, textAlign: 'left' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', marginBottom: 2 }}>
              Welcome to Balemuya
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Connecting professionals and customers effortlessly, Balemuya is your go-to platform for finding skilled experts or offering your services. Whether you&apos;re looking to hire professionals for specific tasks or showcase your expertise, our app simplifies the process with secure, reliable, and fast solutions.
            </Typography>
          </Box>
        </Paper>
      </Box>
      <ToastContainer position="top-center" />
    </>
  );
}
