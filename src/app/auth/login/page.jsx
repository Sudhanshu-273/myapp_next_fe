'use client';

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "@/context/UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import ChangePassword from '@/components/Modals/ChangePassword';

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    console.log(e.key)
    if (e.key === "Enter") {
      submitLogin(e);
    }
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const loadingToast = toast.loading("Logging In...");
    try {
      const res = await axios.post("/api/auth/login", loginData);
      console.log("Submit Info", res.data);
      setUser({
        ...user,
        user_data: res.data.data,
        token: res.data.token,
      });
      localStorage.setItem("curr_user", JSON.stringify(res.data));
      toast.remove(loadingToast);
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Error during login:", error);

    }
  };

  useEffect(() => {
    console.log("User logged in : ", user);
  }, [user]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#f5f5f5' }}
      onKeyDown={handleKeyDown}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
        }}
      >

        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600} textAlign="center">
            Welcome Back
          </Typography>

          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={loginData.email}
            onChange={handleInputChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={loginData.password}
            onChange={handleInputChange}
          />

          <Typography
            variant="body2"
            textAlign="right"
            sx={{ cursor: 'pointer', color: 'primary.main' }}
            onClick={() => setModalOpen(true)}
          >
            Forgot Password?
          </Typography>

          <Button onClick={(e) => submitLogin(e)} variant="contained" fullWidth size="large">
            Login
          </Button>

          <Typography variant="body2" textAlign="center">
            Don't have an account?{" "}
            <MuiLink component={Link} href="/auth/register" underline="hover">
              Register
            </MuiLink>
          </Typography>
        </Stack>
          
      </Paper>

      <ChangePassword open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}
