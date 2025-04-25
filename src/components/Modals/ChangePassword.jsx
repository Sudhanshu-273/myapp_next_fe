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
  const [canClose, setCanClose] = useState(false); // 👈 control closing
  const [data, setData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleSendOtp = async () => {
    const loadingToast = toast.loading("Sending OTP...");
    try {
      const res = await axios.post("/api/auth/send_otp", { email: data.email });
      toast.dismiss(loadingToast);
      if (res.data.success) {
        console.log(res.data.otp);
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        throw new Error(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message || error.message || "Failed to send OTP"
      );
    }
  };

  const handleVerifyOtp = async () => {
    const loadingToast = toast.loading("Verifying OTP...");
    try {
      const res = await axios.post("/api/auth/verify_otp", {
        email: data.email,
        otp: data.otp,
      });
      toast.dismiss(loadingToast);
      if (res.data.success) {
        toast.success("OTP verified");
        setStep(3);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Invalid OTP");
    }
  };

  const handleChangePassword = async () => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const loadingToast = toast.loading("Changing password...");
    try {
      const res = await axios.patch("/api/user/forgotPassword", {
        email: data.email,
        newPassword: data.password,
      });

      toast.dismiss(loadingToast);
      if (res.data.success) {
        toast.success("Password changed successfully");
        setCanClose(true); // 👈 allow closing
        handleClose();     // 👈 trigger close after success
      } else {
        throw new Error("Failed to change password");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to change password");
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setCanClose(false); // 👈 reset for next time
    setData({ email: "", otp: "", password: "", confirmPassword: "" });
  };

  const handleConditionalClose = (event, reason) => {
    // block all closing until canClose is true
    if ((reason === "backdropClick" || reason === "escapeKeyDown") && !canClose) {
      return;
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleConditionalClose}
      fullWidth
      disableEscapeKeyDown={!canClose} // block ESC too
    >
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
        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>
        {step === 1 && <Button onClick={handleSendOtp}>Send OTP</Button>}
        {step === 2 && <Button onClick={handleVerifyOtp}>Verify</Button>}
        {step === 3 && (
          <Button onClick={handleChangePassword}>Change Password</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
