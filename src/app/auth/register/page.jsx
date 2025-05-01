"use client";

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });


  const submitRegister = async (e) => {
    e.preventDefault();
    if (
      !loginData.email ||
      !loginData.password ||
      !loginData.confirmPassword ||
      !loginData.accountType
    ) {
      toast.error("Please fill in all fields");
    }

    const loadingToast = toast.loading("Registering...");

    const res = await axios.post("/api/auth/register", {
      email: loginData.email,
      password: loginData.password,
      confirmPassword: loginData.confirmPassword,
      accountType: loginData.accountType,
    });
    console.log(res);
    toast.remove(loadingToast);
    toast.success("Registration successfull");
    router.push("/auth/login");
  };

  const [accountTypes, setAccountTypes] = useState([]);

  const getAccountTypes = async () => {
    const res = await axios.get("/api/account_types");
    const accounts = res.data.data;
    setAccountTypes(accounts);
    // console.log(accountTypes);
  };

  useEffect(() => {
    console.log(loginData);
    getAccountTypes();
    // submitRegister();
  }, [loginData]);

  useEffect(() => {}, []);

  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <form onSubmit={submitRegister}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight={600} textAlign="center">
                Create an Account
              </Typography>

              <TextField
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  });
                }}
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
                label="Password"
                type="password"
                fullWidth
              />
              <TextField
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    confirmPassword: e.target.value,
                  });
                }}
                label="Confirm Password"
                type="password"
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Account Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Account Type"
                  value={loginData.accountType}
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      accountType: e.target.value,
                    });
                  }}
                >
                  {accountTypes.map((item) => {
                    return <MenuItem value={item.id}>{item.title}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Register
              </Button>

              <Typography variant="body2" textAlign="center">
                Already have an account?{" "}
                <MuiLink component={Link} href="/auth/login" underline="hover">
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
