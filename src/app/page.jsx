"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Box } from "@mui/material";

export default function Home() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      Hello {user?.user_data?.email || "Guest"}
    </>
  );
}
