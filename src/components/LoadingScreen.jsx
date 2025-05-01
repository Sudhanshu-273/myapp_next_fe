"use client";

import { CircularProgress, Box } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <CircularProgress size={60} thickness={4.5} color="success" />
    </Box>
  );
}
