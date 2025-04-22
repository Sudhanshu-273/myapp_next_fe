"use client"

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
import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submitRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", {
        email: loginData.email,
        password: loginData.password,
        confirmPassword: loginData.confirmPassword
      });

      console.log("Registration successful:", res.data);
      toast.success("Registered successfully!");
      router.push("/login")
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };


  useEffect(() => {
  }, [loginData])

  useEffect(() => {

  }, [])

  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#f5f5f5' }}
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
          <form onSubmit={submitRegister}>
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={600} textAlign="center">
              Create an Account
            </Typography>

            <TextField onChange={(e) => {
              setLoginData({
                ...loginData,
                email: e.target.value
              })
            }} label="Email" type="email" fullWidth />
            <TextField onChange={(e) => {
              setLoginData({
                ...loginData,
                password: e.target.value
              })
            }} label="Password" type="password" fullWidth />
            <TextField onChange={(e) => {
              setLoginData({
                ...loginData,
                confirmPassword: e.target.value
              })
            }} label="Confirm Password" type="password" fullWidth />

            <Button type='submit' variant="contained" fullWidth size="large">
              Register
            </Button>

            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <MuiLink component={Link} href="/login" underline="hover">
                Login
              </MuiLink>
            </Typography>
          </Stack>
            </form>
        </Paper>
      </Box>
    </>
  );
}