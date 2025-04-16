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
import { useEffect, useState } from 'react';

export default function LoginPage() {

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL
  // console.log(API_URL);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submitLogin = async () => {
    console.log(loginData);
    const res = await axios.post("/api/auth/login", {
      email: loginData.email,
      password: loginData.password
    });
    console.log(res);
  }

  useEffect(() => {
    console.log(loginData);
    // submitRegister();
  }, [loginData])

  useEffect(() => {

  }, [])

  // const submitLogin = async () => {
  //   const res = await axios.get("/api/logi");
  //   console.log(res);
  // }


  return (
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
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600} textAlign="center">
            Welcome Back
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

          <Button onClick={submitLogin} variant="contained" fullWidth size="large">
            Login
          </Button>

          <Typography variant="body2" textAlign="center">
            Don't have an account?{' '}
            <MuiLink component={Link} href="/register" underline="hover">
              Register
            </MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
