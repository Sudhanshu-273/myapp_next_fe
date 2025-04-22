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

export default function LoginPage() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const submitLogin = async (e) => {
        e.preventDefault(); // Prevent page reload
        const loadingToast = toast.loading("Logging In...");
        try {
            console.log("Login Data:", loginData);
            const res = await axios.post("/api/auth/login", loginData);
            console.log("Response:", res.data);

            setUser({
                ...user,
                user_data: res.data.data,
                token: res.data.token,
            });

            localStorage.setItem("curr_user", JSON.stringify(res.data));
            toast.success("Login successful!");
            router.push("/");
        } catch (err) {
            console.error("Login Error:", err);
            toast.error("Login failed!");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    useEffect(() => {
        console.log("User logged in:", user);
    }, [user]);

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
                <form onSubmit={submitLogin}>
                    <Stack spacing={3}>
                        <Typography variant="h5" fontWeight={600} textAlign="center">
                            Welcome Back
                        </Typography>

                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({ ...loginData, email: e.target.value })
                            }
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({ ...loginData, password: e.target.value })
                            }
                        />

                        <Button type="submit" variant="contained" fullWidth size="large">
                            Login
                        </Button>

                        <Typography variant="body2" textAlign="center">
                            Don't have an account?{' '}
                            <MuiLink component={Link} href="/register" underline="hover">
                                Register
                            </MuiLink>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
