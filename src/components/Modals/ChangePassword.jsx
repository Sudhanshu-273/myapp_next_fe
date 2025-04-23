
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangePassword({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("/api/auth/send_otp", { email: data.email });
      console.log(res.data);
      if (res.data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else throw new Error();
    } catch {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("/api/auth/verify_otp", {
        email: data.email,
        otp: data.otp,
      });
      if (res.data.success) {
        toast.success("OTP verified");
        setStep(3);
      } else throw new Error();
    } catch {
      toast.error("Invalid OTP");
    }
  };

  const handleChangePassword = async () => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.patch("/api/user/forgotPassword", {
        email: data.email,
        newPassword: data.password,
      });
      if (res.data.success) {
        toast.success("Password changed successfully");
        handleClose();
      } else throw new Error();
    } catch(err) {
      console.log(err);
      toast.error("Failed to change password");
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setData({ email: "", otp: "", password: "", confirmPassword: "" });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {step === 1 && "Forgot Password"}
        {step === 2 && "Verify OTP"}
        {step === 3 && "Reset Password"}
      </DialogTitle>

      <DialogContent>
        {step === 1 && (
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        )}

        {step === 2 && (
          <TextField
            label="Enter OTP"
            fullWidth
            inputProps={{ maxLength: 6 }}
            margin="normal"
            value={data.otp}
            onChange={(e) => setData({ ...data, otp: e.target.value })}
          />
        )}

        {step === 3 && (
          <Stack spacing={2}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {step === 1 && <Button onClick={handleSendOtp}>Send OTP</Button>}
        {step === 2 && <Button onClick={handleVerifyOtp}>Verify</Button>}
        {step === 3 && <Button onClick={handleChangePassword}>Change Password</Button>}
      </DialogActions>
    </Dialog>
  );
}
