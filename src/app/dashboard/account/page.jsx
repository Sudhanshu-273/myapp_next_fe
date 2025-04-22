import React from "react";
import {Grid,Box} from "@mui/material";
import AccountForm from "@/components/dashboard/account/accountForm";
import AccountInfo from "@/components/dashboard/account/accountInfo";
import Navbar from "@/components/Navbar/navbar";


export default function Page() {
  return (
    <>
      <Navbar />
      <Box sx={{
        mt: 3,
        ml:40,
      mr:3,
      }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <AccountInfo />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <AccountForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
