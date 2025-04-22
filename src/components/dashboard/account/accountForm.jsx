"use client";

import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "@/context/UserContext";

export default function AccountForm() {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: user?.user_data?.name || "",
    email: user?.user_data?.email || "",
    phone: user?.user_data?.phone || "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Updating profile...");

    try {
      // console.log(formData);
      const res = await axios.patch("/api/user/update", {
        id: user.user_data.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
  
      // Update context if needed
      setUser(prev => ({
        ...prev,
        user_data: {
          ...prev.user_data,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      }));


      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSave();
      }}
    >
      <Card sx={{ borderRadius: 5 }}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  value={formData.name}
                  onChange={handleChange}
                  label="Name"
                  name="name"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  value={formData.email}
                  onChange={handleChange}
                  label="Email address"
                  name="email"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Phone Number</InputLabel>
                <OutlinedInput
                  value={formData.phone}
                  onChange={handleChange}
                  label="Phone Number"
                  name="phone"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Button variant="outlined">Change Password</Button>
            <Button variant="contained" type="submit">
              Save details
            </Button>
          </Box>
        </CardActions>
      </Card>
    </form>
  );
}
