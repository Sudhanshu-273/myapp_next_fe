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
import { useEffect, useState } from 'react';

export default function RegisterPage() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submitRegister = async () => {
    const res = await axios.post("/api/auth/register", {
      email: loginData.email,
      password: loginData.password,
      confirmPassword: loginData.confirmPassword
    });
    console.log(res);
  }

  useEffect(() => {
    console.log(loginData);
    // submitRegister();
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

            <Button onClick={submitRegister} variant="contained" fullWidth size="large">
              Register
            </Button>

            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <MuiLink component={Link} href="/login" underline="hover">
                Login
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}